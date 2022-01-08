import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository'
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest'
import { Company } from '../models'
import { CompanyRepository } from '../repositories'
import fetch from 'cross-fetch'
import moment from 'moment'

export class CompanyController {
  constructor(
    @repository(CompanyRepository)
    public companyRepository: CompanyRepository
  ) {}

  @post('/companies')
  @response(200, {
    description: 'Company model instance',
    content: { 'application/json': { schema: getModelSchemaRef(Company) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Company, {
            title: 'NewCompany',
            exclude: ['id'],
          }),
        },
      },
    })
    company: Omit<Company, 'id'>
  ): Promise<Company> {
    const latestCompanyRecord = await this.lookupCompany(company.orgnr)
    if (latestCompanyRecord){
      company.name = latestCompanyRecord.companyName
      delete latestCompanyRecord.companyId
      delete latestCompanyRecord.companyName
      company = {...company, ...latestCompanyRecord}
      company.statusDateFrom = moment(latestCompanyRecord.statusDateFrom).toDate()
      company.companyRegistrationDate = moment(latestCompanyRecord.companyRegistrationDate).toDate()
      company.changeDate = moment(latestCompanyRecord.changeDate).toDate()
    }
/*      {
            "address": "Västerbrogatan 8",
            "changeDate": "2018-02-21",
            "coAddress": "c/o Advokatbyrån Eriksson & Bengtsson",
            "commune": "BORÅS",
            "companyId": "5569030264",
            "companyName": "Armina AB",
            "companyRegistrationDate": "20120906",
            "county": "VÄSTRA GÖTALAND",
            "employerContributionReg": false,
            "industryCode": "00009",
            "industryText": "Huvudnäring okänd",
            "legalGroupCode": "AB",
            "legalGroupText": "Privat aktiebolag",
            "numberCompanyUnits": 0,
            "phoneNumber": "0730-209999",
            "preliminaryTaxReg": false,
            "severalCompanyName": false,
            "statusCode": "291",
            "statusDateFrom": "20180219",
            "statusTextDetailed": "Konkurs avslutad",
            "statusTextHigh": "Konkurs avslutad",
            "town": "BORÅS",
            "vatReg": false,
            "zipCode": "50330"
          },
          {
            "address": "Västerbrogatan 8",
            "changeDate": "2017-04-11",
            "coAddress": "c/o Advokatbyrån Eriksson & Bengtsson",
            "commune": "BORÅS",
            "companyId": "5569030264",
            "companyName": "Armina AB",
            "companyRegistrationDate": "20120906",
            "county": "VÄSTRA GÖTALAND",
            "employerContributionReg": false,
            "industryCode": "00009",
            "industryText": "Huvudnäring okänd",
            "legalGroupCode": "AB",
            "legalGroupText": "Privat aktiebolag",
            "numberCompanyUnits": 0,
            "phoneNumber": "0730-209999",
            "preliminaryTaxReg": false,
            "severalCompanyName": false,
            "statusCode": "190",
            "statusDateFrom": "20151218",
            "statusTextDetailed": "Konkursbeslut",
            "statusTextHigh": "Konkursbeslut",
            "town": "BORÅS",
            "vatReg": false,
            "zipCode": "50330"
          },
          {
            "address": "Västerbrogatan 8",
            "changeDate": "2016-12-11",
            "coAddress": "c/o Advokatbyrån Eriksson & Bengtsson",
            "commune": "BORÅS",
            "companyId": "5569030264",
            "companyName": "Armina AB",
            "companyRegistrationDate": "20120906",
            "county": "VÄSTRA GÖTALAND",
            "employerContributionReg": false,
            "industryCode": "00009",
            "industryText": "Huvudnäring okänd",
            "legalGroupCode": "AB",
            "legalGroupText": "Privat aktiebolag",
            "numberCompanyUnits": 0,
            "numberEmployeesInterval": "0 anställda",
            "phoneNumber": "0730-209999",
            "preliminaryTaxReg": false,
            "severalCompanyName": false,
            "statusCode": "190",
            "statusDateFrom": "20151218",
            "statusTextDetailed": "Konkursbeslut",
            "statusTextHigh": "Konkursbeslut",
            "town": "BORÅS",
            "vatReg": false,
            "zipCode": "50330"
          } */

    return this.companyRepository.create(company)
  }

  private async getToken(): Promise<string> {
    const key = process.env.ROARING_KEY || 'e3YCCMVKvA0Pu5lAsmd02hk2xloa' // sandbox
    const secret = process.env.ROARING_SECRET || '0Ly8E04vUWzn534aCNXSKhaMhewa' // sandbox
    const base64 = Buffer.from(`${key}:${secret}`).toString('base64')
    const token = await fetch('https://api.roaring.io/token', {
      method: 'POST',
      body: 'grant_type=client_credentials',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${base64}`
      }
    }).then(res => res.json())
    return token.access_token
  }

  private async lookupCompany(orgnr: string) {
    const roaringToken = await this.getToken()
    const info = await fetch(
      `https://api.roaring.io/se/company/overview/2.0/history/${orgnr}?fromDate=2016-12-11&toDate=2018-02-21`,
      {
        
        headers: {
          'Authorization': `Bearer ${roaringToken}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      }}
    ).then((res: any) => {
      console.dir(res)
      console.log(res.ok)
      console.log(res.status)
      return res.json()
    }) as any


    const latestCompanyRecord = info.records ? info.records[0] : null
    console.log('roaring response', latestCompanyRecord)

    return latestCompanyRecord
  }

  @get('/companies')
  @response(200, {
    description: 'Array of Company model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Company, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(Company) filter?: Filter<Company>
  ): Promise<Company[]> {
    return this.companyRepository.find(filter)
  }

  @get('/companies/{id}')
  @response(200, {
    description: 'Company model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Company, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Company, { exclude: 'where' })
    filter?: FilterExcludingWhere<Company>
  ): Promise<Company> {
    return this.companyRepository.findById(id, filter)
  }

  @put('/companies/{id}')
  @response(204, {
    description: 'Company PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() company: Company
  ): Promise<void> {
    await this.companyRepository.replaceById(id, company)
  }

  @del('/companies/{id}')
  @response(204, {
    description: 'Company DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.companyRepository.deleteById(id)
  }
}

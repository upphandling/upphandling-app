import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
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
} from '@loopback/rest';
import {Company} from '../models';
import {CompanyRepository} from '../repositories';
import moment from 'moment';
import {Roaring} from '../lib/roaring';

export class CompanyController {
  constructor(
    @repository(CompanyRepository)
    public companyRepository: CompanyRepository,
  ) {}

  @post('/companies')
  @response(200, {
    description: 'Company model instance',
    content: {'application/json': {schema: getModelSchemaRef(Company)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Company, {
            title: 'NewCompany',
            exclude: ['id', 'createdAt'],
          }),
        },
      },
    })
    company: Company,
  ): Promise<Company> {
    console.log('got copmany', company);
    const latestCompanyRecord = await Roaring.lookupCompany(company.id);
    if (latestCompanyRecord) {
      company.id = latestCompanyRecord.companyId;
      company.name = latestCompanyRecord.companyName;
      delete latestCompanyRecord.companyId;
      delete latestCompanyRecord.companyName;
      company = {...company, ...latestCompanyRecord};
      company.statusDateFrom = moment(
        latestCompanyRecord.statusDateFrom,
      ).toDate();
      company.companyRegistrationDate = moment(
        latestCompanyRecord.companyRegistrationDate,
      ).toDate();
      company.changeDate = moment(latestCompanyRecord.changeDate).toDate();
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

    return this.companyRepository.create(company);
  }

  @get('/companies')
  @response(200, {
    description: 'Array of Company model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Company, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Company) filter?: Filter<Company>,
  ): Promise<Company[]> {
    return this.companyRepository.find(filter);
  }

  @get('/companies/{id}')
  @response(200, {
    description: 'Company model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Company, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Company, {exclude: 'where'})
    filter?: FilterExcludingWhere<Company>,
  ): Promise<Company> {
    return this.companyRepository.findById(id, filter);
  }

  @put('/companies/{id}')
  @response(204, {
    description: 'Company PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() company: Company,
  ): Promise<void> {
    await this.companyRepository.replaceById(id, company);
  }

  @del('/companies/{id}')
  @response(204, {
    description: 'Company DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.companyRepository.deleteById(id);
  }
}

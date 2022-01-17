import {Entity, hasMany, model, property} from '@loopback/repository';
import { Offer } from './offer.model';
import {Participation} from './participation.model';

@model({settings: {strict: true}})
export class Company extends Entity {
  @property({
    type: 'string',
    required: false,
  })
  name: string;

  @property({
    type: 'string',
    description: "Organisationsnummer",
    required: true,
    id: true,
  })
  id: string;

  @hasMany(() => Offer, {keyTo: 'companyId'})

  @property({
    type: 'object',
  })
  contact?: object;
  
  @property({
    type: 'string',
    required: false,
  })
  address: string;
  
  @property({
    type: 'date',
    required: false,
  })
  changeDate: Date;
  
  @property({
    type: 'string',
    required: false,
  })
  coAddress: string;
  
  @property({
    type: 'string',
    required: false,
  })
  commune: string;
  
  @property({
    type: 'date',
    required: false,
  })
  companyRegistrationDate: Date;
  
  @property({
    type: 'string',
    required: false,
  })
  county: string;
  
  @property({
    type: 'string',
    required: false,
  })
  employerContributionReg: string;
  
  @property({
    type: 'string',
    required: false,
  })
  industryCode: string;
  
  @property({
    type: 'string',
    required: false,
  })
  industryText: string;
  
  @property({
    type: 'string',
    required: false,
  })
  legalGroupCode: string;
  
  @property({
    type: 'string',
    required: false,
  })
  legalGroupText: string;
  
  @property({
    type: 'string',
    required: false,
  })
  numberCompanyUnits: string;
  
  @property({
    type: 'string',
    required: false,
  })
  phoneNumber: string;
  
  @property({
    type: 'string',
    required: false,
  })
  preliminaryTaxReg: string;
  
  @property({
    type: 'string',
    required: false,
  })
  severalCompanyName: string;
  
  @property({
    type: 'string',
    required: false,
  })
  statusCode: string;
  
  @property({
    type: 'date',
    required: false,
  })
  statusDateFrom: Date;
  
  @property({
    type: 'string',
    required: false,
  })
  statusTextDetailed: string;
  
  @property({
    type: 'string',
    required: false,
  })
  statusTextHigh: string;
  
  @property({
    type: 'string',
    required: false,
  })
  town: string;
  
  @property({
    type: 'string',
    required: false,
  })
  vatReg: string;
  
  @property({
    type: 'string',
    required: false,
  })
  zipCode: string;

  @property({
    type: 'string',
    required: false,
  })
  communeCode: string // '80',
  
  @property({
    type: 'string',
    required: false,
  })
  companyName: string // 'Iteam Solutions Aktiebolag',
  
  @property({
    type: 'string',
    required: false,
  })
  email: string // 'info@iteam.se',

  @property({
    type: 'string',
    required: false,
  })
  website: string // 'https://www.iteam.se/',
  
  @property({
    type: 'string',
    required: false,
  })
  faxNumber: string // '08-220322',
  
  @property({
    type: 'string',
    required: false,
  })
  numberEmployeesInterval: string // '20-49 anställda',
  
  @property({
    type: 'string',
    required: false,
  })
  preliminaryTaxRegDate: string // '19980101',
  
  @property({
    type: 'string',
    required: false,
  })
  vatRegDate: string // '1998-01',
  
  @property({
    type: 'string',
    required: false,
  })
  topDirectorFunction: string // 'Verkställande direktör',
  
  @property({
    type: 'string',
    required: false,
  })
  topDirectorName: string // 'Landgren, Per Christian',
  
  @property({
    type: 'string',
    required: false,
  })
  visitAddress: string // 'Järntorgsgatan 12 4TR',
  
  @property({
    type: 'string',
    required: false,
  })
  visitCommune: string // 'GÖTEBORG',
  
  @property({
    type: 'string',
    required: false,
  })
  visitCounty: string // 'VÄSTRA GÖTALAND',
  
  @property({
    type: 'string',
    required: false,
  })
  visitStreet: string // 'Järntorgsgatan 12 4TR',
  
  @property({
    type: 'string',
    required: false,
  })
  visitTown: string // 'Göteborg',
  
  @property({
    type: 'string',
    required: false,
  })
  visitZipCode: string

  @hasMany(() => Participation)
  participations: Participation[];

  constructor(data?: Partial<Company>) {
    super(data);
    Object.assign(this, data)
  }
}

export interface CompanyRelations {
  // describe navigational properties here
}

export type CompanyWithRelations = Company & CompanyRelations;

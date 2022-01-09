import {Entity, model, property} from '@loopback/repository';

@model()
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

  constructor(data?: Partial<Company>) {
    super(data);
  }
}

export interface CompanyRelations {
  // describe navigational properties here
}

export type CompanyWithRelations = Company & CompanyRelations;

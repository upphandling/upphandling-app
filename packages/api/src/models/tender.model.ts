import {Entity, model, property} from '@loopback/repository';

@model()
export class Tender extends Entity {
  @property({
    type: 'string',
    id: true,
    defaultFn: 'uuidv4',
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  startDate: string;

  @property({
    type: 'string',
    required: true,
  })
  disId: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  issues: string;

  @property({
    type: 'string',
  })
  description: string;

  @property({
    type: 'string',
  })
  geography: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  services: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  technologies: string;

  @property({
    type: 'string',
  })
  evaluationCriteria: string;

  @property({
    type: 'date',
    required: false,
    default: () => new Date(),
  })
  createdAt: string;

  constructor(data?: Partial<Tender>) {
    super(data);
  }
}

export interface TenderRelations {
  // describe navigational properties here
}

export type TenderWithRelations = Tender & TenderRelations;

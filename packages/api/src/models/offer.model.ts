import {Entity, model, property} from '@loopback/repository';

@model()
export class Offer extends Entity {
  @property({
    type: 'string',
    id: true,
    defaultFn: 'uuidv4',
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  tenderId: string;

  @property({
    type: 'date',
  })
  date?: string;

  @property({
    type: 'string',
    required: true,
  })
  price: string;

  @property({
    type: 'string',
    required: true,
  })
  companyId: string;

  @property({
    type: 'string',
    required: true,
  })
  contactId: string;

  @property({
    type: 'date',
    required: true,
    default: () => new Date(),
  })
  createdAt: string;

  constructor(data?: Partial<Offer>) {
    super(data);
  }
}

export interface OfferRelations {
  // describe navigational properties here
}

export type OfferWithRelations = Offer & OfferRelations;

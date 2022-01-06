import {Entity, model, property} from '@loopback/repository';

@model()
export class Dis extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    required: false,
    defaultFn: 'uuidv4',
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'date',
    required: true,
  })
  startDate: string;

  @property({
    type: 'string',
    required: true,
  })
  organisation: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
  })
  status?: string;

  @property({
    type: 'string',
  })
  repo?: string;

  @property({
    type: 'number',
  })
  stars?: number;

  @property({
    type: 'array',
    itemType: 'string',
  })
  tech?: string[];

  @property({
    type: 'array',
    itemType: 'string',
  })
  services?: string[];


  constructor(data?: Partial<Dis>) {
    super(data);
  }
}

export interface DisRelations {
  // describe navigational properties here
}

export type DisWithRelations = Dis & DisRelations;

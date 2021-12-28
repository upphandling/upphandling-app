import {Entity, model, property} from '@loopback/repository';

@model()
export class Assignment extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  companyId: string;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'string',
  })
  tenderId?: string;


  constructor(data?: Partial<Assignment>) {
    super(data);
  }
}

export interface AssignmentRelations {
  // describe navigational properties here
}

export type AssignmentWithRelations = Assignment & AssignmentRelations;

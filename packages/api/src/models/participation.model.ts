import { Entity, model, property } from '@loopback/repository'

@model()
export class Participation extends Entity {
  @property({
    type: 'string',
    generated: true,
    id: true,
  })
  id?: string

  @property({
    type: 'string',
    required: true,
  })
  companyId: string

  @property({
    type: 'string',
    required: true,
  })
  disId: string

  @property({
    type: 'date',
    required: true,
  })
  requestDate: string

  @property({
    type: 'date',
  })
  acceptedDate?: string

  @property({
    type: 'date',
  })
  deniedDate?: string

  constructor(data?: Partial<Participation>) {
    super(data)
  }
}

export interface ParticipationRelations {
  // describe navigational properties here
}

export type ParticipationWithRelations = Participation & ParticipationRelations

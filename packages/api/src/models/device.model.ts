import {Entity, model, property} from '@loopback/repository';

@model()
export class Device extends Entity {
  @property({
    type: 'string',
  })
  pushToken?: string;

  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  deviceId: string;

  @property({
    type: 'date',
    required: true,
    default: () => new Date(),
  })
  lastSeen: string;

  @property({
    type: 'date',
    required: true,
    default: () => new Date(),
  })
  createdAt: string;

  @property({
    type: 'string',
    required: true,
  })
  platform: string;

  @property({
    type: 'string',
    required: true,
  })
  appVersion: string;


  constructor(data?: Partial<Device>) {
    super(data);
  }
}

export interface DeviceRelations {
  // describe navigational properties here
}

export type DeviceWithRelations = Device & DeviceRelations;

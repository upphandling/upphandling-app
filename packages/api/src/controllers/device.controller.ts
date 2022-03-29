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
import {Device} from '../models';
import {Notification} from '../models';
import {DeviceRepository} from '../repositories';
import {NotificationRepository} from '../repositories';

export class DeviceController {
  constructor(
    @repository(DeviceRepository)
    public deviceRepository: DeviceRepository,
    @repository(NotificationRepository)
    public notificationRepository: NotificationRepository,
  ) {}

  @post('/devices')
  @response(200, {
    description: 'Device model instance',
    content: {'application/json': {schema: getModelSchemaRef(Device)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Device, {
            title: 'NewDevice',
            exclude: ['createdAt', 'lastSeen'],
          }),
        },
      },
    })
    device: Device,
  ): Promise<Device> {
    try {
      device.lastSeen = new Date().toString();
      await this.deviceRepository.updateById(device.deviceId, device);
      return this.deviceRepository.findById(device.deviceId);
    } catch (error) {
      if (error.code === 'ENTITY_NOT_FOUND') {
        return this.deviceRepository.create(device);
      } else {
        console.log(error);
        throw error;
      }
    }
  }

  @get('/devices/count')
  @response(200, {
    description: 'Device model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Device) where?: Where<Device>): Promise<Count> {
    return this.deviceRepository.count(where);
  }

  @get('/devices')
  @response(200, {
    description: 'Array of Device model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Device, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Device) filter?: Filter<Device>): Promise<Device[]> {
    return this.deviceRepository.find(filter);
  }

  @patch('/devices')
  @response(200, {
    description: 'Device PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Device, {partial: true}),
        },
      },
    })
    device: Device,
    @param.where(Device) where?: Where<Device>,
  ): Promise<Count> {
    return this.deviceRepository.updateAll(device, where);
  }

  @get('/devices/{id}')
  @response(200, {
    description: 'Device model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Device, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Device, {exclude: 'where'})
    filter?: FilterExcludingWhere<Device>,
  ): Promise<Device> {
    return this.deviceRepository.findById(id, filter);
  }

  @patch('/devices/{id}')
  @response(204, {
    description: 'Device PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Device, {partial: true}),
        },
      },
    })
    device: Device,
  ): Promise<void> {
    await this.deviceRepository.updateById(id, device);
  }

  @put('/devices/{id}')
  @response(204, {
    description: 'Device PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() device: Device,
  ): Promise<void> {
    await this.deviceRepository.replaceById(id, device);
  }

  @del('/devices/{id}')
  @response(204, {
    description: 'Device DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.deviceRepository.deleteById(id);
  }
}

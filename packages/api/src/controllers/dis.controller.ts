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
import {Dis} from '../models';
import {DisRepository} from '../repositories';

export class DisController {
  constructor(
    @repository(DisRepository)
    public disRepository : DisRepository,
  ) {}

  @post('/dis')
  @response(200, {
    description: 'Dis model instance',
    content: {'application/json': {schema: getModelSchemaRef(Dis)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dis, {
            title: 'NewDis',
            exclude: ['id'],
          }),
        },
      },
    })
    dis: Omit<Dis, 'id'>,
  ): Promise<Dis> {
    return this.disRepository.create(dis);
  }

  @get('/dis/count')
  @response(200, {
    description: 'Dis model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Dis) where?: Where<Dis>,
  ): Promise<Count> {
    return this.disRepository.count(where);
  }

  @get('/dis')
  @response(200, {
    description: 'Array of Dis model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Dis, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Dis) filter?: Filter<Dis>,
  ): Promise<Dis[]> {
    return this.disRepository.find(filter);
  }

  @patch('/dis')
  @response(200, {
    description: 'Dis PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dis, {partial: true}),
        },
      },
    })
    dis: Dis,
    @param.where(Dis) where?: Where<Dis>,
  ): Promise<Count> {
    return this.disRepository.updateAll(dis, where);
  }

  @get('/dis/{id}')
  @response(200, {
    description: 'Dis model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Dis, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Dis, {exclude: 'where'}) filter?: FilterExcludingWhere<Dis>
  ): Promise<Dis> {
    return this.disRepository.findById(id, filter);
  }

  @patch('/dis/{id}')
  @response(204, {
    description: 'Dis PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dis, {partial: true}),
        },
      },
    })
    dis: Dis,
  ): Promise<void> {
    await this.disRepository.updateById(id, dis);
  }

  @put('/dis/{id}')
  @response(204, {
    description: 'Dis PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() dis: Dis,
  ): Promise<void> {
    await this.disRepository.replaceById(id, dis);
  }

  @del('/dis/{id}')
  @response(204, {
    description: 'Dis DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.disRepository.deleteById(id);
  }
}

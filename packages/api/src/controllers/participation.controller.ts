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
import {Participation} from '../models';
import {ParticipationRepository} from '../repositories';

export class ParticipationController {
  constructor(
    @repository(ParticipationRepository)
    public participationRepository : ParticipationRepository,
  ) {}

  @post('/participations')
  @response(200, {
    description: 'Participation model instance',
    content: {'application/json': {schema: getModelSchemaRef(Participation)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Participation, {
            title: 'NewParticipation',
            exclude: ['id'],
          }),
        },
      },
    })
    participation: Omit<Participation, 'id'>,
  ): Promise<Participation> {
    return this.participationRepository.create(participation);
  }

  @get('/participations/count')
  @response(200, {
    description: 'Participation model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Participation) where?: Where<Participation>,
  ): Promise<Count> {
    return this.participationRepository.count(where);
  }

  @get('/participations')
  @response(200, {
    description: 'Array of Participation model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Participation, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Participation) filter?: Filter<Participation>,
  ): Promise<Participation[]> {
    return this.participationRepository.find(filter);
  }

  @patch('/participations')
  @response(200, {
    description: 'Participation PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Participation, {partial: true}),
        },
      },
    })
    participation: Participation,
    @param.where(Participation) where?: Where<Participation>,
  ): Promise<Count> {
    return this.participationRepository.updateAll(participation, where);
  }

  @get('/participations/{id}')
  @response(200, {
    description: 'Participation model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Participation, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Participation, {exclude: 'where'}) filter?: FilterExcludingWhere<Participation>
  ): Promise<Participation> {
    return this.participationRepository.findById(id, filter);
  }

  @patch('/participations/{id}')
  @response(204, {
    description: 'Participation PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Participation, {partial: true}),
        },
      },
    })
    participation: Participation,
  ): Promise<void> {
    await this.participationRepository.updateById(id, participation);
  }

  @put('/participations/{id}')
  @response(204, {
    description: 'Participation PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() participation: Participation,
  ): Promise<void> {
    await this.participationRepository.replaceById(id, participation);
  }

  @del('/participations/{id}')
  @response(204, {
    description: 'Participation DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.participationRepository.deleteById(id);
  }
}

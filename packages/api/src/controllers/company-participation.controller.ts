import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Company,
  Participation,
} from '../models';
import {CompanyRepository} from '../repositories';

export class CompanyParticipationController {
  constructor(
    @repository(CompanyRepository) protected companyRepository: CompanyRepository,
  ) { }

  @get('/companies/{id}/participations', {
    responses: {
      '200': {
        description: 'Array of Company has many Participation',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Participation)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Participation>,
  ): Promise<Participation[]> {
    return this.companyRepository.participations(id).find(filter);
  }

  @post('/companies/{id}/participations', {
    responses: {
      '200': {
        description: 'Company model instance',
        content: {'application/json': {schema: getModelSchemaRef(Participation)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Company.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Participation, {
            title: 'NewParticipationInCompany',
            exclude: ['id'],
            optional: ['companyId']
          }),
        },
      },
    }) participation: Omit<Participation, 'id'>,
  ): Promise<Participation> {
    return this.companyRepository.participations(id).create(participation);
  }

  @patch('/companies/{id}/participations', {
    responses: {
      '200': {
        description: 'Company.Participation PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Participation, {partial: true}),
        },
      },
    })
    participation: Partial<Participation>,
    @param.query.object('where', getWhereSchemaFor(Participation)) where?: Where<Participation>,
  ): Promise<Count> {
    return this.companyRepository.participations(id).patch(participation, where);
  }

  @del('/companies/{id}/participations', {
    responses: {
      '200': {
        description: 'Company.Participation DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Participation)) where?: Where<Participation>,
  ): Promise<Count> {
    return this.companyRepository.participations(id).delete(where);
  }
}

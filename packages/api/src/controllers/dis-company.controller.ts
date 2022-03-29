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
import {Dis, Participation, Company} from '../models';
import {DisRepository} from '../repositories';

export class DisCompanyController {
  constructor(
    @repository(DisRepository) protected disRepository: DisRepository,
  ) {}

  @get('/dis/{id}/companies', {
    responses: {
      '200': {
        description: 'Array of Dis has many Company through Participation',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Company)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Company>,
  ): Promise<Company[]> {
    return this.disRepository.participatingCompanies(id).find(filter);
  }

  @post('/dis/{id}/companies', {
    responses: {
      '200': {
        description: 'create a Company model instance',
        content: {'application/json': {schema: getModelSchemaRef(Company)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Dis.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Company, {
            title: 'NewCompanyInDis',
            exclude: ['id', 'createdAt'],
          }),
        },
      },
    })
    company: Omit<Company, 'id'>,
  ): Promise<Company> {
    return this.disRepository.participatingCompanies(id).create(company);
  }

  @patch('/dis/{id}/companies', {
    responses: {
      '200': {
        description: 'Dis.Company PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Company, {partial: true}),
        },
      },
    })
    company: Partial<Company>,
    @param.query.object('where', getWhereSchemaFor(Company))
    where?: Where<Company>,
  ): Promise<Count> {
    return this.disRepository.participatingCompanies(id).patch(company, where);
  }

  @del('/dis/{id}/companies', {
    responses: {
      '200': {
        description: 'Dis.Company DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Company))
    where?: Where<Company>,
  ): Promise<Count> {
    return this.disRepository.participatingCompanies(id).delete(where);
  }
}

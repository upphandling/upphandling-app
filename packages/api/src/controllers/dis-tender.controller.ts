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
import {Dis, Tender} from '../models';
import {DisRepository} from '../repositories';

export class DisTenderController {
  constructor(
    @repository(DisRepository) protected disRepository: DisRepository,
  ) {}

  @get('/dis/{id}/tenders', {
    responses: {
      '200': {
        description: 'Array of Dis has many Tender',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Tender)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Tender>,
  ): Promise<Tender[]> {
    return this.disRepository.tenders(id).find(filter);
  }

  @post('/dis/{id}/tenders', {
    responses: {
      '200': {
        description: 'Tender model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tender)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Dis.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tender, {
            title: 'NewTenderInDis',
            exclude: ['id', 'createdAt'],
          }),
        },
      },
    })
    tender: Omit<Tender, 'id'>,
  ): Promise<Tender> {
    return this.disRepository.tenders(id).create(tender);
  }

  @patch('/dis/{id}/tenders', {
    responses: {
      '200': {
        description: 'Dis.Tender PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tender, {partial: true}),
        },
      },
    })
    tender: Partial<Tender>,
    @param.query.object('where', getWhereSchemaFor(Tender))
    where?: Where<Tender>,
  ): Promise<Count> {
    return this.disRepository.tenders(id).patch(tender, where);
  }

  @del('/dis/{id}/tenders', {
    responses: {
      '200': {
        description: 'Dis.Tender DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Tender))
    where?: Where<Tender>,
  ): Promise<Count> {
    return this.disRepository.tenders(id).delete(where);
  }
}

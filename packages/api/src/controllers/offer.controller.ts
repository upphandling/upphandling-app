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
import {Offer} from '../models';
import {OfferRepository} from '../repositories';

export class OfferController {
  constructor(
    @repository(OfferRepository)
    public offerRepository : OfferRepository,
  ) {}

  @post('/offers')
  @response(200, {
    description: 'Offer model instance',
    content: {'application/json': {schema: getModelSchemaRef(Offer)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Offer, {
            title: 'NewOffer',
            exclude: ['id'],
          }),
        },
      },
    })
    offer: Omit<Offer, 'id'>,
  ): Promise<Offer> {
    return this.offerRepository.create(offer);
  }

  @get('/offers/count')
  @response(200, {
    description: 'Offer model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Offer) where?: Where<Offer>,
  ): Promise<Count> {
    return this.offerRepository.count(where);
  }

  @get('/offers')
  @response(200, {
    description: 'Array of Offer model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Offer, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Offer) filter?: Filter<Offer>,
  ): Promise<Offer[]> {
    return this.offerRepository.find(filter);
  }

  @patch('/offers')
  @response(200, {
    description: 'Offer PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Offer, {partial: true}),
        },
      },
    })
    offer: Offer,
    @param.where(Offer) where?: Where<Offer>,
  ): Promise<Count> {
    return this.offerRepository.updateAll(offer, where);
  }

  @get('/offers/{id}')
  @response(200, {
    description: 'Offer model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Offer, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Offer, {exclude: 'where'}) filter?: FilterExcludingWhere<Offer>
  ): Promise<Offer> {
    return this.offerRepository.findById(id, filter);
  }

  @patch('/offers/{id}')
  @response(204, {
    description: 'Offer PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Offer, {partial: true}),
        },
      },
    })
    offer: Offer,
  ): Promise<void> {
    await this.offerRepository.updateById(id, offer);
  }

  @put('/offers/{id}')
  @response(204, {
    description: 'Offer PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() offer: Offer,
  ): Promise<void> {
    await this.offerRepository.replaceById(id, offer);
  }

  @del('/offers/{id}')
  @response(204, {
    description: 'Offer DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.offerRepository.deleteById(id);
  }
}

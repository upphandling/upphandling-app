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
import {Person} from '../models';
import {PersonRepository} from '../repositories';

export class PersonController {
  constructor(
    @repository(PersonRepository)
    public personRepository : PersonRepository,
  ) {}

  @post('/users')
  @response(200, {
    description: 'Person model instance',
    content: {'application/json': {schema: getModelSchemaRef(Person)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Person, {
            title: 'NewPerson',
            exclude: ['id', 'createdAt'],
          }),
        },
      },
    })
    person: Omit<Person, 'id'>,
  ): Promise<Person> {
    return this.personRepository.create(person);
  }

  @get('/users/count')
  @response(200, {
    description: 'Person model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Person) where?: Where<Person>,
  ): Promise<Count> {
    return this.personRepository.count(where);
  }

  @get('/users')
  @response(200, {
    description: 'Array of Person model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Person, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Person) filter?: Filter<Person>,
  ): Promise<Person[]> {
    return this.personRepository.find(filter);
  }

  @patch('/users')
  @response(200, {
    description: 'Person PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Person, {partial: true}),
        },
      },
    })
    person: Person,
    @param.where(Person) where?: Where<Person>,
  ): Promise<Count> {
    return this.personRepository.updateAll(person, where);
  }

  @get('/users/{id}')
  @response(200, {
    description: 'Person model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Person, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Person, {exclude: 'where'}) filter?: FilterExcludingWhere<Person>
  ): Promise<Person> {
    return this.personRepository.findById(id, filter);
  }

  @patch('/users/{id}')
  @response(204, {
    description: 'Person PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Person, {partial: true}),
        },
      },
    })
    person: Person,
  ): Promise<void> {
    await this.personRepository.updateById(id, person);
  }

  @put('/users/{id}')
  @response(204, {
    description: 'Person PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() person: Person,
  ): Promise<void> {
    await this.personRepository.replaceById(id, person);
  }

  @del('/users/{id}')
  @response(204, {
    description: 'Person DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.personRepository.deleteById(id);
  }
}

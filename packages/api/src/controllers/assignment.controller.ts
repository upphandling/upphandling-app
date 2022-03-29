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
import {Assignment} from '../models';
import {AssignmentRepository} from '../repositories';

export class AssignmentController {
  constructor(
    @repository(AssignmentRepository)
    public assignmentRepository : AssignmentRepository,
  ) {}

  @post('/assignments')
  @response(200, {
    description: 'Assignment model instance',
    content: {'application/json': {schema: getModelSchemaRef(Assignment)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Assignment, {
            title: 'NewAssignment',
            exclude: ['id', 'createdAt'],
          }),
        },
      },
    })
    assignment: Omit<Assignment, 'id'>,
  ): Promise<Assignment> {
    return this.assignmentRepository.create(assignment);
  }

  @get('/assignments/count')
  @response(200, {
    description: 'Assignment model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Assignment) where?: Where<Assignment>,
  ): Promise<Count> {
    return this.assignmentRepository.count(where);
  }

  @get('/assignments')
  @response(200, {
    description: 'Array of Assignment model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Assignment, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Assignment) filter?: Filter<Assignment>,
  ): Promise<Assignment[]> {
    return this.assignmentRepository.find(filter);
  }

  @patch('/assignments')
  @response(200, {
    description: 'Assignment PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Assignment, {partial: true}),
        },
      },
    })
    assignment: Assignment,
    @param.where(Assignment) where?: Where<Assignment>,
  ): Promise<Count> {
    return this.assignmentRepository.updateAll(assignment, where);
  }

  @get('/assignments/{id}')
  @response(200, {
    description: 'Assignment model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Assignment, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Assignment, {exclude: 'where'}) filter?: FilterExcludingWhere<Assignment>
  ): Promise<Assignment> {
    return this.assignmentRepository.findById(id, filter);
  }

  @patch('/assignments/{id}')
  @response(204, {
    description: 'Assignment PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Assignment, {partial: true}),
        },
      },
    })
    assignment: Assignment,
  ): Promise<void> {
    await this.assignmentRepository.updateById(id, assignment);
  }

  @put('/assignments/{id}')
  @response(204, {
    description: 'Assignment PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() assignment: Assignment,
  ): Promise<void> {
    await this.assignmentRepository.replaceById(id, assignment);
  }

  @del('/assignments/{id}')
  @response(204, {
    description: 'Assignment DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.assignmentRepository.deleteById(id);
  }
}

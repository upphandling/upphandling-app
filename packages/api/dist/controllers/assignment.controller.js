"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignmentController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let AssignmentController = class AssignmentController {
    constructor(assignmentRepository) {
        this.assignmentRepository = assignmentRepository;
    }
    async create(assignment) {
        return this.assignmentRepository.create(assignment);
    }
    async count(where) {
        return this.assignmentRepository.count(where);
    }
    async find(filter) {
        return this.assignmentRepository.find(filter);
    }
    async updateAll(assignment, where) {
        return this.assignmentRepository.updateAll(assignment, where);
    }
    async findById(id, filter) {
        return this.assignmentRepository.findById(id, filter);
    }
    async updateById(id, assignment) {
        await this.assignmentRepository.updateById(id, assignment);
    }
    async replaceById(id, assignment) {
        await this.assignmentRepository.replaceById(id, assignment);
    }
    async deleteById(id) {
        await this.assignmentRepository.deleteById(id);
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.post)('/assignments'),
    (0, rest_1.response)(200, {
        description: 'Assignment model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Assignment) } },
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Assignment, {
                    title: 'NewAssignment',
                    exclude: ['id'],
                }),
            },
        },
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AssignmentController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)('/assignments/count'),
    (0, rest_1.response)(200, {
        description: 'Assignment model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    (0, tslib_1.__param)(0, rest_1.param.where(models_1.Assignment)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AssignmentController.prototype, "count", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)('/assignments'),
    (0, rest_1.response)(200, {
        description: 'Array of Assignment model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Assignment, { includeRelations: true }),
                },
            },
        },
    }),
    (0, tslib_1.__param)(0, rest_1.param.filter(models_1.Assignment)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AssignmentController.prototype, "find", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)('/assignments'),
    (0, rest_1.response)(200, {
        description: 'Assignment PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Assignment, { partial: true }),
            },
        },
    })),
    (0, tslib_1.__param)(1, rest_1.param.where(models_1.Assignment)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [models_1.Assignment, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AssignmentController.prototype, "updateAll", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)('/assignments/{id}'),
    (0, rest_1.response)(200, {
        description: 'Assignment model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Assignment, { includeRelations: true }),
            },
        },
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.string('id')),
    (0, tslib_1.__param)(1, rest_1.param.filter(models_1.Assignment, { exclude: 'where' })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AssignmentController.prototype, "findById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)('/assignments/{id}'),
    (0, rest_1.response)(204, {
        description: 'Assignment PATCH success',
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.string('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Assignment, { partial: true }),
            },
        },
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, models_1.Assignment]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AssignmentController.prototype, "updateById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)('/assignments/{id}'),
    (0, rest_1.response)(204, {
        description: 'Assignment PUT success',
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.string('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, models_1.Assignment]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AssignmentController.prototype, "replaceById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.del)('/assignments/{id}'),
    (0, rest_1.response)(204, {
        description: 'Assignment DELETE success',
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.string('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AssignmentController.prototype, "deleteById", null);
AssignmentController = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, repository_1.repository)(repositories_1.AssignmentRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [repositories_1.AssignmentRepository])
], AssignmentController);
exports.AssignmentController = AssignmentController;
//# sourceMappingURL=assignment.controller.js.map
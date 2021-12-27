"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let PersonController = class PersonController {
    constructor(personRepository) {
        this.personRepository = personRepository;
    }
    async create(person) {
        return this.personRepository.create(person);
    }
    async count(where) {
        return this.personRepository.count(where);
    }
    async find(filter) {
        return this.personRepository.find(filter);
    }
    async updateAll(person, where) {
        return this.personRepository.updateAll(person, where);
    }
    async findById(id, filter) {
        return this.personRepository.findById(id, filter);
    }
    async updateById(id, person) {
        await this.personRepository.updateById(id, person);
    }
    async replaceById(id, person) {
        await this.personRepository.replaceById(id, person);
    }
    async deleteById(id) {
        await this.personRepository.deleteById(id);
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.post)('/users'),
    (0, rest_1.response)(200, {
        description: 'Person model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Person) } },
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Person, {
                    title: 'NewPerson',
                    exclude: ['id'],
                }),
            },
        },
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], PersonController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)('/users/count'),
    (0, rest_1.response)(200, {
        description: 'Person model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    (0, tslib_1.__param)(0, rest_1.param.where(models_1.Person)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], PersonController.prototype, "count", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)('/users'),
    (0, rest_1.response)(200, {
        description: 'Array of Person model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Person, { includeRelations: true }),
                },
            },
        },
    }),
    (0, tslib_1.__param)(0, rest_1.param.filter(models_1.Person)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], PersonController.prototype, "find", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)('/users'),
    (0, rest_1.response)(200, {
        description: 'Person PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Person, { partial: true }),
            },
        },
    })),
    (0, tslib_1.__param)(1, rest_1.param.where(models_1.Person)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [models_1.Person, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], PersonController.prototype, "updateAll", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)('/users/{id}'),
    (0, rest_1.response)(200, {
        description: 'Person model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Person, { includeRelations: true }),
            },
        },
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.string('id')),
    (0, tslib_1.__param)(1, rest_1.param.filter(models_1.Person, { exclude: 'where' })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], PersonController.prototype, "findById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)('/users/{id}'),
    (0, rest_1.response)(204, {
        description: 'Person PATCH success',
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.string('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Person, { partial: true }),
            },
        },
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, models_1.Person]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], PersonController.prototype, "updateById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)('/users/{id}'),
    (0, rest_1.response)(204, {
        description: 'Person PUT success',
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.string('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, models_1.Person]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], PersonController.prototype, "replaceById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.del)('/users/{id}'),
    (0, rest_1.response)(204, {
        description: 'Person DELETE success',
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.string('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], PersonController.prototype, "deleteById", null);
PersonController = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, repository_1.repository)(repositories_1.PersonRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [repositories_1.PersonRepository])
], PersonController);
exports.PersonController = PersonController;
//# sourceMappingURL=person.controller.js.map
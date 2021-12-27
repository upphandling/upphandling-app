"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenderController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let TenderController = class TenderController {
    constructor(tenderRepository) {
        this.tenderRepository = tenderRepository;
    }
    async create(tender) {
        return this.tenderRepository.create(tender);
    }
    async count(where) {
        return this.tenderRepository.count(where);
    }
    async find(filter) {
        return this.tenderRepository.find(filter);
    }
    async updateAll(tender, where) {
        return this.tenderRepository.updateAll(tender, where);
    }
    async findById(id, filter) {
        return this.tenderRepository.findById(id, filter);
    }
    async updateById(id, tender) {
        await this.tenderRepository.updateById(id, tender);
    }
    async replaceById(id, tender) {
        await this.tenderRepository.replaceById(id, tender);
    }
    async deleteById(id) {
        await this.tenderRepository.deleteById(id);
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.post)('/tenders'),
    (0, rest_1.response)(200, {
        description: 'Tender model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Tender) } },
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Tender, {
                    title: 'NewTender',
                    exclude: ['id'],
                }),
            },
        },
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], TenderController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)('/tenders/count'),
    (0, rest_1.response)(200, {
        description: 'Tender model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    (0, tslib_1.__param)(0, rest_1.param.where(models_1.Tender)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], TenderController.prototype, "count", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)('/tenders'),
    (0, rest_1.response)(200, {
        description: 'Array of Tender model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Tender, { includeRelations: true }),
                },
            },
        },
    }),
    (0, tslib_1.__param)(0, rest_1.param.filter(models_1.Tender)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], TenderController.prototype, "find", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)('/tenders'),
    (0, rest_1.response)(200, {
        description: 'Tender PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Tender, { partial: true }),
            },
        },
    })),
    (0, tslib_1.__param)(1, rest_1.param.where(models_1.Tender)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [models_1.Tender, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], TenderController.prototype, "updateAll", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)('/tenders/{id}'),
    (0, rest_1.response)(200, {
        description: 'Tender model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Tender, { includeRelations: true }),
            },
        },
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.string('id')),
    (0, tslib_1.__param)(1, rest_1.param.filter(models_1.Tender, { exclude: 'where' })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], TenderController.prototype, "findById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)('/tenders/{id}'),
    (0, rest_1.response)(204, {
        description: 'Tender PATCH success',
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.string('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Tender, { partial: true }),
            },
        },
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, models_1.Tender]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], TenderController.prototype, "updateById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)('/tenders/{id}'),
    (0, rest_1.response)(204, {
        description: 'Tender PUT success',
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.string('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, models_1.Tender]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], TenderController.prototype, "replaceById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.del)('/tenders/{id}'),
    (0, rest_1.response)(204, {
        description: 'Tender DELETE success',
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.string('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], TenderController.prototype, "deleteById", null);
TenderController = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, repository_1.repository)(repositories_1.TenderRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [repositories_1.TenderRepository])
], TenderController);
exports.TenderController = TenderController;
//# sourceMappingURL=tender.controller.js.map
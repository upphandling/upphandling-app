"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let OfferController = class OfferController {
    constructor(offerRepository) {
        this.offerRepository = offerRepository;
    }
    async create(offer) {
        return this.offerRepository.create(offer);
    }
    async count(where) {
        return this.offerRepository.count(where);
    }
    async find(filter) {
        return this.offerRepository.find(filter);
    }
    async updateAll(offer, where) {
        return this.offerRepository.updateAll(offer, where);
    }
    async findById(id, filter) {
        return this.offerRepository.findById(id, filter);
    }
    async updateById(id, offer) {
        await this.offerRepository.updateById(id, offer);
    }
    async replaceById(id, offer) {
        await this.offerRepository.replaceById(id, offer);
    }
    async deleteById(id) {
        await this.offerRepository.deleteById(id);
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.post)('/offers'),
    (0, rest_1.response)(200, {
        description: 'Offer model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Offer) } },
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Offer, {
                    title: 'NewOffer',
                    exclude: ['id'],
                }),
            },
        },
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], OfferController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)('/offers/count'),
    (0, rest_1.response)(200, {
        description: 'Offer model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    (0, tslib_1.__param)(0, rest_1.param.where(models_1.Offer)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], OfferController.prototype, "count", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)('/offers'),
    (0, rest_1.response)(200, {
        description: 'Array of Offer model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Offer, { includeRelations: true }),
                },
            },
        },
    }),
    (0, tslib_1.__param)(0, rest_1.param.filter(models_1.Offer)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], OfferController.prototype, "find", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)('/offers'),
    (0, rest_1.response)(200, {
        description: 'Offer PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Offer, { partial: true }),
            },
        },
    })),
    (0, tslib_1.__param)(1, rest_1.param.where(models_1.Offer)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [models_1.Offer, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], OfferController.prototype, "updateAll", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)('/offers/{id}'),
    (0, rest_1.response)(200, {
        description: 'Offer model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Offer, { includeRelations: true }),
            },
        },
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.string('id')),
    (0, tslib_1.__param)(1, rest_1.param.filter(models_1.Offer, { exclude: 'where' })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], OfferController.prototype, "findById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)('/offers/{id}'),
    (0, rest_1.response)(204, {
        description: 'Offer PATCH success',
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.string('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Offer, { partial: true }),
            },
        },
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, models_1.Offer]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], OfferController.prototype, "updateById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)('/offers/{id}'),
    (0, rest_1.response)(204, {
        description: 'Offer PUT success',
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.string('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, models_1.Offer]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], OfferController.prototype, "replaceById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.del)('/offers/{id}'),
    (0, rest_1.response)(204, {
        description: 'Offer DELETE success',
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.string('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], OfferController.prototype, "deleteById", null);
OfferController = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, repository_1.repository)(repositories_1.OfferRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [repositories_1.OfferRepository])
], OfferController);
exports.OfferController = OfferController;
//# sourceMappingURL=offer.controller.js.map
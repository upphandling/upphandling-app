"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Offer = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Offer = class Offer extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'string',
        id: true,
        generated: true,
    }),
    (0, tslib_1.__metadata)("design:type", String)
], Offer.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    (0, tslib_1.__metadata)("design:type", String)
], Offer.prototype, "tenderId", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'date',
    }),
    (0, tslib_1.__metadata)("design:type", String)
], Offer.prototype, "date", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    (0, tslib_1.__metadata)("design:type", String)
], Offer.prototype, "price", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    (0, tslib_1.__metadata)("design:type", String)
], Offer.prototype, "companyId", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    (0, tslib_1.__metadata)("design:type", String)
], Offer.prototype, "contactId", void 0);
Offer = (0, tslib_1.__decorate)([
    (0, repository_1.model)(),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], Offer);
exports.Offer = Offer;
//# sourceMappingURL=offer.model.js.map
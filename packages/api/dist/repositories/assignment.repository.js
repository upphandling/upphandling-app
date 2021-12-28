"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignmentRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let AssignmentRepository = class AssignmentRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource) {
        super(models_1.Assignment, dataSource);
    }
};
AssignmentRepository = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, core_1.inject)('datasources.db')),
    (0, tslib_1.__metadata)("design:paramtypes", [datasources_1.DbDataSource])
], AssignmentRepository);
exports.AssignmentRepository = AssignmentRepository;
//# sourceMappingURL=assignment.repository.js.map
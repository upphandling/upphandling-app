import { DefaultCrudRepository } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { Assignment, AssignmentRelations } from '../models';
export declare class AssignmentRepository extends DefaultCrudRepository<Assignment, typeof Assignment.prototype.id, AssignmentRelations> {
    constructor(dataSource: DbDataSource);
}

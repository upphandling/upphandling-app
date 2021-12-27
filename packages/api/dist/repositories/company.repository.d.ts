import { DefaultCrudRepository } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { Company, CompanyRelations } from '../models';
export declare class CompanyRepository extends DefaultCrudRepository<Company, typeof Company.prototype.id, CompanyRelations> {
    constructor(dataSource: DbDataSource);
}

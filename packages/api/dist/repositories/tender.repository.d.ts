import { DefaultCrudRepository } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { Tender, TenderRelations } from '../models';
export declare class TenderRepository extends DefaultCrudRepository<Tender, typeof Tender.prototype.id, TenderRelations> {
    constructor(dataSource: DbDataSource);
}

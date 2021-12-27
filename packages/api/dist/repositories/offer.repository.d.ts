import { DefaultCrudRepository } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { Offer, OfferRelations } from '../models';
export declare class OfferRepository extends DefaultCrudRepository<Offer, typeof Offer.prototype.id, OfferRelations> {
    constructor(dataSource: DbDataSource);
}

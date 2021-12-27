import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Offer } from '../models';
import { OfferRepository } from '../repositories';
export declare class OfferController {
    offerRepository: OfferRepository;
    constructor(offerRepository: OfferRepository);
    create(offer: Omit<Offer, 'id'>): Promise<Offer>;
    count(where?: Where<Offer>): Promise<Count>;
    find(filter?: Filter<Offer>): Promise<Offer[]>;
    updateAll(offer: Offer, where?: Where<Offer>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<Offer>): Promise<Offer>;
    updateById(id: string, offer: Offer): Promise<void>;
    replaceById(id: string, offer: Offer): Promise<void>;
    deleteById(id: string): Promise<void>;
}

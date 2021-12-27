import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Tender } from '../models';
import { TenderRepository } from '../repositories';
export declare class TenderController {
    tenderRepository: TenderRepository;
    constructor(tenderRepository: TenderRepository);
    create(tender: Omit<Tender, 'id'>): Promise<Tender>;
    count(where?: Where<Tender>): Promise<Count>;
    find(filter?: Filter<Tender>): Promise<Tender[]>;
    updateAll(tender: Tender, where?: Where<Tender>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<Tender>): Promise<Tender>;
    updateById(id: string, tender: Tender): Promise<void>;
    replaceById(id: string, tender: Tender): Promise<void>;
    deleteById(id: string): Promise<void>;
}

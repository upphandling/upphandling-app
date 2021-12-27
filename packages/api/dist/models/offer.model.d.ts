import { Entity } from '@loopback/repository';
export declare class Offer extends Entity {
    id?: string;
    tenderId: string;
    date?: string;
    price: string;
    companyId: string;
    contactId: string;
    constructor(data?: Partial<Offer>);
}
export interface OfferRelations {
}
export declare type OfferWithRelations = Offer & OfferRelations;

import { Entity } from '@loopback/repository';
export declare class Tender extends Entity {
    id?: string;
    startDate: string;
    endDate: string;
    constructor(data?: Partial<Tender>);
}
export interface TenderRelations {
}
export declare type TenderWithRelations = Tender & TenderRelations;

import { Entity } from '@loopback/repository';
export declare class Dis extends Entity {
    id?: string;
    title: string;
    startDate: string;
    organisation: string;
    description?: string;
    status?: string;
    repo?: string;
    stars?: number;
    tech?: string[];
    services?: string[];
    constructor(data?: Partial<Dis>);
}
export interface DisRelations {
}
export declare type DisWithRelations = Dis & DisRelations;

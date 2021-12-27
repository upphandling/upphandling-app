import { Entity } from '@loopback/repository';
export declare class Company extends Entity {
    name: string;
    id?: string;
    orgnr: string;
    contact?: object;
    constructor(data?: Partial<Company>);
}
export interface CompanyRelations {
}
export declare type CompanyWithRelations = Company & CompanyRelations;

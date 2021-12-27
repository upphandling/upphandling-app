import { Entity } from '@loopback/repository';
export declare class Person extends Entity {
    name: string;
    id?: string;
    constructor(data?: Partial<Person>);
}
export interface PersonRelations {
}
export declare type PersonWithRelations = Person & PersonRelations;

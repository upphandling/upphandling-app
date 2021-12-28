import { Entity } from '@loopback/repository';
export declare class Assignment extends Entity {
    id?: string;
    companyId: string;
    date: string;
    tenderId?: string;
    constructor(data?: Partial<Assignment>);
}
export interface AssignmentRelations {
}
export declare type AssignmentWithRelations = Assignment & AssignmentRelations;

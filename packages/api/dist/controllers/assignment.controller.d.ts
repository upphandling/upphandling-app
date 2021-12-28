import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Assignment } from '../models';
import { AssignmentRepository } from '../repositories';
export declare class AssignmentController {
    assignmentRepository: AssignmentRepository;
    constructor(assignmentRepository: AssignmentRepository);
    create(assignment: Omit<Assignment, 'id'>): Promise<Assignment>;
    count(where?: Where<Assignment>): Promise<Count>;
    find(filter?: Filter<Assignment>): Promise<Assignment[]>;
    updateAll(assignment: Assignment, where?: Where<Assignment>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<Assignment>): Promise<Assignment>;
    updateById(id: string, assignment: Assignment): Promise<void>;
    replaceById(id: string, assignment: Assignment): Promise<void>;
    deleteById(id: string): Promise<void>;
}

import { DefaultCrudRepository } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { Person, PersonRelations } from '../models';
export declare class PersonRepository extends DefaultCrudRepository<Person, typeof Person.prototype.id, PersonRelations> {
    constructor(dataSource: DbDataSource);
}

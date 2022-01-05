import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Dis, DisRelations} from '../models';

export class DisRepository extends DefaultCrudRepository<
  Dis,
  typeof Dis.prototype.id,
  DisRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Dis, dataSource);
  }
}

import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Participation, ParticipationRelations} from '../models';

export class ParticipationRepository extends DefaultCrudRepository<
  Participation,
  typeof Participation.prototype.id,
  ParticipationRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Participation, dataSource);
  }
}

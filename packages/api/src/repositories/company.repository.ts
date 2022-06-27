import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  repository,
  HasManyRepositoryFactory,
} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Company, CompanyRelations, Participation} from '../models';
import {ParticipationRepository} from './participation.repository';

export class CompanyRepository extends DefaultCrudRepository<
  Company,
  typeof Company.prototype.id,
  CompanyRelations
> {
  public readonly participations: HasManyRepositoryFactory<
    Participation,
    typeof Company.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('ParticipationRepository')
    protected participationRepositoryGetter: Getter<ParticipationRepository>,
  ) {
    super(Company, dataSource);
    this.participations = this.createHasManyRepositoryFactoryFor(
      'participations',
      participationRepositoryGetter,
    );
    this.registerInclusionResolver(
      'participations',
      this.participations.inclusionResolver,
    );
  }
}

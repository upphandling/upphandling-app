import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Dis, DisRelations, Company, Participation} from '../models';
import {ParticipationRepository} from './participation.repository';
import {CompanyRepository} from './company.repository';

export class DisRepository extends DefaultCrudRepository<
  Dis,
  typeof Dis.prototype.id,
  DisRelations
> {

  public readonly participatingCompanies: HasManyThroughRepositoryFactory<Company, typeof Company.prototype.id,
          Participation,
          typeof Dis.prototype.id
        >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ParticipationRepository') protected participationRepositoryGetter: Getter<ParticipationRepository>, @repository.getter('CompanyRepository') protected companyRepositoryGetter: Getter<CompanyRepository>,
  ) {
    super(Dis, dataSource);
    this.participatingCompanies = this.createHasManyThroughRepositoryFactoryFor('participatingCompanies', companyRepositoryGetter, participationRepositoryGetter,);
    this.registerInclusionResolver('participatingCompanies', this.participatingCompanies.inclusionResolver);
  }
}

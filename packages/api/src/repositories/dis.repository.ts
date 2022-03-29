import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  repository,
  HasManyThroughRepositoryFactory,
  HasManyRepositoryFactory,
} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Dis, DisRelations, Company, Participation, Tender} from '../models';
import {ParticipationRepository} from './participation.repository';
import {CompanyRepository} from './company.repository';
import {TenderRepository} from './tender.repository';

export class DisRepository extends DefaultCrudRepository<
  Dis,
  typeof Dis.prototype.id,
  DisRelations
> {
  public readonly participatingCompanies: HasManyThroughRepositoryFactory<
    Company,
    typeof Company.prototype.id,
    Participation,
    typeof Dis.prototype.id
  >;

  public readonly tenders: HasManyRepositoryFactory<
    Tender,
    typeof Dis.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('ParticipationRepository')
    protected participationRepositoryGetter: Getter<ParticipationRepository>,
    @repository.getter('CompanyRepository')
    protected companyRepositoryGetter: Getter<CompanyRepository>,
    @repository.getter('TenderRepository')
    protected tenderRepositoryGetter: Getter<TenderRepository>,
  ) {
    super(Dis, dataSource);
    this.tenders = this.createHasManyRepositoryFactoryFor(
      'tenders',
      tenderRepositoryGetter,
    );
    this.registerInclusionResolver('tenders', this.tenders.inclusionResolver);
    this.participatingCompanies = this.createHasManyThroughRepositoryFactoryFor(
      'participatingCompanies',
      companyRepositoryGetter,
      participationRepositoryGetter,
    );
    this.registerInclusionResolver(
      'participatingCompanies',
      this.participatingCompanies.inclusionResolver,
    );
  }
}

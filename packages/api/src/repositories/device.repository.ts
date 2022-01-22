import {inject} from '@loopback/core';
import {AnyObject, DataObject, DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Device, DeviceRelations} from '../models';

export class DeviceRepository extends DefaultCrudRepository<
  Device,
  typeof Device.prototype.deviceId,
  DeviceRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Device, dataSource);
  }
}

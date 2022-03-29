import {repository} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {FCM, AppAction} from '../lib/fcm';
import {Notification} from '../models';
import {DeviceRepository} from '../repositories';
import {NotificationRepository} from '../repositories';

export class DeviceNotificationController {
  constructor(
    @repository(DeviceRepository)
    public deviceRepository: DeviceRepository,
    @repository(NotificationRepository)
    public notificationRepository: NotificationRepository,
  ) {}

  @get('/devices/{id}/notifications')
  @response(200, {
    description: 'Array of Notification model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Notification, {partial: true}),
        },
      },
    },
  })
  async findDeviceNotifications(
    @param.path.string('id') id: string,
  ): Promise<Notification[]> {
    return this.notificationRepository.find({
      where: {deviceId: id},
      order: ['createdAt DESC'],
    });
  }

  @post('/devices/{deviceId}/notifications')
  @response(200, {
    description: 'Notification model instance',
    content: {
      'application/json': {schema: getModelSchemaRef(Notification)},
    },
  })
  async createDeviceNotification(
    @param.path.string('deviceId') deviceId: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notification, {
            title: 'NewNotification',
            exclude: ['id', 'createdAt'],
          }),
        },
      },
    })
    notification: Omit<Notification, 'id'>,
  ): Promise<Notification> {
    const device = await this.deviceRepository.findById(deviceId);
    if (device) {
      const unreadCount = await this.notificationRepository.count({
        deviceId: device.deviceId,
        read: false,
      });
      if (device.pushToken) {
        await FCM.sendMessage(
          device.pushToken,
          notification.title,
          notification.action ? notification.action : AppAction.Home.toString(),
          notification.description,
          notification.actionId,
        );
        await FCM.sendData(unreadCount.count + 1, device.pushToken);
      }
      return this.notificationRepository.create(notification);
    }
    throw Error('POST: Device or pushToken missing.');
  }

  @put('/devices/{deviceId}/notifications/{id}')
  @response(204, {
    description: 'Notification PUT success',
  })
  async updateById(
    @param.path.string('deviceId') deviceId: string,
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notification, {partial: true}),
        },
      },
    })
    notification: Notification,
  ): Promise<Notification> {
    const device = await this.deviceRepository.findById(deviceId);
    const _notif = await this.notificationRepository.findById(id);
    if (device && _notif && _notif.deviceId === deviceId) {
      await this.notificationRepository.updateById(id, notification);
      const unreadCount = await this.notificationRepository.count({
        read: false,
        deviceId: device.deviceId,
      });
      if (device.pushToken) {
        FCM.sendData(unreadCount.count, device.pushToken);
        return this.notificationRepository.findById(id);
      }
    }
    throw Error('PUT: Device or pushToken missing.');
  }

  @del('/devices/{deviceId}/notifications/{id}')
  @response(204, {
    description: 'Notification DELETE success',
  })
  async deleteById(
    @param.path.string('deviceId') deviceId: string,
    @param.path.string('id') id: string,
  ): Promise<void> {
    const device = await this.deviceRepository.findById(deviceId);
    const _notif = await this.notificationRepository.findById(id);
    if (device && _notif && _notif.deviceId === deviceId) {
      this.notificationRepository.deleteById(id);
      const unreadCount = await this.notificationRepository.count({
        deviceId: device.deviceId,
        read: false,
      });
      if (device.pushToken) {
        FCM.sendData(unreadCount.count, device.pushToken);
        return;
      }
    }
    throw Error('DELETE: Device or pushToken missing.');
  }
}

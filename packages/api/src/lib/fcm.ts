import * as admin from 'firebase-admin';
import {AndroidConfig} from 'firebase-admin/lib/messaging/messaging-api';

var serviceAccount = require('./../../src/upphandling-pushes-firebase-adminsdk-70bmw-19f37db92b.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const androidConfig: AndroidConfig = {
  priority: 'high',
};

export enum AppAction {
  Home = 'Home',
  CreateDIS = 'CreateDIS',
  OpenDIS = 'OpenDIS',
  ApplyDIS = 'ApplyDIS',
  CreateTender = 'CreateTender',
  FindDIS = 'FindDIS',
  Notifications = 'Notifications',
}

export class FCM {
  public static async sendData(unreadCount: number, to: string) {
    const message = {
      data: {},
      apns: {
        headers: {
          'apns-priority': '5',
        },
        payload: {
          aps: {
            badge: unreadCount,
          },
        },
      },
      android: androidConfig,
      token: to,
    };
    return admin.messaging().send(message);
  }

  public static async sendMessage(
    to: string,
    title: string,
    action: string,
    description?: string,
    actionId?: string,
  ) {
    const message = {
      notification: {
        title,
        body: description,
      },
      data: {
        // What screen to open in app
        action: action.toString(),
        actionId: actionId ? actionId : '',
      },
      apns: {
        headers: {
          'apns-priority': '5',
        },
      },
      android: androidConfig,
      token: to,
    };
    return admin.messaging().send(message);
  }
}

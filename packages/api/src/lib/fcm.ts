import * as admin from 'firebase-admin';

import {AndroidConfig} from 'firebase-admin/lib/messaging/messaging-api';

import {serviceAccount} from './service-account'

try {
  admin.initializeApp(serviceAccount as admin.ServiceAccount);
} catch (e) {
  console.error(`Firebase Config is not correctly set.
  Make sure the following ENV variables are set:
  - FCM_PROJECT_ID
  - FCM_PRIVATE_KEY_ID
  - FCM_PRIVATE_KEY
  - FCM_CLIENT_EMAIL
  - FCM_CLIENT_ID
  - FCM_CLIENT_C509_CERT_URL
  ---
  Error: ${e}`);
  process.exit(1);
}


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

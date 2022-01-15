var admin = require('firebase-admin')

var serviceAccount = require('../../../../../uhsecrets/upphandling-pushes-firebase-adminsdk-gkkpr-87cb83a7af.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

export class FCM {
  public static async sendTestMessage(to: string) {
    const message = {
      notification: {
        title: 'Test',
        body: 'Test',
      },
      token: to,
    }
    return admin.messaging().send(message)
  }
}

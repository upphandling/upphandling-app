import { assert } from "console"

const FCM_PROJECT_ID = process.env.FCM_PROJECT_ID
const FCM_PRIVATE_KEY_ID = process.env.FCM_PRIVATE_KEY_ID
const FCM_PRIVATE_KEY = process.env.FCM_PRIVATE_KEY
const FCM_CLIENT_EMAIL = process.env.FCM_CLIENT_EMAIL
const FCM_CLIENT_ID = process.env.FCM_CLIENT_ID
const FCM_CLIENT_C509_CERT_URL = process.env.FCM_CLIENT_C509_CERT_URL

assert(FCM_PROJECT_ID, "FCM_PROJECT_ID is not set")
assert(FCM_PRIVATE_KEY_ID, "FCM_PRIVATE_KEY_ID is not set")
assert(FCM_PRIVATE_KEY, "FCM_PRIVATE_KEY is not set")
assert(FCM_CLIENT_EMAIL, "FCM_CLIENT_EMAIL is not set")
assert(FCM_CLIENT_ID, "FCM_CLIENT_ID is not set")
assert(FCM_CLIENT_C509_CERT_URL, "FCM_CLIENT_C509_CERT_URL is not set")


export const serviceAccount = {
  "type": "service_account",
  "project_id": FCM_PROJECT_ID,
  "private_key_id": FCM_PRIVATE_KEY_ID,
  "private_key": FCM_PRIVATE_KEY,
  "client_email": FCM_CLIENT_EMAIL,
  "client_id": FCM_CLIENT_ID,
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": FCM_CLIENT_C509_CERT_URL
}
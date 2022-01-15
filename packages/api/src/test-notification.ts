import { FCM } from "./lib/fcm"

// APNS token
// const token = "3E7B4E8AB5A2AE3783EE4FDCD4DE1B1F3841E6B1AA8B652A5D76DC4E23826D9D"

// FCM token iOS
// const token = "ec8jWr5nZEDBvKx_ADJWtg:APA91bHLnXUKShmgJRWbZkYzwkXqVkMOJe4AiPHoOMjbtTXSxSESeZuW_0SsXzFr1hHdXEdTtQF2vHCLNuekUSypro4oU_DS2PAUOIXHA-pO6eqbg57wJeSfhnMdhJQuwISG4PRYexky"
// FCM token android
const token = "drJi2j4bSxOdDjkuyNRrza:APA91bHC1LR-HAS-BVoaoXxWhQ6gKFxToqtoeqb-p9nHG8Vdhx8jOcZZjlLKV-RotJxxAx6CZKI8CBzExbsWZWpb8W-L5_aDAVgbasPAVNuNx_a6F2bFkagiowK-6SLS6PyipPaTvDIG"

FCM.sendTestMessage(token)
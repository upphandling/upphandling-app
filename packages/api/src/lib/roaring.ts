import fetch from 'cross-fetch'
import moment from 'moment'

export class Roaring {
  private static token : {access_token: string, expires_in: number}
  public static async getToken(): Promise<{access_token:string}> {
    if (Roaring.token !== null) return Roaring.token
    const key = process.env.ROARING_KEY || 'e3YCCMVKvA0Pu5lAsmd02hk2xloa' // sandbox
    const secret = process.env.ROARING_SECRET || '0Ly8E04vUWzn534aCNXSKhaMhewa' // sandbox
    const base64 = Buffer.from(`${key}:${secret}`).toString('base64')
    const token = await fetch('https://api.roaring.io/token', {
      method: 'POST',
      body: 'grant_type=client_credentials',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${base64}`
      }
    })
    .then(res => res.json())
    Roaring.token = token

    // remove token automatically after expiry date
    setTimeout(() => Roaring.token = null!, (token.expires_in ?? 3600) * 1000 )
    return token
  }

  public static async lookupCompany(orgnr: string) {
    const roaringToken = await Roaring.getToken()
    const info = await fetch(
      `https://api.roaring.io/se/company/overview/2.0/history/${orgnr}?fromDate=${moment().add(-1, 'year').startOf('year').format('YYYY-MM-DD')}&toDate=${moment().format('YYYY-MM-DD')}`,
      {
        
        headers: {
          'Authorization': `Bearer ${roaringToken.access_token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      }}
    ).then((res: any) => res.json()) as any

    const latestCompanyRecord = info.records ? info.records[0] : null
    console.log('roaring response', latestCompanyRecord)

    return latestCompanyRecord
  }

}

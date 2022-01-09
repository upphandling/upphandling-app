import fetch from 'cross-fetch'

export class Roaring {
  private static token : {access_token: string}
  public static async getToken(): Promise<{access_token:string}> {
    const key = process.env.ROARING_KEY || 'e3YCCMVKvA0Pu5lAsmd02hk2xloa' // sandbox
    const secret = process.env.ROARING_SECRET || '0Ly8E04vUWzn534aCNXSKhaMhewa' // sandbox
    const base64 = Buffer.from(`${key}:${secret}`).toString('base64')
    const token = Roaring.token || await fetch('https://api.roaring.io/token', {
      method: 'POST',
      body: 'grant_type=client_credentials',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${base64}`
      }
    }).then(res => res.json())
    Roaring.token = token
    return token
  }

  public static async lookupCompany(orgnr: string) {
    const roaringToken = await Roaring.getToken()
    const info = await fetch(
      `https://api.roaring.io/se/company/overview/2.0/history/${orgnr}?fromDate=2016-12-11&toDate=2018-02-21`,
      {
        
        headers: {
          'Authorization': `Bearer ${roaringToken.access_token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      }}
    ).then((res: any) => {
      console.dir(res)
      console.log(res.ok)
      console.log(res.status)
      return res.json()
    }) as any


    const latestCompanyRecord = info.records ? info.records[0] : null
    console.log('roaring response', latestCompanyRecord)

    return latestCompanyRecord
  }

}

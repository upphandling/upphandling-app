import { NativeDateService } from "@ui-kitten/components"

const i18n = {
  dayNames: {
    short: ['sö', 'må', 'ti', 'on', 'to', 'fre', 'lö'],
    long: [
      'söndag',
      'måndag',
      'tisdag',
      'onsdag',
      'torsdag',
      'fredag',
      'lördag',
    ],
  },
  monthNames: {
    short: [
      'jan',
      'feb',
      'mar',
      'apr',
      'maj',
      'jun',
      'jul',
      'aug',
      'sep',
      'okt',
      'nov',
      'dec',
    ],
    long: [
      'januari',
      'februari',
      'mars',
      'april',
      'maj',
      'juni',
      'juli',
      'augusti',
      'september',
      'oktokber',
      'november',
      'december',
    ],
  },
}
export const dateService = new NativeDateService('se', {
  format: 'YYYY-MM-DD',
  startDayOfWeek: 1,
  i18n,
})
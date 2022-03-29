import { ImageOverlay } from '../components/ImageOverlay'
import React from 'react'
import serviceIcons from '../data/services.json'
import { ScrollView, View } from 'react-native'
import moment from 'moment'
import 'moment/locale/sv'
moment.locale('sv')

import { Button, Card, Icon, StyleService, Text } from '@ui-kitten/components'

const tagIcon = (style, icon) => <Icon {...style} name={icon} />

const tag = (service, index) => (
  <Button
    key={index}
    style={styles.optionItem}
    appearance="ghost"
    size="small"
    accessoryLeft={(style) => tagIcon(style, serviceIcons[service] ?? 'hash')}
  >
    {service}
  </Button>
)

const footer = (services, technologies) => (
  <View style={styles.footer}>
    <View style={styles.optionList}>{services?.map(tag)}</View>
    <ScrollView style={styles.detailsList} horizontal={true}>
      {technologies?.map(renderDetailItem)}
    </ScrollView>
  </View>
)

export const Hero = ({
  image,
  title,
  organisation,
  status,
  startDate,
  services,
  technologies,
  onPress,
}) => {
  return (
    <>
      <ImageOverlay
        style={styles.image}
        source={image || require('../assets/notebook-dynamic-gradient.png')}
      />
      <Card
        style={styles.bookingCard}
        appearance="filled"
        disabled={true}
        footer={() => footer(services, technologies)}
      >
        <Text style={styles.title} category="h2">
          {title}
        </Text>
        <Text style={styles.dateLabel} category="h6">
          {organisation}
        </Text>
        <Text style={styles.label} category="p2">
          {status}
        </Text>
        {startDate && (
          <Text style={styles.dateLabel} category="p2">
            {moment(startDate).format('YYYY-MM-DD')} (
            {moment().to(moment(startDate))})
          </Text>
        )}
        {onPress && (
          <Button style={styles.ctaButton} onPress={onPress}>
            Ansök
          </Button>
        )}
      </Card>
    </>
  )
}

const styles = StyleService.create({
  image: {
    marginTop: -130,
    height: 260,
  },
  bookingCard: {
    marginTop: -80,
    margin: 16,
    borderRadius: 20,
  },
  title: {
    width: '80%',
  },
  dateLabel: {
    marginTop: 8,
  },
  footerLabel: {
    marginBottom: 16,
    color: '#333',
  },
  label: {
    marginTop: 8,
  },
  ctaButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
  detailsList: {
    flexDirection: 'row',
    marginHorizontal: -4,
    marginVertical: 8,
  },
  detailItem: {
    marginHorizontal: 4,
    borderRadius: 16,
  },
  optionList: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  optionItem: {
    marginHorizontal: 4,
    paddingHorizontal: 0,
  },
})

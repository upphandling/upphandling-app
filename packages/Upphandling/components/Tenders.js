import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import {
  Button,
  StyleService,
  Text,
} from '@ui-kitten/components'
import { useTenders } from '../hooks/useTenders'
import { ImageOverlay } from './ImageOverlay'
import moment from 'moment'
import { Tag } from './Tag'

const Tender = ({ tender, onPress }) => {
  const {
    id,
    description,
    issues,
    geography,
    services,
    technologies,
    evaluationCriteria,
    startDate,
  } = tender

  return (
    <ImageOverlay
      onPress={onPress}
      style={styles.tender}
      imageBackgroundProps={styles.image}
      source={require('../assets/background.png')}
    >
      <View style={styles.tenderHeader}>
        <Text category={'h6'}>{description}</Text>
        <Text category={'c1'}>
          {moment(startDate).calendar()}
        </Text>
      </View>
      <View style={styles.tenderBody}>
        <Text category={'c1'}>{geography}</Text>
        {services.map(s => <Tag key={s}>{s}</Tag>)}
        {technologies.map(s => <Tag key={s}>{s}</Tag>)}
        <Tag>
          {evaluationCriteria === 1 ? 'Pris' : 'Erfarenhet'}
        </Tag>
      </View>
    </ImageOverlay>
  )
}

export const Tenders = ({ navigation, disId }) => {
  const { data: tenders, isLoading } = useTenders(disId)
  if (isLoading) return <Text>Laddar...</Text>

  const goToTender = (tender) => {
    navigation.navigate('OpenTender', { tenderId: tender.id })
  }

  return (
    <ScrollView style={styles.tenders} horizontal={true}>
      {tenders.map((tender) => (
        <Tender key={tender.id} tender={tender} onPress={() => goToTender(tender)} />
      ))}
    </ScrollView>
  )
}

const styles = StyleService.create({
  image: {
    borderRadius: 20,
    width: '200%',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  contentContainer: {
    paddingTop: 30,
  },
  title: {
    marginBottom: 20,
  },
  tenders: {
    flexDirection: 'column',
  },
  tender: {
    width: '60%',
    padding: 8,
    margin: 5,
    justifyContent: 'space-between',
  },
  tenderHeader: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tenderBody: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    width: 20,
    height: 20,
  },
})

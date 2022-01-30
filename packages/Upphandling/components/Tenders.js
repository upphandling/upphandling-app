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
import evaluationCriterias from '../data/evaluationCriterias'
import { TouchableOpacity } from 'react-native-gesture-handler'

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
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.tender}
    >
      <View style={styles.tenderHeader}>
        <Text category={'h6'}>{description}</Text>
        <Text category={'c1'}>
          {moment(startDate).calendar()}
        </Text>
      </View>
      <View style={styles.tenderBody}>
        <Text category={'c1'}>{geography}</Text>
      </View>
      <ScrollView horizontal={true}>
        {services.map(s => <Tag key={s}>{s}</Tag>)}
        {technologies.map(s => <Tag key={s}>{s}</Tag>)}
        <Tag style={styles.tag}>
          {evaluationCriterias[evaluationCriteria]}
        </Tag>
      </ScrollView>
    </TouchableOpacity>
  )
}

export const Tenders = ({ navigation, tenders }) => {

  if (!tenders) return <Text>Laddar...</Text>

  const goToTender = (tender) => {
    navigation.navigate('OpenTender', { tenderId: tender.id })
  }

  return (
    <ScrollView style={styles.tenders} horizontal={true}>
      {tenders?.map((tender) => (
        <Tender key={tender.id} tender={tender} onPress={() => goToTender(tender)} />
      ))}
    </ScrollView>
  )
}

const styles = StyleService.create({
  image: {
    borderRadius: 20,
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
  // TODO: fix so it's not taking the whole screen
  tenders: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  tender: {
    flex: 1,
    width: 300,
    backgroundColor: 'rgba(53,34,171,0.4)',
    borderRadius: 16,
    height: '100%',
    padding: 16,
    margin: 5,
  },
  tenderHeader: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tenderBody: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    width: 20,
    height: 20,
  },
  tag: {
    marginRight: 4
  }
})

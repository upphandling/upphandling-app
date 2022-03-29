import React from 'react'
import { KeyboardAvoidingView, ScrollView, View } from 'react-native'

import {
  Button,
  Divider,
  Icon,
  ListItem,
  StyleService,
  Text,
} from '@ui-kitten/components'
import { useDis } from '../hooks/useDis'
import moment from 'moment'
import { useTender } from '../hooks/useTenders'
import { Tag } from '../components/Tag'
import { Field } from '../components/Field'
import { translate } from '../lib/translate'
import { Loading } from '../screens/Loading'

const issue = ({ title, number, body }) => (
  <ListItem
    key={number}
    style={styles.issue}
    accessoryLeft={() => <Icon name="flag-outline" style={styles.icon} />}
    title={`#${number} ${title}`}
    description={`${body}`}
  />
)

export const OpenTender = ({ navigation, route }) => {
  const { tenderId } = route.params
  const { data, isLoading } = useTender(tenderId)
  const { data: dis } = useDis(data?.disId)
  const createOffer = () => navigation.navigate('CreateOffer', { tenderId })

  if (isLoading) return <Loading />

  const {
    description,
    issues,
    services,
    technologies,
    geography,
    startDate,
    evaluationCriteria,
  } = data

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text category="h2" style={styles.title}>
          {description}
        </Text>
        <Text style={styles.info}>{dis?.organisation}</Text>
        <Divider />

        <Field label={translate('OpenTender.service_criterias_label')}>
          {services.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </Field>

        <Field label={translate('OpenTender.technology_criterias_label')}>
          {technologies.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </Field>
        <Field
          label={translate('OpenTender.geography_criteria_label')}
          value={geography}
        />
        <Field
          label={translate('OpenTender.evaluation_criterias_label')}
          value={evaluationCriteria}
        />
        <Field
          label={translate('OpenTender.start_date')}
          value={moment(startDate).format('YYYY-MM-DD')}
        />
        <Divider />
        <Field label={translate('OpenTender.issues')} />
        <View style={styles.issues}>{issues.map((item) => issue(item))}</View>

        <View style={styles.footer}>
          <Button onPress={createOffer} size="giant" style={styles.addButton}>
            {translate('OpenTender.submit_offer')}
          </Button>
          <Text category="s2" style={styles.info}>
            {translate('OpenTender.offer_submittal_info')}
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleService.create({
  title: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
  icon: {
    width: 18,
    height: 18,
    tintColor: '#aaa',
  },
  issues: {
    marginVertical: 4,
  },

  issue: {
    maxHeight: 80,
  },
  container: {
    backgroundColor: '$background-basic-color-2',
  },
  addButton: {
    marginHorizontal: 16,
    marginTop: 24,
  },
  info: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
})

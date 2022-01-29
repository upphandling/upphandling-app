import React, { useMemo, useState } from 'react'
import {
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  View,
} from 'react-native'

import {
  Avatar,
  Button,
  Card,
  CheckBox,
  Datepicker,
  Divider,
  Icon,
  Input,
  Layout,
  List,
  ListItem,
  Radio,
  RadioGroup,
  StyleService,
  Text,
  Toggle,
} from '@ui-kitten/components'
import { useDis } from '../hooks/useDis'
import { TechnologyPicker } from '../components/TechnologyPicker'
import { ServicePicker } from '../components/ServicePicker'
import moment from 'moment'
import { useTender } from '../hooks/useTenders'
import { Tag } from '../components/Tag'
import { Field } from '../components/Field'
const CalendarIcon = (props) => <Icon {...props} name="calendar" />

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

  if (isLoading) return <Text>Laddar...</Text>

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
        <Text category='h2' style={styles.title}>{description}</Text>
        <Divider />
        <Text>{dis.organisation }</Text>

        <Field label="Krav på erbjudna tjänster">
          {services.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </Field>

        <Field label="Tekniska krav">
          {technologies.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </Field>
        <Field label="Geografiskt område" value={geography} />
        <Field label="Utvärderingskriterier" value={evaluationCriteria} />
        <Field
          label="Startdatum"
          value={moment(startDate).format('YYYY-MM-DD')}
        />
        <Divider />
        <Field label='Krav / Uppgifter' />
        <View style={styles.issues}>{issues.map((item) => issue(item))}</View>

        <View style={styles.footer}>
          <Button onPress={createOffer} size="giant" style={styles.addButton}>
            Lämna anbud
          </Button>
          <Text category="s2" style={styles.info}>
            För att lämna anbud måste du vara godkänt företag i denna DIS.
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
    borderColor: '#561266',
    maxHeight: 80,
  },
  container: {
    backgroundColor: '$background-basic-color-2',
  },
  input: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderColor: '#561266',
  },
  addButton: {
    marginHorizontal: 16,
    marginTop: 24,
  },
  info: {
    color: '#999',
    marginHorizontal: 16,
    marginVertical: 16,
  },
})

import React, { useMemo, useState } from 'react'
import {
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  View,
} from 'react-native'
import { Slider } from '@miblanchard/react-native-slider'

import {
  Button,
  CheckBox,
  Datepicker,
  Divider,
  Icon,
  Input,
  ListItem,
  StyleService,
  Tab,
  TabBar,
  Text,
  Toggle,
} from '@ui-kitten/components'
import { useDis } from '../hooks/useDis'
import { useMutation, useQueryClient } from 'react-query'
import { createTender } from '../api/tenders'
import { TechnologyPicker } from '../components/TechnologyPicker'
import { ServicePicker } from '../components/ServicePicker'
import moment from 'moment'
import { dateService } from '../lib/dateService'
import initialCriterias from '../data/evaluationCriterias'
import { Hero } from '../components/Hero'

const Issue = ({ item: { title, number, body } }) => (
  <ListItem
    key={number}
    accessoryLeft={() => <Icon name="flag-outline" style={styles.icon} />}
    title={`#${number} ${title}`}
    description={`${body}`}
  />
)

const CalendarIcon = (props) => <Icon {...props} name="calendar" />

const spread = (array) =>
  array.reduce((acc, item) => ({ ...acc, [item]: 1 / array.length }), {})

export const CreateTender = ({ navigation, route }) => {
  const { id, issues } = route.params
  const { data: dis, isLoading } = useDis(id)
  const [agree, setAgree] = useState(false)
  const [description, setDescription] = useState()
  const [title, setTitle] = useState()
  const [geography, setGeography] = useState(dis.technologies)
  const [services, setServices] = useState(dis.services)
  const [technologies, setTechnologies] = useState({})
  const [evaluationCriteria, setEvaluationCriteria] = useState('')
  const [evaluationCriterias, setEvaluationCriterias] = useState(
    spread(initialCriterias)
  )
  const [startDate, setStartDate] = useState(
    moment().add(6, 'days').endOf('day').subtract(1, 'minute').toDate()
  )

  const [selectedIndex, setSelectedIndex] = useState(0)

  if (isLoading) return <Text>Loading...</Text>

  const sumCriterias = (criterias) =>
    Object.values(criterias).reduce((sum, criteria) => sum + criteria, 0)

  const saveAndBalanceCriterias = (evaluationCriterias, criteria, value) => {
    const newEvaluationCriterias = { ...evaluationCriterias, [criteria]: value }
    const s = sumCriterias(newEvaluationCriterias)
    const c = value
    const a = (1 - c) / (s - c)

    if (s - c === 0) return setEvaluationCriterias(newEvaluationCriterias)

    const adjustedCriterias = Object.entries(evaluationCriterias).reduce(
      (result, [key, value]) => ({
        ...result,
        [key]: key === criteria ? c : Math.max(0, value * a),
      }),
      {}
    )
    setEvaluationCriterias(adjustedCriterias)
  }

  const createTenderMutation = useMutation(createTender)
  const queryClient = useQueryClient()

  const create = async () => {
    const tender = await createTenderMutation.mutateAsync(
      {
        disId: id,
        issues,
        description,
        geography,
        services: Object.keys(services),
        technologies: Object.entries(technologies).map(
          ([key, value]) => `${key} (>${value} år)`
        ),
        evaluationCriteria: evaluationCriterias[evaluationCriteria],
        startDate,
      },
      {
        onSuccess: (data) => {
          queryClient.setQueryData(['tender', data.id], data)
        },
      }
    )
    navigation.navigate('OpenTender', { tenderId: tender.id })
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView style={styles.body}>
        <Hero
          title={title || 'Ny upphandling'}
          organisation={dis.organisation}
          image={require('../assets/toggle-dynamic-gradient.png')}
        />

        <TabBar
          style={styles.tabBar}
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}
        >
          <Tab title="Beskrivning" />
          <Tab title="Krav" />
          <Tab title="Utvärdering" />
          <Tab title="Skicka" />
        </TabBar>
        {selectedIndex === 0 && (
          <>
            <Input
              placeholder="Namn på upphandling"
              style={styles.input}
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
            <Input
              multiline={true}
              style={styles.input}
              textStyle={{ minHeight: 264 }}
              maxLength={500}
              placeholder="Beskriv uppdraget i klartext, max 500 tecken."
              value={description}
              onChangeText={setDescription}
            />
            <Divider />

            <View style={styles.issues}>
              {issues.map((item, i) => (
                <Issue item={item} key={i} />
              ))}
            </View>
          </>
        )}

        {selectedIndex === 1 && (
          <>
            <ServicePicker
              style={styles.input}
              placeholder="Krav på erbjudna tjänster"
              onChange={setServices}
              services={services}
            />
            <TechnologyPicker
              style={styles.input}
              placeholder="Krav på erbjudna kompetenser"
              onChange={setTechnologies}
              technologies={technologies}
            />
            <Input
              style={styles.input}
              placeholder="Geografiska krav"
              value={geography}
              onChangeText={setGeography}
            />
            <Datepicker
              label="Startdatum"
              placeholder="Välj slutdatum"
              style={styles.input}
              dateService={dateService}
              date={startDate}
              onSelect={setStartDate}
              accessoryRight={CalendarIcon}
            />

            <Datepicker
              label="Ansök senast"
              placeholder="Välj slutdatum"
              style={styles.input}
              dateService={dateService}
              date={startDate}
              onSelect={(nextDate) => setStartDate(nextDate)}
              accessoryRight={CalendarIcon}
            />
          </>
        )}

        {selectedIndex === 2 && (
          <>
            <View style={styles.input}>
              {Object.keys(evaluationCriterias).map((criteria, i) => (
                <View key={i}>
                  <Text key={i}>
                    {criteria} {Math.round(evaluationCriterias[criteria] * 100)}
                    %
                  </Text>
                  <Slider
                    onValueChange={(value) =>
                      saveAndBalanceCriterias(
                        evaluationCriterias,
                        criteria,
                        value[0]
                      )
                    }
                    value={evaluationCriterias[criteria]}
                  ></Slider>
                </View>
              ))}
            </View>
            <Text style={styles.label}>
              Välj hur många kriterier du vill använda för utvärdering.
            </Text>
          </>
        )}
        <Divider />
        {selectedIndex === 3 && (
          <>
            <View style={styles.footer}>
              <CheckBox
                checked={agree}
                style={styles.input}
                onChange={(checked) => setAgree(checked)}
              >
                <Text>Jag har mandat att genomföra denna upphandling</Text>
              </CheckBox>
              <Button
                onPress={create}
                size="giant"
                disabled={!agree}
                style={styles.addButton}
              >
                {createTenderMutation.isLoading
                  ? 'Skapar upphandling...'
                  : 'Skapa upphandling'}
              </Button>
              <Text category="s2" style={styles.info}>
                När du har skapat din upphandling kommer anslutna leverantörer
                få en notifiering och kan börja lämna anbud
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleService.create({
  icon: {
    width: 18,
    height: 18,
    tintColor: '#aaa',
  },
  body: {
    marginTop: 10,
  },
  issues: {
    marginVertical: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  select: {
    width: 150,
  },
  container: {
    backgroundColor: '$background-basic-color-2',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  input: {
    marginHorizontal: 16,
    marginVertical: 8,
    flex: 5,
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
  footer: {
    bottom: 0,
  },
})

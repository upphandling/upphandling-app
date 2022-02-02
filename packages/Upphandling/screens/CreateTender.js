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
  Select,
  SelectItem,
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
import { getCompanyFromId } from '../api/companies'
import { ImageOverlay } from '../components/ImageOverlay'

const Issue = ({ item: { title, number, body } }) => (
  <ListItem
    key={number}
    style={styles.issue}
    accessoryLeft={() => <Icon name="flag-outline" style={styles.icon} />}
    title={`#${number} ${title}`}
    description={`${body}`}
  />
)

const renderBookingFooter = (services, technologies) => (
  <View style={styles.footer}>
    <View style={styles.optionList}>
      {services?.map(renderOptionItem)}
    </View>
    <ScrollView style={styles.detailsList} horizontal={true}>
      {technologies?.map(renderDetailItem)}
    </ScrollView>
  </View>
)

const CalendarIcon = (props) => <Icon {...props} name="calendar" />

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
  const [evaluationCriterias, setEvaluationCriterias] =
    useState(initialCriterias)
  const [startDate, setStartDate] = useState(
    moment().add(6, 'days').endOf('day').subtract(1, 'minute').toDate()
  )

  const [selectedIndex, setSelectedIndex] = useState(0)

  if (isLoading) return <Text>Loading...</Text>

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
       <ImageOverlay
          style={styles.image}
          source={require('../assets/notebook-dynamic-gradient.png')}
        />
        <Card
          style={styles.bookingCard}
          appearance="filled"
          disabled={true}
          footer={renderBookingFooter}
        >
          <Text style={styles.title} category="h2">
            {dis.title}
          </Text>
          <Text style={styles.dateLabel} category="h6">
            {dis.organisation}
          </Text>
          <Text style={styles.priceLabel} category="p2">
            {dis.status ?? 'Startar'}
          </Text>
          <Text style={styles.dateLabel} category="p2">
            {moment(dis.startDate).format('YYYY-MM-DD')} (
            {moment().to(moment(dis.startDate))})
          </Text>
        </Card>
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
      <ScrollView style={styles.body}>
        {selectedIndex === 0 && (
          <>
            <Input
              label="Namn på upphandling"
              placeholder="Namn på upphandling"
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
            <Text category={'h6'}>Utvärderingskriterier</Text>
            <RadioGroup
              style={styles.input}
              selectedIndex={evaluationCriteria}
              onChange={(index) => setEvaluationCriteria(index)}
            >
              {initialCriterias.map((criteria, i) => (
                <Radio key={i}>{criteria}</Radio>
              ))}
            </RadioGroup>
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

  issue: {
    borderColor: '#561266',
  },
  container: {
    backgroundColor: '$background-basic-color-2',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  input: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderColor: '#561266',
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

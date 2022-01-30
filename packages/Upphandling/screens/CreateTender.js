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
  Text,
  Toggle,
} from '@ui-kitten/components'
import { useDis } from '../hooks/useDis'
import { useMutation } from 'react-query'
import { createTender } from '../api/tenders'
import { TechnologyPicker } from '../components/TechnologyPicker'
import { ServicePicker } from '../components/ServicePicker'
import moment from 'moment'
import { dateService } from '../lib/dateService'
import evaluationCriterias from '../data/evaluationCriterias'
import { getCompanyFromId } from '../api/companies'

const Issue = ({item: { title, number, body }}) => (
  <ListItem
    key={number}
    style={styles.issue}
    accessoryLeft={() => <Icon name='flag-outline' style={styles.icon}/>}
    title={`#${number} ${title}`}
    description={`${body}`}
  />
)

const CalendarIcon = (props) => <Icon {...props} name="calendar" />

export const CreateTender = ({ navigation, route }) => {
  const { id, issues } = route.params
  const { data: dis, isLoading } = useDis(id)
  const [agree, setAgree] = useState(false)
  const [valid, setValid] = useState(false)
  const [description, setDescription] = useState()
  const [geography, setGeography] = useState(dis.technologies)
  const [services, setServices] = useState(dis.services)
  const [technologies, setTechnologies] = useState({})
  const [evaluationCriteria, setEvaluationCriteria] = useState('')
  const [startDate, setStartDate] = useState(moment().add(6,'days').endOf('day').subtract(1, 'minute').toDate())

  if (isLoading) return <Text>Loading...</Text>

  const createTenderMutation = useMutation(createTender)

  const create = async () => {
    const tender = await createTenderMutation.mutateAsync({ 
      disId: id,
      issues,
      description,
      geography,
      services: Object.keys(services),
      technologies: Object.keys(technologies),
      evaluationCriteria: evaluationCriterias[evaluationCriteria],
      startDate,
    })
    navigation.navigate('OpenDIS', { id })
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView
        style={styles.container}
      >
        <Text category={'h6'}>Beskrivning</Text>
        <Input
          multiline={true}
          style={styles.input}
          textStyle={{ minHeight: 64 }}
          maxLength={500}
          placeholder="Beskriv uppdraget i klartext, max 500 tecken."
          value={description}
          onChangeText={setDescription}
        />
        <Text category={'h6'}>Inkluderade uppgifter</Text>
        <View style={styles.issues}>
          {issues.map((item, i) => <Issue item={item} key={i} />)}
        </View>
        <Text category={'h6'}>Allmänna krav</Text>

        <ServicePicker style={styles.input} placeholder="Krav på erbjudna tjänster" onChange={setServices} services={services} />
        <TechnologyPicker
          style={styles.input}
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
        <Text category={'h6'}>Utvärderingskriterier</Text>
        <RadioGroup
          style={styles.input}
          selectedIndex={evaluationCriteria}
          onChange={index => setEvaluationCriteria(index)}>
            {evaluationCriterias.map((criteria, i) => (
              <View key={i} style={styles.row}>
                <Radio >{criteria}</Radio>
                <Select style={styles.select}>
                  <SelectItem title='Mycket viktigt'/>
                  <SelectItem title='Viktigt'/>
                  <SelectItem title='Oviktigt'/>
                </Select>
              </View>
            ))}
        </RadioGroup>

        <Datepicker
          label="Ansök senast"
          placeholder="Välj slutdatum"
          style={styles.input}
          dateService={dateService}
          date={startDate}
          onSelect={(nextDate) => setStartDate(nextDate)}
          accessoryRight={CalendarIcon}
        />
        <Divider />
        <View style={styles.footer}>
          <CheckBox
            checked={agree}
            style={styles.input}
            onChange={(checked) => setAgree(checked)}
          >
            <Text>Jag accepterar villkoren för upphandlingen</Text>
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
            När du har skapat din upphandling kommer anslutna leverantörer få en
            notifiering och kan börja lämna anbud
          </Text>
        </View>
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
    maxHeight: 80,
  },
  container: {
    backgroundColor: '$background-basic-color-2',
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
})

import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, ScrollView, View } from 'react-native'
import moment from 'moment'

import {
  Avatar,
  Button,
  Datepicker,
  Divider,
  Icon,
  Input,
  NativeDateService,
  StyleService,
  Text,
} from '@ui-kitten/components'
import { createDis } from '../api/dis'
import { useMutation } from 'react-query'
import { ServicePicker } from '../components/ServicePicker'
import { TechnologyPicker } from '../components/TechnologyPicker'
const CalendarIcon = (props) => <Icon {...props} name="calendar" />

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

export const CreateDIS = ({ navigation }) => {
  const defaultDate = moment().add(4, 'weeks').startOf('isoWeek').toDate()
  const [startDate, setStartDate] = useState(defaultDate)
  const [title, setTitle] = useState()
  const [organisation, setOrganisation] = useState()
  const [repo, setRepo] = useState('')
  const [description, setDescription] = useState()
  const [services, setServices] = useState({})
  const [technologies, setTechnologies] = useState({})

  const dateService = new NativeDateService('se', {
    format: 'YYYY-MM-DD',
    startDayOfWeek: 1,
    i18n,
  })
  const addDISMutation = useMutation(createDis)

  const create = async () => {
    const newDis = {
      title,
      startDate,
      organisation,
      description,
      repo,
      services: Object.entries(services)
        .filter(([item, checked]) => checked)
        .map(([item]) => item),
    }

    const result = await addDISMutation.mutateAsync(newDis)
    console.log(result)
    navigation.navigate('OpenDIS', { id: result.data.id })
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView style={styles.form} level="1">
        <View style={styles.imageContainer}>
          <Avatar
            source={require('../assets/notebook-dynamic-gradient.png')}
            style={styles.image}
          />
        </View>
        <Input
          style={styles.input}
          label="Rubrik"
          placeholder="Rubrik på upphandlingen"
          value={title}
          onChangeText={setTitle}
        />

        <Input
          style={styles.input}
          label="Upphandlande organisation"
          placeholder="Namn på din organisation"
          value={organisation}
          onChangeText={setOrganisation}
        />

        <Datepicker
          label="Senaste ansökningsdatum"
          placeholder="Välj slutdatum"
          style={styles.input}
          dateService={dateService}
          date={startDate}
          onSelect={(nextDate) => setStartDate(nextDate)}
          accessoryRight={CalendarIcon}
        />
        <Input
          style={styles.input}
          label="Github/Bitbucket repo"
          placeholder="Github repo"
          textContentType="URL"
          value={repo}
          onChangeText={setRepo}
        />
        <Input
          multiline={true}
          style={styles.input}
          textStyle={{ minHeight: 64 }}
          label="Beskrivning"
          placeholder="Beskrivning"
          value={description}
          onChangeText={setDescription}
        />
        <ServicePicker onChange={setServices} services={services} />
        <TechnologyPicker
          onChange={setTechnologies}
          technologies={technologies}
        />
      </ScrollView>
      <Divider />
      <Button onPress={create} size="giant" style={styles.addButton}>
        {addDISMutation.isLoading ? 'Skapar...' : 'Skapa'}
      </Button>
      <Text category="s2" style={styles.info}>
        {addDISMutation.isError
          ? addDISMutation.error.message
          : `När du har skapat denna DIS kommer du få en länk som du kan publicera`}
      </Text>
    </KeyboardAvoidingView>
  )
}

const styles = StyleService.create({
  form: {
    flex: 1,
    paddingHorizontal: 4,
  },
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-2',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: -200,
  },
  image: {
    flex: 1,
    minHeight: 350,
  },
  input: {
    marginHorizontal: 12,
    marginVertical: 8,
  },
  addButton: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  info: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
  grid: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  gridItem: {
    flex: 1,
    width: '32%',
  },
})

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
import { dateService } from '../lib/dateService'
const CalendarIcon = (props) => <Icon {...props} name="calendar" />

export const CreateDIS = ({ navigation }) => {
  const defaultDate = moment().add(4, 'weeks').startOf('isoWeek').toDate()
  const [startDate, setStartDate] = useState(defaultDate)
  const [title, setTitle] = useState()
  const [organisation, setOrganisation] = useState()
  const [repo, setRepo] = useState('https://github.com/')
  const [description, setDescription] = useState()
  const [services, setServices] = useState({})
  const [technologies, setTechnologies] = useState({})

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
          label="Adress till publikt repo (github/gitlab/...)"
          placeholder="https://"
          textContentType="URL"
          value={repo}
          onChangeText={(val) => setRepo(val.toLowerCase())}
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

        <Divider />

        <Text category="h5" style={styles.info}>
          Kompetenser
        </Text>
        <ServicePicker
          onChange={setServices}
          services={services}
          style={styles.picker}
        />
        <TechnologyPicker
          onChange={setTechnologies}
          technologies={technologies}
          style={styles.picker}
        />
        <Divider />
        <Button onPress={create} size="giant" style={styles.addButton}>
          {addDISMutation.isLoading ? 'Skapar...' : 'Skapa'}
        </Button>
        <Text category="s2" style={styles.info}>
          {addDISMutation.isError
            ? addDISMutation.error.message
            : `När du har skapat denna DIS kommer du få en länk som du kan publicera`}
        </Text>
      </ScrollView>
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
  picker: {
    marginHorizontal: 12,
  },
  input: {
    marginHorizontal: 12,
    marginVertical: 8,
  },
  addButton: {
    marginHorizontal: 12,
    marginTop: 16,
  },
  info: {
    marginHorizontal: 12,
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

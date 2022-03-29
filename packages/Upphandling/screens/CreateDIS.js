import React, { useState } from 'react'
import { KeyboardAvoidingView, ScrollView } from 'react-native'
import moment from 'moment'

import {
  Button,
  Datepicker,
  Divider,
  Icon,
  Input,
  StyleService,
  Text,
  withStyles,
} from '@ui-kitten/components'
import { createDis } from '../api/dis'
import { useMutation } from 'react-query'
import { ServicePicker } from '../components/ServicePicker'
import { TechnologyPicker } from '../components/TechnologyPicker'
import { dateService } from '../lib/dateService'
import { translate } from '../lib/translate'
const CalendarIcon = (props) => <Icon {...props} name="calendar" />

const CreateDISComponent = ({ eva, navigation }) => {
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
    navigation.navigate('OpenDIS', { id: result.data.id })
  }

  return (
    <KeyboardAvoidingView style={eva.style.container}>
      <ScrollView style={eva.style.form} level="1">
        <Text category="h6" style={eva.style.info}>
          {translate('CreateDIS.general_section_headline')}
        </Text>

        <Input
          style={eva.style.input}
          label={translate('CreateDIS.headline_label')}
          placeholder={translate('CreateDIS.headline_placeholder')}
          value={title}
          onChangeText={setTitle}
        />

        <Input
          style={eva.style.input}
          label={translate('CreateDIS.organisation_label')}
          placeholder={translate('CreateDIS.organisation_placeholder')}
          value={organisation}
          onChangeText={setOrganisation}
        />

        <Datepicker
          label={translate('CreateDIS.startdate_label')}
          placeholder={translate('CreateDIS.startdate_placeholder')}
          style={eva.style.input}
          dateService={dateService}
          date={startDate}
          onSelect={(nextDate) => setStartDate(nextDate)}
          accessoryRight={CalendarIcon}
        />
        <Input
          style={eva.style.input}
          label={translate('CreateDIS.repository_label')}
          placeholder={translate('CreateDIS.repository_placeholder')}
          textContentType="URL"
          value={repo}
          onChangeText={(val) => setRepo(val.toLowerCase())}
        />
        <Input
          multiline={true}
          style={eva.style.input}
          textStyle={{ minHeight: 64 }}
          label={translate('CreateDIS.description_label')}
          placeholder={translate('CreateDIS.description_placeholder')}
          value={description}
          onChangeText={setDescription}
        />

        <Divider />

        <Text category="h6" style={eva.style.info}>
          {translate('CreateDIS.competenses_section_headline')}
        </Text>
        <Text style={eva.style.small}>
          {translate('CreateDIS.competenses_services')}
        </Text>
        <ServicePicker
          onChange={setServices}
          services={services}
          style={eva.style.picker}
        />
        <Text style={eva.style.small}>
          {translate('CreateDIS.competenses_tech')}
        </Text>
        <TechnologyPicker
          onChange={setTechnologies}
          technologies={technologies}
          style={eva.style.picker}
        />
        <Divider />
        <Button onPress={create} size="giant" style={eva.style.addButton}>
          {addDISMutation.isLoading
            ? translate('CreateDIS.creating_in_progress')
            : translate('CreateDIS.create_button')}
        </Button>
        <Text category="s2" style={eva.style.info}>
          {addDISMutation.isError
            ? addDISMutation.error.message
            : translate('CreateDIS.once_created_info')}
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
export const CreateDIS = withStyles(CreateDISComponent, (theme) => ({
  form: {
    flex: 1,
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
  },
  picker: {},
  input: {
    marginVertical: 8,
  },
  addButton: {
    marginTop: 16,
  },
  info: {
    marginVertical: 16,
  },
  small: {
    marginVertical: 6,
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
}))

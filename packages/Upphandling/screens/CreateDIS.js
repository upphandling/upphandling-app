import React, {useState} from 'react'
import {KeyboardAvoidingView, ScrollView, View} from 'react-native'
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
import list from '../data/dis.json'

const CalendarIcon = props => <Icon {...props} name="calendar" />

export const CreateDIS = ({navigation}) => {
  const defaultDate = moment().add(4, 'weeks').startOf('isoWeek').toDate()
  const [startDate, setStartDate] = useState(defaultDate)
  const [title, setTitle] = useState()
  const [organisation, setOrganisation] = useState()
  const [repo, setRepo] = useState()
  const [description, setDescription] = useState()

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
  const dateService = new NativeDateService('sv-se', {startDayOfWeek: 1, i18n})

  const create = () => {
    // TODO: global state with redux or something?
    list.push({
      id: Math.floor(Math.random()),
      title,
      startDate,
      organisation,
      description,
    })
    navigation.navigate('Home')
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
          onSelect={nextDate => setStartDate(nextDate)}
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
          textStyle={{minHeight: 64}}
          label="Beskrivning"
          placeholder="Beskrivning"
          value={description}
          onChangeText={setDescription}
        />
      </ScrollView>
      <Divider />
      <Button onPress={create} size="giant" style={styles.addButton}>
        Förhandsgranska
      </Button>
      <Text category="s2" style={styles.info}>
        När du har skapat denna DIS kommer du få en länk som du kan annonsera på
        t ex Mercell
      </Text>
    </KeyboardAvoidingView>
  )
}

const styles = StyleService.create({
  form: {
    flex: 1,
    paddingHorizontal: 4,
    paddingVertical: 24,
  },
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-2',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
    marginTop: 24,
  },
  info: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
})

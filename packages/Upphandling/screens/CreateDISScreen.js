import React, {useState} from 'react'
import {SafeAreaView, ScrollView, View} from 'react-native'
import moment from 'moment'

import {StyleSheet} from 'react-native'
import {
  Avatar,
  Button,
  Datepicker,
  Icon,
  Input,
  Text,
} from '@ui-kitten/components'
import list from '../data/dis.json'

const CalendarIcon = props => <Icon {...props} name="calendar" />

export const CreateDISScreen = ({navigation}) => {
  const defaultDate = moment().add(4, 'weeks').startOf('isoWeek').valueOf()
  const [startDate, setStartDate] = useState(defaultDate)
  const [title, setTitle] = useState()
  const [organisation, setOrganisation] = useState()
  const [repo, setRepo] = useState()

  const create = () => {
    // TODO: global state with redux or something?
    list.push({id: Math.floor(Math.random()), title, startDate, organisation})
    navigation.navigate('Home')
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <Avatar
          source={require('../assets/new-folder-dynamic-gradient.png')}
          style={styles.image}
        />
        <Input
          style={styles.input}
          size="medium"
          label="Rubrik"
          placeholder="Rubrik på upphandlingen"
          value={title}
          onChangeText={setTitle}
        />

        <Input
          style={styles.input}
          size="medium"
          label="Upphandlande organisation"
          placeholder="Namn på organisationen"
          value={organisation}
          onChangeText={setOrganisation}
        />

        <Datepicker
          label="Senaste ansökningsdatum"
          placeholder="Pick Date"
          date={startDate}
          onSelect={nextDate => setStartDate(nextDate)}
          accessoryRight={CalendarIcon}
        />
        <View style={styles.rowContainer}>
          <Input
            style={styles.input}
            label="Github repo"
            size="small"
            placeholder="Github repo"
            value={repo}
            onChangeText={setRepo}
          />
          <Input style={styles.input} size="large" placeholder="Large" />
        </View>
        <Input
          multiline={true}
          textStyle={{minHeight: 64}}
          placeholder="Beskrivning"
        />

        <Button onPress={create}>Skapa</Button>
        <Text category="c2">
          När du har skapat denna DIS kommer du få en länk som du kan annonsera
          på t ex Mercell
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: 420,
    padding: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: '40%',
    minHeight: 150,
  },
  input: {
    marginVertical: 10,
  },
})

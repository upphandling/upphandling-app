import React, {useState} from 'react'
import {
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  View,
} from 'react-native'

import {
  Avatar,
  Button,
  Divider,
  Input,
  StyleService,
  Text,
  Toggle,
} from '@ui-kitten/components'
import list from '../data/dis.json'

export const ApplyDIS = ({navigation, route}) => {
  const {id} = route.params
  const dis = list.find(item => item.id === id)

  const [name, setName] = useState()
  const [orgnr, setOrgnr] = useState()
  const [description, setDescription] = useState()
  const [services, setServices] = useState({})

  const apply = () => {
    const company = {
      name,
      orgnr,
      description,
      services,
    }
    dis.appliedCompanies = (dis.appliedCompanies || []).push(company)
    navigation.navigate('OpenDIS', {id: id})
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView style={styles.form} level="1">
        <ImageBackground
          source={require('../assets/mail-dynamic-gradient.png')}
          style={styles.image}
        />

        <Input
          style={styles.input}
          label="Organisationsnummer"
          placeholder="Ditt organisationsnr"
          value={orgnr}
          onChangeText={setOrgnr}
        />
        <Input
          style={styles.input}
          label="Företagsnamn"
          placeholder="Ditt företagsnamn"
          value={name}
          onChangeText={setName}
        />

        <Input
          multiline={true}
          style={styles.input}
          textStyle={{minHeight: 64}}
          label="Beskrivning av ditt företag"
          placeholder="Beskrivning"
          value={description}
          onChangeText={setDescription}
        />
        <Text category="s2" style={styles.info}>
          Era tjänster
        </Text>

        <View style={styles.toggles}>
          {dis.services.map(service => (
            <Toggle
              checked={services[service]}
              style={styles.toggle}
              onChange={checked =>
                setServices({...services, [service]: checked})
              }>
              {service}
            </Toggle>
          ))}
        </View>
      </ScrollView>
      <Divider />
      <Button onPress={apply} size="giant" style={styles.addButton}>
        Ansök
      </Button>
      <Text category="s2" style={styles.info}>
        När du ansökt kommer du få ett mail när du godkänts som leverantör
        senast {dis.startDate}
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
  toggles: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    display: 'flex',
  },
  toggle: {
    flex: 1,
  },
  image: {
    flex: 1,
    minHeight: 350,
    marginTop: -190,
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
    color: '#999',
    marginHorizontal: 16,
    marginVertical: 16,
  },
})

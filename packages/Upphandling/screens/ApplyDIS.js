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
import list from '../hooks/dis.json'
import { useDis } from '../hooks/useDis'
import { createOffer } from '../api/offers'
import { useMutation } from 'react-query'
import { createCompany } from '../api/companies'


export const ApplyDIS = ({navigation, route}) => {
  const {id} = route.params
  const {data: dis, isLoading} = useDis(id)

  if (isLoading) return <Text>Loading...</Text>

  const [name, setName] = useState()
  const [orgnr, setOrgnr] = useState()
  const [description, setDescription] = useState()
  const [services, setServices] = useState({})

  const createCompanyMutation = useMutation(createCompany)

  const apply = async () => {
    const company = {
      name,
      orgnr,
      description,
      services,
    }
    const result = await createCompanyMutation.mutate(company)
    console.log('result', result)
    createOffer(offer)
    navigation.navigate('OpenDIS', {id})
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
          placeholder="Ert organisationsnr"
          value={orgnr}
          onChangeText={setOrgnr}
        />
        <Input
          style={styles.input}
          label="Företagsnamn"
          placeholder="Ert företagsnamn"
          value={name}
          onChangeText={setName}
        />

        <Input
          multiline={true}
          style={styles.input}
          textStyle={{minHeight: 64}}
          label="Beskrivning av ert företag"
          placeholder="Beskrivning"
          value={description}
          onChangeText={setDescription}
        />
        <Text category="s2" style={styles.info}>
          Efterfrågade tjänster som ni erbjuder
        </Text>

        <View style={styles.toggles}>
          {dis.services?.map((service, i) => (
            <Toggle
              checked={services[service]}
              style={styles.toggle}
              key={i}
              onValuehange={checked =>
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

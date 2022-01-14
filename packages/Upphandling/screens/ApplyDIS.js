import React, {useMemo, useState} from 'react'
import {
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  View,
} from 'react-native'

import {
  Avatar,
  Button,
  CheckBox,
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
import { createCompany, getCompanyFromId } from '../api/companies'
import checkOrgnr from 'se-orgnr-validator'

export const ApplyDIS = ({navigation, route}) => {
  const {id} = route.params
  const {data: dis, isLoading} = useDis(id)

  if (isLoading) return <Text>Loading...</Text>

  const [orgnr, setOrgnr] = useState()
  const [description, setDescription] = useState()
  const [services, setServices] = useState({})
  const [technologies, setTechnologies] = useState({})
  const [company, setCompany] = useState()
  const [valid, setValid] = useState(false)

  const createCompanyMutation = useMutation(createCompany)

  useMemo(async () => {
    if (!checkOrgnr(orgnr)) return setValid(false)
    setValid(true)
    const found = await getCompanyFromId(orgnr)
    console.log('got copmany', found)
    setCompany(found)
  }, [orgnr])

  const apply = async () => {
    if (!checkOrgnr(orgnr)) return setValid(false)
    const result = await createCompanyMutation.mutateAsync({id: orgnr})
    console.log('got result', result)
    setCompany(result)
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
          disabled
          placeholder="Ert företagsnamn"
          value={company?.name}
        />

        <Input value={company?.phoneNumber} disabled style={styles.input} label="Telefonnummer" placeholder="Telefonnummer"  />
        <Input value={company?.email} disabled style={styles.input} label="E-post" placeholder="E-post"  />
        <Input value={company?.address} disabled style={styles.input} label="Adress" placeholder="Adress" />
        <Input value={company?.town} disabled style={styles.input} label="Stad" placeholder="Stad"  />
        <Input value={company?.zipCode} disabled style={styles.input} label="Postnummer" placeholder="Postnummer"  />
        <Input value={company?.country} disabled style={styles.input} label="Land" placeholder="Land"  />
        <Input value={company?.industryText} disabled style={styles.input} label="Verksamhet" placeholder="Programvaruleverantör etc" />
        <Input value={company?.legalGroupText} disabled style={styles.input} label="Typ av organisation" placeholder="Aktiebolag/Handelsbolag etc" />
        <Input value={company?.website} style={styles.input} label="Hemsida" placeholder="Hemsida"  />
        <Input value={company?.numberEmployeesInterval} disabled style={styles.input} label="Antal anställda" placeholder="Antal anställda" />
        <Divider />
        <Toggle style={styles.toggle} disabled status="success" checked={company?.vatReg}>Moms registrerad</Toggle>
        <Input style={styles.input} disabled label="VD" placeholder="VD / firmatecknare" value={company?.topDirectorName} />

        {dis?.technologies.map((technology, index) => (
          <CheckBox key={index} style={styles.checkbox} checked={technologies[technology.id]} onChange={() => setTechnologies({...technologies, [technology.id]: !technologies[technology.id]})}>
            <Text>{technology.name}</Text>
          </CheckBox>
        ))}
        <Divider />
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
      <Button onPress={apply} size="giant" disabled={!valid} style={styles.addButton}>
        {createCompanyMutation.isLoading? 'Skapar företag...' : 'Ansök'}
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

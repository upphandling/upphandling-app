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
  CheckBox,
  Divider,
  Input,
  StyleService,
  Text,
  Toggle,
} from '@ui-kitten/components'
import { useDis } from '../hooks/useDis'
import { useMutation } from 'react-query'
import checkOrgnr from 'se-orgnr-validator'
import { CompanyDetails } from '../components/CompanyDetails'
import moment from 'moment'
import { createParticipation } from '../api/participation'
import { useTender } from '../hooks/useTenders'
import { useCompany } from '../hooks/useCompanies'
import { createOffer } from '../api/offers'
import { getCompanyFromId } from '../api/companies'

export const CreateOffer = ({ navigation, route }) => {
  const { tenderId } = route.params
  const [orgnr, setOrgnr] = useState()
  const { data: tender, isLoading } = useTender(tenderId)
  const { data: dis, isLoading: isLoadingDis } = useDis(tender?.disId)
  const [company, setCompany] = useState()
  const [description, setDescription] = useState()
  const [website, setWebsite] = useState(company?.website)
  const [services, setServices] = useState({})
  const [technologies, setTechnologies] = useState({})
  const [reference, setReference] = useState()

  if (isLoading) return <Text>Loading...</Text>

  const [valid, setValid] = useState(false)
  const [agree, setAgree] = useState(false)


  useMemo(async () => {
    if (!checkOrgnr(orgnr)) {
      setCompany(undefined)
      return setValid(false)
    }
    setValid(true)
    const found = await getCompanyFromId(orgnr)
    setCompany(found)
  }, [orgnr])


  const createOfferMutation = useMutation(createOffer)

  const apply = async () => {
    if (!checkOrgnr(orgnr) || !agree) return setValid(false)
    /*const company = (await getCompanyFromId(orgnr)) || (await createCompanyMutation.mutateAsync({ id: orgnr, description, website }))
    const participation = await createParticipationMutation.mutateAsync({disId: id, companyId: company.id})
*/
    setCompany(company)
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView
        level="1"
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <ImageBackground
          source={require('../assets/locker-dynamic-color.png')}
          style={styles.image}
        />

        <Text category='h2' style={styles.title}>{tender.description}</Text>
        <Text style={styles.info}>{dis?.organisation }</Text>
        <Divider />

        <Input
          style={styles.input}
          label="Organisationsnummer"
          placeholder="Ert organisationsnr"
          value={orgnr}
          onChangeText={setOrgnr}
        />
        {orgnr && company && <CompanyDetails company={company} />}

        {dis?.technologies?.map((technology, index) => (
          <CheckBox
            key={index}
            style={styles.checkbox}
            checked={technologies[technology.id]}
            onChange={() =>
              setTechnologies({
                ...technologies,
                [technology.id]: !technologies[technology.id],
              })
            }
          >
            <Text>{technology.name}</Text>
          </CheckBox>
        ))}
        <Divider />

        <Input
          multiline={true}
          style={styles.input}
          textStyle={{ minHeight: 200 }}
          maxLength={1000}
          label="Beskrivning av anbud. (Max 1 000 tecken)"
          placeholder="Detta är en beskrivning av ert anbud."
          value={description}
          onChangeText={setDescription}
        />
        <Text category="s2" style={styles.info}>{description?.length || 0}/1000. Tips: försök att beskriva ert arbetssätt, inte exakt hur ni kommer lösa uppgiften.</Text>

        <Input
          style={styles.input}
          label="Referens"
          placeholder="https://www.example.com"
          value={website}
          onChangeText={(val) => setWebsite(val.toLocaleLowerCase())}
        />
        <Text category="s2" style={styles.info}>
          Referens till liknande arbete som ditt företag har genomfört de
          senaste två åren av de personer som ska utföra arbetet. Detta kommer
          bedömas tillsammans med priset och övriga kriterier.
        </Text>

        {tender.services?.length ? (
          <View>
            <Text category="s2" style={styles.info}>
              Tilldelningskriterier
            </Text>

            <View style={styles.toggles}>
              {tender.services?.map((service, i) => (
                <Toggle
                  checked={services[service]}
                  style={styles.toggle}
                  status={services[service] ? 'success' : 'primary'}
                  key={i}
                  onChange={(checked) =>
                    setServices({ ...services, [service]: checked })
                  }
                >
                  {service}
                </Toggle>
              ))}
            </View>
          </View>
        ) : null}
        <Divider />
        <View style={styles.footer}>
          <CheckBox
            checked={agree}
            style={styles.input}
            onChange={(checked) => setAgree(checked)}
          >
            <Text>Jag är behörig firmatecknare för mitt företag</Text>
          </CheckBox>
          <Button
            onPress={apply}
            size="giant"
            disabled={!valid || !agree}
            style={styles.addButton}
          >Lämna in anbud</Button>
          <Text category="s2" style={styles.info}>
            När du anbudstiden är passerad{' '}
            {moment(tender.startDate).format('YYYY-MM-DD')} ({moment(tender.startDate).calendar()}) kommer du få ett
            mail med en bekräftelse. Du kan även kontakta oss på{' '}
            <Button
              appearance="ghost"
              size="tiny"
              onPress={() => Linking.openURL('mailto:{dis.email}')}
            >{`${dis.email}`}</Button>
          </Text>
        </View>
      </ScrollView>
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
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 16,
  },
  toggle: {
    justifyContent: 'flex-start',
    marginVertical: 16,
    minWidth: '40%',
  },
  image: {
    flex: 1,
    minHeight: 350,
    marginTop: -190,
  },
  input: {
    marginHorizontal: 16,
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
  section: {
    marginTop: 24,
  },
  doneButton: {
    marginHorizontal: 24,
    marginTop: 24,
  },
})

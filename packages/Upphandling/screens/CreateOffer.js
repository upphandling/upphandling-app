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
  Datepicker,
  Divider,
  Icon,
  Input,
  ListItem,
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
import { dateService } from '../lib/dateService'

const ellipse = (text, maxLength) => {
  if (text.length > maxLength) {
    return `${text.substr(0, maxLength - 3)}...`
  }
  return text
}

const CalendarIcon = (props) => <Icon {...props} name="calendar" />


const Issue = ({ issue: { title, number, body } }) => (
  <ListItem
    key={number}
    style={styles.issue}
    accessoryLeft={() => <Icon name="flag-outline" style={styles.icon} />}
    title={`#${number} ${title}`}
    description={`${ellipse(body, 100)}`}
  />
)

export const CreateOffer = ({ navigation, route }) => {
  const { tenderId } = route.params
  const [orgnr, setOrgnr] = useState()
  const { data: tender, isLoading } = useTender(tenderId)
  const { data: dis, isLoading: isLoadingDis } = useDis(tender?.disId)
  const [company, setCompany] = useState()
  const [description, setDescription] = useState()
  const [services, setServices] = useState({})
  const [technologies, setTechnologies] = useState(tender.technologies)
  const [reference, setReference] = useState()
  const [startDate, setStartDate] = useState(moment(tender.startDate).add(1, 'day').toDate())

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
    /*const company = (await getCompanyFromId(orgnr)) || (await createCompanyMutation.mutateAsync({ id: orgnr, description, reference }))
    const participation = await createParticipationMutation.mutateAsync({disId: id, companyId: company.id})
*/
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

        <Text category="h2" style={styles.title}>
          {tender.description}
        </Text>
        <Text category={'h2'}>{dis?.organisation}</Text>
        <Divider />

        <ScrollView horizontal={true} style={styles.issues}>
          {tender.issues.map((issue) => (
            <Issue issue={issue} />
          ))}
        </ScrollView>
        <Divider />
        <Text category="h6">Vi erbjuder följande kompetenser:</Text>

        <View style={styles.toggles}>
          {tender.technologies?.map((technology, i) => (
            <View style={styles.row} key={i}>
              <Toggle
                checked={technologies[technology]}
                style={styles.toggle}
                status={technologies[technology] ? 'success' : 'primary'}
                onChange={(checked) =>
                  setTechnologies({ ...technologies, [technology]: checked })
                }
              >
                {technology}
              </Toggle>
              {technologies[technology] && (
                <Input
                  value={services[technology]}
                  style={styles.price}
                  placeholder={'Timpris'}
                  accessoryRight={() => (
                    <Text style={styles.currency}>SEK</Text>
                  )}
                  onChangeText={(text) =>
                    setServices({ ...services, [technology]: text })
                  }
                />
              )}
            </View>
          ))}
        </View>
        <Datepicker
          label="Tidigaste startdatum"
          placeholder="Välj startdatum"
          controlStyle={styles.input}
          dateService={dateService}
          date={startDate}
          onSelect={setStartDate}
          accessoryRight={CalendarIcon}
        />
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
        <Text category="s2" style={styles.info}>
          {description?.length || 0}/1000. Tips: försök att beskriva ert
          arbetssätt, inte exakt hur ni kommer lösa uppgiften.
        </Text>

        <Input
          style={styles.input}
          label="Referens (t.ex. kontaktperson eller webadress)"
          placeholder="https://www.example.com eller Johan Andersson"
          value={reference}
          onChangeText={(val) => setReference(val.toLocaleLowerCase())}
        />

        
        <Text category="s2" style={styles.info}>
          Referens till liknande arbete som ditt företag har genomfört de
          senaste två åren av de personer som ska utföra arbetet. Detta kommer
          bedömas tillsammans med priset och övriga kriterier.
        </Text>

        <Input
          style={styles.input}
          label="Organisationsnummer"
          placeholder="Ert organisationsnr"
          value={orgnr}
          onChangeText={setOrgnr}
        />
        {orgnr && company && <CompanyDetails company={company} />}

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
          >
            Lämna in anbud
          </Button>
          <Text category="s2" style={styles.info}>
            När du anbudstiden är passerad{' '}
            {moment(tender.startDate).format('YYYY-MM-DD')} (
            {moment(tender.startDate).calendar()}) kommer du få ett mail med en
            bekräftelse. Du kan även kontakta oss på{' '}
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
    padding: 8,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 16,
    height: 50,
  },
  toggles: {},
  price: {
    width: 120,
  },
  toggle: {
    margin: 0,
    flex: 1,
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  image: {
    flex: 1,
    minHeight: 350,
    marginTop: -190,
  },
  issue: {
    marginVertical: 8,
    height: 200,
    width: 300,
    overflow: 'hidden',
    padding: 8,
  },
  issueBody: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    borderColor: '#eee',
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
  icon: {
    fill: '#fff',
    width: 34,
    height: 34,
  },
})

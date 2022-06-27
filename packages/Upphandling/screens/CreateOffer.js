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
import { translate } from '../lib/translate'

const ellipse = (text, maxLength) => {
  if (text.length > maxLength) {
    return `${text.substr(0, maxLength - 3)}...`
  }
  return text
}

const CalendarIcon = (props) => <Icon {...props} name="calendar" />

const DESCRIPTION_CHARACTER_LIMIT = 1000
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
  const [startDate, setStartDate] = useState(
    moment(tender.startDate).add(1, 'day').toDate()
  )

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
        <Text category="h6">
          {translate('CreateOffer.competence_offering_headline')}
        </Text>

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
                  placeholder={translate('CreateOffer.hourly_rate')}
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
          label={translate('CreateOffer.start_date_label')}
          placeholder={translate('CreateOffer.start_date_placeholder')}
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
          label={translate('CreateOffer.description_label', {
            character_limit: DESCRIPTION_CHARACTER_LIMIT,
          })}
          placeholder={translate('CreateOffer.description_placeholder')}
          value={description}
          onChangeText={setDescription}
        />
        <Text category="s2" style={styles.info}>
          {translate('CreateOffer.description_advice', {
            characters_used: description?.length || 0,
            character_limit: DESCRIPTION_CHARACTER_LIMIT,
          })}
        </Text>

        <Input
          style={styles.input}
          label={translate('CreateOffer.reference_label')}
          placeholder={translate('CreateOffer.reference_placeholder')}
          value={reference}
          onChangeText={(val) => setReference(val.toLocaleLowerCase())}
        />

        <Text category="s2" style={styles.info}>
          {translate('CreateOffer.reference_advice')}
        </Text>

        <Input
          style={styles.input}
          label={translate('CreateOffer.organisation_id_label')}
          placeholder={translate('CreateOffer.organisation_id_placeholder')}
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
            <Text>{translate('CreateOffer.i_swear_i_have_rights')}</Text>
          </CheckBox>
          <Button
            onPress={apply}
            size="giant"
            disabled={!valid || !agree}
            style={styles.addButton}
          >
            {translate('CreateOffer.submit_offer_button')}
          </Button>
          <Text category="s2" style={styles.info}>
            {translate('CreateOffer.once_offer_time_has_passed', {
              start_date: moment(tender.startDate).format('YYYY-MM-DD'),
              start_date_ago: moment(tender.startDate).calendar(),
            })}
          </Text>
          {!!dis.email && dis.email != 'undefined' && (
            <Text category={'s2'} style={styles.info}>
              {translate('CreateOffer.you_can_reach_us_on')}
              <Button
                appearance="ghost"
                size="tiny"
                onPress={() => Linking.openURL('mailto:{dis.email}')}
              >{`${dis.email}`}</Button>
            </Text>
          )}
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

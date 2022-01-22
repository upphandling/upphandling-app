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
import { createCompany, getCompanyFromId } from '../api/companies'
import checkOrgnr from 'se-orgnr-validator'
import { CompanyDetails } from '../components/CompanyDetails'
import moment from 'moment'
import { createTender } from '../api/tenders'

export const CreateTender = ({ navigation, route }) => {
  const { id } = route.params
  const { data: dis, isLoading } = useDis(id)
  const [agree, setAgree] = useState(false)
  const [valid, setValid] = useState(false)

  if (isLoading) return <Text>Loading...</Text>

  const createTenderMutation = useMutation(createTender)

  const create = async () => {
    createTenderMutation.mutateAsync({ disId: id })
    setCompany(company)
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView
        level="1"
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Divider />
        <View style={styles.footer}>
          <CheckBox
            checked={agree}
            style={styles.input}
            onChange={(checked) => setAgree(checked)}
          >
            <Text>
              Jag lovar att mina uppgifter stämmer.
            </Text>
          </CheckBox>
          <Button
            onPress={create}
            size="giant"
            disabled={!valid}
            style={styles.addButton}
          >
            {createTenderMutation.isLoading
              ? 'Skapar upphandling...'
              : 'Skapa upphandling'}
          </Button>
          <Text category="s2" style={styles.info}>
            När du skapat din upphandling kommer anslutna leverantörer få en
            notifiering och kan börja lämna anbud }
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

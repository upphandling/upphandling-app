import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Text} from '@ui-kitten/components'
import { Field } from './Field'

export const CompanyDetails = ({company}) => (
  <View style={styles.container}>
    <Text style={styles.field} category="h6">
      Företagsinformation
    </Text>
    <Field
      label="Företagsnamn"
      disabled
      placeholder="Ert företagsnamn"
      value={company?.name} />

    <Field
      value={company?.phoneNumber}
      disabled
      label="Telefonnummer"
      placeholder="Telefonnummer" />
    <Field
      value={company?.email}
      disabled
      label="E-post"
      placeholder="E-post" />
    <Field
      value={company?.address}
      disabled
      label="Adress"
      placeholder="Adress" />
    <Field
      value={company?.zipCode + ' ' + company?.town}
      disabled
      label="Postnummer"
      placeholder="Postnummer" />
    {company.country ? (
      <Field
        value={company?.country}
        disabled
        label="Land"
        placeholder="Land" />
    ) : null}
    <Field
      value={company?.industryText}
      disabled
      label="Verksamhet"
      placeholder="Programvaruleverantör etc" />
    <Field
      value={company?.legalGroupText}
      disabled
      label="Typ av organisation"
      placeholder="Aktiebolag/Handelsbolag etc" />
    <Field
      value={company?.website}
      label="Hemsida"
      placeholder="Hemsida" />
    <Field
      value={company?.numberEmployeesInterval}
      disabled
      label="Antal anställda"
      placeholder="Antal anställda" />
    <Field
      disabled
      status="success"
      label="Moms registrerad"
      value={company?.vatReg ? `Ja (${company?.vatRegDate})` : 'Nej'} />
    <Field
      disabled
      label="VD"
      placeholder="VD / firmatecknare"
      value={company?.topDirectorName} />
  </View>
)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
  },
  contentContainer: {
    paddingVertical: 24,
  },
  field: {
    padding: 16,
  },

})
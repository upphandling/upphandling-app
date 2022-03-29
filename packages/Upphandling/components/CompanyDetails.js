import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, Text } from '@ui-kitten/components'
import { Field } from './Field'

export const CompanyDetails = ({ company }) => (
  <Card style={styles.container} appearance="outline" status={'danger'}>
    <Text style={styles.field} category="h6">
      {company?.name}
    </Text>
    <Field
      value={company?.phoneNumber}
      disabled
      label={translate('CompanyDetails.phonenumber_label')}
      placeholder={translate('CompanyDetails.phonenumber_placeholder')}
    />
    <Field
      value={company?.email}
      disabled
      label={translate('CompanyDetails.email_label')}
      placeholder={translate('CompanyDetails.email_placeholder')}
    />
    <Field
      value={company?.address}
      disabled
      label={translate('CompanyDetails.adress_label')}
      placeholder={translate('CompanyDetails.adress_placeholder')}
    />
    <Field
      value={company?.zipCode + ' ' + company?.town}
      disabled
      label={translate('CompanyDetails.zip_code_label')}
      placeholder={translate('CompanyDetails.zip_code_placeholder')}
    />
    {company.country ? (
      <Field
        value={company?.country}
        disabled
        label={translate('CompanyDetails.country_label')}
        placeholder={translate('CompanyDetails.country_placeholder')}
      />
    ) : null}
    <Field
      value={company?.industryText}
      disabled
      label={translate('CompanyDetails.field_of_business_label')}
      placeholder={translate('CompanyDetails.field_of_business_placeholder')}
    />
    <Field
      value={company?.legalGroupText}
      disabled
      label={translate('CompanyDetails.organisation_type_label')}
      placeholder={translate('CompanyDetails.organisation_type_placeholder')}
    />
    <Field
      value={company?.website}
      label={translate('CompanyDetails.company_website_label')}
      placeholder={translate('CompanyDetails.company_website_placeholder')}
    />
    <Field
      value={company?.numberEmployeesInterval}
      disabled
      label={translate('CompanyDetails.number_of_employees_label')}
      placeholder={translate('CompanyDetails.number_of_employees_placeholder')}
    />
    <Field
      disabled
      status="success"
      label={translate('CompanyDetails.vat_registered_label')}
      value={
        company?.vatReg
          ? `${translate('generic.yes')} (${company?.vatRegDate})`
          : translate('generic.no')
      }
    />
    <Field
      disabled
      label={translate('CompanyDetails.top_director_label')}
      placeholder={translate('CompanyDetails.top_director_placeholder')}
      value={company?.topDirectorName}
    />
  </Card>
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

import React, { useState } from 'react'
import { Linking, SafeAreaView, ScrollView, View } from 'react-native'
import {
  Button,
  ButtonGroup,
  Card,
  Divider,
  Icon,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components'
import { useDis } from '../hooks/useDis'
import { Issues } from '../components/Issues'
import moment from 'moment'
import 'moment/locale/sv'
import ActionSheet from 'react-native-actions-sheet'
import { Tenders } from '../components/Tenders'
import { useTenders } from '../hooks/useTenders'
import { Hero } from '../components/Hero'
import { translate } from '../lib/translate'
import { Loading } from './Loading'
moment.locale('sv')

const actionSheetRef = React.createRef()

export const OpenDIS = ({ navigation, route }) => {
  const id = route.params.id
  const { status, data: dis, error, isFetching } = useDis(id)
  const [selected, setSelected] = useState([])
  const { data: tenders } = useTenders(id)
  const styles = useStyleSheet(themedStyles)

  if (isFetching) return <Loading />
  if (error)
    return (
      <Text>
        {translate('DIS.error_loading')} {error?.message}
      </Text>
    )

  const apply = () => {
    navigation.navigate('ApplyDIS', { id })
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Hero {...dis} onPress={apply} />

        {dis.description && (
          <>
            <Text style={styles.sectionLabel} category="s1">
              {translate('DIS.description_label')}
            </Text>
            <Text style={styles.description} appearance="hint">
              {dis.description}
            </Text>
          </>
        )}
        <Text style={styles.sectionLabel} category="s1">
          {translate('DIS.specific_dps_label')}
        </Text>
        <Tenders tenders={tenders} navigation={navigation} />

        {dis.repo && (
          <>
            <Text style={styles.sectionLabel} category="s1">
              {translate('DIS.source_code_label')}
            </Text>
            <Button
              style={styles.description}
              status={'warning'}
              appearance={'outline'}
              onPress={() => Linking.openURL(dis.repo)}
            >
              {dis.repo}
            </Button>
          </>
        )}

        <Text style={styles.sectionLabel} category="s1">
          {translate('DIS.active_tenders_selected', {
            selection_count: selected.length,
          })}
        </Text>
        <Divider />
        <Issues
          url={dis.repo}
          selected={selected}
          onSelectedChange={(selected) => {
            setSelected(selected)
            !selected.length
              ? actionSheetRef.current.hide()
              : actionSheetRef.current.setModalVisible()
          }}
        />
      </ScrollView>

      <ActionSheet
        ref={actionSheetRef}
        gestureEnabled={true}
        headerAlwaysVisible={true}
        defaultOverlayOpacity={0.2}
        closable={true}
        extraScroll={200}
        bounceOnOpen={true}
        bottomOffset={350}
      >
        <View style={styles.bottomDrawerContent}>
          <Text category="label" style={styles.label}>
            {translate('DIS.active_tenders_selected_bottom', {
              selection_count: selected.length,
            })}
          </Text>
          <Button
            onPress={() =>
              navigation.navigate('CreateTender', { id, issues: selected })
            }
          >
            {translate('DIS.create_tender_button')}
          </Button>
        </View>
      </ActionSheet>
    </SafeAreaView>
  )
}

const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'background-basic-color-2',
  },
  label: {
    marginBottom: 16,
    color: '#333',
  },
  buttonGroup: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  bottomDrawerContent: {
    padding: 16,
  },
  description: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  sectionLabel: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
})

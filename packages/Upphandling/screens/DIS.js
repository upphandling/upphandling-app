import React, { useState } from 'react'
import { Linking, ScrollView, View } from 'react-native'
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
moment.locale('sv')

const actionSheetRef = React.createRef()

export const DIS = ({ navigation, route }) => {
  const id = route.params.id
  console.log('finding dis', id)
  const { status, data: dis, error, isFetching } = useDis(id)
  const [selected, setSelected] = useState([])
  const { data: tenders } = useTenders(id)
  const styles = useStyleSheet(themedStyles)

  if (isFetching) return <Text>Loading...</Text>
  if (error) return <Text>Error loading dis: {error.message}</Text>


  const apply = () => {
    navigation.navigate('ApplyDIS', { id })
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <Hero {...dis} onPress={apply}/>
        
        {dis.description && (
          <>
            <Text style={styles.sectionLabel} category="s1">
              Beskrivning
            </Text>
            <Text style={styles.description} appearance="hint">
              {dis.description}
            </Text>
          </>
        )}
        <Text style={styles.sectionLabel} category="s1">
          Specifika upphandlingar
        </Text>
        <Tenders tenders={tenders} navigation={navigation} />

        {dis.repo && (
          <>
            <Text style={styles.sectionLabel} category="s1">
              Källkod
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
          Aktiva ärenden. {selected.length} valda.
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
            {selected.length} ärenden valda. Gå vidare och skapa upphandling.
          </Text>
          <Button
            onPress={() =>
              navigation.navigate('CreateTender', { id, issues: selected })
            }
          >
            Skapa specifik upphandling
          </Button>
        </View>
      </ActionSheet>
    </>
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

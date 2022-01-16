import React from 'react'
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
import list from '../hooks/dis.json'
import { ImageOverlay } from '../components/ImageOverlay'
import { useDis } from '../hooks/useDis'
import serviceIcons from '../data/services.json'
import { Issues } from '../components/Issues'
import moment from 'moment'
import 'moment/locale/sv' 
moment.locale('sv')

export const DIS = ({ navigation, route }) => {
  const id = route.params.id
  console.log('finding dis', id)
  const { status, data: dis, error, isFetching } = useDis(id)

  if (isFetching) return <Text>Loading...</Text>
  if (error) return <Text>Error loading dis: {error.message}</Text>

  const styles = useStyleSheet(themedStyles)

  const apply = () => {
    navigation.navigate('ApplyDIS', { id })
  }

  const renderOptionItemIcon = (style, icon) => <Icon {...style} name={icon} />

  const renderOptionItem = (service, index) => (
    <Button
      key={index}
      style={styles.optionItem}
      appearance="ghost"
      size="small"
      accessoryLeft={(style) =>
        renderOptionItemIcon(style, serviceIcons[service] ?? 'hash')
      }
    >
      {service}
    </Button>
  )

  const renderDetailItem = (detail, index) => (
    <Button
      key={index}
      style={styles.detailItem}
      appearance="outline"
      size="tiny"
    >
      {detail}
    </Button>
  )

  const renderBookingFooter = () => (
    <View style={styles.footer}>
      <View style={styles.optionList}>
        {dis.services?.map(renderOptionItem)}
      </View>
      <ScrollView style={styles.detailsList} horizontal={true}>
        {dis.tech?.map(renderDetailItem)}
      </ScrollView>
    </View>
  )

  return (
    <ScrollView style={styles.container}>
      <ImageOverlay
        style={styles.image}
        source={require('../assets/notebook-dynamic-gradient.png')}
      />
      <Card
        style={styles.bookingCard}
        appearance="filled"
        disabled={true}
        footer={renderBookingFooter}
      >
        <Text style={styles.title} category="h2">
          {dis.title}
        </Text>
        <Text style={styles.dateLabel} category="h6">
          {dis.organisation}
        </Text>
        <Text style={styles.priceLabel} category="p2">
          {dis.status ?? 'Startar'}
        </Text>
        <Text style={styles.dateLabel} category="p2">
          {moment(dis.startDate).format('YYYY-MM-DD')} (
          {moment().to(moment(dis.startDate))})
        </Text>
        <Button style={styles.bookButton} onPress={apply}>
          Ansök
        </Button>
      </Card>
      <Text style={styles.sectionLabel} category="s1">
        Beskrivning
      </Text>
      <Text style={styles.description} appearance="hint">
        {dis.description}
      </Text>

      <Text style={styles.sectionLabel} category="s1">
        Källkod
      </Text>
      <Button
        style={styles.description}
        status="control"
        onPress={() => Linking.openURL(dis.repo)}
      >
        {dis.repo}
      </Button>
      <Text style={styles.sectionLabel} category="s1">
        Process
      </Text>
      <ButtonGroup style={styles.buttonGroup} status="info" size="small">
        <Button
          accessoryLeft={<Icon name="alert-triangle" />}
          style={styles.processStep}
        >
          Annonsera
        </Button>
        <Button
          disabled={true}
          accessoryLeft={<Icon name="star" />}
          style={styles.processStep}
        >
          Tilldela
        </Button>
        <Button
          disabled={true}
          accessoryLeft={<Icon name="briefcase" />}
          style={styles.processStep}
        >
          Startad
        </Button>
      </ButtonGroup>
      <Divider />
      <Issues url={dis.repo} />
    </ScrollView>
  )
}

const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'background-basic-color-2',
  },
  image: {
    marginTop: -130,
    height: 360,
  },
  bookingCard: {
    marginTop: -80,
    margin: 16,
    borderRadius: 20,
  },
  title: {
    width: '65%',
  },
  dateLabel: {
    marginTop: 8,
  },
  priceLabel: {
    marginTop: 8,
  },
  bookButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
  buttonGroup: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  detailsList: {
    flexDirection: 'row',
    marginHorizontal: -4,
    marginVertical: 8,
  },
  detailItem: {
    marginHorizontal: 4,
    borderRadius: 16,
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionList: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  optionItem: {
    marginHorizontal: 4,
    paddingHorizontal: 0,
  },
  description: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  sectionLabel: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  imagesList: {
    padding: 8,
    backgroundColor: 'background-basic-color-2',
  },
  imageItem: {
    width: 180,
    height: 120,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  processStep: {
    borderTopEndRadius: 15,
    borderBottomEndRadius: 15,
  },
})

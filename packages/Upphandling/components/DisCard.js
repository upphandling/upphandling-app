import React from 'react'
import {ImageBackground, StyleSheet, View} from 'react-native'
import {Button, Card, Text, Icon} from '@ui-kitten/components'

const HeartIcon = style => <Icon {...style} name="heart" />
const StarIcon = style => <Icon {...style} name="star" />
const GithubIcon = style => <Icon {...style} name="github" />

const BriefcaseIcon = style => <Icon {...style} name="briefcase" />

const Header = ({title, organisation}) => (
  <View style={styles.rowContainer}>
    <ImageBackground
      style={styles.image}
      source={require('../assets/notebook-dynamic-gradient.png')}
    />
    <View>
      <Text category="h6">{title}</Text>
      <Text category="s1">{organisation}</Text>
    </View>
  </View>
)

const Footer = ({approvedCompanies, stars, repo}) => (
  <View style={styles.itemSection}>
    <View style={styles.itemReactionsContainer}>
      <Button
        style={styles.iconButton}
        appearance="ghost"
        status="basic"
        accessoryLeft={BriefcaseIcon}>
        {`${approvedCompanies}`}
      </Button>
      <Button
        style={styles.iconButton}
        appearance="ghost"
        status="danger"
        accessoryLeft={HeartIcon}>
        {`${approvedCompanies}`}
      </Button>
      <Button
        style={styles.iconButton}
        appearance="ghost"
        status="basic"
        accessoryLeft={StarIcon}>
        {`${stars}`}
      </Button>
      {repo ? (
        <Button
          style={styles.iconButton}
          appearance="ghost"
          status="basic"
          accessoryLeft={GithubIcon}>
          Github
        </Button>
      ) : null}
    </View>
  </View>
)

export const DisCard = ({onPress, dis}) => (
  <Card
    style={styles.card}
    onPress={onPress}
    header={Header({...dis})}
    footer={Footer({...dis})}>
    <Text>{dis.description}</Text>
  </Card>
)

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  image: {
    width: '100%',
    height: 300,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 5,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
  itemSection: {
    flex: 1,
    padding: 16,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
  itemReactionsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    marginHorizontal: -8,
  },
})

import React, { useRef, useState } from 'react'
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  ButtonGroup,
  Icon,
  Layout,
  StyleService,
  Text,
} from '@ui-kitten/components'
import technologyIcons from '../data/technologies.json'
import { View } from 'react-native'

const StarIcon = <Icon name="star" />
const BulbIcon = <Icon name="bulb" />
const RemoveIcon = <Icon name="close" />
const AwardIcon = <Icon name="award" />

export const TechnologyPicker = ({ technologies, placeholder, onChange, style }) => {
  const [newCompetence, setNewCompetence] = useState()

  const input = useRef()

  const onSelect = (index) => {
    const selected = Object.keys(technologyIcons)[index]
    onChange({ ...technologies, [selected]: true })
    setNewCompetence('')
  }

  const add = () => {
    if (!newCompetence) return
    onChange({ ...technologies, [newCompetence]: true })
    setNewCompetence('')
  }

  return (
    <>
      <Layout style={styles.grid}>
        {Object.entries(technologies)
          .filter(([, val]) => val)
          .map(([key]) => (
            <View key={key}>
              <Text>{key}</Text>
              <ButtonGroup style={styles.gridItem} size="small">
                <Button
                  accessoryLeft={RemoveIcon}
                  onPress={() =>
                    onChange({ ...technologies, [key]: 0 })
                  }
                >{RemoveIcon}</Button>
                <Button
                  accessoryLeft={BulbIcon}
                  appearance={technologies[key] === 5 ? 'filled' : 'outline'}
                  disabled={technologies[key] === 1}
                  onPress={() => onChange({ ...technologies, [key]: 1 })}
                >
                  1 år
                </Button>
                <Button
                  appearance={technologies[key] === 5 ? 'filled' : 'outline'}
                  disabled={technologies[key] === 3}
                  onPress={() => onChange({ ...technologies, [key]: 3 })}
                >
                  3 år
                </Button>
                <Button
                  accessoryLeft={AwardIcon}
                  status="danger"
                  appearance={technologies[key] === 5 ? 'filled' : 'outline'}
                  disabled={technologies[key] === 5}
                  onPress={() => onChange({ ...technologies, [key]: 5 })}
                >
                  &gt;5 år
                </Button>
              </ButtonGroup>
            </View>
          ))}
      </Layout>
      <Autocomplete
        placeholder={placeholder}
        style={style}
        value={newCompetence}
        onSelect={onSelect}
        accessoryRight={(props) => (
          newCompetence ? <Icon {...props} onPress={() => add()} name="plus" /> : null
        )}

        ref={(ref) => (input.current = ref)}
        onPressIn={() => input.current.show()}
        onChangeText={setNewCompetence}
      >
        {Object.entries(technologyIcons).map(([title, icon], i) => (
          <AutocompleteItem
            accessoryLeft={<Icon name={icon} />}
            key={i}
            title={title}
          />
        ))}
      </Autocomplete>
    </>
  )
}

const styles = StyleService.create({
  grid: {
    flexDirection: 'column',
    marginHorizontal: 16,
    flex: 1,
  },
  gridItem: {
    marginVertical: 8,
    height: 40,
  },
})

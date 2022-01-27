import React, { useState } from 'react'
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

export const TechnologyPicker = ({ technologies, onChange, style }) => {
  const [newCompetence, setNewCompetence] = useState()

  const onSelect = (index) => {
    const selected = Object.keys(technologyIcons)[index]
    onChange({ ...technologies, [selected]: true })
    setNewCompetence('')
  }

  const onBlur = () => {
    if (!newCompetence) return
    onChange({ ...technologies, [newCompetence]: true })
    setNewCompetence('')
  }

  return (
    <>
      <Autocomplete
        placeholder="Ange nödvändig teknikkompetens"
        style={style}
        value={newCompetence}
        onSelect={onSelect}
        onChangeText={setNewCompetence}
        onBlur={onBlur}
      >
        {Object.entries(technologyIcons).map(([title, icon], i) => (
          <AutocompleteItem
            accessoryLeft={<Icon name={icon} />}
            key={i}
            title={title}
          />
        ))}
      </Autocomplete>
      <Layout style={styles.grid}>
        {Object.entries(technologies)
          .filter(([, val]) => val)
          .map(([key]) => (
            <View>
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

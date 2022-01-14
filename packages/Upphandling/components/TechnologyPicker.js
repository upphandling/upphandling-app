import React, { useState } from 'react'
import {
  Autocomplete,
  AutocompleteItem,
  Icon,
  StyleService,
  Toggle,
} from '@ui-kitten/components'
import technologyIcons from '../data/technologies.json'
import { View } from 'react-native'

export const TechnologyPicker = ({ technologies, onChange }) => {
  const [newCompetence, setNewCompetence] = useState()

  const onSelect = (index) => {
    const selected = Object.keys(technologyIcons)[index]
    technologies[selected] = true
    onChange(technologies)
    setNewCompetence('')
  }

  const onBlur = () => {
    if (!newCompetence) return
    onChange({ ...technologies, [newCompetence]: true })
    setNewCompetence('')
  }

  return (
    <>
      <View style={styles.grid}>
        {Object.entries(technologies)
          .filter(([, val]) => val)
          .map(([key]) => (
            <Toggle
              checked={technologies[key]}
              style={styles.gridItem}
              onChange={(checked) =>
                onChange({ ...technologies, [key]: checked })
              }
            >
              {key}
            </Toggle>
          ))}
      </View>

      <Autocomplete
        placeholder="Teknikkrav"
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
    </>
  )
}

const styles = StyleService.create({
  grid: {
    display: 'flex',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  gridItem: {
    flex: 1,
    width: '32%',
  },
})

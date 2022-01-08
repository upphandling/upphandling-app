import React, { useState } from 'react'
import {
  Autocomplete,
  AutocompleteItem,
  Icon,
  StyleService,
  Toggle,
} from '@ui-kitten/components'
import serviceIcons from '../data/services.json'
import { View } from 'react-native'

export const ServicePicker = ({ services, onChange }) => {
  const [newCompetence, setNewCompetence] = useState()

  const onSelect = (index) => {
    const selected = Object.keys(serviceIcons)[index]
    services[selected] = true
    onChange(services)
    setNewCompetence('')
  }

  const onBlur = () => {
    if (!newCompetence) return
    onChange({ ...services, [newCompetence]: true })
    setNewCompetence('')
  }

  return (
    <>
      <View style={styles.grid}>
        {Object.entries(services)
          .filter(([, val]) => val)
          .map(([key]) => (
            <Toggle
              checked={services[key]}
              style={styles.gridItem}
              onChange={(checked) =>
                onChange({ ...services, [key]: checked })
              }
            >
              {key}
            </Toggle>
          ))}
      </View>

      <Autocomplete
        placeholder="Kompetenskrav"
        value={newCompetence}
        onSelect={onSelect}
        onChangeText={setNewCompetence}
        onBlur={onBlur}
      >
        {Object.entries(serviceIcons).map(([title, icon]) => (
          <AutocompleteItem
            accessoryLeft={<Icon name={icon} />}
            key={title}
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

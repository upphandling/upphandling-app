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
    onChange({ ...services, [selected]: true })
    setNewCompetence('')
  }

  const onBlur = () => {
    if (!newCompetence) return
    onChange({ ...services, [newCompetence]: true })
    setNewCompetence('')
  }

  return (
    <>
    <Autocomplete
        placeholder="Kompetenskrav"
        value={newCompetence}
        onSelect={onSelect}
        onChangeText={setNewCompetence}
        onBlur={onBlur}
      >
        {Object.entries(serviceIcons).map(([title, icon], i) => (
          <AutocompleteItem
            accessoryLeft={<Icon name={icon} />}
            key={i}
            title={title}
          />
        ))}
      </Autocomplete>
      <View style={styles.grid}>
        {Object.entries(services)
          .filter(([, val]) => val)
          .map(([key], i) => (
            <Toggle
              checked={services[key]}
              key={i}
              style={styles.gridItem}
              onChange={(checked) => onChange({ ...services, [key]: checked })}
            >
              {key}
            </Toggle>
          ))}
      </View>

      
    </>
  )
}

const styles = StyleService.create({
  grid: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 16,
  },
  gridItem: {
    justifyContent:'flex-start',
    marginVertical: 16,
    minWidth: '40%',
  },
})

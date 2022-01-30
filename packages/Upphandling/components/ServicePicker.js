import React, { useRef, useState } from 'react'
import {
  Autocomplete,
  AutocompleteItem,
  Icon,
  StyleService,
  Toggle,
} from '@ui-kitten/components'
import serviceIcons from '../data/services.json'
import { View } from 'react-native'

export const ServicePicker = ({
  services,
  placeholder = 'Ange eller välj kompetens',
  onChange,
  style,
}) => {
  const [newCompetence, setNewCompetence] = useState()
  const [data, setData] = useState(serviceIcons)

  const input = useRef()

  const onSelect = (index) => {
    const selected = Object.keys(data)[index]
    onChange({ ...services, [selected]: true })
    onChangeText('')
  }

  const onChangeText = (query) => {
    setNewCompetence(query)
    setData(
      Object.entries(serviceIcons)
        .filter(([title]) => title.toLowerCase().includes(query.toLowerCase()))
        .reduce((result, [title, icon]) => ({...result, [title]: icon }), {})
    )
  }

  const add = () => {
    if (!newCompetence) return
    onChange({ ...services, [newCompetence]: true })
    onChangeText('')
  }

  return (
    <>
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
      <Autocomplete
        placeholder={placeholder}
        value={newCompetence}
        onSelect={onSelect}
        style={style}
        ref={(ref) => (input.current = ref)}
        onChangeText={onChangeText}
        onPressIn={() => input.current.show()}
        accessoryRight={(props) => (
          <Icon {...props} onPress={() => add()} name="plus" />
        )}
      >
        {Object.entries(data).map(([title, icon], i) => (
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
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 16,
  },
  gridItem: {
    justifyContent: 'flex-start',
    marginVertical: 16,
    minWidth: '40%',
    flex: 1,
  },
})

import { AttributeTypesWithAttributes } from '@/src/shared/interfaces/AttributeTypeModel'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Menu, Text } from 'react-native-paper'

interface Props {
  atributos: AttributeTypesWithAttributes[]
  selectedValues: Record<string, string>
  setSelectedValues: React.Dispatch<React.SetStateAction<Record<string, string>>>
  onFilter: () => void
}

const AttributeFilter: React.FC<Props> = ({ atributos, selectedValues, setSelectedValues, onFilter }) => {
  const handleValueChange = (attributeTypeId: string, value: string) => {
    setSelectedValues((prev) => ({
      ...prev,
      [attributeTypeId]: value,
    }))
  }

  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.title}>Filtrar Atributos</Text>

      {atributos.map((tipoAtributo) => (
        <AttributeSelector
          key={tipoAtributo.id}
          tipoAtributo={tipoAtributo}
          selectedValue={selectedValues[tipoAtributo.id.toString()] || ''}
          onValueChange={handleValueChange}
        />
      ))}

      <Button mode="contained" onPress={onFilter} style={styles.button}>
        Filtrar
      </Button>
    </View>
  )
}

export default AttributeFilter

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    marginBottom: 8,
  },
  button: {
    marginTop: 12,
  },
})

const AttributeSelector = ({
  tipoAtributo,
  selectedValue,
  onValueChange,
}: {
  tipoAtributo: AttributeTypesWithAttributes
  selectedValue: string
  onValueChange: (attributeTypeId: string, value: string) => void
}) => {
  const [visible, setVisible] = React.useState(false)

  return (
    <View style={{ marginBottom: 12 }}>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={<Button mode="outlined" onPress={() => setVisible(true)}>
          {selectedValue
            ? tipoAtributo.atributos.find(attr => attr.id.toString() === selectedValue)?.valor
            : `Selecciona ${tipoAtributo.nombre}`}
        </Button>}
      >
        {tipoAtributo.atributos.map((atributo) => (
          <Menu.Item
            key={atributo.id}
            onPress={() => {
              onValueChange(tipoAtributo.id.toString(), atributo.id.toString())
              setVisible(false)
            }}
            title={atributo.valor}
          />
        ))}
      </Menu>
    </View>
  )
}

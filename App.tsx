// ========= App
// import all packages
import React, { useState } from 'react'
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native'

interface IGoals {
  text: string
  uuid: string
}

const App: React.FC = () => {
  const [goals, setGoals] = useState<IGoals[]>([])
  const [value, setValue] = useState<string>('')

  const handleInput = (value: string): void => {
    setValue(value)
  }

  const handleSubmit = (): void => {
    setValue('')
    setGoals((currentGoals) => [...currentGoals, { text: value, uuid: Math.random().toString() }])
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Goals</Text>
        <View style={styles.form}>
          <TextInput style={styles.input} value={value} onChangeText={handleInput} placeholder="Your goals..." />
          <Button onPress={handleSubmit} title="Add Gloal" />
        </View>
      </View>
      <View style={styles.list}>
        {/*
          ScrollView and FlatList are React Native Components
          to create scrollable lists. ScrollView will render all items
          even though only some items is currently visible, but FlatList
          will render only visible items and it will make FlatList is better in term of performance.
          So actually we'll use ScrollView
          if we want to create scrollable component, but if we want to display
          data, we usually will use FlatList instead.

          When we're styling component in React Native for both iOS & Android
          sometimes some of style will not be applied to both platform. We usually
          will wrap our component with View component when some styles is not working well,
          but sometimes we even need to write different style for iOS and Android.
        */}
        {/* <ScrollView>
          {goals.map(item => (
            <View style={styles.card} key={item.uuid}>
              <Text style={styles.cardText}>{item.text}</Text>
            </View>
          ))}
        </ScrollView> */}
        {/*
          Flatlist will use our id or key property
          as a key extractor if we have one of those
          properties. But if we don't have one of those
          properties, React Native will use the index instead.
          But please replace that by writing the keyExtractor manually.
        */}
        <FlatList
          // this one is used to forbid user scroll if we only have one items. but it's only on iOS
          // you don't need use it in android, because android don't act like this
          alwaysBounceVertical={false}
          data={goals}
          keyExtractor={(item, index) => item.uuid}
          renderItem={({ item, index: _index }) => (
            <View style={styles.card}>
              <Text style={styles.cardText}>{item.text}</Text>
            </View>
          )}
        />
      </View>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '85%',
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  title: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 15
  },
  header: {
    flex: 1,
    paddingVertical: 55,
    borderBottomWidth: 1,
    borderBottomColor: 'hsl(0, 0%, 71%)'
  },
  list: {
    flex: 6,
    marginTop: 15
  },
  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    alignItems: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: 'hsl(0, 0%, 86%)',
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '70%'
  },
  card: {
    backgroundColor: 'hsl(204, 86%, 53%)',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 7,
    marginBottom: 15
  },
  cardText: {
    color: 'white',
    fontSize: 16
  }
})

import { View, Text } from 'react-native'
import React from 'react'
import PlacesList from './placesList'

const AllPlaces = () => {
  return (
    <View>
      <Text>hello</Text>
      <PlacesList places={[]} />
    </View>
  )
}

export default AllPlaces
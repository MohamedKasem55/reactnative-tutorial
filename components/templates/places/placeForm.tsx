import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../../../consts/colors'
import ImagePicker from './imagePicker'

const PlaceForm = () => {
  const [placeForm, setPlaceForm] = useState<any>({})
  return (
    <ScrollView style={styles.form} >
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} onChangeText={(text)=>{setPlaceForm({...placeForm,title:text})}} />
      </View>
      <View>
        <Text style={styles.label}>Title</Text>
        <ImagePicker/>
      </View>
    </ScrollView>
  )
}

export default PlaceForm

const styles = StyleSheet.create({
  form:{
    flex:1,
    padding:24
  },
  label:{
    fontWeight:"bold",
    marginBottom:4,
    color:colors.colors.onSecondary
  },
  input:{
    marginVertical:8,
    paddingHorizontal:4,
    paddingVertical:4,
    fontSize:16,
    borderBottomColor:colors.colors.onPrimaryContainer,
    borderBottomWidth:2,
    backgroundColor:colors.colors.tertiaryContainer
  }
})
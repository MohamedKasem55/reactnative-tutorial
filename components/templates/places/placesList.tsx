import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useCallback } from 'react'
import { Place } from './place'
import PlaceItem from './placeItem'

const PlacesList = (props: { places: Place[] }) => {
    const onSelectHandler = useCallback(
        () => {

        },
        []
    )
    console.log(props.places);
    
    if (!props.places || !props.places.length) {
        console.log(props.places);
        return (<View style={styles.fallBackContainer}>
            <Text style={styles.fallBackText}>No places added yet , please add some</Text>
        </View>)
    }else
    return (
        <FlatList
            data={props.places}
            keyExtractor={(item: Place) => item.id}
            renderItem={({ item }) => <PlaceItem place={item} onSelect={onSelectHandler} />}
        />
    )
}

export default PlacesList

const styles = StyleSheet.create({
    fallBackContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    fallBackText: {
        fontSize: 16,
        color:"black"
    }
})
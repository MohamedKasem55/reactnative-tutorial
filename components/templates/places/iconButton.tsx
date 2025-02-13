import { Pressable, StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from '@react-native-vector-icons/ionicons';

const IconButton = (props: { iconName: any, size: any, color: any, onPressHandler: () => void }) => {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.button,
                pressed && styles.pressed
            ]}
            onPress={props.onPressHandler}
        >
            <Ionicons
                name={props.iconName}
                size={props.size} 
                color={props.color}
                />
        </Pressable>
    )
}

export default IconButton;
const styles = StyleSheet.create({
    button: {
        padding: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    pressed: {
        opacity: 0.7
    }
})
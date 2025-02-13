import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    card:{
        borderColor:"lightgray",
        borderWidth:1,
        borderRadius:5,
        backgroundColor:"white",
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        overflow:"hidden",
        padding:10,
        columnGap:10,
    },
    pressedStyle:{
        opacity:0.5
    }
})
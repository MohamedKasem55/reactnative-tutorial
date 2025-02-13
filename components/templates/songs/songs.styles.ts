import { StyleSheet } from "react-native";

 export const styles = StyleSheet.create({
    cardsWrapper:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-around",
        gap:10,
        padding:10
    },
    card:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around",
        gap:10,
        borderWidth:1,
        borderRadius:5,
        borderColor:"gray",
        padding:5,
        backgroundColor:"white",
        height:100
    }
 })
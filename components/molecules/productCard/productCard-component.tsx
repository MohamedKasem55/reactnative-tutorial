import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { styles } from './productCard.styles'

const ProductCard = (props: { card: any, isRowView?: boolean, deleteProduct?: any,isFavorite?:boolean }) => {    
    return (
        <Pressable android_ripple={{ color: "white" }} onPress={props?.deleteProduct?.bind(this, props.card.id)} 
        style={(pressedData)=>{
            return {
                ...styles.card,
                width: props.isRowView ? 300 : "auto" ,
                ...(pressedData.pressed && styles.pressedStyle),
                ...(props.isFavorite && { borderColor:"gold" ,borderWidth:5 })
        }   
        }}
              key={props.card?.id}
              >
            <Image alt='image' source={{ uri: props.card.image }} style={{
                flex: 1,
                resizeMode: 'contain',
            }} />
            <View style={{ flex: 5 }} >
                <View style={{ width: "100%" }} >
                    <Text>{props.card.title}</Text>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }} >
                        <Text>{props.card.category}</Text>
                        <Text>{props.card.price} $ </Text>
                    </View>
                    <Text>{props.card.description.slice(0, 50)}... </Text>
                </View>
            </View>
        </Pressable>
    )
}

export default ProductCard
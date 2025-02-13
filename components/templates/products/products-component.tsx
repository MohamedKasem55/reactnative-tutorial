import { View, Text, ScrollView, Button, FlatList, Modal, Pressable, Alert } from 'react-native'
import React, { useContext, useLayoutEffect, useState } from 'react'
import { amazonProducts } from '../../../consts/dummyData'
import { styles } from './products.styles'
import ProductCard from '../../molecules/productCard/productCard-component'
import { FavoriteProducts } from '../../../store/context/favoriteProducts'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { slices } from '../../../store/redux/slices'
import { favProductsActions } from '../../../store/redux/favorite'
const Products = (props: { route: any}) => {
  const [products, setProducts] = useState<any>(amazonProducts)
  const [selectedId, setSelectedId] = useState<any>(null)
  const [isModalVisible, setIssModalVisible] = useState<boolean>(false)
  const [view, setView] = useState<string>("column")
  // const FavoriteProductsContext = useContext(FavoriteProducts)
  const favProductsIds = useSelector((state:any)=>state.favorite.ids)
  const dispatch = useDispatch<any>()
  const navigation = useNavigation()
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight:()=><Text> from inside </Text>
    })
  }, [])
  const deleteProductHandler = (id: any) => {
    // setSelectedId(id)
    // setIssModalVisible(true)
    // Alert.alert("Are you sure ?", `this item will be be ${FavoriteProductsContext.favIds.includes(id) ? 'removed from ' : 'added to '}favorite`, [
    //   {
    //     text: "yes",
    //     style: "destructive",
    //     onPress: handleYes
    //   }
    // ])
  }
  const handleYes = (id: string) => {
    if (!!id) {
      if (!favProductsIds.includes(id))
        dispatch(favProductsActions.add({id}))
      else
      dispatch(favProductsActions.remove({id}))
    // if (!!id) {
    //   if (!FavoriteProductsContext.favIds.includes(id))
    //     FavoriteProductsContext.add(id)
    //   else
    //     FavoriteProductsContext.remove(id)
      setIssModalVisible(false)
    }
  }
  const renderData = (): any[] => {
    if (props?.route?.params?.isFavScreen)
      return products.filter((product: any) => (favProductsIds.includes(product.id)))
    else
      return products
  }
  return (
    <View>
      <View style={{ padding: 10, display: "flex", flexDirection: "row", justifyContent: "space-between", columnGap: 20, }} >
        <View style={{ flex: 1, marginRight: 10 }} >
          <Button title='Column' onPress={() => { setView("column") }} />
        </View>
        <View style={{ flex: 1, marginRight: 10 }} >
          <Button title='row' onPress={() => { setView("row") }} />
        </View>
      </View>
      {/* <ScrollView pagingEnabled={view === "row"} showsHorizontalScrollIndicator={view === "row"} contentContainerStyle={{...styles.cardsWrapper,flexDirection:view as "column"|"row"}} horizontal={view === "row"} >
        {products.map((el: any) => (
            <ProductCard
              key={el.id}
              card={el}
              isRowView={view === "row"}
            />
        ))}
      </ScrollView> */}
      <FlatList contentContainerStyle={{ ...styles.cardsWrapper, flexDirection: view as "column" | "row" }}
        horizontal={view === "row"}
        keyExtractor={(item, index) => item.id}
        data={renderData()}
        renderItem={({ item }) => (
          <ProductCard
            key={item.id}
            card={item}
            isRowView={view === "row"}
            deleteProduct={handleYes}
            isFavorite={favProductsIds.includes(item.id)}
          />
        )}
      />
      {/* <Modal visible={isModalVisible} animationType='slide'>
        <Text>Do you want to delete this product ?</Text>
        <View>
          <Button title='Yes' onPress={handleYes} />
          <Button title='no' onPress={() => { setIssModalVisible(false) }} />
        </View>
      </Modal> */}
    </View>


  )
}

export default Products
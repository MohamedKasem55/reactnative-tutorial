import { Button, FlatList, Image, Pressable, Text, TextInput, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { styles } from './songs.styles'
import { useSpotifyToken } from '../../../customHooks/spotifyCustomHook'
import { slices } from '../../../store/redux/slices'
import { getAlbums } from '../../../network/spotify/utils'
import ProductCard from '../../molecules/productCard/productCard-component'
import { useSelector } from 'react-redux'
import { search } from '../../../network/spotify/spotifyNetwork'
const Songs = () => {
  const [albums, setAlbums] = useState<any[]>([])
  const [searchInput, setSearchInput] = useState<string>("")
  const [isAlbumsLoading, setIsAlbumsLoading] = useState<boolean>(false)
  const tokenState = useSelector((state: any) => state.spotify);
  const authenticationState = useSelector((state: any) => state.authentication);

  const { token } = tokenState
  console.log(authenticationState);
  useSpotifyToken()

  useEffect(() => {
  }, [token])
  const mapAlbums = (albums: { name: string, album_type: string, images: string[], release_date: string }[]) => {
    let mappedAlbums: any[] = []
    for (const [id, value] of Object.entries(albums)) {
      mappedAlbums.push({
        id,
        name: value?.name,
        album_type: value?.album_type,
        image: value?.images[0],
        release_date: value?.release_date,
      })
    }
    return mappedAlbums
  }
  const searchByInput = async (event: any) => {
    setIsAlbumsLoading(true)
    let data = await search(token, searchInput)
    setAlbums(mapAlbums(data.albums.items))
    setIsAlbumsLoading(false)
  }
  return (
    <>
      <View style={{ display: 'flex', flexDirection: "row", justifyContent: "space-between", gap: 10, padding: 10 }}>
        <TextInput value={searchInput} onChangeText={text => setSearchInput(text)}
          style={{
            flex: 5,
            height: 40,
            borderWidth: 1,
            padding: 10,
            borderRadius: 5
          }}
        />

        <Pressable onPress={searchByInput} style={{
          width: "auto",
          borderRadius: 5,
          backgroundColor: "lightgray",
          padding: 5,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          height: "auto"
        }}>
          <Text>Search Album</Text>
        </Pressable>
      </View>

      <View style={styles.cardsWrapper}>
        {
          isAlbumsLoading ?
            <Text>Loading ...</Text>
            :
            <FlatList contentContainerStyle={{ ...styles.cardsWrapper }}
              keyExtractor={(item, index) => item.id}
              data={albums}
              renderItem={({ item, index }) => (
                <Pressable android_ripple={{ color: "white" }}
                  style={styles.card}
                  key={item.id}>
                  <Image alt='image' source={{ uri: item.image.url }} style={{
                    flex: 1,
                    resizeMode: 'contain'
                  }} />
                  <View style={{ flex: 3 }} >
                    <View style={{ width: "100%" }} >
                      <Text>{item.name}</Text>
                      <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }} >
                        <Text>{item.album_type}</Text>
                        <Text>{item.release_date} </Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
              )}
            />
        }
      </View>


    </>

  )
}

export default Songs
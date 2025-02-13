import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { appRoutes } from '../../../navigation/stackNavigation'
import { Pressable, Text } from 'react-native-gesture-handler'
import { Button, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { darkTheme } from '../../../theme/theme'
import { useDispatch } from 'react-redux'

function Home() {
    const navigation = useNavigation<any>()
    const dispatch = useDispatch()
    const theme = useTheme()   
    const routes : appRoutes[] = [
        appRoutes.login,
        appRoutes.products,
        appRoutes.favProducts,
        appRoutes.songs,
        appRoutes.home,
    ]
    const navigate = (route:appRoutes) => {
        navigation.navigate(route)
    }
    const changeTheme = ()=>{
    }
    return (
        <>
            <View style={{display:'flex',gap:20}} >
            {routes.map((route:appRoutes)=>(
                <Button key={route} title={route} onPress={()=>navigate(route)}/>
            ))}
            <Button title={`toggle theme`} color={theme.colors.primary} onPress={changeTheme}  />
            </View>
        </>
  ) 
}

export default Home
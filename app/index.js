import { useState } from 'react'
import { view, ScrollView, SafeAreaView  } from 'react-native' 
import { Stack, useRouter } from 'expo-router'

import { COLORS, icons, images, SIZES } from '../global'
import { Nearbyjobs, Popularjobs, screenHeadearBtn, Welcome} from '../components'

const Home = () => {
    const router = useRouter()
    return(
      <SafeAreaView style={{flex:1,backgroundColor: COLORS.lightWhite }}>
        <Stack.Screen 
         option={{
            headerStyle: { backgroundColor: COLORS.lightWhite},
         }}
         />
      </SafeAreaView>
    )


}

export default Home

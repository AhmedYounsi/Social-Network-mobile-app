import React,{useState} from 'react'
import { Text, View } from 'react-native'
import HeaderBack from './HeaderBack'
import {useRoute} from '@react-navigation/native';
function Search() {
    const [SearchText, setSearchText] = useState("")
    const route = useRoute();
    
    const change = (val) =>{
        setSearchText(val)
    }

    return (
         <>
          <HeaderBack change={change} route_name={route.name}/>
         <View>
             <Text style={{color:'white'}}>
             Search for :  {SearchText}
             </Text>
         </View>
         </>
    )
}

export default Search

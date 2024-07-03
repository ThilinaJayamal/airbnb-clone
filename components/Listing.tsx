import { View, Text, FlatList, ListRenderItem, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { defaultStyles } from '@/constants/Styles';
import { Link } from 'expo-router';
import { MyListing } from '@/interfaces/listing';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import BottomSheet, { BottomSheetFlatList, BottomSheetFlatListMethods } from "@gorhom/bottom-sheet";


interface Props {
  listings: any[],
  category: string,
  refresh:number
}

const Listing = ({ listings, category,refresh }: Props) => {

  const [loading, setLoading] = useState(true);
  const listRef = useRef<BottomSheetFlatListMethods>(null)

  useEffect(() => {
    
    if(refresh){
        listRef.current?.scrollToOffset({ offset: 0, animated: true });
    }

    setTimeout(() => {
      setLoading(false)
    }, 200);

  },[refresh])

  const renderRow: ListRenderItem<MyListing> = ({ item }) => (

    <Animated.View style={styles.listing} entering={FadeInRight} exiting={FadeOutLeft}>
      <Link href={`listing/${item.id}`} asChild>
        <TouchableOpacity>

          <Image source={{ uri: item.medium_url }} style={styles.image}></Image>
         
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <Text style={{ fontFamily: 'mon-sb', fontSize: 14 }}>{item.name}</Text>

            <View style={{ flexDirection: 'row', gap: 4 }}>
              <Ionicons name='star' size={14}></Ionicons>
              <Text style={{ fontFamily: 'mon-sb', fontSize: 14 }}>{item.review_scores_rating / 20}</Text>
            </View>
          </View>

          <Text style={{ fontFamily: 'mon' }}>{item.room_type}</Text>

          <View style={{ flexDirection: 'row', gap: 4 }}>
            <Text style={{ fontFamily: 'mon-sb' }}>$</Text>
            <Text style={{ fontFamily: 'mon' }}>{item.price}</Text>
          </View>
        </TouchableOpacity>
      </Link>
      <TouchableOpacity style={{
            position: 'absolute',
            right: 30,
            top: 30,
          }}>
            <Ionicons name='heart-outline' size={24} color={'#000'}></Ionicons>
          </TouchableOpacity>
    </Animated.View>
  );

  return (
    <BottomSheetFlatList 
    ListHeaderComponent={()=>(
      <View>
       <Text style={styles.info}>{listings.length} Homes</Text>
      </View>
    )}
    data={loading ? [] : listings} 
    ref={listRef} renderItem={renderRow} 
    style={{ backgroundColor: '#fff' }} 
    nestedScrollEnabled>
    </BottomSheetFlatList>
  )
}

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 10,
    marginVertical: 15,

  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  info:{
    textAlign:'center',
    fontFamily:'mon-sb',
    fontSize:16,
    marginTop:4
  }
})

export default Listing



import ExploreHeader from '@/components/ExploreHeader';
import { Link, Stack } from 'expo-router';
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useEffect, useMemo, useState } from 'react';
import listingData from '@/assets/data/airbnb-listings.json';
import ListingMap from '@/components/ListingMap';
import listingDataGeo from '@/assets/data/airbnb-listings.geo.json';
import ListingBotomSheet from '@/components/ListingBotomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function TabOneScreen() {

  const [category, setCategory] = useState("Homes");

  const items = useMemo(() => listingData as any, []);
  const geoItems = useMemo(()=>listingDataGeo as any,[]);

  const onDataChanged = (category: string) => {
    setCategory(category);

  }
  return (
    <View style={{ flex: 1, marginTop: -50 }}>

      <Stack.Screen options={{
        header: () => <ExploreHeader onCategoryChanged={onDataChanged}></ExploreHeader>
      }}>  
      </Stack.Screen>

      <GestureHandlerRootView style={{ flex: 1 }}>
        <ListingMap listings={listingDataGeo}></ListingMap>
        <ListingBotomSheet listing={items} category={category}></ListingBotomSheet>
      </GestureHandlerRootView>

    </View>

  );
}

const styles = StyleSheet.create({

  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

import { View, Text, StyleSheet,TouchableOpacity, StatusBar } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { ScrollView } from 'react-native';
import * as Haptics from 'expo-haptics';
import { SafeAreaView } from 'react-native-safe-area-context';

const categories = [
  {
    name: 'Homes',
    icon: 'home',
  },
  {
    name: 'Cabins',
    icon: 'house-siding',
  },
  {
    name: 'Trending',
    icon: 'local-fire-department',
  },
  {
    name: 'Play',
    icon: 'videogame-asset',
  },
  {
    name: 'City',
    icon: 'apartment',
  },
  {
    name: 'Beachfront',
    icon: 'beach-access',
  },
  {
    name: 'Countryside',
    icon: 'nature-people',
  },
];


interface Props {
  onCategoryChanged:(category:string)=>void
}

const ExploreHeader = ({onCategoryChanged}:Props) => {

  const scrollRef = useRef<ScrollView>(null);
  const itemRef = useRef<Array<TouchableOpacity | null>>([null]);
  const [activeIndex,setActiveIndex] = useState(0);

  const selectCategory = (index:number) => {
    setActiveIndex(index);
    onCategoryChanged(categories[index].name);

    const selected = itemRef.current[index];
    /*selected?.measure((x)=>{
      scrollRef.current?.scrollTo({x:150,y:0,animated:true})
    })
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);*/

  }


  return (
    <SafeAreaView style={{backgroundColor: '#fff' }}>
      <View style={styles.container}>

        <View style={styles.actionRow}>
          <Link href={'/(modals)/booking'} asChild>
            <TouchableOpacity style={styles.searchBtn}>
              <Ionicons name='search-outline' size={24} />
              <View>
                <Text style={{ fontFamily: 'mon-sb' }}>Where to?</Text>
                <Text style={{ fontFamily: 'mon', color: Colors.gray }}>Anywhare . Any week</Text>
              </View>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name='options-outline' size={24} />
          </TouchableOpacity>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
            gap: 30,
            paddingHorizontal: 16
          }} ref={scrollRef}>
          {
            categories.map((item, index) => (
              <TouchableOpacity key={index} ref={(el) => itemRef.current[index] = el}
              style={activeIndex === index ? styles.catogoriesBtnActive : styles.categoriesBtn}
              onPress={()=>selectCategory(index)}
              >
                <MaterialIcons name={item.icon as any} size={24} style={{color: activeIndex === index ? '#000' : Colors.gray}}/>
                <Text style={{fontFamily:'mon-sb'}}>{item.name}</Text>
              </TouchableOpacity>
            ))
          }
        </ScrollView>
      </View>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'}></StatusBar>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'column',
    gap:10,
    backgroundColor: '#fff',
    height:'auto',
    marginTop: 25,
    paddingTop: 10,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    gap: 10,
  },
  filterBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 24,
  },
  searchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderColor: '#c2c2c2',
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    padding: 14,
    borderRadius: 30,
    backgroundColor: '#fff',

    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  categoriesBtn:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    padding:8,
    borderBlockColor:"#fff",
    borderBottomWidth:3
  },
  catogoriesBtnActive:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    padding:8,
    borderBlockColor:"#000",
    borderBottomWidth:3
  }
})

export default ExploreHeader
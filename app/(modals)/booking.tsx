import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { BlurView } from 'expo-blur'
import Animated, { FadeIn, FadeOut, SlideInDown } from 'react-native-reanimated'
import { defaultStyles } from '@/constants/Styles'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { places } from '@/assets/data/places'

// @ts-ignore
import DatePicker from 'react-native-modern-datepicker';


const guestsGropus = [
  {
    name: 'Adults',
    text: 'Ages 13 or above',
    count: 0,
  },
  {
    name: 'Children',
    text: 'Ages 2-12',
    count: 0,
  },
  {
    name: 'Infants',
    text: 'Under 2',
    count: 0,
  },
  {
    name: 'Pets',
    text: 'Pets allowed',
    count: 0,
  },
];




const booking = () => {
  const router = useRouter();

  const today = new Date().toISOString().substring(0, 10);
  const [selectedDate, setSelectedDate] = useState(today);

  const [openCard, setOpenCard] = useState(0);
  const [selectedPlace, setSelectedPlace] = useState(0);

  const [group, setGroup] = useState(guestsGropus);

  const AnimatedTouchabaleOpacity = Animated.createAnimatedComponent(TouchableOpacity);

  const onClearAll = () => {
    setSelectedPlace(0);
    setOpenCard(0);
    setGroup(guestsGropus);
  }

  return (
    <BlurView intensity={100} style={styles.container} tint='light'>

      <ScrollView style={{ paddingTop: 80, paddingHorizontal: 10 }}>

        <View style={styles.card}>
          {
            openCard != 0 && (
              <AnimatedTouchabaleOpacity onPress={() => setOpenCard(0)} style={styles.cardPrev} entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)}>
                <Text style={styles.prevText}>Where</Text>
                <Text style={styles.prevDate}>I'm flexibale</Text>
              </AnimatedTouchabaleOpacity>
            )
          }

          {
            openCard === 0 && (
              <>
                <Animated.Text style={styles.cardHeader} entering={FadeIn}>Where to?</Animated.Text>
                <Animated.View style={styles.cardBody}>
                  <View style={styles.searchSection}>
                    <Ionicons name='search-outline' size={20} color={Colors.dark} style={styles.searchIcon}></Ionicons>
                    <TextInput style={styles.inputField} placeholder='Search destination' placeholderTextColor={Colors.gray}></TextInput>
                  </View>
                </Animated.View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 25, paddingLeft: 20, marginBottom: 30 }}>
                  {

                    places.map((item, index) => (
                      <TouchableOpacity key={index} onPress={() => setSelectedPlace(index)}>
                        <Image source={item.img} style={selectedPlace === index ? styles.placeSelected : styles.place}></Image>
                        <Text style={[{ padding: 6 }, { fontFamily: (index === selectedPlace ? 'mon-sb' : 'mon') }]}>{item.title}</Text>
                      </TouchableOpacity>
                    ))
                  }
                </ScrollView>
              </>

            )
          }
        </View>

        <View style={styles.card}>
          {
            openCard != 1 && (
              <AnimatedTouchabaleOpacity onPress={() => setOpenCard(1)} style={styles.cardPrev} entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)}>
                <Text style={styles.prevText}>When</Text>
                <Text style={styles.prevDate}>Any week</Text>
              </AnimatedTouchabaleOpacity>
            )
          }
          {
            openCard === 1 && (
              <>
                <Animated.Text style={styles.cardHeader} entering={FadeIn}>When is your trip?</Animated.Text>
                <Animated.View style={styles.cardBody}>
                  <DatePicker current={selectedDate} options={{
                    defaultFont: 'mon',
                    headerFont: 'mon-sb',
                    borderColor: 'transparent',
                    mainColor: Colors.primary
                  }}
                    selected={selectedDate}
                    mode="calendar"
                    onSelectedChange={(date: string) => setSelectedDate(date)}
                  />
                </Animated.View>
              </>
            )
          }
        </View>

        <View style={styles.card}>
          {
            openCard != 2 && (
              <AnimatedTouchabaleOpacity onPress={() => setOpenCard(2)} style={styles.cardPrev} entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)}>
                <Text style={styles.prevText}>Who</Text>
                <Text style={styles.prevDate}>Add guests</Text>
              </AnimatedTouchabaleOpacity>
            )
          }
          {
            openCard === 2 && (
              <>
                <Animated.Text style={styles.cardHeader} entering={FadeIn}>Who is coming?</Animated.Text>
                <Animated.View style={styles.cardBody}>
                  {
                    group.map((item, index) => (
                      <View key={index} style={[styles.guestItem, index + 1 < group.length ? styles.itemBorder : null]}>
                        <View>
                          <Text style={{ fontFamily: 'mon-sb', fontSize: 14 }}>{item.name}</Text>
                          <Text style={{ fontFamily: 'mon-sb', fontSize: 14, color: Colors.gray }}>{item.text}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 }}>

                          <TouchableOpacity
                            onPress={() => {
                              const newGroup = [...group];
                              newGroup[index].count > 0 ? newGroup[index].count-- : 0;
                              setGroup(newGroup);
                            }}>
                            <Ionicons name='remove-circle-outline' size={26}
                              color={item.count > 0 ? Colors.gray : '#cdcdcd'}>
                            </Ionicons>
                          </TouchableOpacity>
                          <Text style={{ fontFamily: 'mon', fontSize: 16, minWidth: 18, textAlign: 'center' }}>{item.count}</Text>
                          <TouchableOpacity
                            onPress={() => {
                              const newGroup = [...group];
                              newGroup[index].count++;
                              setGroup(newGroup);
                            }}>
                            <Ionicons name='add-circle-outline' size={26}
                              color={Colors.gray}>
                            </Ionicons>
                          </TouchableOpacity>

                        </View>
                      </View>
                    ))
                  }
                </Animated.View>
              </>
            )
          }
        </View>

      </ScrollView>

      <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity onPress={onClearAll}>
            <Text style={{ fontFamily: 'mon-sb', fontSize: 18, textDecorationLine: 'underline' }}>Clear All</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.back()} style={[defaultStyles.btn, { paddingLeft: 50, paddingRight: 20 }]}>
            <Ionicons name='search-outline' size={24} style={defaultStyles.btnIcon} color={'#fff'}></Ionicons>
            <Text style={defaultStyles.btnText}>Search</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

    </BlurView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    margin: 10,
    elevation: 4,
    shadowColor: 'D#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    gap: 20,
  },
  prevText: {
    fontFamily: 'mon-sb',
    fontSize: 14,
    color: Colors.gray
  },
  prevDate: {
    fontFamily: 'mon-sb',
    fontSize: 14,
    color: Colors.dark
  },
  cardPrev: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20
  },
  cardHeader: {
    fontFamily: 'mon-sb',
    fontSize: 24,
    padding: 20,
  },
  cardBody: {
    paddingHorizontal: 20,
  },
  searchSection: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ABABABA',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 4,
  },
  inputField: {
    flex: 1,
    fontFamily: 'mon',
    padding: 5,
    backgroundColor: '#fff',
  },
  searchIcon: {
    padding: 10
  },
  placeSelected: {
    height: 120,
    width: 120,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.gray,
  },
  place: {
    height: 120,
    width: 120,
    borderRadius: 10,
  },
  guestItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  itemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.gray,
  }
})

export default booking
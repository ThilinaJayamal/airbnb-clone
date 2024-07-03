import { View, Text, StyleSheet, Image, Dimensions, StatusBar, TouchableOpacity, ScrollView, Share } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import listingData from "@/assets/data/airbnb-listings.json"
import { MyListing } from '@/interfaces/listing'
import Animated, { FadeIn, FadeInRight, FadeOutLeft, SlideInDown, SlideInUp, interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { defaultStyles } from '@/constants/Styles'

const IMG_HEIGHT = 260;

const { width } = Dimensions.get('window');

const details = () => {

  const router = useRouter();

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const navigation = useNavigation();

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-IMG_HEIGHT, 0, IMG_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
    };
  }, []);

  const shareListing = async () => {
    try {
      await Share.share({
        title: listing.name,
        url: listing.listing_url,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackground: () => (
        <Animated.View style={[headerAnimatedStyle, styles.header]}></Animated.View>
      ),
      headerRight: () => (
        <View style={styles.bar}>
          <TouchableOpacity style={styles.roundButton} onPress={shareListing}>
            <Ionicons name='share-outline' size={24}></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundButton} onPress={shareListing}>
            <Ionicons name='heart-outline' size={24}></Ionicons>
          </TouchableOpacity>
        </View>
      ),

      headerLeft: () => (
        <View style={styles.bar}>
          <TouchableOpacity style={styles.roundButton} onPress={() => router.back()}>
            <Ionicons name='chevron-back' size={24}></Ionicons>
          </TouchableOpacity>
        </View>
      )
    })
  }, [])

  const { id } = useLocalSearchParams<{ id: string }>();
  const listing: MyListing = (listingData as any[]).find((item) => item.id.toString() === id)
  return (
    <View style={styles.container}>

      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
        <Animated.Image source={{ uri: listing.xl_picture_url }} style={[styles.image, imageAnimatedStyle]}
          resizeMode="cover" />

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{listing.name}</Text>
          <Text style={styles.location}>
            {listing.room_type} in {listing.smart_location}
          </Text>
          <Text style={styles.rooms}>
            {listing.guests_included} guests · {listing.bedrooms} bedrooms · {listing.beds} bed ·{' '}
            {listing.bathrooms} bathrooms
          </Text>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <Ionicons name="star" size={16} />
            <Text style={styles.ratings}>
              {listing.review_scores_rating / 20} · {listing.number_of_reviews} reviews
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.hostView}>
          <Image source={{ uri: listing.host_picture_url }} style={styles.host} />

          <View>
            <Text style={{ fontWeight: '500', fontSize: 16 }}>Hosted by {listing.host_name}</Text>
            <Text>Host since {listing.host_since}</Text>
          </View>
        </View>

        <View style={styles.divider} />
        <Text style={styles.description}>{listing.description}</Text>
      </Animated.ScrollView>

      <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)}>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity style={styles.footerText}>
            <Text style={styles.footerPrice}>${listing.price}</Text>
            <Text>night</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 20 }]}>
            <Text style={defaultStyles.btnText}>Reserve</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>


      <StatusBar backgroundColor={'transparent'}></StatusBar>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    height: IMG_HEIGHT,
    width: width,
  },
  infoContainer: {
    padding: 24,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: 'mon-sb',
  },
  location: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: 'mon-sb',
  },
  rooms: {
    fontSize: 16,
    color: Colors.gray,
    marginVertical: 4,
    fontFamily: 'mon',
  },
  ratings: {
    fontSize: 16,
    fontFamily: 'mon-sb',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.gray,
    marginVertical: 16,
  },
  host: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors.gray,
  },
  hostView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 24
  },
  footerText: {
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerPrice: {
    fontSize: 18,
    fontFamily: 'mon-sb',
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.primary,
    borderWidth: StyleSheet.hairlineWidth,
    borderBlockColor: Colors.gray,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  header: {
    backgroundColor: '#fff',
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.gray,
  },

  description: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: 'mon',
    padding: 24,
    marginBottom: 110,
  },
});

export default details
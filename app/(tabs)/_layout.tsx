import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Colors from '@/constants/Colors'
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const layout = () => {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: Colors.primary,
      //tabBarShowLabel:false,
      tabBarLabelStyle: {
        fontFamily: 'mon-sb'
      }
    }}>

      <Tabs.Screen name='index' options={{
        tabBarLabel: 'Explore',
        tabBarIcon: ({ color, size }) => <MaterialIcons name="search" size={size} color={color} />
      }}></Tabs.Screen>

      <Tabs.Screen name='whishlist' options={{
        tabBarLabel: 'Wishlist',
        tabBarIcon: ({ color, size }) => <Ionicons name="heart-outline" size={size} color={color} />
      }}></Tabs.Screen>

      <Tabs.Screen name='trips' options={{
        tabBarLabel: 'Trips',
        tabBarIcon: ({ color, size }) => <FontAwesome5 name="airbnb" size={size} color={color} />
      }}></Tabs.Screen>

<Tabs.Screen name='inbox' options={{
        tabBarLabel: 'Inbox',
        tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="message-outline" size={size} color={color} />
      }}></Tabs.Screen>

<Tabs.Screen name='profile' options={{
        headerShown:false,
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => <Ionicons name="person-circle-outline" size={size} color={color} />
      }}></Tabs.Screen>

    </Tabs>
  )
}

export default layout
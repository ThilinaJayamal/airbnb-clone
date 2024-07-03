import { View, Text, Button, StyleSheet, SafeAreaView, TouchableOpacity, Image,TextInput } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useAuth, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';

const profile = () => {
  const { signOut, isSignedIn } = useAuth();
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (!user) return;

    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.emailAddresses[0].emailAddress);

  }, [user]);

  const onSaveUser = async () => {
    try{
      if(!firstName || !lastName) return;

      user?.update({
        firstName,
        lastName
      })
    }
    catch(error){
      console.log(error);
    }
    finally{
      setEdit(false);
    }
  }

  const onCaputerImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:ImagePicker.MediaTypeOptions.Images,
      allowsEditing:true,
      quality:0.75,
      base64:true
    });

    if(!result.canceled){
      const base64 = `data:image/png;base64,${result.assets[0].base64}`;
      user?.setProfileImage({
        file:base64,
      });
    }
  }
  return (
    <SafeAreaView style={defaultStyles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Profile</Text>
        <Ionicons name='notifications-outline' size={24}></Ionicons>
      </View>
      {
        user &&
        <View style={styles.card}>
          <TouchableOpacity onPress={onCaputerImage}>
            <Image source={{ uri: user?.imageUrl }} style={styles.avatar}></Image>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            {
              edit ? (
                <View style={styles.editRow}>

                  <TextInput placeholder='First name' 
                  value={firstName || ""} 
                  onChangeText={setFirstName}
                  style={[defaultStyles.inputField,{width:100}]}
                  />
                  <TextInput placeholder='Last name' 
                  value={lastName || ""} 
                  onChangeText={setLastName}
                  style={[defaultStyles.inputField,{width:100}]}
                  />

                  <TouchableOpacity onPress={onSaveUser} style={{justifyContent:'center',alignItems:'center'}}>
                    <Ionicons name='checkmark-outline' size={24} color={Colors.dark}></Ionicons>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.editRow}>
                  <Text style={{ fontFamily: 'mon-b', fontSize: 24 }}>{firstName} {lastName}</Text>
                  <TouchableOpacity onPress={() => setEdit(true)} style={{justifyContent:'center',alignItems:'center'}}>
                    <Ionicons name='create-outline' size={24} color={Colors.dark}></Ionicons>
                  </TouchableOpacity>
                </View>
              )
            }
          </View>
          <Text>{user.emailAddresses[0].emailAddress}</Text>
          <Text>Since {user.createdAt?.toLocaleDateString()}</Text>
        </View>

      }
      {
        isSignedIn && (<View style={{padding:20}}><Button title='Sign Out' onPress={() => signOut()} color={Colors.dark}></Button></View>)
      }

      {
        !isSignedIn && (<Link href={'(modals)/signin'} asChild><View style={{padding:20}}><Button title='Sign in' color={Colors.dark}></Button></View></Link>)
      }

    </SafeAreaView>
  )
}

export default profile

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
  },
  header: {
    fontFamily: 'mon-b',
    fontSize: 24
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    marginHorizontal: 24,
    marginTop: 24,
    elevation: 2,
    shadowColor: 'D#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    alignItems: 'center',
    gap: 14,
    marginBottom: 24,
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: Colors.gray,
  },
  editRow: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    gap: 8,
  }
})
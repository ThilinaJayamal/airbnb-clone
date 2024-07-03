import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Stack } from 'expo-router'
import ExploreHeader from './ExploreHeader'
import BottomSheet, { BottomSheetScrollView, TouchableOpacity } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Listing from '@/components/Listing'
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';


interface Profs {
    listing: [],
    category: string,
}

const ListingBottomSheet = ({ listing, category }: Profs) => {
    const bottomRef = useRef<BottomSheet>(null);
    const [refresh,setRefresh] = useState(0);

    const snapPoints = useMemo(() => ['10%', '100%'], []);

    const showMap = () =>{
        bottomRef.current?.collapse();
        setRefresh((r)=>r+1)
    }

    return (
            <BottomSheet
                ref={bottomRef}
                index={1}
                snapPoints={snapPoints}
                enablePanDownToClose={false}
                handleIndicatorStyle={{ backgroundColor: Colors.gray }}
                style={[styles.sheetContainer,{borderTopLeftRadius:20,borderTopRightRadius:20}]}>
                <View style={styles.contentContainer}>
                    <Listing listings={listing} category={category} refresh={refresh}/>
                    <View style={styles.absoluteBtn}>
                        <TouchableOpacity style={styles.btn} onPress={()=>showMap()}>
                            <Text style={{fontFamily:'mon-sb',color:'#fff'}}>Map</Text>
                            <Ionicons name='map' size={20} color={'#fff'}></Ionicons>
                        </TouchableOpacity>
                    </View>
                </View>
            </BottomSheet>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
    },
    absoluteView: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        alignItems: 'center',
    },
    btn: {
        backgroundColor: Colors.dark,
        padding: 16,
        height: 50,
        borderRadius: 30,
        flexDirection: 'row',
        gap:8,
        marginHorizontal: 'auto',
        alignItems: 'center',
    },
    absoluteBtn:{
        position:'absolute',
        bottom:30,
        width:'100%',
        alignItems:'center',
    },
    sheetContainer: {
        backgroundColor: '#fff',
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: {
            width: 1,
            height: 1,
        },
    },
});

export default ListingBottomSheet

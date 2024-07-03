import React, { memo } from 'react';
import { MapMarker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';
import {Feature} from '@/interfaces/listingGeo'
import { useRouter } from 'expo-router';
import { defaultStyles } from '@/constants/Styles';
import MapView from 'react-native-map-clustering';

interface Profs {
    listings: any
}

const INITIAL_REGION = {
    latitude: 37.33,
    longitude: -122,
    latitudeDelta: 9,
    longitudeDelta: 9
}

const ListingMap = memo(({ listings }: Profs) => {

    const router = useRouter();

    const onMarkerSelected = (item:Feature) =>{
        router.push(`listing/${item.properties.id}`)
    }

    return (
        <View style={defaultStyles.container}>
            <MapView showsMyLocationButton showsUserLocation showsScale provider={PROVIDER_GOOGLE} 
            initialRegion={INITIAL_REGION}  style={StyleSheet.absoluteFillObject} animationEnabled={false}
            clusterColor='#fff'
            clusterTextColor='#000'
            >
                {
                    listings.features.map((item:Feature)=>(
                        <MapMarker coordinate={{
                            latitude:Number.parseFloat(item.properties.latitude),
                            longitude:Number.parseFloat(item.properties.longitude)
                        }} key={item.properties.id} onPress={()=>onMarkerSelected(item)}>

                        <View style={styles.marker}>
                            <Text style={styles.markerText}>$ {item.properties.price}</Text>
                        </View>
                        </MapMarker>
                    ))
                }
            </MapView>
        </View>
    );
})

export default ListingMap

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    marker: {
      padding: 8,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      elevation: 5,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      shadowOffset: {
        width: 1,
        height: 10,
      },
    },
    markerText: {
      fontSize: 14,
      fontFamily: 'mon-sb',
    },
    locateBtn: {
      position: 'absolute',
      top: 70,
      right: 20,
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 10,
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      shadowOffset: {
        width: 1,
        height: 10,
      },
    },

});

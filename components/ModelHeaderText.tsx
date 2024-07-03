import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Colors from '@/constants/Colors';

const ModelHeaderText = () => {
    const [active, setActive] = useState(0);
    return (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
            <TouchableOpacity onPress={() => setActive(0)}>
                <Text style={{
                    fontFamily: 'mon-sb',
                    fontSize: 18,
                    color: (active === 0 ? Colors.dark : Colors.gray),
                    textDecorationLine: (active === 0 ? 'underline' : 'none')
                }}>Stays</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setActive(1)}>
                <Text style={{
                    fontFamily: 'mon-sb',
                    fontSize: 18,
                    color: (active === 1 ? Colors.dark : Colors.gray),
                    textDecorationLine: (active === 1 ? 'underline' : 'none')
                }}>Experiences</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ModelHeaderText
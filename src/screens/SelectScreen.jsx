import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import React from 'react'

import Header from '../components/Header'
import SelectForm from '../components/SelectForm'


const SelectScreen = ({ navigation, route }) => {
    const { pageName } = route.params

    return (
        <ImageBackground source={require('../../assets/img/bg-select.jpg')} resizeMode="cover" style={styles.image}>
            <View style={styles.wrap}>
                <Header navigation={navigation} pageName={pageName}>
                    <Text style={styles.headerTitle}>Select Camera and Date</Text>
                </Header>
                <SelectForm navigation={navigation} />
            </View>
        </ImageBackground>
    )
}

export default SelectScreen

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        paddingLeft: 16,
        paddingRight: 16
    },

    image: {
        flex: 1,
    },

    headerTitle: {
        color: '#000',
        fontFamily: 'Dosis-Bold',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 22,
    },
})
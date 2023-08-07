import { View, Text, ImageBackground, StyleSheet, TouchableHighlight } from 'react-native'
import React from 'react'

const IntroScreen = ({ navigation }) => {
    return (
        <View style={styles.wrap}>
            <TouchableHighlight style={styles.container} onPress={() => navigation.navigate('Select', { pageName: 'select' })}>
                <ImageBackground source={require('../../assets/img/bg-intro.jpg')} resizeMode="cover" style={styles.image}>
                    <View style={styles.wrapText}>
                        <Text style={styles.title}>Mars</Text>
                        <Text style={styles.subtitle}>by Curiosity</Text>
                    </View>
                </ImageBackground>
            </TouchableHighlight>
        </View>

    )
}

export default IntroScreen

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
    },

    container: {
        flex: 1
    },

    image: {
        flex: 1,
    },

    wrapText: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginTop: 42,
        marginLeft: 18
    },

    title: {
        fontFamily: 'Dosis-ExtraLight',
        color: '#FFFFFF',
        fontSize: 90,
        fontStyle: 'normal',
        fontWeight: '200',
        letterSpacing: 1.8,
        textTransform: 'uppercase'
    },

    subtitle: {
        fontFamily: 'Dosis-Bold',
        color: '#FFFFFF',
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: '600',
        letterSpacing: 0.48,
    }
})
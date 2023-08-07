import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { usePhotos } from '../context/photosContext'

import Header from '../components/Header'

const DetailsScreen = ({ navigation, route }) => {
    const { id, pageName } = route.params
    const { photos } = usePhotos()


    const photoItem = photos.find(item => item.id === id)

    return (
        <View style={styles.wrap}>
            <Header navigation={navigation} pageName={pageName}>
                <Text style={styles.headerDate}>Photo id</Text>
                <Text style={styles.headerTitle}>{id}</Text>
            </Header>
            <View style={styles.container}>
                <Image
                    style={styles.mainImg}
                    resizeMode="cover"
                    source={{
                        uri: `${photoItem.img_src}`,
                    }}
                />
            </View>
        </View>
    )
}

export default DetailsScreen

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: '#000',
        // backgroundColor: '#DCCEBE',
        paddingLeft: 16,
        paddingRight: 16
    },

    container: {
        marginTop: 16,
        marginBottom: 34,
        flex: 1
    },

    mainImg: {
        flex: 1,
        borderRadius: 8
    },

    headerTitle: {
        color: '#FFFFFF',
        fontFamily: 'Dosis-Bold',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 22,
    },

    headerDate: {
        color: '#FFFFFF',
        fontFamily: 'Dosis-Regular',
        textAlign: 'center',
        fontSize: 13,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 22,
    }
})
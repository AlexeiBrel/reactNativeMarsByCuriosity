import { View, Text, StyleSheet, FlatList, RefreshControl, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'

import PhotoService from '../api/PhotoService'
import { useFetching } from '../hooks/useFetching'
import { usePhotos } from '../context/photosContext'

import { Loader } from '../components/Loader'
import Header from '../components/Header'
import Photo from '../components/Photo'


const HomeScreen = ({ navigation, route }) => {
    const { pageName, camera, date } = route.params
    const { photos, setPhotos } = usePhotos()
    const [fetchPhotos, isLoading, Error] = useFetching(async () => {
        const photosData = await PhotoService.getAll(camera.abbreviation, date.dateString);
        setPhotos(photosData?.photos)
    })

    useEffect(() => {
        fetchPhotos()
    }, [])

    if (isLoading) {
        return <Loader />
    }

    return (
        <View style={styles.wrap}>
            <Header navigation={navigation} pageName={pageName}>
                <Text style={styles.headerTitle}>{camera.title}</Text>
                <Text style={styles.headerDate}>{date.utsString}</Text>
            </Header>

            {Error ? <Text style={styles.warningText}>Something went wrong!</Text>
                : (photos.length > 0
                    ? <FlatList
                        horizontal={false}
                        numColumns={3}
                        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchPhotos} />}
                        style={styles.container}
                        data={photos}
                        renderItem={({ item }) =>
                            <TouchableOpacity onPress={() => navigation.navigate('Details', { id: item.id, pageName: 'details' })}>
                                <Photo item={item} />
                            </TouchableOpacity>
                        }>
                    </FlatList>
                    : <Text style={styles.warningText}>There are no photos for the requested and / or camera request!</Text>
                )
            }
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: '#DCCEBE',
        paddingLeft: 16,
        paddingRight: 16
    },

    container: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 16
    },

    warningText: {
        marginTop: 'auto',
        marginBottom: 'auto',
        color: 'red',
        fontFamily: 'Dosis-Regular',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '400',
        letterSpacing: 0.36,
        textAlign: 'center'
    },

    headerTitle: {
        color: '#000',
        fontFamily: 'Dosis-Bold',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 22,
    },

    headerDate: {
        color: '#000',
        fontFamily: 'Dosis-Regular',
        textAlign: 'center',
        fontSize: 13,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 22,
    }
})
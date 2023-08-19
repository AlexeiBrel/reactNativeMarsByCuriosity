import { View, Text, StyleSheet, FlatList, RefreshControl, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'

import PhotoService from '../api/PhotoService'
import { useFetching } from '../hooks/useFetching'
import { usePhotos } from '../context/photosContext'

import { Loader } from '../components/Loader'
import Header from '../components/Header'
import Photo from '../components/Photo'


const HomeScreen = ({ navigation, route }) => {
    const { pageName, camera, date } = route.params
    const { photos, setPhotos } = usePhotos()
    const [currentPage, setCurrentPage] = useState(1)
    const [isScreenOpen, setIsScreenOpen] = useState(true);
    const [isGlobalLoading, setIsGlobalLoading] = useState(true);

    const [fetchPhotos, isLoading, Error] = useFetching(async () => {
        const photosData = await PhotoService.getAll(camera.abbreviation, date.dateString, currentPage);
        setPhotos(prevPhotos => [...prevPhotos, ...photosData?.photos])
        setIsGlobalLoading(false)
    })

    console.log('setCurrentPage', currentPage);

    useEffect(() => {
        fetchPhotos()
    }, [currentPage])


    const loadMorePhotos = () => {
        setCurrentPage(prevPage => prevPage + 1)
    }


    const keyExtractor = (item) => item.id.toString()
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Details', { id: item.id, pageName: 'details' })}>
            <Photo item={item} />
        </TouchableOpacity>)


    if (isGlobalLoading) {
        return <Loader />
    }

    if (Error) {
        return <Text style={styles.warningText}>Something went wrong!</Text>
    }

    return (
        <View style={styles.wrap}>
            <Header navigation={navigation} pageName={pageName}>
                <Text style={styles.headerTitle}>{camera.title}</Text>
                <Text style={styles.headerDate}>{date.utsString}</Text>
            </Header>

            {photos.length > 0 ? (
                <FlatList
                    horizontal={false}
                    numColumns={3}
                    // refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchPhotos} />}
                    style={styles.container}
                    data={photos}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                    onEndReached={loadMorePhotos}
                    onEndReachedThreshold={0.25}
                />
            ) : (
                <View style={styles.noDataContainer}>
                    <Text style={styles.warningText}>No photos found for the selected date and/or camera!</Text>
                </View>
            )}
            {isLoading && <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />}
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

    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
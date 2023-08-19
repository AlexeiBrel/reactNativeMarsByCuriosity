import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const Header = ({ children, ...props }) => {
    return (
        <View style={[styles.header, { justifyContent: props.pageName !== 'select' ? 'space-between' : 'center' }]}>
            {props.pageName !== 'select'
                ? <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Image
                        style={styles.headerImg}
                        resizeMode="contain"
                        source={props.pageName !== 'details' ? require('../../assets/img/back.png') : require('../../assets/img/back-white.png')}
                    />
                </TouchableOpacity>
                : ''
            }
            <View style={styles.headerText}>
                {children}
            </View>
            {props.pageName !== 'select' && props.pageName !== 'home'
                ? <TouchableOpacity>
                    <Image
                        style={styles.headerImg}
                        resizeMode="contain"
                        source={require('../../assets/img/share.png')}
                    />
                </TouchableOpacity>
                : <View style={styles.headerImg}></View>
            }
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 42,
    },

    headerImg: {
        width: 24,
        height: 24,
    },

    headerText: {
        flexDirection: 'column',
        alignItems: 'center'
    }
})
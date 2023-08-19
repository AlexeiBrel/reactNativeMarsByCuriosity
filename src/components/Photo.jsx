import { Image, StyleSheet } from 'react-native'
import React, { memo } from 'react'


const Photo = memo((props) => {
    return (
        <Image
            style={styles.img}
            source={{ uri: `${props.item.img_src}` }} />
    )
})

export default Photo

const styles = StyleSheet.create({
    img: {
        width: 100,
        height: 100,
        borderRadius: 8,
        margin: 8
    }
})
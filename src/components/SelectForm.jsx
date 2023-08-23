import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Pressable, Platform } from 'react-native'
import React, { useState } from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import DateTimePicker from '@react-native-community/datetimepicker'
import { usePhotos } from '../context/photosContext'


const dataCamera = [
    { abbreviation: 'FHAZ', title: "Front Hazard Avoidance Camera" },
    { abbreviation: 'RHAZ', title: "Rear Hazard Avoidance Camera" },
    { abbreviation: 'MAST', title: "Mast Camera" },
    { abbreviation: 'CHEMCAM', title: "Chemistry and Camera Complex" },
    { abbreviation: 'MAHLI', title: "Mars Hand Lens Imager" },
    { abbreviation: 'MARDI', title: "Mars Descent Imager" },
    { abbreviation: 'NAVCAM', title: "Navigation Camera" },
    { abbreviation: 'PANCAM', title: "Panoramic Camera" },
    { abbreviation: 'MINITES', title: "Miniature Thermal Emission Spectrometer (Mini-TES)" }
]

const SelectForm = ({ navigation }) => {
    const { setPhotos } = usePhotos()
    const [camera, setCamera] = useState({})
    const [date, setDate] = useState(new Date())
    const [showPicker, setShowPicker] = useState(false)

    const formatTime = {
        dateString: date.toLocaleDateString('en-ca'),
        utsString: date.toUTCString().split(',')[1].substring(0, 12).trim()
    }

    const toggleDatePicker = () => {
        setShowPicker(!showPicker)
    }

    const onChange = ({ type }, selectedDate) => {
        if (Platform.OS === "android") {
            toggleDatePicker()
        }

        if (type === 'set') {
            const currentDate = selectedDate
            setDate(currentDate)

        } else {
            toggleDatePicker()
        }
    }

    const sendData = () => {
        navigation.navigate('Home', { pageName: 'home', camera, date: formatTime })
        setPhotos([])
    }

    return (
        <View style={styles.formWrap}>
            <View>
                <View style={styles.inputWrap}>
                    <Text style={styles.formLabel}>Rover Camera</Text>
                    <SelectDropdown
                        buttonStyle={styles.formInput}
                        buttonTextStyle={styles.btnTxtStyle}
                        rowTextStyle={styles.rowTxtStyle}

                        data={dataCamera}
                        defaultButtonText='Select camera'

                        onSelect={(selectedItem) => {
                            console.log(selectedItem.abbreviation)
                            setCamera(selectedItem)
                        }}

                        buttonTextAfterSelection={(selectedItem) => {
                            return selectedItem.title
                        }}

                        rowTextForSelection={(item) => {
                            return item.title
                        }}

                        renderDropdownIcon={isOpened => {
                            return (<Image
                                resizeMode="contain"
                                source={require('../../assets/img/dropdown.png')}
                            />);
                        }}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <Text style={styles.formLabel}>Date</Text>

                    <Pressable onPress={toggleDatePicker} style={styles.inputContent}>
                        <TextInput
                            style={styles.formInput}
                            editable={false}
                            onPressIn={toggleDatePicker}
                            // onChangeText={setDate}
                            value={date.toUTCString().split(',')[1].substring(0, 12).trim()}
                        />
                        <Image
                            style={styles.inputIcon}
                            source={require('../../assets/img/calendar.png')}
                        />
                    </Pressable>

                    {showPicker
                        && <DateTimePicker
                            mode='date'
                            display='spinner'
                            value={date}
                            onChange={onChange}
                        />
                    }
                </View>
                <TouchableOpacity style={styles.formBtn} onPress={sendData}>
                    <Text style={styles.btnText}>Explore</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SelectForm

const styles = StyleSheet.create({
    formWrap: {
        maxWidth: 330,
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto'
    },

    inputWrap: {
        marginBottom: 16
    },

    inputContent: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative'
    },

    inputIcon: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
        position: 'absolute',
        right: 12
    },

    formLabel: {
        color: '#000',
        fontFamily: 'Dosis-Regular',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        letterSpacing: 0.28,
        marginBottom: 7
    },

    formBtn: {
        borderRadius: 10,
        padding: 18,
        marginTop: 24,
        backgroundColor: '#BF2E0E',
    },

    btnText: {
        color: '#ffffff',
        textAlign: 'center',
        fontFamily: 'Dosis-Bold',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '600',
        letterSpacing: 0.36
    },

    formInput: {
        borderRadius: 10,
        opacity: 0.5,
        backgroundColor: '#ffffff',
        width: '100%',
        height: 60,
        paddingLeft: 18,
        color: '#000',
        fontFamily: 'Dosis-Regular',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '400',
        letterSpacing: 0.36,
    },

    btnTxtStyle: {
        color: '#000',
        fontFamily: 'Dosis-Regular',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '400',
        letterSpacing: 0.36,
        textAlign: 'left'
    },

    rowTxtStyle: {
        textAlign: 'left'
    }
})
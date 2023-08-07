import { Text, View, ActivityIndicator } from 'react-native';

export const Loader = () => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <ActivityIndicator size="large" />
            <Text style={{ marginTop: 10, color: '#000000' }}>Loading</Text>
        </View>
    );
};
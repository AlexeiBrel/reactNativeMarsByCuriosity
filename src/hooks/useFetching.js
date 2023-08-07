import { useState } from "react"
import { Alert } from "react-native";

export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetching = async () => {
        try {
            setIsLoading(true)
            await callback()
        } catch (error) {
            setError(error.message)
            // Alert.alert('Error', 'Something went wrong!')
        } finally {
            setIsLoading(false)
        }
    }

    return [fetching, isLoading, error]
}
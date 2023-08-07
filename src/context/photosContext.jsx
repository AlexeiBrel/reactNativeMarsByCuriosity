import { createContext, useContext, useState } from "react";


const PhotoContext = createContext()

export const usePhotos = () => {
    return useContext(PhotoContext)
}

export const PhotosProvider = ({ children }) => {
    const [photos, setPhotos] = useState([])

    return (
        <PhotoContext.Provider value={{ photos, setPhotos }}>
            {children}
        </PhotoContext.Provider>
    )
}
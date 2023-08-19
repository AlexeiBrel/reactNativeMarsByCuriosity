import axios from "axios";

export default class PhotoService {
    static async getAll(camera, date, page) {
        const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?camera=${camera}&earth_date=${date}&page=${page}&api_key=8vxqvdEEKb8qbWg0HyPoAACNIEXjsoHiKALwqPFX`);
        return response.data
    }
}

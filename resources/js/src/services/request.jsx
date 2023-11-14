import axios from 'axios';

export const URL = "http://62.72.19.228:8081/"

const request = axios.create({
    baseURL: URL,
    withCredentials: false,
    headers: {
        'Accept':'application/json',
        "Content-Type":"multipart/form-data"
        //'Content-Type': 'application/json'
    },
});



export default request
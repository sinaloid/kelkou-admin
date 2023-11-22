import axios from 'axios';
import { getUser } from './storage';
import { useContext } from 'react';

export const URL = "https://kelkou.fasodigi.com/"
//export const URL = "http://127.0.0.1:8000/"

const authCtx = useContext(AppContext);
const { user } = authCtx;

//const user = getUser()
//console.log(user)
const request = axios.create({
    baseURL: URL+"api/",
    //withCredentials: false,
    headers: {
        'Accept':'application/json',
        "Content-Type":"multipart/form-data",
        'Authorization' : `Bearer ${user?.token}`,
    },
});



export default request
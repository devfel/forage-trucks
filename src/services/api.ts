import axios from 'axios';

const api = axios.create({
    //dev URL 
    //baseURL: 'http://localhost:3333',

    //Production URL
    baseURL: 'https://forage-trucks-backend.herokuapp.com',
});

export default api;
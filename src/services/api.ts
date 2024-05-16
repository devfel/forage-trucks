import axios from "axios";

const api = axios.create({
  //dev URL
  //baseURL: 'http://localhost:3333',

  //Production URL 1
  // baseURL: 'https://forage-trucks-backend.herokuapp.com',

  //Production URL 2
  baseURL: "https://forage-trucks-backend.adaptable.app",
});

export default api;

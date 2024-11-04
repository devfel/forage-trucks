import axios from "axios";

const api = axios.create({
  //dev URL
  //baseURL: 'http://localhost:3333',

  //Production URL 1 - Heroku
  // baseURL: 'https://forage-trucks-backend.herokuapp.com',

  //Production URL 2 - Adaptable.io
  // baseURL: "https://forage-trucks-backend.adaptable.app",

  //Production URL 3 - Amazon AWS EC2 Docker
  // baseURL: "http://54.87.16.232:3000",

  //Production URL 4 - Amazon AWS EC2 Docker - With NGINX and LEts Encrypt
  baseURL: "https://foragetrucksbackend.devfel.com",
});

export default api;

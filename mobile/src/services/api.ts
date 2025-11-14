import axios from "axios";

export const api = axios.create({
    baseURL: "http://192.168.38.132:3333", // verificar o endereço ip
    timeout: 1000
})
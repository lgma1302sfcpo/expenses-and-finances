import axios from "axios";

const client = axios.create({
    baseURL: "http://192.168.1.217:4000/api", // 👈 usa seu IP local
});

export default client;

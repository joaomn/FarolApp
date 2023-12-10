import  Axios  from "axios";

const request = Axios.create({
    baseURL: "http://192.168.0.13:8080/api/"
});

export default request;
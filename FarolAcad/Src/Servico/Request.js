import  Axios  from "axios";

const request = Axios.create({
    baseURL: "https://719b-2804-29b8-5207-675-75b8-3fb2-248f-937a.ngrok.io/api/"
});

export default request;
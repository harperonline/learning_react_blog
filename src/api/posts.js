import axios from "axios";
//this is where you define the API endpoint to Axios
export default axios.create({
    baseURL: 'http://localhost:3500'
});
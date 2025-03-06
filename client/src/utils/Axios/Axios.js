import axios from "axios";

const instance = axios.create({
  baseURL: "https://mebel-for-versel.vercel.app/",
});
export default instance;

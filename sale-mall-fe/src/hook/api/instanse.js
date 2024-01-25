import axios from "axios";

const instanse = axios.create({
  baseURL: "http://localhost:8000/api/v1",
});
export default instanse;

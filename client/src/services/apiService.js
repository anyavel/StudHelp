import axios from "axios";
import { baseURL } from "../configs";

export const apiService = axios.create({ baseURL });
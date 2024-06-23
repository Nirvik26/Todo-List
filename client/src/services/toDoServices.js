import axios from "axios";
import { getUserDetails } from "../util/GetUser";

const SERVER_URL = "http://localhost:5000/api";

const authHeaders = () => {
  let userToken = getUserDetails()?.token;
  return { headers: { Authorization: userToken } };
};

const createToDo = (data) => {
  return axios.post(SERVER_URL + "/todo/create-to-do", data, authHeaders());
};

const getAllToDo = (userId) => {
  return axios.get(SERVER_URL + `/todo/get-all-to-do/` + userId, authHeaders());
};

const deleteToDo = (id) => {
  return axios.delete(SERVER_URL + `/todo/delete-to-do/` + id, authHeaders());
};

const updateToDo = (id, data) => {
  return axios.patch(
    SERVER_URL + `/todo/update-to-do/` + id,
    data,
    authHeaders()
  );
};

const ToDoServices = { 
  createToDo,
  getAllToDo,
  deleteToDo,
  updateToDo,
};

export default ToDoServices;

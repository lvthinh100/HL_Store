import axios from "axios";
const url = "http://localhost:3000";

export const signup = async (user) =>
  axios.post(`${url}/api/users/signup`, user, { withCredentials: true });

export const login = async (email, password) =>
  axios.post(
    `${url}/api/users/login`,
    { email, password },
    { withCredentials: true }
  );
export const logout = async () =>
  axios.get(`${url}/api/users/logout`, { withCredentials: true });

export const addressAPI = {
  async getAllProvinces() {
    return axios.get(`${url}/api/provinces`);
  },
  async getDistricts(province) {
    return axios.get(`${url}/api/provinces/district/${province}`);
  },
  async getWards(province, district) {
    return axios.get(`${url}/api/provinces/ward/${province}/${district}`);
  },
};

//Code do qua lam lai di

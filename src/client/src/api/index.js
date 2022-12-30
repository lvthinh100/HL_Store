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

export const createProduct = async (data) =>
  axios.post(`${url}/api/products`, data);

export const updateProduct = async (id, data) =>
  axios.patch(`${url}/api/products/${id}`, data);

export const getAllProducts = async () => axios.get(`${url}/api/products`);
export const getProductDetail = async (id) =>
  axios.get(`${url}/api/products/${id}`);
export const postComment = async (data) =>
  axios.post(`${url}/api/comments`, data, { withCredentials: true });
export const updateCart = async (cart) =>
  axios.patch(
    `${url}/api/users/updateCart`,
    { cart },
    { withCredentials: true }
  );

export const getCart = async () =>
  axios.get(`${url}/api/users/getCart`, { withCredentials: true });

export const createOrder = async (shippingInfo) =>
  axios.post(`${url}/api/orders/`, shippingInfo, {
    withCredentials: true,
  });
export const getOrders = async () =>
  axios.get(`${url}/api/orders`, { withCredentials: true });

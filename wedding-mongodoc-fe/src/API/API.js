import axios from "axios";
//local
const URL_PREFIX = "http://localhost:3001";
//deploy
// const URL_PREFIX = "https://mymoney-tracker-backend.herokuapp.com"

const API = {
  // ---------------- User Routes ---------------- //

  login: (usrData) => {
    return axios.post(`${URL_PREFIX}/api/users/login`, usrData, {
      withCredentials: true,
    });
  },

  me: () => {
    return axios.get(`${URL_PREFIX}/api/users/me`, { withCredentials: true });
  },

  logout: () => {
    return axios.get(`${URL_PREFIX}/api/users/logout`, {
      withCredentials: true,
    });
  },

  update: (data) => {
    return axios.put(`${URL_PREFIX}/api/users`, data, {
      withCredentials: true,
    });
  },

  signup: (data) => {
    return axios.post(`${URL_PREFIX}/api/users`, data);
  },

  delete: () => {
    return axios.delete(`${URL_PREFIX}/api/users`, { withCredentials: true });
  },

  // ---------------- Wedding Routes ---------------- //

  createWedding: (data) => {
    return axios.post(`${URL_PREFIX}/api/weddings/createwedding`, data, {
      withCredentials: true,
    });
  },

  updateWedding: (weddingId, data) => {
    return axios.put(
      `${URL_PREFIX}/api/weddings/updatewedding/${weddingId}`,
      data,
      { withCredentials: true }
    );
  },

  deleteWedding: (weddingId) => {
    return axios.delete(
      `${URL_PREFIX}/api/weddings/deletewedding/${weddingId}`,
      {
        withCredentials: true,
      }
    );
  },

  // ---------------- Party Routes ---------------- //

  createParty: (weddingId, data) => {
    return axios.post(
      `${URL_PREFIX}/api/weddings/createparty/${weddingId}`,
      data,
      {
        withCredentials: true,
      }
    );
  },

  updateParty: (weddingId, partyId, data) => {
    return axios.put(
      `${URL_PREFIX}/api/weddings/updateparty/${weddingId}/${partyId}`,
      data,
      {
        withCredentials: true,
      }
    );
  },

  deleteParty: (weddingId, partyId) => {
    return axios.delete(
      `${URL_PREFIX}/api/weddings/deleteparty/${weddingId}/${partyId}`,
      { withCredentials: true }
    );
  },

  // ---------------- Guest Routes ---------------- //

  createGuest: (weddingId, partyId, data) => {
    return axios.post(
      `${URL_PREFIX}/api/weddings/createguest/${weddingId}/${partyId}`,
      data,
      { withCredentials: true }
    );
  },

  updateGuest: (weddingId, partyId, guestId, data) => {
    return axios.put(
      `${URL_PREFIX}/api/weddings/updateguest/${weddingId}/${partyId}/${guestId}`,
      data,
      { withCredentials: true }
    );
  },

  deleteGuest: (weddingId, partyId, guestId) => {
    return axios.delete(
      `${URL_PREFIX}/api/weddings/deleteguest/${weddingId}/${partyId}/${guestId}`,
      { withCredentials: true }
    );
  },

  // ---------------- Gift Routes ---------------- //

  createGift: (weddingId, partyId, guestId, data) => {
    return axios.post(
      `${URL_PREFIX}/api/weddings/creategift/${weddingId}/${partyId}/${guestId}`,
      data,
      { withCredentials: true }
    );
  },

  updateGift: (weddingId, partyId, guestId, giftId, data) => {
    return axios.put(
      `${URL_PREFIX}/api/weddings/updategift/${weddingId}/${partyId}/${guestId}/${giftId}`,
      data,
      { withCredentials: true }
    );
  },

  deleteGift: (weddingId, partyId, guestId, giftId) => {
    return axios.delete(
      `${URL_PREFIX}/api/weddings/deletegift/${weddingId}/${partyId}/${guestId}/${giftId}`,
      { withCredentials: true }
    );
  },
};

export default API;

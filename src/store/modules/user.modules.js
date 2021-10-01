import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

const state = {
  AllUsersList: [],
  token_value: {},
  email: "",
  password: "",
  role: "",
  loginDetails: "",
};

const getters = {
  AbstractToken() {
    return state.token_value;
  },

  getLogindata() {
    return state.loginDetails;
  },

  GetAllUser() {
    return state.AllUsersList;
  },
};

const mutations = {
  ALLUSERSLIST(state, payload) {
    state.AllUsersList = payload;
  },

  NEW_USER_DATA(state, payload) {
    (state.email = payload.username),
      (state.password = payload.password),
      (state.role = payload.role);
  },

  async LOGIN_USER_DETAILS(state, response) {
    localStorage.setItem("TokenForVote", response);
    state.response = response;
    function parseJwt(response) {
      var base64Url = response.split(".")[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      var jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function(c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      let userStr = JSON.stringify(JSON.parse(jsonPayload));
      localStorage.setItem("TokenValue", userStr);
      return JSON.parse(jsonPayload);
    }

    state.token_value = parseJwt(response);

    if (response) {
      if (response.error === 0) {
        state.loginDetails = "stepUp";
      } else if (response.data === "user not exists") {
        state.loginDetails = "user not found please try again";
        alert("user not found");
      }
    }
  },
};

const actions = {
  async allUsers({ commit }) {
    try {
      let result = await axios.get(
        `https://secure-refuge-14993.herokuapp.com/list_users`
      );

      commit("ALLUSERSLIST", result.data.data);
    } catch (error) {
      console.log(error);
    }
  },

  async newUserData({ commit }, payload) {
    try {
      const SignUpResp = await axios.post(
        `https://secure-refuge-14993.herokuapp.com/add_user?username=${payload.username}&password=${payload.password}&role=${payload.role}`
      );

      commit("NEW_USER_DATA", SignUpResp);
      return SignUpResp;
    } catch (error) {
      return error;
    }
  },

  async LoginUserDetails({ commit }, payload) {
    if (payload) {
      const res = await axios.get(
        `https://secure-refuge-14993.herokuapp.com/login?username=${payload.username}&password=${payload.password}`
      );

      if (res.data.token) {
        await commit("LOGIN_USER_DETAILS", res.data.token);
      }
      return res;
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

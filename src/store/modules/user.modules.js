const state = {
  email: "",
  password: "",
  role: "",
  loginDetails: {
    email: "",
    password: "",
  },
};

const mutations = {
  NEW_USER_DATA(state, payload) {
    (state.email = payload.email), (state.password = payload.password);
    // console.log(payload)
    state.role = payload.role;
  },
  LOGIN_USER_DETAILS(state, payload) {
    (state.loginDetails.email = payload.username),
      (state.loginDetails.password = payload.password);
    console.log("ye haiii", state.loginDetails);
  },
};

const actions = {
  newUserData({ commit }, payload) {
    commit("NEW_USER_DATA", payload);
    console.log(payload);
  },

  LoginUserDetails({ commit }, payload) {
    commit("LOGIN_USER_DETAILS", payload);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

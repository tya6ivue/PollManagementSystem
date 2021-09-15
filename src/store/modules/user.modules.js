import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

const state = {
  email: "",
  password: "",
  role: "",
  loginDetails: {
    email: "",
    password: "",
  },
  // newPollsDetails: {
  //   Title: "",
  //   PollOption: "",
  // },
};

const mutations = {
  NEW_USER_DATA(state, payload) {
    (state.email = payload.email), (state.password = payload.password);
    state.role = payload.role;
    // console.log(payload)
    axios.post(
      `https://secure-refuge-14993.herokuapp.com/add_user?username=admin&password=admin&role=admin`,
      payload
    );
    // .then((result) => {
    //   console.log(result);
    // }
    // );
  },
  LOGIN_USER_DETAILS(state, payload) {
    (state.loginDetails.email = payload.username),
      (state.loginDetails.password = payload.password);
    // console.log("ye haiii", state.loginDetails);
  },
  // ADD_POLL_DATA(state, payload) {
  //   (state.newPollsDetails.Title = payload.Title),
  //     (state.newPollsDetails.PollOption = payload.PollOption),
  //     console.log(state.newUserData);

  //   axios.post(
  //     `https://secure-refuge-14993.herokuapp.com/add_poll?title=first%20polll&options=opt1____opt2____opt3____opt4`,
  //     payload
  //   );
  //   // .then((result) => {
  //   //   // console.log(result);
  //   // });
  // },
};

const actions = {
  newUserData({ commit }, payload) {
    axios
      .post(
        `https://secure-refuge-14993.herokuapp.com/login?username=${payload}`
      )
      .then((result) => {
        console.log(result);
        commit("NEW_USER_DATA", payload);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  LoginUserDetails({ commit }, payload) {
    commit("LOGIN_USER_DETAILS", payload);
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

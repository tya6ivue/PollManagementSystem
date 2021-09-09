import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(axios, VueAxios);

const state = {
  newPollsDetails: {
    Title: "",
    PollOption: "",
  },
};

const mutations = {
  ADD_POLL_DATA(state, payload) {
    (state.newPollsDetails.Title = payload.Title),
      (state.newPollsDetails.PollOption = payload.PollOption),
      console.log(state.newPollsDetails);

    axios.post( `https://secure-refuge-14993.herokuapp.com/add_poll?title=${payload.title}&options=${payload.allOptions}`,
      payload
    );
    // .then((result) => {
    //   // console.log(result);
    // });
  },
  REMOVE_POLL() {
    axios
      .post(
        "https://secure-refuge-14993.herokuapp.com/delete_poll?id=577212fdd1bba33c17b5b64e"
      )
      .then((result) => {
        console.log(result);
      });
  },
};

const actions = {
  EditPoll({ commit }, payload) {
    commit("EDIT_POLL", payload);
  },
  AddPollsData({ commit }, payload) {
    commit("ADD_POLL_DATA", payload);
    console.log("ye haiii");
  },
  RemovePoll({ commit }, payload) {
    commit("REMOVE_POLL", payload);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

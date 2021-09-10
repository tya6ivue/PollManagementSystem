import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(axios, VueAxios);

const state = {
  newPollsDetails: {
    Title: "",
    PollOption: "",
  },
  selectedPoll: [],
  PollData: [],
};

const getters = {
  getPollData() {
    // console.log(state.PollData);
    return state.PollData;
  },

  getSellectedVal() {
    // console.log(state.selectedPoll);
    return state.selectedPoll;
  },
};

const mutations = {
  ADD_POLL_DATA(state, payload) {
    (state.newPollsDetails.Title = payload.Title),
      (state.newPollsDetails.PollOption = payload.PollOption),
      // console.log(state.newPollsDetails);

      axios
        .post(
          `https://secure-refuge-14993.herokuapp.com/add_poll?title=${payload.Title}&options=${payload.PollOption}`,
          payload
        )
        .then((result) => {
          console.log(result);
        });
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

  DELETE_OPTION() {
    axios.delete(
      "https://secure-refuge-14993.herokuapp.com/delete_poll_option?id=577212fdd1bba33c17b5b64e&option_text=java"
    );
    // .then((result) => {
    //   // console.log(result);
    // });
  },
  UPDATED_TITLE() {
    axios.post(
      "https://secure-refuge-14993.herokuapp.com/update_poll_title?id=577212fdd1bba33c17b5b64e&title=newtitle"
    );
    // .then((result) => {
    //   // console.log(result);
    // });
  },

  FETCH_POLL_WITH_ID(state, payload) {
    state.selectedPoll = payload;
  },

  GET_ALL_POLLS(state, payload) {
    state.PollData = payload;
    // console.log(state.PollData);
  },
};

const actions = {
  EditPoll({ commit }, payload) {
    commit("EDIT_POLL", payload);
  },
  AddPollsData({ commit }, payload) {
    commit("ADD_POLL_DATA", payload);
    // console.log("ye haiii");
  },
  RemovePoll({ commit }, payload) {
    commit("REMOVE_POLL", payload);
  },

  deleteOption({ commit }, payload) {
    commit("DELETE_OPTION", payload);
  },
  updatedTitle({ commit }, payload) {
    commit("UPDATED_TITLE", payload);
  },

  fetchPollWithId({ commit }, payload) {
    if (payload) {
      axios
        .get(
          `https://secure-refuge-14993.herokuapp.com/list_poll?id=${payload}`
        )
        .then((response) => {
          // console.log("sdfghjhgfdf");
          commit("FETCH_POLL_WITH_ID", response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },

  getAllPolls({ commit }) {
    console.log("action called");
    axios
      .get(
        `https://secure-refuge-14993.herokuapp.com/list_polls?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWEwMTgyYzU5NTI3ZmUwMDEyMzcwN2IyIiwiaWF0IjoxNTEwMDQ4NDY4LCJleHAiOjE1MTM2NDg0Njh9.DG93Hq-Fde9kNZbgnr34l2dZyeEYyJ0OfD_9yZK1JCQ`
      )
      .then((response) => {
        // console.log('fetching response')
        console.log(response);
        let data = response.data.data;
        // console.log(data);
        commit("GET_ALL_POLLS", data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};

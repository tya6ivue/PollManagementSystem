import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(axios, VueAxios);

const state = {
  title: "",
  id: "",
  updated_title: "",
  newPollsDetails: {
    Title: "",
    PollOption: "",
  },
  PollData: [],

  selectedPoll: [],
};

const getters = {
  getPollData() {
    return state.PollData;
  },

  getSellectedVal() {
    return state.selectedPoll;
  },

  GetUpdatedTitle() {
    return state.updated_title;
  },
};

const mutations = {
  ADD_OPTION(state, payload) {
    state.selectedPoll.options.push(payload);
  },

  ADD_POLL_DATA(state, payload) {
    (state.newPollsDetails.Title = payload.Title),
      (state.newPollsDetails.PollOption = payload.PollOption);
  },

  DELETE_OPTION() {
    axios
      .delete(
        "https://secure-refuge-14993.herokuapp.com/delete_poll_option?id=577212fdd1bba33c17b5b64e&option_text=java"
      )
      .then((result) => {
        console.log(result);
      });
  },
  UPDATED_TITLE(state, payload) {
    state.selectedPoll.title = payload.title;
  },

  FETCH_POLL_WITH_ID(state, payload) {
    state.selectedPoll = payload;
  },

  GET_ALL_POLLS(state, payload) {
    state.PollData = payload;
  },
  REMOVE_OPTION(state, payload) {
    const indexValue = state.selectedPoll.options.findIndex(
      (el) => el.option === payload.index
    );

    state.selectedPoll.options.splice(indexValue, 1);
  },

  REMOVE_POLL(responce) {
    console.log(responce);
  },
};

const actions = {
  async voteApoll({ commit }, payload) {
    const AbsTToken = localStorage.getItem("TokenForVote");

    let headers = {
      "Content-Type": "application/json",
      access_token: AbsTToken,
    };

    axios
      .get(
        `https://secure-refuge-14993.herokuapp.com/do_vote?id=${payload.id._id}&option_text=${payload.option_text}`,
        { headers }
      )
      .then((result) => {
        console.log(result);
      });

    commit("VOTE_A_POLL", payload);
  },

  EditPoll({ commit }, payload) {
    commit("EDIT_POLL", payload);
  },

  async AddPollsData({ commit }, payload) {
    await axios
      .post(
        `https://secure-refuge-14993.herokuapp.com/add_poll?title=${payload.title}&options=${payload.allOptions}`,
        payload
      )
      .then((result) => {
        console.log(result);
      });

    commit("ADD_POLL_DATA", payload);
  },
  async RemovePolll({ commit }, payload) {
    if (payload) {
      const RemoveRes = await axios.delete(
        `https://secure-refuge-14993.herokuapp.com/delete_poll?id=${payload._id}`
      );

      commit("REMOVE_POLL", RemoveRes);

      return RemoveRes;
    }
  },

  deleteOption({ commit }, payload) {
    commit("DELETE_OPTION", payload);
  },
  async updatedPollTitle({ commit }, payload) {
    await axios
      .post(
        `https://secure-refuge-14993.herokuapp.com/update_poll_title?id=${payload.id._id}&title=${payload.title}`
      )
      .then();
    commit("UPDATED_TITLE", payload);
  },

  async removeOption({ commit }, payload) {
    if (payload) {
      await axios
        .delete(
          `https://secure-refuge-14993.herokuapp.com/delete_poll_option?id=${payload.id._id}&option_text=${payload.index}`
        )
        .then((result) => {
          console.log(result);
          commit("REMOVE_OPTION", payload);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },

  fetchPollWithId({ commit }, payload) {
    if (payload) {
      axios
        .get(
          `https://secure-refuge-14993.herokuapp.com/list_poll?id=${payload}`
        )
        .then((response) => {
          commit("FETCH_POLL_WITH_ID", response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },

  getAllPolls({ commit }) {
    axios
      .get(
        `https://secure-refuge-14993.herokuapp.com/list_polls?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWEwMTgyYzU5NTI3ZmUwMDEyMzcwN2IyIiwiaWF0IjoxNTEwMDQ4NDY4LCJleHAiOjE1MTM2NDg0Njh9.DG93Hq-Fde9kNZbgnr34l2dZyeEYyJ0OfD_9yZK1JCQ`
      )
      .then((response) => {
        let data = response.data.data;
        commit("GET_ALL_POLLS", data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  AddOtion({ commit }, payload) {
    axios
      .get(
        `https://secure-refuge-14993.herokuapp.com/add_new_option?id=${payload.id._id}&option_text=${payload.option}`
      )
      .then((responce) => {
        console.log(responce);
        commit("ADD_OPTION", payload);
        console.log(payload);
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

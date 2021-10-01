import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(axios, VueAxios);

const state = {
  title: "",
  id: "",
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
};

const mutations = {
  DUMMY_COMMIT() {},

  ADD_OPTION(state, payload) {
    state.selectedPoll.options.push(payload);
  },

  ADD_POLL_DATA(state, payload) {
    (state.newPollsDetails.Title = payload.Title),
      (state.newPollsDetails.PollOption = payload.PollOption);
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
};

const actions = {
  async voteApoll({ commit }, payload) {
    try {
      const AbsTToken = localStorage.getItem("TokenForVote");

      let headers = {
        "Content-Type": "application/json",
        access_token: AbsTToken,
      };

      await axios.get(
        `https://secure-refuge-14993.herokuapp.com/do_vote?id=${payload.id._id}&option_text=${payload.option_text}`,
        { headers }
      );
      commit("DUMMY_COMMIT", payload);
    } catch (error) {
      console.log(error);
    }
  },

  async AddPollsData({ commit }, payload) {
    await axios.post(
      `https://secure-refuge-14993.herokuapp.com/add_poll?title=${payload.title}&options=${payload.allOptions}`,
      payload
    );

    commit("ADD_POLL_DATA", payload);
  },
  async RemovePolll({ commit }, payload) {
    if (payload) {
      const RemoveRes = await axios.delete(
        `https://secure-refuge-14993.herokuapp.com/delete_poll?id=${payload._id}`
      );

      commit("DUMMY_COMMIT", RemoveRes);

      return RemoveRes;
    }
  },

  async updatedPollTitle({ commit }, payload) {
    await axios.post(
      `https://secure-refuge-14993.herokuapp.com/update_poll_title?id=${payload.id._id}&title=${payload.title}`
    );
    commit("UPDATED_TITLE", payload);
  },

  async removeOption({ commit }, payload) {
    if (payload) {
      await axios.delete(
        `https://secure-refuge-14993.herokuapp.com/delete_poll_option?id=${payload.id._id}&option_text=${payload.index}`
      );
      commit("REMOVE_OPTION", payload);
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
  async AddOtion({ commit }, payload) {
    try {
      await axios.get(
        `https://secure-refuge-14993.herokuapp.com/add_new_option?id=${payload.id._id}&option_text=${payload.option}`
      );
      commit("ADD_OPTION", payload);
    } catch (error) {
      console.log(error);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};

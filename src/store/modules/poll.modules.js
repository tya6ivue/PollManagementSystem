import vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(axios, VueAxios);

const store = {};

const mutations = {
  EDIT_POLL() {},
  ADD_NEW_POLL() {},
  REMOVE_POLL() {
    axios
      .post(
        "https://secure-refuge-14993.herokuapp.com/delete_poll?id=577212fdd1bba33c17b5b64e",
        payload
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
  AddNewPoll({ commit }, payload) {
    commit("ADD_NEW_POLL", payload);
  },
  RemovePoll({ commit }, payload) {
    commit("REMOVE_POLL", payload);
  },
};

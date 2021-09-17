import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

const state = {
  email: "",
  password: "",
  role: "",
  loginDetails: "",
  // newPollsDetails: {
  //   Title: "",
  //   PollOption: "",
  // },
};

const getters = {
    getLogindata() {
      console.log(state.loginDetails)
      return state.loginDetails
    }
}


const mutations = {
  NEW_USER_DATA(state, payload) {
     state.email = payload.username,
     state.password = payload.password,
     state.role  = payload.role
      //  console.log(payload)
      //  console.log(state)
  },
  LOGIN_USER_DETAILS(state, response) {
    // console.log("yaha tak to thik hai")

      if(response) {
          if(response.error === 0) {
                // console.log("all good"),
                (state.loginDetails = "stepUp")

          } 
        else if(response.data === "user not exists") {
                   state.loginDetails = "user not found please try again"
                //  console.log("user not found")
        }
      }



  
    
   
  },
  
};

const actions = {
  newUserData({ commit }, payload) {
    console.log(payload)
    axios
      .post(
        `https://secure-refuge-14993.herokuapp.com/add_user?username=${payload.username}&password=${payload.password}&role=${payload.role}`
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

   if (payload) {
      axios
        .get(
          `https://secure-refuge-14993.herokuapp.com/login?username=${payload.username}&password=${payload.password}`
        )
        .then((response) => {
          console.log(response.data);
          commit("LOGIN_USER_DETAILS", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

import Vue from 'vue'
import Vuex from 'vuex'

import poll from './modules/poll.modules'
import user from './modules/user.modules'

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        poll,
        user
    }
})

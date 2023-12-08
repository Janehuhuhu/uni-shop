import Vue from 'vue'
import Vuex from 'vuex'
import mCart from './cart'
import mUser from './user'

Vue.use(Vuex)
const store = new Vuex.Store({
	modules: {
		m_cart: mCart,
		m_user: mUser
	}
})

export default store

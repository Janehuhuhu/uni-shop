export default {
	namespaced: true,
	
	state: () => ({
		address: {}
	}),
	
	mutations: {
		saveToStorage(state) {
			uni.setStorageSync('user', JSON.stringify(state.address))
		},
		updateAddress(state, address) {
			state.address = address
			this.commit('m_user/saveToStorage')		
		}
	},
	
	getters: {
		addstr(state) {
			if (!state.address.provinceName) return ''
			
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
		}
	}
}
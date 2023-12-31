export default {
	namespaced: true,
	
	state: () => ({
		// 购物车的数组，用来存储购物车中每个商品的信息对象
		// 每个商品的信息对象，包含如下属性：
		// { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	
	mutations: {
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		addToCart(state, goods) {
			const res = state.cart.find(item => item.goods_id === goods.goods_id)
			if (!res) {
				state.cart.push(goods)
			} else {
				res.goods_count++
			}
			this.commit('m_cart/saveToStorage')
		},
		updateGoodsState(state, goods) {
			const res = state.cart.find(item => item.goods_id === goods.goods_id)
			if (res) {
				res.goods_state = goods.goods_state
			}
			this.commit('m_cart/saveToStorage')
		},
		updateGoodsCount(state, goods) {
			const res = state.cart.find(item => item.goods_id === goods.goods_id)
			if (res) {
				res.goods_count = goods.goods_count
			}
			this.commit('m_cart/saveToStorage')
		},
		removeGoodsById(state, goods_id) {
			state.cart = state.cart.filter(item => item.goods_id !== goods_id)
			this.commit('m_cart/saveToStorage')
		},
		updateAllGoodsState(state, newState) {
			state.cart.forEach(item => item.goods_state = newState)
			this.commit('m_cart/saveToStorage')
		}
	},
	
	getters: {
		total(state) {
			let count = 0
			state.cart.forEach(item => count += item.goods_count)
			return count
		},
		checkedCount(state) {
			return state.cart.filter(item => item.goods_state).reduce((pre, cur) => pre += cur.goods_count, 0)
		},
		checkedGoodsAmount(state) {
			return state.cart.filter(item => item.goods_state).reduce((pre, cur) => 
				pre += cur.goods_count * cur.goods_price, 0).toFixed(2)
		}
	}
}
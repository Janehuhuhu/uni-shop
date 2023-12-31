import { mapGetters } from 'vuex'

export default {
	computed: {
		...mapGetters('m_cart', ['total'])
	},
	
	onShow() {
		this.setBadge()
	},
	
	watch: {
		total() {
			this.setBadge()
		}
	},
	
	methods: {
		setBadge() {
			this.total !== null && uni.setTabBarBadge({
				index: 2,
				text: this.total + ''
			})
		}
	}
}
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
			console.log('sss', this.total)
			this.total && uni.setTabBarBadge({
				index: 2,
				text: this.total + ''
			})
		}
	}
}
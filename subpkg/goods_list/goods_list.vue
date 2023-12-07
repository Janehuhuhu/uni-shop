<template>
	<view>
		<view @click="gotoDetail(item)" v-for="(item, index) in goodsList" :key="index">
			<my-goods :goods="item"></my-goods>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj: {
					// 关键字
					query: '',
					// 商品分类id
					cid: '',
					pageNum: 1,
					pageSize: 10,
				},
				total: 0,
				goodsList: [],
				isLoading: false
			}
		},
		onLoad(options) {
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			this.getGoodsList()
		},
		onReachBottom() {
			// 判断是否还有下一页数据
			if (this.queryObj.pageNum * this.queryObj.pageSize >= this.total) {
				return uni.showToast({
					title: "数据加载完毕",
					duration: 1500,
					icon: 'none'
				})
			}
			// 节流，判断是否正在请求数据，如是，则不发起额外请求
			if (this.isLoading) return
			this.queryObj.pageNum++
			this.getGoodsList()
		},
		onPullDownRefresh() {
			this.queryObj.pageNum = 1
			this.total = 0
			this.goodsList = []
			this.isLoading = false
			
			this.getGoodsList(() => uni.stopPullDownRefresh())
		},
		methods: {
			async getGoodsList(cb) {
				this.isLoading = true
				const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				this.isLoading = false
				
				cb && cb()
				
				if (res.meta.status !== 200) {
					return uni.showToast({
						title: "数据请求失败",
						duration: 1500,
						icon: 'none'
					})
				}
				this.goodsList = [...this.goodsList, ...res.message.goods]
				this.total = res.message.total
			},
			gotoDetail(item) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			}
		}
	}
</script>

<style>

</style>

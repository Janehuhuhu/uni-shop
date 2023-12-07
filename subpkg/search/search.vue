<template>
	<view>
		<view class="search-box">
			<uni-search-bar @input="input" :radius="100" cancel-button="none"></uni-search-bar>
		</view>
		<!-- 搜索建议 -->
		<view v-if="searchResults.length" class="sugg-list">
			<view @click="gotoDetail(item.goods_id)" class="sugg-item" v-for="(item, index) in searchResults" :key="index">
				<text  class="sugg-item-name">{{item.goods_name}}</text>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view v-else class="history-box">
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="clean"></uni-icons>
			</view>
			<view class="history-list">
				<uni-tag class="tag" v-for="(item, index) in histories" :key="index" :text="item" @click="getGoodsList(kw)"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null,
				searchResults: [],
				kw: '',
				historyList: []
			};
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
		},
		computed: {
			histories() {
				return [...this.historyList].reverse()
			}
		},
		methods: {
			input(e) {
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.kw = e
					this.getSearchList()
					this.saveSearchHistory()
				}, 500)
			},
			async getSearchList() {
				if (this.kw === '') {
					this.searchResults = []
					return
				}
				const {data: res} = await uni.$http.get('/api/public/v1/goods/qsearch', {query: this.kw})
				if (res.meta.status !== 200) {
					return uni.showToast({
						title: "数据请求失败",
						duration: 1500,
						icon: 'none'
					})
				}
				this.searchResults = res.message
			},
			gotoDetail(id) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + id
				})
			},
			saveSearchHistory() {
				const set = new Set(this.historyList)
				set.delete(this.kw)
				set.add(this.kw)
				this.historyList = Array.from(set)
				uni.setStorageSync('kw', JSON.stringify(this.historyList))
			},
			clean() {
				this.historyList = []
				uni.removeStorage('kw')
				// uni.setStorageSync('kw', '[]')
			},
			getGoodsList(kw) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?query=' + kw
				})
			}
		}
	}
</script>

<style lang="scss">
.search-box {
	position: sticky;
	top: 0;
	z-index: 999;
}
.sugg-list {
	padding: 0 10px;
	.sugg-item {
		padding: 13px 0;
		font-size: 12px;
		border-bottom: 1px solid #efefef;
		display: flex;
		justify-content: space-between;
		align-items: center;
		&-name {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-right: 3px;
		}
	}
}
.history-box {
	padding: 0px 10px;
	.history-title {
		display: flex;
		justify-content: space-between;
		height: 40px;
		align-items: center;
		font-size: 13px;
		margin-bottom: 10px;
		border-bottom: 1px solid #ccc;
	}
	.history-list {
		display: flex;
		flex-wrap: wrap;
		
		.tag {
			margin-right: 5px;
			margin-top: 5px;
		}
	}
}
</style>

<template>
	<view>
		<my-search @click="gotoSearch"></my-search>
		<view class="scroll-view-container">
			<!-- 左侧滑动区域 -->
			<scroll-view enhanced :show-scrollbar="false" :style="{height: wh + 'px'}" scroll-y class="left-scroll-view">
				<view @click="activeChanged(index)" :class="['left-scroll-view-item', active === index ? 'active' : '']" v-for="(item, index) in cateList" :key="index">{{item.cat_name}}</view>
			</scroll-view>
			<!-- 右侧滑动区域 -->
			<scroll-view enhanced :show-scrollbar="false" :style="{height: wh + 'px'}" scroll-y :scroll-top="scrollTop" class="right-scroll-view">
				<view class="cate-lv2"v-for="(item, index) in cateLevel2" :key="index">
					<view class="cate-lv2-title">/ {{item.cat_name}} /</view>
					<view class="cate-lv3-list">
						<view @click="gotoGoodsList(item)" class="cate-lv3-item" v-for="(lv3, lv3Index) in item.children" :key="lv3Index">
							<image :src="lv3.cat_icon.replace('ugo','hmugo').replace('dev', 'web')"></image>
							<text>{{lv3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import badgeMix from '@/mixins/tabbar-badge.js'
export default {
	mixins: [badgeMix],
	data() {
		return {
			cateList: [],
			active: 0,
			cateLevel2: [],
			scrollTop: 0,
			wh: 0,
		};
	},
	onLoad() {
		const sysInfo = uni.getSystemInfoSync()
		this.wh = sysInfo.windowHeight - 50
		this.getCateList()
	},
	methods: {
		async getCateList() {
			const { data: res } = await uni.$http.get('/api/public/v1/categories')
			if (res.meta.status !== 200) {
				return uni.showToast({
					title: "数据请求失败",
					duration: 1500,
					icon: 'none'
				})
			}
			this.cateList = res.message
			this.cateLevel2 = this.cateList[0].children
		},
		activeChanged(i) {
			this.active = i
			this.cateLevel2 = this.cateList[i].children
			this.scrollTop = this.scrollTop === 0 ? 1 : 0
		},
		gotoGoodsList(item) {
			uni.navigateTo({
				url: '/subpkg/goods_list/goods_list?cid=' + item.cat_id
			})
		},
		gotoSearch() {
			uni.navigateTo({
				url: '/subpkg/search/search'
			})
		}
	}
}
</script>

<style lang="scss">
	.scroll-view-container {
		display: flex;
		padding: 0 10rpx;
		.left-scroll-view {
			width: 180rpx;
			&-item {
				line-height: 120rpx;
				text-align: center;
				font-size: 12px;
				background-color: #F7F7F7;
				&.active {
					background-color: #FFFFFF;
					position: relative;
					&::before {
						content: '';
						height: 30px;
						width: 3px;
						background-color: #C00000;
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
					}
				}
			}
		}
		.right-scroll-view {
			background-color: #FFFFFF;
			.cate-lv2 {
				&-title {
					font-weight: bold;
					font-size: 12px;
					text-align: center;
					padding: 15px 0;
				}
			}
			.cate-lv3-list {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				.cate-lv3-item {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					width: 33.33%;
					margin-bottom: 10px;
					image {
						width: 60px;
						height: 60px;
					}
					text {
						font-size: 12px;
						margin-top: 3px;
					}
				}
			}
		}
	}
</style>

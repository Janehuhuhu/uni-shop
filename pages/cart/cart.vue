<template>
	<view>
		<my-address></my-address>
		<view class="cart-title">
			<uni-icons type="shop" :size="18"></uni-icons>
			<text class="cart-title-text">购物车</text>
		</view>
		<!-- <view v-for="(item, index) in cart" :key="index">
			<my-goods @numChange="numChangeHandler" @radioChange="radioChangeHandler" :show-radio="true" :show-num="true" :goods="item"></my-goods>
		</view> -->
		<uni-swipe-action>
			<uni-swipe-action-item  v-for="(item, index) in cart" :key="index" :right-options="options" @click="deleteItem(item)">
				<my-goods @numChange="numChangeHandler" @radioChange="radioChangeHandler" :show-radio="true" :show-num="true" :goods="item"></my-goods>
			</uni-swipe-action-item>
		</uni-swipe-action>
	</view>
</template>

<script>
import badgeMix from '@/mixins/tabbar-badge.js'
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
	mixins: [badgeMix],
	data() {
		return {
			options: [
				{
					text: '删除',
					style: {
						backgroundColor: '#C00000'
					}
				}
			]
		};
	},
	computed: {
		...mapState('m_cart', ['cart']),
	},
	methods: {
		...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),
		gotoDetail(item) {
			uni.navigateTo({
				url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
			})
		},
		numChangeHandler(goods) {
			this.updateGoodsCount(goods)
		},
		radioChangeHandler(goods) {
			this.updateGoodsState(goods)
		},
		deleteItem(goods) {
			this.removeGoodsById(goods.goods_id)
		}
	}
}
</script>

<style lang="scss">
.cart-title {
	display: flex;
	height: 40px;
	align-items: center;
	font-size: 14px;
	padding-left: 5px;
	border-bottom: 1px solid #ccc;
	
	.cart-title-text {
		margin-left: 10px;
	}
}
</style>

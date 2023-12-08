<template>
	<view class="goods-item">
		<!-- 左边区域 -->
		<view class="goods-item-left">
			<radio @click="radioClickHandler" v-if="showRadio" :checked="goods.goods_state" color="#C00000"></radio>
			<image :src="goods.goods_small_logo || defaultPic"></image>
		</view>
		<!-- 右边区域 -->
		<view class="goods-item-right">
			<view class="goods-item-name">{{goods.goods_name}}</view>
			<view class="goods-item-price">
				<text>￥{{goods.goods_price | toFixed}}</text>
				<uni-number-box :value="goods.goods_count" @change="numClickHandler" v-if="showNum" :min="1"></uni-number-box>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		props: {
			goods: {
				type: Object,
				default: () => ({})
			},
			showRadio: {
				type: Boolean,
				default: false
			},
			showNum: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				defaultPic: 'http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000602669097_1_200x200.jpg'
			};
		},
		filters: {
			toFixed(num) {
				return Number(num).toFixed(2)
			}
		},
		methods: {
			radioClickHandler() {
				this.$emit('radioChange', {
					goods_id: this.goods.goods_id,
					goods_state: !this.goods.goods_state
				})
			},
			numClickHandler(e) {
				this.$emit('numChange', {
					goods_id: this.goods.goods_id,
					goods_count: +e
				})
			}
		}
	}
</script>

<style lang="scss">
.goods-item {
	display: flex;
	padding: 10px 5px;
	border-bottom: 1px solid #f0f0f0;
	.goods-item-left {
		display: flex;
		align-items: center;
		margin-right: 5px;
		image {
			width: 100px;
			height: 100px;
			display: block;
		}
	}
	.goods-item-right {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex: 1;
		
		.goods-item-name {
			font-size: 13px;
		}
		.goods-item-price {
			display: flex;
			justify-content: space-between;
			font-size: 16px;
			color: #C00000;
		}
	}
}
</style>
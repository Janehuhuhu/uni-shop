<template>
	<view class="settle-container">
		<label class="radio" @click="changeAllState">
			<radio :checked="isFullCheck" color="#C00000"/><text>全选</text>
		</label>
		<view class="amount-box">
			合计: <text class="amount">￥{{checkedGoodsAmount}}</text>
		</view>
		<view class="settle-btn">结算({{checkedCount}})</view>
	</view>
</template>

<script>
	import { mapGetters, mapMutations } from 'vuex'
	export default {
		name:"my-settle",
		data() {
			return {
				
			};
		},
		computed: {
			...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
			isFullCheck() {
				return this.total === this.checkedCount
			}
		},
		methods: {
			...mapMutations('m_cart', ['updateAllGoodsState']),
			changeAllState() {
				this.updateAllGoodsState(!this.isFullCheck)
			}
		}
	}
</script>

<style lang="scss">
.settle-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	bottom: 0;
	left: 0;
	height: 50px;
	background-color: white;
	font-size: 14px;
	padding: 0 5px;
	width: 100%;
	box-sizing: border-box;
	
	.radio {
		display: flex;
		align-items: center;
	}
	.amount-box {
		.amount {
			color: #C00000;
			font-size: bold;
		}
	}
	.settle-btn {
		height: 50px;
		line-height: 50px;
		color: white;
		background-color: #C00000;
		padding: 0 10px;
		min-width: 100px;
		text-align: center;
	}
}
</style>
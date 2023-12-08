<template>
	<view class="address">
		<view v-if="JSON.stringify(address) === '{}'" class="address-choose-box">
			<button type="primary" size="mini" @click="chooseAddress">请选择收货地址+</button>
		</view>
		<view v-else class="address-info-box">
			<view class="row1">
				<view>收货人: xxx </view>
				<view class="row1-right">
					<view>电话: 138xxxxxxx</view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">收货地址: </view>
				<view class="row2-right">上海市长宁区新泾镇新泾三村9号602室上海市长宁区新泾镇新泾三村9号602室上海市长宁区新泾镇新泾三村9号602室</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapMutations, mapState } from 'vuex'
	
	export default {
		name:"my-address",
		data() {
			return {
				
			};
		},
		computed: {
			...mapState('m_user', ['address'])
		},
		methods: {
			...mapMutations('m_user', ['updateAddress']),
			async chooseAddress() {
				const [err, succ] = await uni.chooseAddress().catch(err => err)
				console.log('err', err, succ)
				// 用户成功选择的收货地址
				if (err === null && succ.errMsg === 'chooseAddress:ok') {
					this.updateAddress(succ)
				}
				// 用户没有授权
				if (err && (err.errMsg === 'chooseAddress:fail auth deny' || err.errMsg === 'chooseAddress:fail authorize no response')) {
					this.reAuth()
				}
			},
			reAuth() {
				console.log('重新授权')
			}
		}
	}
</script>

<style lang="scss">
.address {
	// border: 1px solid #ccc;
	.address-choose-box {
		height: 90px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.address-info-box {
		font-size: 12px;
		.row1 {
			display: flex;
			justify-content: space-between;
			.row1-right {
				display: flex;
			}
		}
		.row2 {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 10px;
			.row2-left {
				white-space: nowrap;
			}
			.row2-right {
				margin-left: 10px;
			}
		}
	}
}
</style>
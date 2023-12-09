<template>
	<view class="settle-container">
		<label class="radio" @click="changeAllState">
			<radio :checked="isFullCheck" color="#C00000"/><text>全选</text>
		</label>
		<view class="amount-box">
			合计: <text class="amount">￥{{checkedGoodsAmount}}</text>
		</view>
		<view class="settle-btn" @click="settlement">结算({{checkedCount}})</view>
	</view>
</template>

<script>
	import { mapGetters, mapMutations, mapState } from 'vuex'
	export default {
		name:"my-settle",
		data() {
			return {
				seconds: 3,
				timer: null
			};
		},
		computed: {
			...mapState('m_user', ['token']),
			...mapState('m_cart', ['cart']),
			...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
			...mapGetters('m_user', ['addstr']),
			isFullCheck() {
				return this.total === this.checkedCount
			}
		},
		methods: {
			...mapMutations('m_cart', ['updateAllGoodsState']),
			...mapMutations('m_user', ['updateRedirectInfo']),
			changeAllState() {
				this.updateAllGoodsState(!this.isFullCheck)
			},
			settlement() {
				if (!this.checkedCount) return uni.$showMsg('请选择要结算的商品！')
				if (!this.addstr) return uni.$showMsg('请选择收货地址！')
				if (!this.token) return this.delayNavigate()
				
				// 微信支付
				this.payOrder()
			},
			delayNavigate() {
				this.seconds = 3
				this.showTip(this.seconds)
				this.timer = setInterval(() => {
					this.seconds--
					
					if (this.seconds <= 0) {
						clearInterval(this.timer)
						
						uni.switchTab({
							url: '/pages/my/my',
							success: () => {
								this.updateRedirectInfo({
									from: '/pages/cart/cart',
									openType: 'switchTab'
								})
							}
						})
						
						return
					}
					this.showTip(this.seconds)
				}, 1000)
			},
			showTip(n) {
				uni.showToast({
					icon: 'none',
					title: '请登录后再结算！' + n + ' 秒后自动跳转到登录页',
					mask: true,
					duration: 1500
				})
			},
			async payOrder() {
				const orderInfo = {
					order_price: 0.01,
					consignee_addr: this.addstr,
					goods: this.cart.filter(item => item.goods_state).map(item => ({
						goods_id: item.goods_id,
						goods_num: item.goods_count,
						goods_price: item.goods_price
					})),
				}
				
				// 创建订单
				const { data: res } = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)
				if (res.meta.status !== 200) return uni.$showMsg('创建订单失败！')
				
				const orderNumber = res.message?.order_number
				console.log('aa', orderNumber)
				
				// 订单预支付
				const { data: res2 } = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', { order_number: orderNumber })
				if (res2.meta.status !== 200) return uni.$showMsg('创建订单失败！')
				
				const payInfo = res.message?.pay
				console.log('bb', payInfo)
				
				// 发起微信支付
				
				const [err, succ] = await uni.requestPayment(payInfo)
				if (err) return uni.$showMsg('订单未支付！')
				
				// 完成了支付，进一步查询支付的接口
				const { data: res3 } = await uni.$http.post('/api/public/v1/my/orders/chkOrder', { order_number: orderNumber })
				if (res3.meta.status !== 200) return uni.$showMsg('订单未支付！')
				
				uni.showToast({
					title: '支付完成！',
					icon: 'success'
				})
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
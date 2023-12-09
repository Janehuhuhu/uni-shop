<template>
	<view class="userinfo-container">
		<view class="top-box">
			<image :src="userinfo.avatarUrl" class="avatar"></image>
			<view class="nickname">{{userinfo.nickName}}</view>
		</view>
		
		<view class="panel-list">
			<!-- 第一个面板区域 -->
			<view class="panel">
				<view class="panel-body">
					<view class="panel-item">
						<text>8</text>
						<text>收藏的店铺</text>
					</view>
					<view class="panel-item">
						<text>14</text>
						<text>收藏的商品</text>
					</view>
					<view class="panel-item">
						<text>18</text>
						<text>关注的商品</text>
					</view>
					<view class="panel-item">
						<text>84</text>
						<text>足迹</text>
					</view>
				</view>
			</view>
			<!-- 第二个面板区域 -->
			<view class="panel">
				<view class="panel-title">我的订单</view>
				<view class="panel-body">
					<view class="panel-item">
						<image class="icon" src="@/static/待付款.png"></iamge>
						<text>待付款</text>
					</view>
					<view class="panel-item">
						<image class="icon" src="@/static/待收货.png"></image>
						<text>待收货</text>
					</view>
					<view class="panel-item">
						<image class="icon" src="@/static/退款.png"></image>
						<text>退款/退货</text>
					</view>
					<view class="panel-item">
						<image class="icon" src="@/static/全部订单.png"></image>
						<text>全部订单</text>
					</view>
				</view>
			</view>
			<!-- 第三个面板区域 -->
			<view class="panel">
				<view class="panel-bottom">
					<text>收货地址</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel-bottom">
					<text>联系客服</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view @click="logout" class="panel-bottom">
					<text>退出登录</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	export default {
		name:"my-userinfo",
		data() {
			return {
				
			};
		},
		computed: {
			...mapState('m_user', ['userinfo'])
		},
		
		methods: {
			...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateAddress']),
			async logout() {
				const [err, succ] = await uni.showModal({
					title: '提示',
					content: '确认退出登录吗？'
				}).catch(err => err)
				
				if (succ && succ.confirm) {
					// 清空token,userinfo,address
					this.updateUserInfo({})
					this.updateToken('')
					this.updateAddress({})
				}
			}
		}
	}
</script>

<style lang="scss">
.userinfo-container {
	background-color: #efefef;
	height: 100%;
	
	.top-box {
		height: 400rpx;
		background-color: #C00000;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		
		.avatar {
			width: 90px;
			height: 90px;
			border-radius: 45px;
			border: 2px solid #FFF;
			box-shadow: 0 1px 5px black;
		}
		
		.nickname {
			font-size: 16px;
			color: #FFF;
		}
	}
	
	.panel-list {
		padding: 0 10px;
		position: relative;
		top: -10px;
		
		.panel {
			background-color: white;
			border-radius: 3px;
			margin-bottom: 8px;
			padding: 10px 0;
			
			.panel-title {
				padding-left: 10px;
			}
			
			.panel-body {
				display: flex;
				justify-content: space-around;
				
				.panel-item {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					
					.icon {
						width: 35px;
						height: 35px;
					}
				}
			}
		
			.panel-bottom {
				display: flex;
				justify-content: space-between;
				align-items: center;
				line-height: 45px;
				font-size: 15px;
				padding: 0 10px;
			}
		}
	}
}
</style>
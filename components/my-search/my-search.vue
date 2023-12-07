<template>
	<view @click="gotoSearch" class="search-container" :style="{'background-color': bgColor}">
		<view class="search-box" :style="{'border-radius': radius + 'px'}">
			<uni-icons type="search" size="17"></uni-icons>
			<text class="search-box-txt">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		props: {
			bgColor: {
				type: String,
				default: '#C00000'
			},
			radius: {
				type: Number,
				default: 18
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			gotoSearch() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="stylus">
.search-container{
	height: 50px;
	// background-color: #C00000;
	padding: 0 10px;
	display: flex;
	justify-content: center;
	position: sticky;
	top: 0;
	z-index: 999;
	.search-box {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 36px;
		background-color: #FFFFFF;
		// border-radius: 15px;
		
		&-txt {
			margin-left: 5px;
			font-size: 15px;
		}
	}
}
</style>
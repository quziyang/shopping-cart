<template>
	<div>
		<input @click='minBtn' type="button" value="-" class='enterNum_a'>
		<input type="text" :value=numVal class='enterNum_b'>
		<input @click='addBtn' type="button" value="+" class='enterNum_c'>
	</div>
</template>

<script>
export default{
	name: 'enterNum',
	data(){
		return {

		}
	},
	props: ['numVal'],
	methods: {
		minBtn(){
			// 触发得到当前点击商品信息的事件
			this.$emit("itemEventEmit");
			// 触发改变商品数量的事件
			this.$emit("changeGoodsNum", "min");
		},
		addBtn(){
			this.$emit("itemEventEmit");
			this.$emit("changeGoodsNum", "add");
		}
	}
}
</script>


<style type="text/css">
	.enterNum_a, .enterNum_c{
		width:30px;height: 30px;display: block;
	}
	.enterNum_a{float: left;}
	.enterNum_c{float: right;}
	.enterNum_b{
		width: 100px;text-align: center;
		height: 30px;font-size: 33px;
	}
</style>
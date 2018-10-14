<template>
  <div>
    <h1>{{msg}}</h1>
    <div class='cartWrap'>
    	<div class='goodsList' v-for='_item in tableData'>
    		<ul>
    			<li class='w_1'>
    				<input type='checkbox' v-model='_item.isCheck'
    				 @click='isCheckBtnFn(_item)'>
    			</li>
    			<li class='w_2'>
    				<img :src='_item.goodsImgUrl'>
    			</li>
    			<li class='w_3'>{{_item.productInfo}}</li>
    			<li class='w_4'>{{_item.unitPrice}}</li>
    			<li class='w_5'>
    				<!--numVal是父组件的自定义属性，用于向子组件传值-->
    				<enterNum :numVal='_item.goodsNum' @itemEventEmit='itemEvent(_item)'
    				@changeGoodsNum='changeGoodsNumFn'/>
    			</li>
    			<li class='w_6'>{{_item.total}}</li>
    			<li class='w_7'>
    				<input type='button' value='删除' @click='delBtn(_item)'>
    			</li>
    		</ul>
    	</div>
    </div>
    <h1>总数：{{this.allGoodsNum}}</h1>
    <h1>总价：{{this.allGoodsMoney}}</h1>
  </div>
</template>

<script>
import axios from 'axios';
import enterNum from './enterNum';

export default {
  name: 'cart',
  data(){
    return {
      msg: 'Vue.js购物车',
      tableData: [],
      filterItem: [],
      allGoodsNum: 0,
      allGoodsMoney: 0   
    }
  },
  created(){
    axios.get('http://localhost:7788/goodsList')
    	 .then((_data)=>{
    	 	//console.log(_data);
    	 	this.tableData = _data.data.goodsList;
    	 	this.allGoodsNum = _data.data.allGoodsNum;
    	 	this.allGoodsMoney = _data.data.allGoodsMoney;
    	 })
  },
  //注意这里是复数形式
  components: {enterNum},
  watch: {
  	// 当filterItem发生变化时（即当前点击的那条商品的信息发生变化时）
  	// _newVal为filterItem发生变化之后的值
  	// filterItem为长度为1的数组，因此_newVal也是长度为1的数组
  	filterItem(_newVal){
  		//console.log(_newVal[0]);
  		this.changeSingleGoodsMoney(_newVal[0]);
  	}
  },
  methods: {
  	// 得到当前点击的那条商品的信息
  	itemEvent(_goods){
  		//console.log(_goods.g_id);
  		this.filterItem=this.tableData.filter((_g)=>{
  			return _g.g_id==_goods.g_id;
  		});
  		//console.log( this.filterItem );
  	},
  	// 改变商品数量
  	changeGoodsNumFn(_n){
  		//console.log(_n);
  		if(_n=='add'){
  			++this.filterItem[0].goodsNum;
  		}else if(_n=='min'){
  			--this.filterItem[0].goodsNum;
  		};
  	},
  	//计算单项商品的总价
  	changeSingleGoodsMoney( _goodsObj ){
  		axios.get('http://localhost:7788/count_num', {
  			params: {
  				gNum: _goodsObj.goodsNum,
  				uPrice: _goodsObj.unitPrice
  			}
  		})
  		.then((_data)=>{
  			//console.log(_data);
  			this.filterItem[0].total = _data.data.sMoney;
  			this.allGoodsFn();
  		})
  	},
  	//统计总数、总价
  	allGoodsFn(){
  		let _arrs = {};
  		this.filterIsCheckFn().forEach((_i, _inx)=>{
  			_arrs["goods"+_inx] = {
  				'unit': _i.unitPrice,
  				'num': _i.goodsNum
  			}
  		});
  		//console.log(_arrs);
  		axios.get('http://localhost:7788/allGoodsFn', {
  			params: {
  				all_goods: _arrs
  			}
  		})
  		.then(_data=>{
  			console.log(_data);
  			this.allGoodsNum = _data.data.n;
  			this.allGoodsMoney = _data.data.m;
  		});

  	},
  	//过滤当前为选中状态的商品
  	filterIsCheckFn(){
  		let _checkIsTrue =[];
  		_checkIsTrue = this.tableData.filter(_item=>{
  			return _item.isCheck == true;
  		});
  		return _checkIsTrue;
  	},
  	//点击checkbox触发的事件
  	isCheckBtnFn(_m){
  		// 将 filterItem 清空之后写入当前点击的商品信息，
  		// 再通过 watch filterItem 来执行一系列事件
  		this.filterItem = [];
  		this.filterItem.push(_m);
  		// 此时 _m.isCheck 的值为本次点击之前的值，但是总数、总价显示正确，
  		// 我猜测应该是在执行统计总数、总价事件时 _m.isCheck 的值已更新为点击之后的值
  		//console.log(_m.isCheck);
  	},
  	//点击删除按钮触发的事件
  	delBtn(_m){
  		// 将 filterItem 清空之后写入当前点击的商品信息，
  		// 再通过 watch filterItem 来执行一系列事件
  		this.filterItem = [];
  		this.filterItem.push(_m);
  		this.tableData = this.tableData.filter( _item=>{
  			return _item.g_id != _m.g_id;
  		} )
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  *{margin:0;padding:0;border:0;}
  ul,ol,li{list-style: none;}

    .cartWrap{
      width:95%;height: auto;overflow: hidden;margin:10px auto;
      background: #ddd;
    }
    .goodsList{
      width: 95%;height: 110px;clear: both;background: #eee;margin:10px auto;
    }
    .goodsList li{
      float: left;height: 100px;margin:5px;background: #b4b4b4;
      color: #000;font-weight: bold;font-size: 33px;
    }
    .goodsList li.w_1{width:30px;}
    .goodsList li.w_1 input{width:30px;height: 30px;}
    .goodsList li.w_2{width:100px;}
    .goodsList li.w_2 img{width:97px;}
    .goodsList li.w_3{width:100px;font-size: 22px;}
    .goodsList li.w_4{width:75px;}
    .goodsList li.w_5{width:200px;}
    .goodsList li.w_6{width:75px;}
    .goodsList li.w_7{width:75px;}
    .goodsList li.w_7 input{padding:5px;color: #f00;cursor: pointer;}
    .goodsList li.w_7 input:hover{
      background: #00f;
    }
</style>

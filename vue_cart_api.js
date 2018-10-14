/***********************
 * 日期：2018/09/08
 * 作者：曲子扬
 * 用途：nodejs中间件，vue版本购物车模块的接口
 * other: 购物车模块的nodejs文件
 */

var _express = require("express");
var _app = _express();
_app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By",' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

_app.get('/goodsList', function(req, res){
	var _goodsList = {
		allGoodsNum:15,
		allGoodsMoney:218,
		goodsList:[
			{
				"goodsImgUrl":"https://image3.suning.cn/uimg/cms/img/151548432529049194.png",
				"productInfo":"产品 描述 11 11",
				"unitPrice":11,
				"goodsNum":2,
				"total":22,
				"g_id":"g_id_0",
				"isCheck":true
			}, {
				"goodsImgUrl":"https://image3.suning.cn/uimg/cms/img/151548432529049194.png",
				"productInfo":"产品 描述2 222 22",
				"unitPrice":22,
				"goodsNum":3,
				"total":66,
				"g_id":"g_id_1",
				"isCheck":false
			}, {
				"goodsImgUrl":"https://image3.suning.cn/uimg/cms/img/151548432529049194.png",
				"productInfo":"产品 描述3 333 33 ",
				"unitPrice":13,
				"goodsNum":10,
				"total":130,
				"g_id":"g_id_2",
				"isCheck":true
			}
		]
	}

	res.send( _goodsList );
	res.end();
});

_app.get('/count_num', function(req, res){
	var _num = req.query.gNum*req.query.uPrice;
	res.send({sMoney:_num});
	res.end();
});

// 统计总数、总价
_app.get('/allGoodsFn',function(req,res){
	// _arrs 是对象，req.query.all_goods 即 _arrs，
	// 此处 all_goods == req.query.all_goods，所以 all_goods 也是 _arrs，也是对象
	/*_arrs=req.query.all_goods=all_goods={
											goods0: {unit: 11, num: 3}
											goods1: {unit: 13, num: 10}
										}*/
	// ？此处使用JSON.parse的用意尚不清楚
    var all_goods = JSON.parse(req.query.all_goods);
    var _allNum = 0, _allMoney = 0;
    // console.log( all_goods.goods_0.unit );
    for(var i in all_goods){
        _allNum += all_goods[i].num;
        _allMoney = _allMoney + ( all_goods[i].num * all_goods[i].unit )
    }
    res.send( {
        n: _allNum,
        m: _allMoney,
        a: all_goods
    });
    res.end();
});

_app.listen(7788, function(){
	console.log("7788,vuejs版本购物车中间件");
})
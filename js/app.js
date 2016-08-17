(function (angular) {
	'use strict';  //启用严格模式，不允许使用不安全的语法
	/**
	* myToDoMvc Module
	*
	* 应用程序需的主要模块，用来管理界面结构
	*/
	var myApp = angular.module('myToDoMvc', ['ngRoute']);
	// 路由配置

	myApp.config(['$routeProvider',function($routeProvider) {
		$routeProvider
		    .when('/:status?',
		    {
		    	controller:'MainController',
		    	templateUrl:'main_template'
		    })
		    .otherwise({ redirectTo:'/' });
	}])

	myApp.controller('MainController', ['$scope','$routeParams','$route', function($scope,$routeParams,$route){
		

		// 获取唯一的id
		function  getId(){
			var id = Math.random();
			for (var i = 0; i < $scope.todos.length; i++) {
				if( $scope.todos[i].id === id ){
					id = arguments.callee();
					break;
				}
			}
			return id;

		}
		
		//文本框需要一个模型
		$scope.text = '';

		//任务列表也需要一个数据模型
		// 每一个任务列表的结构{ id:1, text:'学习',completed :true }
		$scope.todos = [
			{id:0.1, text:'学习',completed :false },
			{id:0.2122, text:'陪爸妈逛街',completed :true },
			{id:0.32543, text:'学习',completed :false },
		];

		//添加处理事件
		$scope.add = function(){
			//如果输入的字符串为空，则不再继续执行，退出函数
			if(!$scope.text){
				return;
			}
			$scope.todos.push({
				//id自动增长？
				//id:$scope.todos.length+1, 
				id:getId(),
				// 由于$scope.text双向数据绑定，add的同时可以拿到文本框的输入值
				text:$scope.text,
				completed :false
			});
			// 清空模型的数据
			$scope.text = '';
		};

		// 删除事件
		$scope.remove = function(id){
			//删除谁
			//找到id
			for (var i = 0; i < $scope.todos.length ; i++) {
				if( $scope.todos[i].id === id ){
					$scope.todos.splice(i,1);
					break;
				}
			}
			

		};

		//clear completed
		$scope.clear = function(){
			var result = [];
			for (var i = 0; i < $scope.todos.length ; i++) {
				if( !$scope.todos[i].completed ){
					// $scope.todos.splice(i,1);
					result.push($scope.todos[i]);
					
				}

			}
				$scope.todos = result;

		};


		//是否有已经完成的
		$scope.existCompleted = function(){
			//该函数一定要有返回值
			for (var i = 0; i < $scope.todos.length ; i++) {
				if( $scope.todos[i].completed ){
					return true;
					
				}
				
			}
			return false;
		};

		//当前编辑的元素

		$scope.currentEdittingId =  -1; //代表一个不存在的元素，默认没有任何被编辑的元素
		$scope.editing = function(id,completed){
			 if( !completed){
			 	$scope.currentEdittingId = id;
			 }else{
				$scope.currentEdittingId =  -1;
			 }
			return $scope.currentEdittingId;
			
		};

		$scope.save = function(){
			$scope.currentEdittingId =  -1;
		};

		// $scope.checkall = false;
		// $scope.$watch('checkall',function(now,old){
		// 	for (var i = 0; i < $scope.todos.length ; i++) {
		// 		$scope.todos[i].completed = now;
		// 	}
		// });
		var now = true;
		$scope.toggleAll = function(){
			for (var i = 0; i < $scope.todos.length ; i++) {
				$scope.todos[i].completed = now;
			}
			now = !now;
		};

		//状态筛选
		
		//点击事件不合适，因为有dom操作
		// watch只能监视属于scope的成员
		$scope.selector = {};
		//取出路由中匹配的数据，路由发生改变，控制器会重新执行
		var status = $routeParams.status;
		switch(status){
			case 'active':
				$scope.selector = {completed:false};
				break;
			case 'completed':
				$scope.selector = {completed:true};
				break;
			default:
				$scope.selector = {};
				// $route.updateParams({status:''});
				
				break;
		}

		//自定义比较函数，默认filter过滤器使用的是模糊匹配
		$scope.equalCompare = function (source,target) {
			return source === target;
		}




	}]);

	// 控制器（属于某个模块）用来往视图层中暴露数据
	// myApp.controller('MainController', ['$scope','$location', function($scope,$location){
		

	// 	// 获取唯一的id
	// 	function  getId(){
	// 		var id = Math.random();
	// 		for (var i = 0; i < $scope.todos.length; i++) {
	// 			if( $scope.todos[i].id === id ){
	// 				id = arguments.callee();
	// 				break;
	// 			}
	// 		}
	// 		return id;

	// 	}
		
	// 	//文本框需要一个模型
	// 	$scope.text = '';

	// 	//任务列表也需要一个数据模型
	// 	// 每一个任务列表的结构{ id:1, text:'学习',completed :true }
	// 	$scope.todos = [
	// 		{id:0.1, text:'学习',completed :false },
	// 		{id:0.2122, text:'陪爸妈逛街',completed :true },
	// 		{id:0.32543, text:'学习',completed :false },
	// 	];

	// 	//添加处理事件
	// 	$scope.add = function(){
	// 		//如果输入的字符串为空，则不再继续执行，退出函数
	// 		if(!$scope.text){
	// 			return;
	// 		}
	// 		$scope.todos.push({
	// 			//id自动增长？
	// 			//id:$scope.todos.length+1, 
	// 			id:getId(),
	// 			// 由于$scope.text双向数据绑定，add的同时可以拿到文本框的输入值
	// 			text:$scope.text,
	// 			completed :false
	// 		});
	// 		// 清空模型的数据
	// 		$scope.text = '';
	// 	};

	// 	// 删除事件
	// 	$scope.remove = function(id){
	// 		//删除谁
	// 		//找到id
	// 		for (var i = 0; i < $scope.todos.length ; i++) {
	// 			if( $scope.todos[i].id === id ){
	// 				$scope.todos.splice(i,1);
	// 				break;
	// 			}
	// 		}
			

	// 	};

	// 	//clear completed
	// 	$scope.clear = function(){
	// 		var result = [];
	// 		for (var i = 0; i < $scope.todos.length ; i++) {
	// 			if( !$scope.todos[i].completed ){
	// 				// $scope.todos.splice(i,1);
	// 				result.push($scope.todos[i]);
					
	// 			}

	// 		}
	// 			$scope.todos = result;

	// 	};


	// 	//是否有已经完成的
	// 	$scope.existCompleted = function(){
	// 		//该函数一定要有返回值
	// 		for (var i = 0; i < $scope.todos.length ; i++) {
	// 			if( $scope.todos[i].completed ){
	// 				return true;
					
	// 			}
				
	// 		}
	// 		return false;
	// 	};

	// 	//当前编辑的元素

	// 	$scope.currentEdittingId =  -1; //代表一个不存在的元素，默认没有任何被编辑的元素
	// 	$scope.editing = function(id,completed){
	// 		 if( !completed){
	// 		 	$scope.currentEdittingId = id;
	// 		 }else{
	// 			$scope.currentEdittingId =  -1;
	// 		 }
	// 		return $scope.currentEdittingId;
			
	// 	};

	// 	$scope.save = function(){
	// 		$scope.currentEdittingId =  -1;
	// 	};

	// 	// $scope.checkall = false;
	// 	// $scope.$watch('checkall',function(now,old){
	// 	// 	for (var i = 0; i < $scope.todos.length ; i++) {
	// 	// 		$scope.todos[i].completed = now;
	// 	// 	}
	// 	// });
	// 	var now = true;
	// 	$scope.toggleAll = function(){
	// 		for (var i = 0; i < $scope.todos.length ; i++) {
	// 			$scope.todos[i].completed = now;
	// 		}
	// 		now = !now;
	// 	};

	// 	//状态筛选
		
	// 	//点击事件不合适，因为有dom操作
	// 	// watch只能监视属于scope的成员

	// 	$scope.$location = $location;


	// 	$scope.$watch('$location.path()',function(now,old){

	// 		$scope.selector = {};

	// 		// 1、拿到锚点值
	// 		// 这样写的话会要求执行环境必须要有window对象
	// 		// var hash = window.location.hash;
	// 		// 
	// 		// var path = $location.path();
	// 		// console.log(now);

	// 		//2、根据锚点值改变状态值
	// 		switch(now){
	// 			case '/active':
	// 				$scope.selector = {completed:false};
	// 			 	break;
	// 			case '/completed':
	// 				$scope.selector = {completed:true};
	// 			 	break;
	// 			default:
	// 				$scope.selector = {};
	// 			 	break;

	// 		}

	// 	});

	// 	//自定义比较函数，默认filter过滤器使用的是模糊匹配
	// 	$scope.equalCompare = function (source,target) {
	// 		return source === target;
	// 	}




	// }]);

	

})(angular);

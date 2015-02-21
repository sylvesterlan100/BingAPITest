var app=angular.module('myApp', []);


app.controller("MainController", function($scope, $http, BingAPI){

	//sends a request to the bing search api
	//activated by clicking the button
	$scope.request=function(){

		//defines how many results per query; defaults to 20
		var numResults=$scope.numResults || 20;

		var query = $scope.query || "";

		//makes the request to the bing api
		$http({method: 'GET', url: BingAPI.queryUrl(query, numResults), 
			headers:{ 
				//required authorization for using the bing search api: 64-bit encoded
				Authorization: BingAPI.basicHeader
		} })
		.success(function(data){
			var searchResults = angular.fromJson(data);
             $scope.searchResults = searchResults.d.results;
		})
		.error(function(data, status, headers, config){

		})
	}
});



app.factory('BingAPI', function(){
	var userName = 'SylvesterCandidate';
	var key='CLir7B5jwG5r2PPBhwyGxia7tsVyggkcyHkgcdvRPSs=';
	var encodedBasicHeader='Basic U3lsdmVzdGVyQ2FuZGlkYXRlOkNMaXI3QjVqd0c1cjJQUEJod3lHeGlhN3RzVnlnZ2tjeUhrZ2NkdlJQU3M9';

	return {
		user:userName,
		key:key,
		basicHeader:encodedBasicHeader,
		queryUrl:function(query, numResults){
			return "https://api.datamarket.azure.com/Bing/Search/Web?Query='"+query+"'&$format=json&$top="+numResults;
		}

	}

})
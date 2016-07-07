'use strict';

var app = angular.module('app', ['ngResource', 'ui.router','ui.bootstrap']);
app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 
	function($stateProvider, $urlRouterProvider, $httpProvider){
		$stateProvider
			.state('main', {
				url: '/',
				views: {
					'body' : {
						templateUrl: 'partials/main.html',
						controller: 'mainController as mc'
					}
				}
			})
			.state('search', {
				url: '/search',
				views: {
					'body' : {
						templateUrl: 'partials/search.html',
						controller: 'searchController as sc'
					}
				},
				data: {
					title: 'Search'
				}
			});
}]);

app.factory('resource', ['$resource', function($resource) {
	var self = this;
	self.researcher = $resource('/api/researcher', null, 
		{
			'search' : {method : 'GET', isArray: false} 
		}
	);

	return self;
}])
'use strict';

var app = angular.module('app', ['ngResource', 'ui.router','ui.bootstrap', 'ui.select','ngFileUpload', 'angular-growl', 'ngSanitize']);
app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'growlProvider',
	function($stateProvider, $urlRouterProvider, $httpProvider, growlProvider){
		growlProvider.globalTimeToLive(3000);
		$urlRouterProvider.otherwise('/main/contact/search');
		$stateProvider
			.state('main', {
				url: '/main/',
				views: {
					'body' : {
						templateUrl: 'partials/main.html',
						controller: 'mainController as mc',
						abstract: true
					}
				},
				data : {
					title: 'Main'
				}
			})
			.state('main.contact', {
				url: 'contact/',
				views: {
					'content' : {
						templateUrl: 'partials/contacts.html',
						controller: 'contactsController as cc'
					}
				}
			})
			.state('main.contactSearch', {
				url: 'contact/search',
				views: {
					'content' : {
						templateUrl: 'partials/contactSearch.html',
						controller: 'contactSearchController as csc'
					}
				},
				data: {
					title: 'Search'
				}
			})
			.state('main.contactAdd', {
				url: 'contact/add',
				views: {
					'content' : {
						templateUrl: 'partials/contactAdd.html',
						controller: 'contactAddController as cac'
					}
				},
				data: {
					title: 'Add'
				}
			})
			.state('main.contactId', {
				url: 'contact/:idContact',
				views: {
					'content' : {
						templateUrl: 'partials/contactId.html',
						controller: 'contactIdController as cic'
					}
				},
				params: {
					idContact : null
				}
			});
}]);

app.factory('resource', ['$resource', function($resource) {
	var self = this;
	self.contact = $resource('/api/contact/', null, 
		{
			'search' : {method : 'GET', url: '/api/contact/search/', isArray: true, 
				params: {
					firstName: '@fname',
					lastName: '@lname',
					email: '@email',
					company: '@company',
					phone: '@phone',
					keywords: '@keywords'
				}
			},
			'add' : {method: 'POST', url: '/api/contact/', isArray: false,
				params: {
					firstName: '@fname',
					lastName: '@lname',
					email: '@email',
					company: '@company',
					phone: '@phone',
					title: '@title',
					bio: '@bio',
					keywords: '@keywords'
				}
			},
			'update' : {method: 'PUT', url: '/api/contact/:id/', isArray: false,
				params: {
					id: '@id',
					firstName: '@fname',
					lastName: '@lname',
					email: '@email',
					company: '@company',
					phone: '@phone',
					title: '@title',
					bio: '@bio',
					keywords: '@keywords'
				}
			},
			'delete' : {method: 'DELETE', url: '/api/contact/:id', isArray: false, params: {id: '@id'}},
			'getAll' : {method: 'GET', url: '/api/contact/', isArray: true, params: {}},
			'getById' : {method: 'GET', url: '/api/contact/:id', isArray: true, params: {id: '@id'}} 
		}
	);

	self.activity = $resource('/api/activity/', null,
		{
			'add' : {method: 'POST', url:'/api/activity/', isArray: false,
				params: {
					event: '@event',
					date: '@date',
					title: '@title',
					location: '@location'
				}
			},
			'addRole' : {method: 'POST', url: '/api/activity/role/', isArray: false,
				params: {
					idContact: '@idContact',
					idActivity: '@idActivity',
					role: '@role'
				}
			},
			'getActivity' : {method: 'GET', url: '/api/activity/:id', isArray: true,
				params : {
					id: '@id'
				}
			},
			'getRole' : {method: 'GET', url: 'api/activity/role/:idContact', isArray: true,
				params : {
					idContact : '@idContact'
				}
			}
		}
	);

	self.category = $resource('/api/categories/', null,
		{
			'add' : {method: 'POST', url: '/api/categories/', isArray: false,
				params: {
					idContact: '@idContact',
					category: '@category'
				}
			},
			'get' : {method: 'GET', url: '/api/categories/:idContact', isArray: true,
				params: {
					idContact: '@idContact'
				}
			}
		}
	)

	return self;
}]);
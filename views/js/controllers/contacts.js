'use strict';
angular.module('app').controller('contactsController',
['$scope', '$state', '$stateParams', '$filter', 'resource',
function($scope, $state, $stateParams, $filter, resource) {
	var self = this;
	self.rows = [];

	resource.contact.getAll({},
		function success(rows) {
			self.rows = rows;
		},
		function error(err) {
			console.log(err)
		}
	);
}]);
'use strict';
angular.module('app').controller('contactSearchController',
['$scope', '$state', '$stateParams', '$filter', 'resource',
function($scope, $state, $stateParams, $filter, resource) {
	var self = this;
	self.rows = [];
	self.query = {};
	self.queryExecuted = false;

	self.verifyAnInput = function() {
		return !(self.query.firstName || self.query.lastName || self.query.email || self.query.phone || self.query.company)
	}

	self.search = function() {
		self.verifyAnInput();
		resource.contact.search(self.query,
			function success(rows) {
				self.queryExecuted = true;
				self.rows = rows;
			},
			function err(err) {
				self.res = err;
			}
		);

	}
}]);
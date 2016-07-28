'use strict';
angular.module('app').controller('mainController',
['$scope', '$state', '$stateParams', '$filter', 'resource', '$location',
function($scope, $state, $stateParams, $filter, resource, $location) {
	var self = this;
	self.title = 'Main';

	$scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
}]);
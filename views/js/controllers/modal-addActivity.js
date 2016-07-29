'use strict';
angular.module('app').controller('addActivityController',
['$scope', '$state', '$stateParams', '$filter', 'resource', '$uibModalInstance',
function($scope, $state, $stateParams, $filter, resource, $uibModalInstance) {
	$scope.activity = {};
	$scope.allEvents = ['Seminar', 'Workshop', 'Program']
	$scope.dateOptions = {
		formatYear: 'yy',
		maxDate: new Date(2020, 5, 22),
		startingDay: 1
	}
	$scope.activity.date = new Date();
	$scope.format = 'fullDate';
	$scope.opened = false;

	$scope.allRoles = [
		'Mentor',
		'Speaker',
		'Entreprenuer',
		'Legal/Patents',
		'Innovator',
		'Sponsor',
		'Faculty',
		'Staff',
		'Post/doc Grad',
		'Undergrad'
	];

	$scope.open1 = function() {
		$scope.opened = true;
	};

	$scope.formValidate = function () {
		return !$scope.addActivityForm.$valid;
	};

	$scope.ok = function (activity) {
		$uibModalInstance.close(activity);
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};

}]);
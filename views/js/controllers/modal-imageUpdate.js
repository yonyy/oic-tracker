'use strict';
angular.module('app').controller('imageUpdateController',
['$scope', '$uibModalInstance', 'img', function($scope, $uibModalInstance, img) {
	$scope.img = img;
	$scope.ok = function ($file) {
		$uibModalInstance.close($file);
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
}]);
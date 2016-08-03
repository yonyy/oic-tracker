'use strict';
angular.module('app').controller('contactAddController',
['$scope', '$state', '$stateParams', '$filter', 'resource', '$uibModal', 'Upload',
function($scope, $state, $stateParams, $filter, resource, $uibModal, Upload) {
	var self = this;
	self.rows = [];
	self.contact = {};
	self.allCategories = [
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

	self.selectedCategories = [];
	self.formErr = false;
	self.success = false;
	self.activities = [];

	self.add = function(file) {
		resource.contact.add(self.contact,
		function success(result) {
			var idContact = result.insertId;
			if (file) {
				console.log(file);
				file = Upload.rename(file, idContact.toString() + file.name.substr(file.name.lastIndexOf('.')));
				Upload.upload({
					url: '/api/image',
					data: {file: file, idContact: idContact}
				}).then(function (resp) {
					self.success = true;
				}, function (resp) {}, function (evt) {});
			}

			for (var i = 0; i < self.selectedCategories.length; i++) {
				var category = self.selectedCategories[i];
				resource.category.add({idContact: idContact, category: category},
					function success (result) {
						console.log(result);
					},
					function err(err) {
						console.log(err)
					}
				);
			}
			for (var i = 0; i < self.activities.length; i++) {
				var activity = self.activities[i];
				var role = activity.role;
				activity.date = $filter('date')(activity.date, 'yyyy-MM-dd HH:mm:ss');
				resource.activity.add(activity,
					function success(result) {
						var idActivity = result.insertId;
						resource.activity.addRole({
							idContact: idContact,
							idActivity: idActivity,
							role: role
						}, function success(result) {
							console.log(result);
						}, function err(err) {
							console.log(err);
						});
					},
					function err(err) {
						console.log(err);
					}
				);
			}
			self.success = true;
			console.log(result);

		},
		function err(err) {
			self.res = err;
		})
	}

	self.addActivity = function() {
		self.activities.push({});
		var index = self.activities.length - 1;
		self.editActivity(index);
	}

	self.editActivity = function(index) {
		var modalInstance = $uibModal.open({
			animation: true,
			size: 'lg',
			templateUrl: 'modals/modal-addActivity.html',
			scope: $scope,
			resolve: {
				activity: function() {
					return JSON.parse(JSON.stringify(self.activities[index]));
				},
				index: function() {
					return index;
				}
			},
			controller: 'addActivityController'
		});
		
		modalInstance.result.then(function (result){
			self.activities[result.index] = result.activity;
		});
	}
}]);
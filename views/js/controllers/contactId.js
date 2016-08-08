'use strict';
angular.module('app').controller('contactIdController',
['$scope', '$state', 'growl', '$stateParams', '$filter', 'resource', '$uibModal', 'Upload',
function($scope, $state, growl, $stateParams, $filter, resource, $uibModal, Upload) {
	var self = this;
	self.contact = {};
	self.img = 'undefined.png';
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
	self.activities = [];

	for (var i = 0; i < self.allCategories.length; i++) {
		self.allCategories[i] = {category: self.allCategories[i], idContact: $stateParams.idContact};
	}

	resource.contact.getById({id: $stateParams.idContact},
		function success(contact) {
			self.contact = contact[0];
			self.contact.id = $stateParams.idContact;
			self.img = self.contact.image;
			
			resource.category.get({idContact: self.contact.id},
				function success(categories) {
					for (var i = 0; i < categories.length; i++) {
						self.selectedCategories.push(categories[i]);
					}
				}, function err (err) {
					console.log(err);
				}
			);

			resource.activity.getRole({idContact: self.contact.id},
				function success (roles) {
					for (var i = 0; i < roles.length; i++) {
						var role = roles[i];
						resource.activity.getActivity({id: role.idActivity_activity_role},
							function success (activity) {
								activity[0].role = role.role;
								self.activities.push(activity[0]);
							}, function error(err) {
								console.log(err);
							}
						);
					}
				})

		},
		function err(err) {
			console.log(err)
		}
	);

	self.open = function () {
		var modalInstance = $uibModal.open({
			animation: true,
			size: 'lg',
			templateUrl: 'modals/modal-imageUpdate.html',
			scope: $scope,
			resolve: {
				img: function() {
					return self.img;
				}
			},
			controller: 'imageUpdateController'
		});
		
		modalInstance.result.then(function (file){
			self.file = file;
		});
	}

	self.update = function(file) {
		console.log(self.selectedCategories);
		resource.contact.update(self.contact,
			function success(result) {
				if (file) {
					var filename = $stateParams.idContact.toString() + file.name.substr(file.name.lastIndexOf('.'));
					file = Upload.rename(file, filename);
					Upload.upload({
						url: '/api/image',
						data: {file: file, idContact: $stateParams.idContact}
					}).then(function (resp) {
						growl.success('Success ' + resp.config.data.file.name + ' uploaded. Response: ' + resp.data);
						self.img = 'dummy';
						self.img = filename;
					}, function (resp) {
						growl.error('Error status: ' + resp.status);
					}, function (evt) {});
				}

				for (var i = 0; i < self.selectedCategories.length; i++) {
					var category = self.selectedCategories[i];
					if (!category.idCategories) {
						resource.category.add(category,
							function success (row) {
								console.log(row);
							},
							function error(err) {
								console.log(err);
							}
						)
					} else {
						resource.category.update(category,
							function success(result) {
								console.log(result);
							},
							function error(err) {
								console.log(err);
							}
						)
					}
				}

				for (var i = 0; i < self.activities.length; i++) {
					var activity = self.activities[i];
					if (!activity.idActivity) {
						resource.activity.add(activity,
							function success (row) {
								var idActivity = row.insertId;
								resource.activity.addRole({
									idContact: $stateParams.idContact,
									idActivity: idActivity,
									role: activity.role
								}, function success(row) {
									console.log(row);
								}, function error(err) {
									console.log(err);
								});
							}, function error(err) {
								console.log(err);
							}
						);
					} else {
						resource.activity.update(activity,
							function success(result) {
								console.log(result);
							},
							function error(err) {
								console.log(err);
							}
						);
					}
				}

				growl.success('Updated Successfully');
			},
			function err (err) {
				growl.error('An error occured when updating');
				self.success = false;
			}
		);
	}

	self.delete = function() {
		resource.contact.delete({id: $stateParams.idContact},
			function success(result) {
				growl.success('Successfully deleted contact');
				$state.go('main.contact');
			},
			function err(err) {
				growl.error('An error occured');
				console.log(err);
			}
		);
	};

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

	self.deleteActivity = function(index) {
		self.activities.splice(index, 1);
	}

}]);
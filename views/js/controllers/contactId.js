'use strict';
angular.module('app').controller('contactIdController',
['$scope', '$state', 'growl', '$stateParams', '$filter', 'resource', '$uibModal', 'Upload',
function($scope, $state, growl, $stateParams, $filter, resource, $uibModal, Upload) {
	var self = this;
	self.contact = {};
	self.img = 'undefined.png';

	resource.contact.getById({id: $stateParams.idContact},
		function success(rows) {
			self.contact = rows[0];
			self.contact.id = $stateParams.idContact;
			self.img = self.contact.image;
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

}]);
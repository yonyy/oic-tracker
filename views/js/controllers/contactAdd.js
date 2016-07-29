'use strict';
angular.module('app').controller('contactAddController',
['$scope', '$state', '$stateParams', '$filter', 'resource', 'Upload',
function($scope, $state, $stateParams, $filter, resource, Upload) {
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

	self.add = function(file) {
		resource.contact.add(self.contact,
		function success(result) {
			if (file) {
				console.log(file);
				file = Upload.rename(file, result.insertId.toString() + file.name.substr(file.name.lastIndexOf('.')));
				Upload.upload({
					url: '/api/image',
					data: {file: file, idContact: result.insertId}
				}).then(function (resp) {
					console.log('Success ' + resp.config.data.file.name + ' uploaded. Response: ' + resp.data);
					console.log(resp.data);
					self.success = true;
				}, function (resp) {
					console.log('Error status: ' + resp.status);
				}, function (evt) {});
			}
			self.success = true;
			console.log(result);

		},
		function err(err) {
			self.res = err;
		})
	}
}]);
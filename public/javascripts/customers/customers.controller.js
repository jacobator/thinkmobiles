(function() {
	"use strict";

	angular
		.module("thinkmobiles")
		.controller("CustomersController", CustomersController)
		.run(function(editableOptions) {
			editableOptions.theme = "bs3";
		});

	CustomersController.$inject = ["CustomersService"];

	function CustomersController(CustomersService) {
		var vm = this;
		vm.customers = [];

		updateCustomersList();

		function updateCustomersList() {
			CustomersService.getCustomers().then(function(data) {
				data.forEach(function(item) {
					item.dateOfBirth = item.dateOfBirth ? new Date(item.dateOfBirth) : item.dateOfBirth;
				});
				vm.customers = data;
			});
		}

		vm.addCustomer = function() {
			var customer = {
				name: {
					first: "John",
					last: "Doe"
				},
				dateOfBirth: new Date(),
				companyName: "ThinkMobiles",
				phone: {
					mobile: "0123456789",
					work: "0123456789"
				},
				skype: "johndoe"
			};
			CustomersService.addCustomer(customer).then(function(customer) {
				updateCustomersList();
			});
		};

		vm.editCustomer = function(data, id) {
			data._id = id;
			data.name = {
				first: data.first,
				last: data.last
			};
			data.phone = {
				mobile: data.mobile,
				work: data.work
			};
			delete data.first;
			delete data.last;
			delete data.mobile;
			delete data.work;
			CustomersService.editCustomer(data).then(function(data) {
				updateCustomersList();
			});
		};

		vm.removeCustomer = function(id) {
			CustomersService.removeCustomer(id).then(function(data) {
				updateCustomersList();
			});
		};

		vm.checkField = function(data) {
			if (!data) {
				return "required";
			}
		};

		vm.checkPhone = function(data) {
			if (!data) {
				return "required";
			}
			if (data.length !== 10 || !/^\d+$/.test(data)) {
				return "invalid number";
			}
		};
	}
})();
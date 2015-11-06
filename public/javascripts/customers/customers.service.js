(function() {
	"use strict";

	angular
		.module("thinkmobiles")
		.factory("CustomersService", CustomersService);

	CustomersService.$inject = ["$resource"];

	function CustomersService($resource) {
		var service = {
			getCustomer: getCustomer,
			getCustomers: getCustomers,
			addCustomer: addCustomer,
			editCustomer: editCustomer,
			removeCustomer: removeCustomer
		};

		var Customers = $resource("/api/customers/:id", {id: "@id"});

		return service;

		function getCustomer(id) {
			return Customers.get({id: id}).$promise;
		}

		function getCustomers() {
			return Customers.query().$promise;
		}

		function addCustomer(data) {
			return Customers.save(data).$promise;
		}

		function editCustomer(data) {
			return $resource("/api/customers/:id", { id: "@id" }, {
				update: {
					method: "PUT"
				}
			}).update({ id: data._id }, data).$promise;
		}

		function removeCustomer(id) {
			return Customers.remove({id: id}).$promise;
		}
	}
})();
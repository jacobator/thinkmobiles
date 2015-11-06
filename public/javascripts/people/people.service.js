(function() {
	"use strict";

	angular
		.module("thinkmobiles")
		.factory("PeopleService", PeopleService);

	PeopleService.$inject = ["$resource"];

	function PeopleService($resource) {
		var service = {
			getPerson: getPerson,
			getPeople: getPeople,
			addPerson: addPerson,
			editPerson: editPerson,
			removePerson: removePerson
		};

		var People = $resource("/api/people/:id", {id: "@id"});

		return service;

		function getPerson(id) {
			return People.get({id: id}).$promise;
		}

		function getPeople() {
			return People.query().$promise;
		}

		function addPerson(data) {
			return People.save(data).$promise;
		}

		function editPerson(data) {
			return $resource("/api/people/:id", { id: "@id" }, {
				update: {
					method: "PUT"
				}
			}).update({ id: data._id }, data).$promise;
		}

		function removePerson(id) {
			return People.remove({id: id}).$promise;
		}
	}
})();
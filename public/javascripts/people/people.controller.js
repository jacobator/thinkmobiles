(function() {
	"use strict";

	angular
		.module("thinkmobiles")
		.controller("PeopleController", PeopleController)
		.run(function(editableOptions) {
			editableOptions.theme = 'bs3';
		});

	PeopleController.$inject = ["PeopleService"];

	function PeopleController(PeopleService) {
		var vm = this;
		vm.people = [];

		updatePeopleList();

		function updatePeopleList() {
			PeopleService.getPeople().then(function(data) {
				data.forEach(function(item) {
					item.dateOfBirth = item.dateOfBirth ? new Date(item.dateOfBirth) : item.dateOfBirth;
				});
				vm.people = data;
			});
		}

		vm.addPerson = function() {
			var person = {
				name: {
					first: "John",
					last: "Doe"
				},
				dateOfBirth: new Date()
			};
			PeopleService.addPerson(person).then(function(person) {
				updatePeopleList();
			});
		};

		vm.editPerson = function(data, id) {
			data._id = id;
			data.name = {
				first: data.first,
				last: data.last
			};
			delete data.first;
			delete data.last;
			PeopleService.editPerson(data).then(function(data) {
				updatePeopleList();
			});
		};

		vm.removePerson = function(id) {
			PeopleService.removePerson(id).then(function(data) {
				updatePeopleList();
			});
		};

		vm.checkField = function(data) {
			if (!data) {
				return "required";
			}
		};
	}
})();
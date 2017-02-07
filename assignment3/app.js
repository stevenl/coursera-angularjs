(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
    .constant('BaseURL', 'https://davids-restaurant.herokuapp.com')
    .controller('NarrowItDownController', NarrowItDownController)
    .directive('foundItems', FoundItems)
    .service('MenuSearchService', MenuSearchService);

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var controller = this;

        controller.searchTerm = '';
        controller.found = [];
        controller.message = '';

        controller.search = function () {
            var promise = MenuSearchService.getMatchedMenuItems(controller.searchTerm);
            promise.then(function(response) {
                controller.found = response;
                // console.log(controller.found);

                if (controller.found.length === 0) {
                    controller.message = 'Nothing found';
                }
            });
        };

        controller.removeItem = function (index) {
            controller.found.splice(index, 1);
            // console.log(controller.found);
        };
    }

    MenuSearchService.$inject = ['$q', '$http', 'BaseURL'];
    function MenuSearchService($q, $http, BaseURL) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            searchTerm = searchTerm.toLowerCase();
            // console.log(searchTerm);

            if (searchTerm === '') {
                var deferred = $q.defer();
                deferred.resolve([]);

                return deferred.promise;
            }

            return $http({
                method: 'GET',
                url: (BaseURL + '/menu_items.json')
            })
            .then(function (response) {
                var foundItems = response.data.menu_items;
                foundItems = foundItems.filter(function (item) {
                    return item.description.indexOf(searchTerm) !== -1;
                });

                var deferred = $q.defer();
                deferred.resolve(foundItems);

                return deferred.promise;
            },
            function (error) {
                console.log(error);
            });
        };
    }

    function FoundItems() {
        var ddo = {
            restrict: 'E',
            templateUrl: 'found-items.html',
            scope: {
                found: '<foundItems',
                controller: '<onRemove'
            }
        };
        return ddo;
    }
})();

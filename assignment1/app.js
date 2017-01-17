(function () {
    'use strict'
    angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

    // protect dependency injection from minification
    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope) {
        $scope.lunchMenu = '';
        $scope.message = '';
        $scope.messageClass = '';

        $scope.checkMenuAndSetMessage = function () {
            var menuItems = parseMenu($scope.lunchMenu);

            if (menuItems.length == 0) {
                $scope.message = 'Please enter data first';
                $scope.messageClass = 'red';
            } else if (isTooMuch(menuItems)) {
                $scope.message = 'Too much!';
                $scope.messageClass = 'green';
            } else {
                $scope.message = 'Enjoy!';
                $scope.messageClass = 'green';
            }
        }
    }

    function parseMenu(lunchMenu) {
        var menuItems = lunchMenu.split(/\s*,\s*/);

        // filter out 'empty' items
        menuItems = menuItems.filter( function(item){return item != ''} );

        // console.log(menuItems);
        return menuItems;
    }

    function isTooMuch(menuItems) {
        return menuItems.length > 3;
    }
})()

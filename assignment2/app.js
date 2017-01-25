(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);
    //.provider('ShoppingListCheckOffService', ShoppingListCheckOffServiceProvider);

    function ShoppingListCheckOffService() {
        var service = this;
        var toBuyList = [];
        var boughtList = [];

        service.initialise = function () {
            toBuyList = [
                { name: 'cookies', quantity: 10 },
                { name: 'eggs', quantity: 12 },
                { name: 'beer', quantity: 6 },
                { name: 'chips', quantity: 20 },
                { name: 'cake', quantity: 1 }
            ];
        };

        service.buy = function (index) {
            var item = toBuyList.splice(index, 1)[0];
            boughtList.push(item);
        };

        service.toBuyList = function () {
            return toBuyList;
        };

        service.boughtList = function () {
            return boughtList;
        };
    }

    // This is for registering the ShoppingListCheckOffService with
    // the angular module using the .provider() function
    // function ShoppingListCheckOffServiceProvider() {
    //     var provider = this;
    //     provider.$get = function () {
    //         return new ShoppingListCheckOffService();
    //     };
    // }

    // protect dependency injection from minification
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

    function ToBuyController(ShoppingListCheckOffService) {
        var toBuy = this;

        ShoppingListCheckOffService.initialise();

        toBuy.items = ShoppingListCheckOffService.toBuyList();

        toBuy.buyItem = function (index) {
            ShoppingListCheckOffService.buy(index);
        };
    }

    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var bought = this;
        bought.items = ShoppingListCheckOffService.boughtList();
    }

})();

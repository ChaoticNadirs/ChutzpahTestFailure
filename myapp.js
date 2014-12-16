(function () {
    var app = angular.module('myApp', ['ui.bootstrap']);

    app.factory('myFactory', ['$http', function ($http) {
        var myFactory = {};
        myFactory.getLocations = function (query) {
            return $http.get('/Locations', { params: { query: query } });
        };

        return myFactory;
    }]);

    app.controller('MyController', ['myFactory', function (myFactory) {
        this.location = '';

        this.getLocations = function (query) {
            return myFactory.getLocations(query).then(function (response) {
                return response.data;
            });
        };
    }]);
})();
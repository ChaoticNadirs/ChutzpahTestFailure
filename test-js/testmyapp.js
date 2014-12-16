///<reference path="../angular/angular.js"/>
///<reference path="../angular/angular-mocks.js"/>
///<reference path="../angular-ui/ui-bootstrap-tpls.js"/>
///<reference path="../qunit/qunit-1.15.0.js"/>
///<reference path="../sinon/sinon-1.9.1.js"/>
///<reference path="../myapp.js"/>

var appMocks = angular.module("appMocks", []);

appMocks.config(function ($provide) {
    $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
});

var injector = angular.injector(['ng', 'myApp', 'appMocks']);
var scope = {};
var $controllers = injector.get('$controller');
var $httpBackend = injector.get('$httpBackend');
var myFactory = injector.get('myFactory');

QUnit.module("MyApp Tests", {
    setup: function () {
        scope = injector.get('$rootScope').$new();
        $controllers('MyController as my', {
            $scope: scope,
            myFactory: myFactory
        });
    }
});

QUnit.test('Get locations returns valid locations', function (assert) {
    $httpBackend.expectGET('/Locations?query=l').respond(['london', 'leeds']);

    var result;
    scope.my.getLocations('l').then(function (response) {
        result = response;
    });
    $httpBackend.flush();

    assert.equal(2, result.length, "correct number of results returned");
});
var myApp = angular.module('contactsApp', [])
            .config(['$httpProvider', function ($httpProvider) {
                $httpProvider.defaults.useXDomain = true;
                $httpProvider.defaults.withCredentials = true;
                delete $httpProvider.defaults.headers.common['X-Requested-With'];
                $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
            }]);

myApp.controller('contactsController', ['$scope', '$http', function ($scope, $http) {

    $scope.contacts = [];
    $scope.name = '';
    $scope.email = '';
    $scope.profession = '';

    function getContacts() {
        $http.get('http://localhost:8484/directory/contacts')
            .success(function (result) {
                $scope.contacts = result._embedded.content;
            })
            .error(function (data, status) {
                console.log(data);
            });
    }

    function createPayload() {
        var payload = {};
        payload.name = $scope.name;
        payload.email = $scope.email;
        payload.profession = $scope.profession;
        return payload;
    }
    
    $scope.createContact = function() {
        var contactPayload = createPayload();
        console.log(contactPayload);
        
        $http.post('http://localhost:8484/directory/contacts', contactPayload)
            .success(function (result) {

                console.log(result);
                $scope.contacts = result;
                $scope.name = '';
                $scope.email = '';
                $scope.profession = '';
                getContacts();
            })
            .error(function (data, status) {
                console.log(data);
            });
    }
    
    getContacts();
}]);
(function() {
    angular.module('templo', [])
        .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
            $routeProvider    
                .when('/templo', {
                    templateUrl: '/views/templo.html',
                    controller: 'TemploController',
                    controllerAs: 'templo'
                }) 
                .when('/connect/local', {
                    templateUrl: '/views/connect-local.html',
                    controller: 'SecondarySignupController',
                    controllerAs: 'templo'
                });

            $locationProvider.html5Mode(true);
        }])
        .controller('TemploController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
            //Custom Profile functionality
            $http.get('/api/userData')
                .success(function(data) {
                    $scope.user = data; //Expose the user data to your angular scope
                });
        }])
        .controller('SecondarySignupController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
            //Custom Link Page functionality
            $http.get('/api/userData')
                .success(function(data) {
                    $scope.user = data; //Expose the user data to your angular scope
                });
        }]);
})();

angular.module('app', [
    'ui.bootstrap',
    'ui.utils',
    'ui.router',
    'ngAnimate',
    'ngFileUpload'
    ]);

angular.module('app').config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('upload', {
        url: '/upload',
        templateUrl: 'partial/upload/upload.html'
    });
    /* Add New States Above */
    $urlRouterProvider.otherwise('/upload');

});

angular.module('app').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});

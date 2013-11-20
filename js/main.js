var wikipermApp = angular.module('wikipermApp', ['firebase', 'ngRoute', 'wikipermControllers']);

wikipermApp.controller('wikipermAuthCtrl', ['$scope', 'angularFire',
    function wikipermAuthCtrl($scope, angularFire) {
    	var lefturl = new Firebase('https://wikiperm.firebaseio.com/approved/left/');
  		$scope.authMessage = 'Люк, я - твой отец!';
    	$scope.myUser = '';
    	$scope.isUser = false;
    	$scope.authMe = function() {
    		if (!$scope.myUser) {
    			var auth = new FirebaseSimpleLogin(lefturl, function(error, user) {
    				if (error){
						alert('Ошибка авторизации!')
					}
					else if (user){
						$scope.authMessage = 'Привет, '+user.username;
						$scope.myUser = user;
						$scope.isUser = true;
					}
					else {
						auth.login('github');
						$scope.authMessage = 'Привет, '+user.username;
						$scope.myUser = user;
						$scope.isUser = true;
					}
				});

			}
    	}
    }
]);

wikipermApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/list', {
        templateUrl: 'templates/list.html',
        controller: 'wikipermListCtrl'
      }).
      when('/list/:itemId', {
        templateUrl: 'templates/chat.html',
        controller: 'wikipermChatCtrl'
      }).
      otherwise({
        redirectTo: '/list'
      });
  }]);

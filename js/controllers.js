var wikipermControllers = angular.module('wikipermControllers', ['firebase']);
var firebaseurl = 'https://wikiperm.firebaseio.com';

wikipermControllers.controller('wikipermListCtrl', ['$scope', 'angularFire', 'angularFireCollection',
  function wikipermListCtrl($scope, angularFire, angularFireCollection) {
    var lefturl = new Firebase(firebaseurl+'/approved/left/');
    var righturl = new Firebase(firebaseurl+'/approved/right/');
    var templefturl = new Firebase(firebaseurl+'/temp/left/');
    var temprighturl = new Firebase(firebaseurl+'/temp/right/');
    $scope.left = angularFireCollection(lefturl, $scope, 'left');
    $scope.right = angularFireCollection(righturl, $scope, 'right');
    $scope.templeft = angularFire(templefturl, $scope, 'templeft');
    $scope.tempright = angularFire(temprighturl, $scope, 'tempright');
    $scope.chatNum = [];
    $scope.addLeft = function(e) {
      if (e.keyCode==13 && $scope.leftValue!=''){
      	templefturl.push($scope.leftValue);
      	$scope.leftValue = '';
      }
    }
    $scope.addRight = function(e) {
	  if (e.keyCode==13 && $scope.rightValue!=''){
        temprighturl.push($scope.rightValue);
        $scope.rightValue = '';
      }
    }
    $scope.topLeft = function(element){
    	if ($scope.myUser){
    		var urltotop = new Firebase(firebaseurl+'/approved/left/'+element);
    		urltotop.on('value', function(snapshot) {
    			var mypriority = snapshot.getPriority();
    			console.log(mypriority);
  				if (mypriority == null){
  					urltotop.setPriority(1000);
  				}
  				else {
  					urltotop.setPriority(mypriority - 1);
  				}
			});
    	}
    }
    $scope.topRight = function(element){
    	if ($scope.myUser){
    		var urltotop = new Firebase(firebaseurl+'/approved/right/'+element);
    		urltotop.on('value', function(snapshot) {
    			var mypriority = snapshot.getPriority();
  				if (mypriority == null){
  					urltotop.setPriority(1000);
  				}
  				else {
  					urltotop.setPriority(mypriority - 1);
  				}
			});
    	}
    }
    $scope.deleteLeft = function(element){
    	if ($scope.myUser){
    		var urltodel = new Firebase(firebaseurl+'/approved/left/'+element);
    		urltodel.remove();
    	}
    }
    $scope.deleteTempLeft = function(element){
    	if ($scope.myUser){
    		var urltodel = new Firebase(firebaseurl+'/temp/left/'+element);
    		urltodel.remove();
    	}
    }
    $scope.deleteRight = function(element){
    	if ($scope.myUser){
    		var urltodel = new Firebase(firebaseurl+'/approved/right/'+element);
    		urltodel.remove();
    	}
    }
    $scope.deleteTempRight = function(element){
    	if ($scope.myUser){
    		var urltodel = new Firebase(firebaseurl+'/temp/right/'+element);
    		urltodel.remove();
    	}
    }
    $scope.addTempLeft = function (ekey, evalue){
    	if ($scope.myUser){
    		var urltodel = new Firebase(firebaseurl+'/temp/left/'+ekey);
    		urltodel.remove();
    		lefturl.child(ekey).setWithPriority(evalue, 1000);
    	}
    }
    $scope.addTempRight = function (ekey, evalue){
    	if ($scope.myUser){
    		var urltodel = new Firebase(firebaseurl+'/temp/right/'+ekey);
    		urltodel.remove();
    		righturl.child(ekey).setWithPriority(evalue, 1000);
    	}
    }
    var chatsurl = new Firebase(firebaseurl+'/chat/');
    chatsurl.on("value", function(dataSnapshot){
    	dataSnapshot.forEach(function(childSnapshot) {
    		var mcount = childSnapshot.child('messages').numChildren();
    		$scope.chatNum[childSnapshot.name()] = mcount;
    	});
    });
  }
]);

wikipermControllers.controller('wikipermChatCtrl', ['$scope', 'angularFire', '$routeParams',
	function wikipermChatCtrl($scope, angularFire, $routeParams) {
	  	$scope.itemId = $routeParams.itemId;
	  	$scope.chatHeader = '';
	  	var myurl = new Firebase(firebaseurl+'/approved/left/'+$scope.itemId);
	  	myurl.on("value", function (snapshot){
	  		if (snapshot.val()!=null){
	  			$scope.chatHeader = snapshot.val();
	  			$scope.$apply();
	  		}
	  	});
	  	myurl = new Firebase(firebaseurl+'/approved/right/'+$scope.itemId);
	  	myurl.on("value", function (snapshot){
	  		if (snapshot.val()!=null){
	  			$scope.chatHeader = snapshot.val();
	  			$scope.$apply();
	  		}
	  	});
	  	myurl = new Firebase(firebaseurl+'/temp/left/'+$scope.itemId);
	  	myurl.on("value", function (snapshot){
	  		if (snapshot.val()!=null){
	  			$scope.chatHeader = snapshot.val();
	  			$scope.$apply();
	  		}
	  	});
	  	myurl = new Firebase(firebaseurl+'/temp/right/'+$scope.itemId);
	  	myurl.on("value", function (snapshot){
	  		if (snapshot.val()!=null){
	  			$scope.chatHeader = snapshot.val();
	  			$scope.$apply();
	  		}
	  	});
	  	var chaturl = new Firebase(firebaseurl+'/chat/'+$scope.itemId+'/messages');
	  	$scope.messages = angularFire(chaturl, $scope, 'messages');
	  	$scope.addChat = function(e) {
	        if (e.keyCode==13 && $scope.chatValue!=''){
                chaturl.push($scope.chatValue);
                $scope.chatValue = '';
            }
        }
        $scope.deleteChat = function(element) {
        	var messageurl = new Firebase(firebaseurl+'/chat/'+$scope.itemId+'/messages/'+element);
        	messageurl.remove();
        }
	}
 ]);

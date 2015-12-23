//FribeCaddy

var fribaApp = angular.module("fribeCaddy", ['ngRoute', 'ngAnimate']);

fribaApp.config(function($routeProvider, $locationProvider){
   
    $routeProvider
    
    .when('/', {
        templateUrl:'pages/main.php',
        controller: 'mainController'
    })
    
    .when('/laskuri', {
        templateUrl:'pages/laskuri.html',
        controller: 'laskuriController'
    })
    
    .when('/pelaajat', {
        templateUrl:'pages/pelaajat.html',
        controller: 'pelaajatController'
    })
    
    .when('/radat', {
        templateUrl:'pages/radat.html',
        controller: 'radatController'
    })
    
    .when('/nupy', {
        templateUrl:'pages/nupy.html',
        controller: 'nupyController'
    })
     
      $locationProvider.html5Mode(false);
    
});

fribaApp.service('databaseService', function($http) {
    
   this.getCourses = function(radanNimi) {
   
   return $http({
   method: 'GET',
   url: "includes/getRadat.php?rata=" + radanNimi
   }).then(function successCallBack(response){
        return response;
   }, function errorCallback(response) {
          
    
   });
   };

   
   this.getPlayers = function(pelaajanNimi) {
   
   return $http({
   method: 'GET',
   url: "includes/getPelaajat.php?user=" + pelaajanNimi
   }).then(function successCallBack(response){
        return response;
   }, function errorCallback(response) {
          
    
   });
   };
    
}); 
    
fribaApp.factory('scoreCardKeeper', function(){
   
   var keeper = {};
   keeper.scoreCards = [];
   keeper.addScoreCard = function(a){
        keeper.scoreCards.push(a);
    
   }
   keeper.getScoreCard = function(){
        return keeper.scoreCards;
   }
    keeper.resetScoreCards = function(){
       keeper.scoreCards = [];
    }
    return keeper;
  
    
});    

fribaApp.factory('playerCreator', function(){
    
    var creator = {}
    creator.createPlayer = function(a){
        var player = {};
        player.name = a;
        player.scoreCard = [];
        player.addScore = function (score, idx) {
            player.scoreCard[idx] = score;
        }
        return player;    
    }
    
    return creator;
    
});
  

//MAIN
fribaApp.controller('mainController', ['$scope', function($scope) {
    console.log("main");


}]);

fribaApp.controller('laskuriController', ['$scope', 'databaseService', 'playerCreator', 'scoreCardKeeper', function($scope, databaseService, playerCreator, scoreCardKeeper) {
    //functions
    var scoreCard = scoreCardKeeper.getScoreCard();
    if (scoreCard.length == 0) {
        //code
   
        $scope.picked;
        $scope.available;
        $scope.notpickedPlayers = [];
        $scope.pickedPlayers = [];
        
        
        $scope.addPlayer = function(a){
            
                
            if (a=="add" && $scope.pickedPlayers.length < 5 && $scope.available != "") {
                
            var userIdx;
            $scope.pickedPlayers.push($scope.available);
            for(var i = 0; i < $scope.notpickedPlayers.length; i++){
                if ($scope.available == $scope.notpickedPlayers[i]) {
                    userIdx = i;
                }
            }
            $scope.notpickedPlayers.splice(userIdx, 1);
            $scope.available="";
            }
            
            if (a=="remove" && $scope.pickedPlayers.length > 0 && $scope.picked != "") {
            var userIdx;
            $scope.notpickedPlayers.push($scope.picked);
            for(var i = 0; i < $scope.pickedPlayers.length; i++){
                if ($scope.picked == $scope.pickedPlayers[i]) {
                    userIdx = i;
                }
            }
            $scope.pickedPlayers.splice(userIdx, 1);
            $scope.picked="";
            }
             
            $scope.startGame = function() {
                for (var i = 0; i < pickedPlayers.length; i++) {
                    
                }
                
            }
                    
        }
            
      
        
        
        $scope.playerlist;
        $scope.courselist;
        if ($scope.playerlist == null) {
            databaseService.getPlayers("").then(function(response){
               $scope.playerlist = response.data;
               for (var i = 0; i < response.data.length; i++){
                    $scope.notpickedPlayers.push(response.data[i].username);
               }
                
                
            });
        }
        if ($scope.courselist == null) {
            databaseService.getCourses("").then(function(response){
                for (var i = 0; i < response.data.length; i++) {
                    $scope.courselist = response.data;
                    
                }
            });
        }
     }
 
}]);


 //PELAAJAT   
 fribaApp.controller('pelaajatController', ['$scope', '$log', 'databaseService', function($scope, $log, databaseService) {
    
   $scope.searchString = "";
    
    
   $scope.searchString = "";
    $scope.searchForPlayer = function searchForPlayer(){
            databaseService.getPlayers($scope.searchString).then(function(response) {
                console.log(response.data);
            $scope.players = response.data;
            });
    } 
    
    
    
   


}]);   
//RADAT
fribaApp.controller('radatController', ['$scope', '$log', 'databaseService', function($scope, $log, databaseService) {

    $scope.searchString = "";
    $scope.searchForCourse = function searchForCourse(){
            databaseService.getCourses($scope.searchString).then(function(response) {
                console.log(response.data);
            $scope.courses = response.data;
            });
    }
/*
$scope.searchForCourse = function searchForCourse() {

     $http.get("includes/getRadat.php?rata=" + $scope.searchString).success(function(response){
        $log.log(response);
        $scope.courses = response;
        
        
})
  
}
  */  
   


}]);





    
    
    
    

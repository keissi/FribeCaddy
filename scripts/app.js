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
   keeper.course = {};
   keeper.addScoreCard = function(player){
        keeper.scoreCards.push(player);
    
   }
   keeper.setCourse = function(course){
        keeper.course = course;
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
    creator.createPlayer = function(name){
        var player = {};
        player.name = name;
        player.scoreCard = [];
        player.sum;
        player.addScore = function (score, idx) {
            player.scoreCard[idx] = score;
        }
        player.total = function (){
            var sum = 0;
            for (var i = 0; i < this.scoreCard.length; i++) {
                sum = sum + this.scoreCard[i];
            }
            player.sum = sum;
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
    
    var scoreCards = scoreCardKeeper;
    $scope.scoreCards = scoreCards.scoreCards;
    $scope.notpickedPlayers = [];
    $scope.pickedPlayers = [];
        $scope.playerlist;
        $scope.courselist = [];
        $scope.picked;
        $scope.available;
        $scope.pickedCourse;
        if ($scope.playerlist == null) {
            databaseService.getPlayers("").then(function(response){
               $scope.playerlist = response.data;
               for (var i = 0; i < response.data.length; i++){
                    $scope.notpickedPlayers.push(response.data[i].username);
               }
                $scope.available = $scope.notpickedPlayers[0];
                
            });
        }
        if ($scope.courselist.length == 0) {
            databaseService.getCourses("").then(function(response){
                for (var i = 0; i < response.data.length; i++) {
                    
                    var course = {}
                    course.nimi = response.data[i].nimi;
                    course.par = response.data[i].par;
                    course.vayla_lkm = response.data[i].vayla_lkm;
                    $scope.courselist.push(course);
                }
            });
        }
   
        
        
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
            $scope.picked=$scope.pickedPlayers[0];
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
             
           
                    
        }
            
        
        
        
        $scope.startGame = function (args) {
            if ($scope.pickedPlayers.length > 0 && $scope.pickedCourse != null) {
                    var course = JSON.parse($scope.pickedCourse);
                    for(var i = 0; i < $scope.pickedPlayers.length; i++){
                        var player = playerCreator.createPlayer($scope.pickedPlayers[i]);
                        for(var k = 0; k < course.vayla_lkm; k++){
                            player.scoreCard.push(k);
                        }
                        scoreCards.addScoreCard(player);
                    }
                 console.log($scope.scoreCards);   
                
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





    
    
    
    

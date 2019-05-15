var firebaseConfig = {
    apiKey: "AIzaSyB3A-Sj-X_VpkDC9X4_KtUDyCxbxIKgcxg",
    authDomain: "ninjafirebase-158d7.firebaseapp.com",
    databaseURL: "https://ninjafirebase-158d7.firebaseio.com",
    projectId: "ninjafirebase-158d7",
    storageBucket: "ninjafirebase-158d7.appspot.com",
    messagingSenderId: "57326601776",
    appId: "1:57326601776:web:b49c2699d4e2d4bd"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

let myNinjaApp = angular.module('myNinjaApp', ['firebase', 'ngRoute'])

// config method inicia antes da aplicação iniciar

myNinjaApp.config(['$routeProvider', function ($routeProvider){

    $routeProvider
    .when('/home', {
        templateUrl:'views/home.html'
    })
    .when('/directory', {
        templateUrl: 'views/directory.html',
        controller: 'NinjaController'
    }).otherwise({
        redirectTo: '/home'
    })

}])

myNinjaApp.controller("NinjaController", ['$firebaseArray', '$scope', '$http', function($firebaseArray, $scope, $http){

    const rootRef = firebase.database().ref().child('angular');
    const ref = rootRef.child('object');
    this.object = $firebaseArray(ref);

        // remove ninjas function
      $scope.removeNinja = function (ninja){
          let removedNinja = $scope.ninjas.indexOf(ninja);
          $scope.ninjas.splice(removedNinja, 1);
          // splice(posição de inicio, qntDeRemoção
      }

        // add ninjas function
      $scope.addNinja = function (){

        firebase.database().ref('ninjas/').set({
          // $scope.ninjas.push({
              name: $scope.newNinja.name,
              belt: $scope.newNinja.belt,
              rate: parseInt($scope.newNinja.rate),
              available: true
          })



            // cleanning the fields
        $scope.newNinja.name = ""
        $scope.newNinja.belt = ""
        $scope.newNinja.rate = ""

    }

    // requisição http do array ninjas
    $http.get("https://ninjafirebase-158d7.firebaseio.com/.json").then(function(data){
      $scope.ninjas = data.data
    })

}])

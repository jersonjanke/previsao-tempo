// Modulo controlador
var app = angular.module("myTemp", []);

app.controller("myCtrlTemp", function($scope, $http){
  $http.get("http://developers.agenciaideias.com.br/tempo/json/blumenau-SC").
  success(function(response){
    var obj = $scope.myData = response;
    console.log(obj);
  });
});

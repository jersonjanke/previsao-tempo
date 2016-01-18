var app = angular.module("myTemp", []);
var maxima = 0;
var minima = 99;
var dataMaxima;
var dataMinima;
var  obj;
var lista;

// Carrega dados
app.controller("myCtrlTemp", function($scope, $http){

  $http.get("http://developers.agenciaideias.com.br/tempo/json/blumenau-SC").
  success(function(response){
    obj = $scope.myData = response;
    console.log(obj);
    lista = $.map(obj, function(el) { return el });
    $scope.atualizaPrevisoes($scope,lista);
    $scope.recomendacoes($scope);
  });

  // Box Máximo e Mínima
  $scope.atualizaPrevisoes = function($scope, lista){

    for (var i = 0; i < lista.length; i++) {
      var dia = lista[i];
      // Temperatura Máxima
      if(dia.temperatura_max > maxima) {
        maxima = dia.temperatura_max;
        dataMaxima = dia.data;
        $scope.max = maxima;
        $scope.dtMax = dataMaxima;
      }
      // Temperatura Mínima
      if(dia.temperatura_min < minima) {
        minima = dia.temperatura_min;
        dataMinima = dia.data;
        $scope.min = minima;
        $scope.dtMin = dataMinima;
      }
    }
  }

  // Box Recomendação
  $scope.recomendacoes = function(){
    if(maxima > 25)
    $scope.recomendacaoPositivo = true;
    else
    $scope.recomendacaoNegativo = true;
  }
});

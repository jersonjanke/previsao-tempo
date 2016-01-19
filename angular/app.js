/*
* Projeto: Previsão do Tempo
* Data de criação: 15/01/2016
* Programador: Jerson Janke
*/
var app = angular.module("myTemp", []);
var maxima = 0;
var minima = 99;
var dataMaxima;
var dataMinima;
var  obj;
var lista;
var estado = "SC";
var cidade = "Blumenau";

// Carrega dados
app.controller("myCtrlTemp", function($scope, $http){

  //Atualiza dados iniciais
  $http.get("http://developers.agenciaideias.com.br/tempo/json/"+cidade+"-"+estado).
  success(function(response){
    obj = $scope.myData = response;
    lista = $.map(obj, function(el) { return el });
    $scope.atualizaPrevisoes($scope,lista);
    $scope.recomendacoes($scope,lista);
    $scope.carregaGrafico($scope,lista);
    $scope.carregando = true;
    $scope.cidadeAtual = cidade;
    $scope.estadoAtual = estado;
  });

  //**** METODO ****
  //Nova consulta de previssão
  $scope.consultaPrevisao = function(){
    var cid = $scope.cidade;
    var est = $scope.estado;
    $scope.carregaDados(cid,est);
    $scope.carregando = false;
  }

  //**** METODO ****
  //Nova consulta ao clicar no botão consultar
  $scope.carregaDados = function(cidade,estado){

    $http.get("http://developers.agenciaideias.com.br/tempo/json/"+cidade+"-"+estado).
    success(function(response){
      obj = $scope.myData = response;
      lista = $.map(obj, function(el) { return el });
      $scope.atualizaPrevisoes($scope,lista);
      $scope.recomendacoes($scope,lista);
      $scope.carregaGrafico($scope,lista);
      $scope.carregando = true;
      $scope.cidadeAtual = cidade;
      $scope.estadoAtual = estado;
    });
  }

  //**** METODO ****
  // Atualiza Box Máximo e Mínima
  $scope.atualizaPrevisoes = function($scope, lista){

    var maxima = 0;
    var minima = 99;
    var dataMaxima;
    var dataMinima;

    for (var i = 0; i < lista.length; i++) {
      var dia = lista[i];
      // Temperatura Máxima
      if(dia.temperatura_max > maxima) {
        maxima = dia.temperatura_max;
        dataMaxima = dia.data;
      }
      // Temperatura Mínima
      if(dia.temperatura_min < minima) {
        minima = dia.temperatura_min;
        dataMinima = dia.data;
      }
    }
    $scope.max = maxima;
    $scope.dtMax = dataMaxima;
    $scope.min = minima;
    $scope.dtMin = dataMinima;
  }

  //**** METODO ****
  // Atualiza Box Recomendação verificando se
  // no proximos dias terá final de semnana e temperatura for > 25
  $scope.recomendacoes = function($scope, lista){

    // Data
    var data2 = lista[3].data;
    var data3 = lista[4].data;
    var data4 = lista[5].data;
    var data5 = lista[6].data;
    // Dias
    var dia2 = "";
    var dia3 = "";
    var dia4 = "";
    var dia5 = "";
    //Temperatura Máxima para o final de semana
    var temperaturaMax2 = lista[3].temperatura_max;
    var temperaturaMax3 = lista[4].temperatura_max;
    var temperaturaMax4 = lista[5].temperatura_max;
    var temperaturaMax5 = lista[6].temperatura_max;

    // Flag controla se houve final de semana
    var finalSemana = false;

    //Limpa variavesi
    $scope.recomendacaoPositivo = "";
    $scope.recomendacaoNegativo = "";

    // Copia dia da Semana
    dia2 = $scope.copiaDiaSemana(data2);
    dia3 = $scope.copiaDiaSemana(data3);
    dia4 = $scope.copiaDiaSemana(data4);
    dia5 = $scope.copiaDiaSemana(data5);

    // Verifica Sabado
    if(dia2 == 'Sábado'){
      if(temperaturaMax2 >= 25){
        $scope.recomendacaoPositivo = true;
        finalSemana = true;
      }
      else{
        $scope.recomendacaoNegativo = true;
        finalSemana = true;
      }
    }

    if(dia3 == 'Sábado'){
      if(temperaturaMax3 >= 25){
        $scope.recomendacaoPositivo = true;
        finalSemana = true;
      }
      else{
        $scope.recomendacaoNegativo = true;
        finalSemana = true;
      }
    }

    if(dia4 == 'Sábado'){
      if(temperaturaMax4 >= 25){
        $scope.recomendacaoPositivo = true;
        finalSemana = true;
      }
      else{
        $scope.recomendacaoNegativo = true;
        finalSemana = true;
      }
    }

    if(dia5 == 'Sábado'){
      if(temperaturaMax5 >= 25){
        $scope.recomendacaoPositivo = true;
        finalSemana = true;
      } else {
        $scope.recomendacaoNegativo = true;
        finalSemana = true;
      }
    }

    // Verifica Dómingo
    if(dia2 == 'Domingo'){
      if(temperaturaMax2 >= 25){
        $scope.recomendacaoPositivo = true;
        finalSemana = true;
      }
      else{
        $scope.recomendacaoNegativo = true;
        finalSemana = true;
      }
    }

    if(dia3 == 'Domingo'){
      if(temperaturaMax3 >= 25){
        $scope.recomendacaoPositivo = true;
        finalSemana = true;
      }
      else{
        $scope.recomendacaoNegativo = true;
        finalSemana = true;
      }
    }

    if(dia4 == 'Domingo'){
      if(temperaturaMax4 >= 25){
        $scope.recomendacaoPositivo = true;
        finalSemana = true;
      }
      else{
        $scope.recomendacaoNegativo = true;
        finalSemana = true;
      }
    }

    if(dia5 == 'Domingo'){
      if(temperaturaMax5 >= 25){
        $scope.recomendacaoPositivo = true;
        finalSemana = true;
      }
      else{
        $scope.recomendacaoNegativo = true;
        finalSemana = true;
      }
    }

    //Se não houver final de semana exibe mensagem.
    if(finalSemana == false){
      $scope.semFinal = true;
    }
  }

  //**** METODO ****
  //Carrega Gráfico
  $scope.carregaGrafico = function($scope, lista){

    //Carrega dados da lista
    var data1 = lista[2].data;
    var data2 = lista[3].data;
    var data2 = lista[3].data;
    var data3 = lista[4].data;
    var data4 = lista[5].data;
    var data5 = lista[6].data;
    // Copia somente o nome da semana
    var dia1 = $scope.copiaDiaSemana(data1);
    var dia2 = $scope.copiaDiaSemana(data2);
    var dia3 = $scope.copiaDiaSemana(data3);
    var dia4 = $scope.copiaDiaSemana(data4);
    var dia5 = $scope.copiaDiaSemana(data5);

    var areaChartCanvas = $("#areaChart").get(0).getContext("2d");
    var areaChart = new Chart(areaChartCanvas);

    var areaChartData = {
      labels: [dia1, dia2,dia3, dia4, dia5],
      datasets: [
        {
          label: "Electronics",
          fillColor: "rgba(210, 214, 222, 1)",
          strokeColor: "rgba(210, 214, 222, 1)",
          pointColor: "rgba(210, 214, 222, 1)",
          pointStrokeColor: "#c1c7d1",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: [lista[2].temperatura_max, lista[3].temperatura_max,lista[4].temperatura_max, lista[5].temperatura_max, lista[6].temperatura_max] //Temperatura Máxima
        },
        {
          label: "Digital Goods",
          fillColor: "rgba(60,141,188,0.9)",
          strokeColor: "rgba(60,141,188,0.8)",
          pointColor: "#3b8bba",
          pointStrokeColor: "rgba(60,141,188,1)",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(60,141,188,1)",
          data: [lista[2].temperatura_min, lista[3].temperatura_min,lista[4].temperatura_min, lista[5].temperatura_min, lista[6].temperatura_min] //Temperatura Mínima
        }
      ]
    };

    var areaChartOptions = {
      //Boolean - If we should show the scale at all
      showScale: true,
      //Boolean - Whether grid lines are shown across the chart
      scaleShowGridLines: true,
      //String - Colour of the grid lines
      scaleGridLineColor: "rgba(0,0,0,.05)",
      //Number - Width of the grid lines
      scaleGridLineWidth: 1,
      //Boolean - Whether to show horizontal lines (except X axis)
      scaleShowHorizontalLines: true,
      //Boolean - Whether to show vertical lines (except Y axis)
      scaleShowVerticalLines: true,
      //Boolean - Whether the line is curved between points
      bezierCurve: true,
      //Number - Tension of the bezier curve between points
      bezierCurveTension: 0.3,
      //Boolean - Whether to show a dot for each point
      pointDot: true,
      //Number - Radius of each point dot in pixels
      pointDotRadius: 4,
      //Number - Pixel width of point dot stroke
      pointDotStrokeWidth: 1,
      //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
      pointHitDetectionRadius: 20,
      //Boolean - Whether to show a stroke for datasets
      datasetStroke: true,
      //Number - Pixel width of dataset stroke
      datasetStrokeWidth: 2,
      //Boolean - Whether to fill the dataset with a color
      datasetFill: true,
      //String - A legend template
      legendTemplate: "<ul class='chart-legend'><li><span style='background-color: #c1c7d1'></span>label1</li><li><span style='background-color: #3b8bba'></span>label1</li></ul>",
      //legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
      //Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
      maintainAspectRatio: true,
      //Boolean - whether to make the chart responsive to window resizing
      responsive: true
    };

    //Create the line chart
    areaChart.Line(areaChartData, areaChartOptions);

  } // Fim Gráfico

  //**** METODO ****
  // Salvar Favoritos
  $scope.salvaFavorito = function(){
    console.log('Favoritos');
  }

  $scope.copiaDiaSemana = function(data){
    var dia = "";
    for (var i = 0; i < data.length; i++) {
      var str = "";
      var str = (data.charAt(i));
      dia = dia + str;
      if(str == ' ')
      break;
    }
    dia = dia.trim();
    return dia;
  }

});

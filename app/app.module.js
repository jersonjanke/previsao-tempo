/*
* Projeto: Previsão do Tempo
* Data de criação: 15/01/2016
* Data do término : 20/01/2016
* Programador: Jerson Janke
* GitHub: https://github.com/jersonjanke/previsao-tempo
*/
var app = angular.module("myTemp", []);

//Verifica se tem favorito salvo
if ((localStorage.estadoCache == undefined ) || (localStorage.cidadeCache == undefined )){
  estado = "SC";
  cidade = "Blumenau";
} else {
  estado = localStorage.estadoCache;
  cidade = localStorage.cidadeCache;
}

// Carrega dados
app.controller("myCtrlTemp", function($scope, $http){
  //Atualiza dados iniciais
  $http.get("http://developers.agenciaideias.com.br/tempo/json/"+cidade+"-"+estado).
  success(function(response){
    $scope.carregaPrevisao(response,cidade,estado);
  }).error(function(response){
    alert("Não existem previsão do tempo para está cidade e estado");
  });

  //**** METODO ****
  //Nova consulta de previssão
  $scope.consultaPrevisao = function(){
    if(($scope.cidade == undefined)||($scope.estado == undefined))
    alert("Informe cidade e estado");
    else{
      $scope.carregaDados( $scope.cidade,$scope.estado);
      $scope.carregando = false;
    }
  }

  //**** METODO ****
  //Nova consulta ao clicar no botão consultar
  $scope.carregaDados = function(cidade,estado){
    $http.get("http://developers.agenciaideias.com.br/tempo/json/"+cidade+"-"+estado).
    success(function(response){
      $scope.carregaPrevisao(response,cidade,estado);
    }).error(function(response){
      alert("Não existem previsão do tempo para está cidade e estado");
      $scope.carregaDados("Blumenau","SC");
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

    //Limpa variavesi
    $scope.recomendacaoPositivo = "";
    $scope.recomendacaoNegativo = "";

    for (var i = 3; i < 6; i++) {
      var dia = "";
      var temperatura = 0;

      dia = lista[i].data;
      dia = $scope.copiaDiaSemana(dia);

      if(dia == "Sábado"){
        temperatura = lista[i].temperatura_max;
        console.log(temperatura);
        if(temperatura >= 25){
          $scope.recomendacaoPositivo = true;
          finalSemana = true;
        } else {
          $scope.recomendacaoNegativo = true;
          finalSemana = true;
        }
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
    var areaChartCanvas = $("#areaChart").get(0).getContext("2d");
    var areaChart = new Chart(areaChartCanvas);

    var areaChartData = {
      labels: [$scope.copiaDiaSemana(lista[2].data), $scope.copiaDiaSemana(lista[3].data),$scope.copiaDiaSemana(lista[4].data), $scope.copiaDiaSemana(lista[5].data), $scope.copiaDiaSemana(lista[6].data)],
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
  $scope.salvaFavorito = function(cid,est){
    if((cid == undefined) || (est == undefined)){
      alert("Informar Cidade e Estado para salvar favorito.");
    }
    else{
      localStorage.cidadeCache = cid;
      localStorage.estadoCache = est;
      alert('Favorito salvo com sucesso.');
    }
  }

  //**** METODO ****
  // Copia somente o nome da semana
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

  //**** METODO ****
  $scope.carregaPrevisao = function(previsao,cidade,estado){
    obj = $scope.myData = previsao;
    lista = $.map(obj, function(el) { return el });
    $scope.atualizaPrevisoes($scope,lista);
    $scope.recomendacoes($scope,lista);
    $scope.carregaGrafico($scope,lista);
    $scope.carregando = true;
    $scope.cidadeAtual = cidade;
    $scope.estadoAtual = estado;
  }
});

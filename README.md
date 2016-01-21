## Protótipo Previsão do Tempo

## 1 – Objetivo

Objetivo deste protótipo realizar consulta da previsão do tempo com base na cidade e estado selecionada. Exibir a máxima e mínima do dia atual e dias seguintes da semana. Box de consulta de estado e cidade aonde será necessário selecionar um estado e cidade. Ao acessar pela primeira vez a cidade e estado padrão será Blumenau – Santa Catariana. Box temperatura que será exibida a temperatura máxima e mínima da semana. Box recomendações que verificará que no sábado a temperatura é maior que 25 ° mostrará recomendação de praia positivo caso contrário negativará a recomendação de praia. Box do gráfico de variação de temperatura da semana, exibirá um gráfico linear com máximas e mínimas dos dias exibidos.

![alt tag](img/gitHub/3 - fullproject.jpg "1 – Objetivo")

##2 – Funcionalidades

####2.1 – Selecionar estado e cidades

Para carregar os estados e cidades foi utilizado um javascript que trata de carregar os dados de estado e cidade, javascript: cidades-estados-1.4-utf8.js. Para utilizar foi criado um select no HTML com ID de estado e cidade.

![alt tag](img/gitHub/1 - cidadesEstados.png "2 – Funcionalidades")

####2.2 – Realizar consulta

Para consultar os dados previsão do tempo foi utilizada um API que retorna um json(javascript object notation) com os dados da previsão. API utilizada foi http://developers.agenciaideias.com.br. Nesta API é necessário passar cidade e estado para receber o retorno em json.

Método que para carregar dados da API concatenando cidade e estado selecionado pela interface.

![alt tag](img/gitHub/2 - consultaCidadesEstados.png "2.2 – Realizar consulta")


####2.3 – Salvar favorito

Ao selecionar cidade e estado poderá salvá-las como favorito, assim que abrir a página novamente já carregará os dados referente a cidades-estados salvos como favorito.

Método utilizado para salvar favoritos: Ao clicar no botão de favoritos salvará estado e cidade no localStorage, ao acessar novamente a página será verificado se existem dados salvos no localStorage  e carregar a previsão com base na cidades-estados favorito.

Método para salvar favorito:

![alt tag](img/gitHub/4 - favorito.png "2.3 – Salvar favorito")

##3 – Frameworks

**AdminLte:** utilizado para criação do HTML5, CSS3, Design responsivo e Bootstrap 3. Utilizado para criação dos Boxes e o gráfico. Contém vários ícones, botões e classes que foram utilizadas.

**AngularJS:** o framework foi utilizado para o desenvolvimento da parte lógica do fronte-end, na requisição do json do API com dados da previsão, na criação de métodos para auxiliar o desenvolvimento. Além disso, foi utilizado várias de suas diretivas principalmente para fazer o Bind dos dados no front-end.

##4 – Conclusão

A elaboração do Protótipo de Previsão do tempo foi bem gratificante por proporcionar um contato maior com ferramentas novas.
Ao trabalhar com o AdminLte pude perceber que o design da página, onde poderia ter despendido tempo desnecessário para criação, se tornou muito mais simples e objetivo por conter várias classes já preparadas, proporcionando assim um tempo maior para a elaboração da parte lógica e funcional.
Como mencionado o protótipo me proporcionou a oportunidade de trabalhar com o ArgularJS, um framework que já havia pesquisado mas até então nunca havia tido um contato maior. Pude notar que é a adaptação ao framework é rápida e que já se encontra disponível vários matérias onde praticamente todas as dúvidas pertinentes foram esclarecidas.
Por fim foi uma experiência muito interessante participar desse projeto onde tive a possibilidade de trabalhar com duas frameworks novas.

##5 – Referencias 

AdminLte: https://almsaeedstudio.com<br />
AngularJS: https://angularjs.org/



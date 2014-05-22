$app = angular.module("app", ['ngRoute']);

$app.config(function($routeProvider) {
    $routeProvider.
        when('/', {controller: pessoaController, templateUrl: "listagem.html"}).
        when('/novo', {controller: pessoaController, templateUrl: "cadastro.html"}).
        otherwise({redirectTo: '/'});
});

function pessoaController($scope, $http, $location) {
    $scope.pessoa = {id: "", nome: "", telefone: "", email: ""};

    $scope.limparPessoa = function() {
        $scope.pessoa = {id: "", nome: "", telefone: "", email: ""};
    };

    $scope.buscarPessoas = function() {
        $http({
            method: "GET",
            url: "http://localhost:8000/pessoas"
        }).success(function (response) {
            $scope.pessoas = response;
        }).error(function (error) {
            alert(error);
        });
    };

    $scope.salvar = function() {
        $http({
            method: "POST",
            url: "http://localhost:8000/pessoa/salvar",
            data: "pessoa=" + JSON.stringify($scope.pessoa),
            headers: {"Content-Type" : "application/x-www-form-urlencoded"}
        }).success(function (response) {
            $location.path('/');
        }).error(function(err) {
            alert(err);
        });
    };

}

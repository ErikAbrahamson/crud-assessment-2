var crudApp = angular.module('crudApp', []);

crudApp.controller('mainController', function($scope, $http) {

  $scope.formData = {};

  // init page with all todos
  $http.get('/api/v1/exercises')
    .success(function(data) {
      $scope.exercises = data;
      console.log(data);
    })
    .error(function(error) {
      console.log('Error: ' + error);
    });
  // submits form values to node
  $scope.createExercise = function() {
    $http.post('/api/v1/exercises/', $scope.formData)
      .success(function(data) {
        $scope.formData = {}; // clears the form every entry
        $scope.exercises.push(data);
        console.log(data);
      })
      .error(function(error) {
        console.log('Error: ' + error);
      });
  };
  // delete exercise
  $scope.deleteExercise = function(id) {
    $http.delete('/api/v1/exercises/' + id)
      .success(function(data) {
        $scope.exercises.splice(data, 1);
        console.log(data);
      })
      .error(function(error) {
        console.log('Error: ' + error);
      });
  };
  // put exercise
    $scope.editExercise = function(id) {
    $http.put('/api/v1/exercises/' + id)
      .success(function(data) {
        $scope.exercises = data;
        console.log(data);
      })
      .error(function(error) {
        console.log('Error: ' + error);
      });
  };
});

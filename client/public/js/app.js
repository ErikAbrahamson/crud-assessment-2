var crudApp = angular.module('exercises', []);

function mainController($scope, $http) {
  $scope.formData = {};

  $http.get('/api/v1/exercises')
    .success(function(data) {
      $scope.exercises = data;
      console.log(data);
    })
    .error(function(error) {
      console.log('Error: ' + error);
    });

  $scope.createExercise = function() {
    $http.post('/api/v1/exercises', $scope.formData)
      .success(function(data) {
        $scope.formData = {}; // clears the form every entry
        $scope.exercises = data;
        console.log(data);
      })
      .error(function(error) {
        console.log('Error: ' + data);
      });
  };
}

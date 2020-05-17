var nodeTodo = angular.module("nodeTodo", []);

function mainController($scope, $http) {
  $scope.formData = {};
  $scope.todos = {};
  $scope.mode = "ALL";

  $scope.todosFiltered = function()
  {  
    todosFiltered = [];

    for(todo in $scope.todos)
    {
        if($scope.mode == 'INCOMPLETED' && $scope.todos[todo].done == true) continue;
        if($scope.mode == 'COMPLETED' && $scope.todos[todo].done == false) continue;
        todosFiltered.push($scope.todos[todo]);
    }
    return todosFiltered;
  };

  // when landing on the page, get all todos and show them
  $http
    .get("/api/todos")
    .success(function(data) {
      $scope.todos = data;
    })
    .error(function(data) {
      console.log("Error: " + data);
    });

  // when submitting the add form, send the text to the node API
  $scope.createTodo = function() {
    $http
      .post("/api/todos", $scope.formData)
      .success(function(data) {
        $("input").val("");
        $scope.todos = data;
      })
      .error(function(data) {
        console.log("Error: " + data);
      });
  };

  // update a todo after checking it
  $scope.updateTodo = function(id) {
    newValue = false;
    for(todo in $scope.todos)
    {
        if($scope.todos[todo]._id == id)
        {
            newValue = $scope.todos[todo].done;
            break;
        }
    }
    $http
    .put("/api/todos/" + id, { done: newValue })
    .success(function(data) {
    //   $scope.todos = data;
    })
    .error(function(data) {
      console.log("Error: " + data);
    });
  };

  // delete a todo after checking it
  $scope.deleteTodo = function(id) {
    $http
      .delete("/api/todos/" + id)
      .success(function(data) {
        $scope.todos = data;
      })
      .error(function(data) {
        console.log("Error: " + data);
      });
  };
}

$(document).on('ready', function(){
  listExercises();
  $('#edit-form').hide();
});

$('form').on('submit', function(event){
  event.preventDefault();
  // form inputs
  var name = $('#exercise-name').val();
  var desc = $('#exercise-description').val();
  var tags = $('#exercise-tags').val();
  // creating payload
  var payload = {
    name: name,
    description: desc,
    tags: tags
  };

  $.post('/api/v1/exercises', payload, function(data) {
    $( "#results" ).html(data.message);
    $( "#all" ).html("");
    $(':input', 'form').val('');
    listExercises();
  });
});

$(document).on('click', '.delete-button', function(){

  $.ajax({
    method: "DELETE",
    url: '/api/v1/exercises/'+$(this).attr('id')
  }).done(function(data) {
    $("#all").html("");
    $( "#results" ).html('Success!');
    listExercises();
  });

});

$(document).on('click','.edit-button', function(){

  $.get('/api/v1/exercises/'+$(this).attr('id'), function(data){
    $('#edit-name').val(data.name);
    $('#edit-description').val(data.description);
    $('#edit-tags').val(data.tags);
    $('.update-button').attr('id', data._id);
  });
  $('#edit-form').show();
  $('#exercises-table').hide();

});

$(document).on('click', '.update-button', function(event){
  event.preventDefault();
  // form inputs
  var name = $('#exercise-name').val();
  var desc = $('#exercise-description').val();
  var tags = $('#exercise-tags').val();
  // creating payload
  var payload = {
    name: name,
    description: desc,
    tags: tags
  };

  $.ajax({
    method: "PUT",
    url: '/api/v1/exercises/'+$(this).attr('id'),
    data: payload
  }).done(function(data) {
    $("#all").html("");
    listExercises();
    $('#edit-form').hide();
    $('#exercises-table').show();
  });


});

$(document).on('click', '#cancel-edit', function(event) {
  event.preventDefault();
  $('#edit-form').hide();
  $('#exercises-table').show();
});

//helper function
function listExercises(){
  $.get('/api/v1/exercises', function(data){
    for (var i = 0; i < data.length; i++) {
      $('#all').prepend(
        '<tr>'+
          '<td><a href="#">'+data[i].name+'</a></td>'+
          '<td>'+data[i].description+'</td>'+
          '<td>'+data[i].tags+'</td>'+
          '<td><a class="btn btn-danger btn-xs delete-button" id="'+data[i]._id+'" role="button">Delete</a>'+
          '&nbsp;<a class="btn btn-primary btn-xs edit-button" id="'+data[i]._id+'" role="button">Edit</a></td>'+
          '</tr>'
      );
    }
  });
}

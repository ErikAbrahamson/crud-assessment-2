$(document).on('ready', function() {
  console.log('Client JS Loaded');
  listDogs();
});

function listDogs(){
  $.get('/api/v1/exercises', function(data){
    for (var i = 0; i < data.length; i++) {
      $('#exercise-list').prepend(
        '<tr>'+
          '<td>'+data[i].name+'</td>'+
          '<td>'+data[i].description+'</td>'+
          '<td>'+data[i].tags+'</td>' +
        '</tr>'
      );
    }
  });
}

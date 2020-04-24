window.onload = function(){
  loadAllPosts();
}

function loadAllPosts(){
  $.ajax({
    type: "POST",
    url: "../php/Posts.php",
    dataType: "json",
    data: {functionname: "loadAllPosts"},
    success: function(obj, textStatus){
      showPreview(obj);
    },
    error: function(jqXHR, exception, status){
      if (jqXHR.status === 0) {
          alert('Not connect.\n Verify Network.');
      } else if (jqXHR.status == 404) {
          alert('Requested page not found. [404]');
      } else if (jqXHR.status == 500) {
          alert('Internal Server Error [500].');
      } else if (exception === 'parsererror') {
          alert('Requested JSON parse failed.');
      } else if (exception === 'timeout') {
          alert('Time out error.');
      } else if (exception === 'abort') {
          alert('Ajax request aborted.');
      } else {
          alert('Uncaught Error.\n' + jqXHR.responseText);
      }
      console.log(jqXHR);
      console.log(exception);
      console.log(status);
    }
  })
}


function showPreview(obj){
  
}

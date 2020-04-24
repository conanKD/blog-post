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

function hideAllPreviews(){
  let prevs = document.getElementsByClassName("posts");
  for(prev of prevs){
    if(prev.getAttribute("data-id")){
      prev.classList.add("hide");
    }
  }
}

function displayPost(id){
  $.ajax({
    type: "POST",
    url: "../php/Posts.php",
    dataType: "json",
    data: {functionname: "loadPost", id:id},
    success: function(obj, textStatus){
      showPost(obj)
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

function linkEventListener(ele){
  hideAllPreviews();
  //displayPost(ele.parentNode.parentNode.getAttribute("data-value"));
}

function showPreview(obj){
  for(row of obj){
    let tmp = document.getElementsByClassName('posts-hidden')[0].cloneNode(true);
    tmp.className= "posts";
    tmp.querySelectorAll(".title")[0].textContent = row.title;
    tmp.querySelectorAll(".loadPost")[0].addEventListener("click", function(){
      hideAllPreviews();
      displayPost(this.parentNode.parentNode.getAttribute("data-id"))
    });
    tmp.setAttribute("data-id", ""+row.id);
    tmp.querySelectorAll(".preview")[0].getElementsByTagName("p")[0].textContent = row.prev;
    document.getElementsByClassName("center")[0].appendChild(tmp);
  }
}

function showPost(obj){
  let tmp = document.getElementsByClassName("complete-post-hidden")[0].cloneNode(true);
  tmp.className = "complete-post";
  tmp.querySelectorAll(".post-head")[0].textContent = obj[0].title;
  tmp.children[0].addEventListener("click", function(e){
    hidePosts();
    showHiddenPosts();
  });
  tmp.querySelectorAll(".post-body")[0].getElementsByTagName("p")[0].textContent = obj[0].content;
  document.getElementsByClassName("center")[0].appendChild(tmp);
}

function hidePosts(){
  let posts = document.getElementsByClassName("complete-post");
  for (post of posts){
    if(!post.classList.contains("complete-post-hidden"))
      post.remove()
  }
}

function showHiddenPosts(){
  for (ele of document.getElementsByClassName("posts")){
    ele.classList.remove("hide")

  }
}

$(document).ready(() => {
    $('.delete-todo').on('click', (e) => {
    //console.log("test");  
    $target = $(e.target);
    const id = $target.attr('data-id');
  //  console.log(id);
  $.ajax({
      type:"DELETE",
      url:"/todo/delete/" + id,
      success:(response) => {
          alert("Deleting todo");
          window.location.href = "/";
      },
      error:(error) => {
          console.log(error);
      }
  });
    });
  });
  
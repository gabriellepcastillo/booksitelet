// romance type
var i = 0;
var txt = 'Here are my top three favorite romance novels so far. Currently I am reading Twisted love.';
var speed = 50;

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("toptxtR").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}


// book search
$(document).ready(function() {
    var item, tile, author, bookLink, bookImg;
    var outputList = document.getElementById("list-output");
    var bookUrl = "https://www.googleapis.com/books/v1/volumes?q=";
    var apiKey = "key=AIzaSyDtcBJuUN2OfcoIa9HXe_pdM4z_qPb6WrM";
    var placeHldr = '<img src="https://via.placeholder.com/150">';
    var searchData;
  
    //listener for search button
    $("#search").click(function() {
      outputList.innerHTML = ""; //empty html output
      document.body.style.backgroundImage = "url('')";
       searchData = $("#search-box").val();
       //handling empty search input field
       if(searchData === "" || searchData === null) {
         displayError();
       }
      else {
         
         $.ajax({
            url: bookUrl + searchData,
            dataType: "json",
            success: function(response) {
              console.log(response)
              if (response.totalItems === 0) {
                alert("no result!.. try again")
              }
              else {
                $("#title").animate({'margin-top': '1px'}, 500); //search box animation
                $(".book-list").css("visibility", "visible");
                displayResults(response);
              }
            },
            error: function () {
              alert("Something went wrong.. <br>"+"Try again!");
            }
          });
        }
        $("#search-box").val(""); //clearn search box
     });
  
     /*
     * function to display result in index.html
     * @param response
     */
     function displayResults(response) {
        for (var i = 0; i < response.items.length; i+=2) {
          item = response.items[i];
          title1 = item.volumeInfo.title;
          author1 = item.volumeInfo.authors;
          bookLink1 = item.volumeInfo.previewLink;
          bookIsbn = item.volumeInfo.industryIdentifiers[1].identifier
          bookImg1 = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : placeHldr ;
  
          item2 = response.items[i+1];
          title2 = item2.volumeInfo.title;
          author2 = item2.volumeInfo.authors;
          bookLink2 = item2.volumeInfo.previewLink;
          bookIsbn2 = item2.volumeInfo.industryIdentifiers[1].identifier
          bookImg2 = (item2.volumeInfo.imageLinks) ? item2.volumeInfo.imageLinks.thumbnail : placeHldr ;
  
          // in production code, item.text should have the HTML entities escaped.
          outputList.innerHTML += '<div class="row mt-4">' +
                                  formatOutput(bookImg1, title1, author1, bookLink1, bookIsbn) +
                                  formatOutput(bookImg2, title2, author2, bookLink2, bookIsbn2) +
                                  '</div>';
  
          console.log(outputList);
        }
     }
  
     /*
     * card element formatter using es6 backticks and templates (indivial card)
     * @param bookImg title author publisher bookLink
     * @return htmlCard
     */
     function formatOutput(bookImg, title, author, bookLink, bookIsbn) {
       // console.log(title + ""+ author +" "+ publisher +" "+ bookLink+" "+ bookImg)
       var viewUrl = 'https://books.google.com/?isbn='+bookIsbn; //constructing link for bookviewer
       var htmlCard = `<div class="col-sm-3">
         <div class="card" style="">
           <div class="col no-gutters">
             <div class="col-sm-4">
               <img src="${bookImg}" class="card-img" alt="...">
             </div>
             <div class="col-sm-3">
               <div class="card-body">
                 <h5 class="card-title">${title}</h5>
                 <p class="card-text">Author: ${author}</p>
                 <a target="_blank" href="${viewUrl} " class="btn btn-secondary">Read Book</a>
               </div>
             </div>
           </div>
         </div>
       </div>`
       return htmlCard;
     }
  
     //handling error for empty search box
     function displayError() {
       alert("search term can not be empty!")
     }
  
  });
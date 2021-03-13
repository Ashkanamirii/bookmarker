document.getElementById("myForm").addEventListener("submit", saveBookmark);
/*  ****************************************************** */
/*  ****************************************************** */
/*  ****************************************************** */
/*  ****************************************************** */
function saveBookmark(e) {
  // get form values
  var siteName = document.getElementById("siteName").value;
  var siteUrl = document.getElementById("siteUrl").value;
  // console.log(siteName);
  // console.log(siteUrl);

  if(!validateForm(siteName, siteUrl)){
      return false;
  }
  //object in JS
  var bookmark = {
    name: siteName,
    url: siteUrl,
  };

  // console.log(bookmark);
  // console.log(typeof bookmark)

  //Local storage Test
  /*
    localStorage.setItem('test','Hello World');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'))
    */

  if (localStorage.getItem("bookmarks") === null) {
    var bookmarks = [];
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    //get bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    // add bookmarks to array
    bookmarks.push(bookmark);
    // re-set back to local storage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }

  document.getElementById('myForm').reset();

  //re-fetch
  fetchBookmarks();
  //console.log('It works');
  // Prevent form from submitting
  e.preventDefault();
}
/*  ****************************************************** */
/*  ****************************************************** */
/*  ****************************************************** */
/*  ****************************************************** */
function deleteBookmark(url) {
  //console.log(url); TEST

  //get bookmarks
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  // Loop throught bookmarks
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      bookmarks.splice(i, 1);
    }
  }

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  //re-fetch
  fetchBookmarks();
}
/*  ****************************************************** */
/*  ****************************************************** */
/*  ****************************************************** */
/*  ****************************************************** */
function fetchBookmarks() {
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  //console.log(bookmarks)

  var bookmarksResults = document.getElementById("bookmarksResults");
  bookmarksResults.innerHTML = "";

  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    //bookmarksResults.innerHTML += name;
    bookmarksResults.innerHTML +=
      '<div class="well"><h3>' +
      name +
      '<a class="btn btn-default" target="_blank" href="' +
      url +
      '">Visit</a>' +
      "<a onclick=\"deleteBookmark('" +
      url +
      '\')" class="btn btn-danger" href="#">Delete</a>' +
      "</h3></div>";
  }
}
/*  ****************************************************** */
/*  ****************************************************** */
/*  ****************************************************** */
/*  ****************************************************** */
function validateForm(siteName, siteUrl){
    if (!siteUrl || !siteName) {
        alert("please fill in the form");
        return false;
      }
    
      var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
      var regex = new RegExp(expression);
      
    
      if (!siteUrl.match(regex)) {
        alert("No match, please use the valid URL");
        return false;
      }

      return true;
}
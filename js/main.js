
//listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);
//save bookmark
function saveBookmark (e) {
  // Get form values
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  if(!validateForm(siteName, siteUrl)){
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteUrl
  }

  // // Local Storage Test
  // localStorage.setItem('test', 'Hello World');
  // console.log(localStorage.getItem('test'));
  // localStorage.removeItem('test');
  // console.log(localStorage.getItem('test'));

  // Test if bookmarkers is null
  if(window.localStorage.getItem('bookmarks') === null){
    // Init array
    var bookmarks = [];
    // Add to array
    bookmarks.push(bookmark);
    // Set to localStorage
    window.localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(window.localStorage.getItem('bookmarks'));
    // Add bookmark to array
    bookmarks.push(bookmark);
    // Re-set to localStorage
    window.localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // Clear Form
  document.getElementById('myForm').reset();

  //re-Fetch bookmarks
  fetchBookers();

  //Prevent form from submitting
  e.preventDefault();
}

// Delete Bookmark
function deleteBookmark(url){
  // Get bookmark from localStorage
  var bookmarks = JSON.parse(window.localStorage.getItem('bookmarks'));
  // Loop throught bookmarksResults
  for(var i=0;i < bookmarks.length;i++){
    if (bookmarks[i].url == url){
      // Remove from array
      bookmarks.splice(i, 1);
    }
  }
  window.localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  //re-Fetch bookmarks
  fetchBookers();
}

// Fetch bookmarkers
function fetchBookers(){
  var bookmarks = JSON.parse(window.localStorage.getItem('bookmarks'));
  //Output ID
  var bookmarksResults = document.getElementById('bookmarksResults');

  // Build Output
  bookmarksResults.innerHTML = '';
  // Loop
  for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="well">'+
                                  '<h3>'+name+
                                  ' <a class="btn btn-default target="_blank" href="'+url+'">Visit</a> ' +
                                  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger href="#">Delete</a> '
                                  '</h3>'+
                                  '</div>';
  }
}

function validateForm(siteName, siteUrl){
  // Form Blank Alerts
  if(!siteName || !siteUrl){
    alert('Please fill in form.');
    return false;
  }

  // Checks for https
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);
  // Alerts if no https is input
  if(!siteUrl.match(regex)){
    alert('Please use a valid URL');
    return false;
  }
  return true;
}

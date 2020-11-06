var searched = false;
var pageNum = 1;


function makeApiCall(){
  searched = true;
  var key = '6e60a32b99fe5c2171e324fe45ba77e5';
  var tags = document.getElementById('search-text').value;
  var perPage = document.getElementById("itemCountDropDown").options[document.getElementById("itemCountDropDown").selectedIndex].value;
  var url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key='+key+'&tags='+tags+'&extras=url_q&per_page='+perPage+'&page=' + pageNum + '&format=json&nojsoncallback=1';
  $.ajax({ url: url, dataType: "json" }).then(function (data) {
    console.log(data);
    var cards = '';
    for (i=0; i < perPage; i++) {
      cards = cards.concat(`
      <div style="width: 20%;">
      <div class="card">
      <img src=`+ data.photos.photo[i].url_q +` class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">`+ data.photos.photo[i].title +` </h5>
          <p class="card-text"></p>
        </div>
      </div>
    </div>`)
    }
    document.getElementById('flickr-placeholder').innerHTML += cards;
  })
}

function submit(){
  pageNum = 1;
  document.getElementById('flickr-placeholder').innerHTML = '';
  makeApiCall();
}

$(window).scroll(function() {
  if(searched && $(window).scrollTop() + $(window).height() == $(document).height()) {
      pageNum++;
      makeApiCall();
  }
});
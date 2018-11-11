// NEXT THING TO DO IS TO BE ABLE TO DISPLAY ONLY A FEW RESULTS AT FIRST, THEN DISPLAY MORE AS USER SCROLLS

$("#searchBar").on('keyup keydown', function(event) {
    var key = event.keyCode || event.charCode || event.which;
    console.log("key = " + key);
    if (key == 13) {
        fullSearch();
    }
});

$("#searchBar").on('keyup keydown', function(event) {
    var key = event.keyCode || event.charCode || event.which;
    console.log("key = " + key);
    if (key == 8 || event.keyCode == 46) {
        removeDivs();
    }
});



function quickSearch(){
  var search = $("#searchBar").val();
  if (search.length > 0){
  console.log("search = " + search);
  var searchEncoded = encodeURI(search);

   var getURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchEncoded + "&limit=1&format=json";

  console.log("quickSearch() getURL = " + getURL);

  $.ajax({
    type: "GET",
    url: getURL,
    dataType: "jsonp",
    success: function(data){
    //console.log("getURL = " + getURL);
    //console.log("JSON data: \n" + data);

    var title = data[1][0];
    var extract = data[2][0];
    var link = data[3][0];

     $("#resultsDiv0").fadeIn('slow');
     $("#headers0").html(title);
     $("#resultsP0").html(extract);
     $("#anchors0").attr("href", link);

    }
});
  }
  else {
    $("#resultsDiv0").fadeOut('fast');
    $("#resultsDiv0").attr("display","none");
    removeDivs();
  }
}
//-----------------------------------------
function fullSearch(){

  var search = $("#searchBar").val();
  if (search.length > 0){
  var searchEncoded = encodeURI(search);

  var getURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchEncoded + "&limit=25&format=json";

  console.log("fullSearch() getURL = " + getURL);

  $.ajax({
    type: "GET",
    url: getURL,
    dataType: "jsonp",
    success: function(data){
    //console.log("getURL = " + getURL);
    //console.log("JSON data: \n" + data);

    console.log("data.length = " + data.length);
    var titles = [];
    var extracts = [];
    var links = [];
    var divs = [];
    var headers = [];
    var p = [];
    var anchors = [];

      for (var i = 0; i <= 25; i++){
        titles[i] = data[1][i];
        extracts[i] = data[2][i];
        links[i] = data[3][i];

      divs[i] = $("<div>",{id: "resultsDiv"+i, "class":"results-div"});

      headers[i] = $("<h2>", {id: "headers"+i, "class":"results-header"});

     p[i] = $("<p>", {id: "resultsP"+i, "class":"results-p"});

       anchors[i] = $("<a>", {id: "anchors"+i, "class":"results-anchors", "href":links[i], "target":"_blank"});

     }
var i=0;
function results(){
     setTimeout(function(){
     if (i !== 0) {
     $("#searchResults").append(divs[i]);
     $("#resultsDiv"+i).append(headers[i]);
     $("#resultsDiv"+i).append(p[i]);
      $("#resultsDiv"+i).fadeIn('slow');
      $("#headers"+i).html(titles[i]);
      $("#resultsP"+i).html(extracts[i]);
      $("#resultsDiv"+i).wrap(anchors[i]);
     };

        i++;
         if (i < 25) {
         results();
         }
     },0);
};
results();
  }
});
    }
  else {
    $("#resultsDiv0").fadeOut('fast');
    $("#resultsDiv0").attr("display","none");
    removeDivs();
  }
}

function removeDivs() {
  for (var i = 1; i<25; i++){
  $("#resultsDiv"+i).fadeOut('fast');
  $("#resultsDiv"+i).attr("display","none");
  }
  }

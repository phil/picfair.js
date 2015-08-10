$(document).ready(function(){
  console.log("Document Ready");
  $("[data-picfair]").picfair();
});

function PicfairPhoto(url, callback) {
  console.log("PicfairPhoto: " + url);

  this.url = url;
  this.photoID = "";
  this.title = "";
  this.price = "";

  this.starred = false;

  this.mainPhotoURL = "";
  this.thumbPhotoURL = "";

  var titleExpr = new RegExp("<div class='captiontitle'>[^]+?<h3>([^]+?)<\/h3>", "i");
  var priceExpr = new RegExp("<span class=\"price\">(&pound;[0-9.]+?)<\/span>", "i");
  var photoURLExpr = new RegExp("<div class='thepicture[^]+?<img[^]+?src=\"([^]+?)\"");

  jQuery.get(url, function( data ) {

    this.price = data.match(priceExpr)[1];
    this.title = data.match(titleExpr)[1];
    this.mainPhotoURL = data.match(photoURLExpr)[1];

    callback(this);

  });
}

$.fn.picfair = function(){
  return this.each(function(){

    var div = $(this);
    div.css("width", "250px");
    div.css("height", "250px");
    div.css("display", "inline-table");
    div.css("position", "relative");
    div.css("margin", "20px");

    var additionalText = $("<div class='picfair-additional-text'></div>");
    additionalText.append(div.innerText);
    div.empty();

    var linkElement = $("<a href='' class='picfair-link'></a>");
    linkElement.css("position", "absolute");
    linkElement.css("top", "0");
    linkElement.css("left", "0");
    linkElement.css("right", "0");
    linkElement.css("bottom", "0");
    div.append(linkElement);

    var titleElement = $('<span class="picfair-title"></span>');
    titleElement.css("position", "absolute");
    titleElement.css("left", "0");
    titleElement.css("right", "0");
    titleElement.css("bottom", "0");
    titleElement.css("padding", "10px 30px 10px 10px");
    titleElement.css("background-color", "rgba(0, 0, 0, 0.6)");
    titleElement.css("color", "#fff");
    titleElement.css("font-size", "0.8em");
    linkElement.append(titleElement);

    var priceElement = $('<span class="picfair-price"></span>');
    priceElement.css("position", "absolute");
    priceElement.css("left", "0");
    priceElement.css("right", "0");
    priceElement.css("bottom", "0");
    priceElement.css("padding", "10px");
    priceElement.css("color", "#fff");
    priceElement.css("text-align", "right");
    priceElement.css("font-size", "0.8em");
    linkElement.append(priceElement);

    var imgElement = $("<img class='picfair-photo' src='' />");
    imgElement.css("width", "100%");
    linkElement.append(imgElement);

    var picfairPhoto = new PicfairPhoto($(this).data("picfair"), function(photo){

      linkElement.attr("href", photo.url);
      titleElement.append(photo.title);
      priceElement.append(photo.price);

      imgElement.attr("src", photo.mainPhotoURL);
      imgElement.attr("alt", photo.title);

    });

  });
}

function sanitizeText(text){
  return text.replace(/\r\n|\r|\n/gi, "");
}


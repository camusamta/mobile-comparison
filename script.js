

var colors = {

  r: 0,
  g: 0,
  b: 0,
  defaults: {

    inactiveText: "rgba(108,107,107,0.8)"
}

}

var s1Tab = {

id: "s1-tab",
name: " S1 ",
clicked: true,
fullcolor: "rgb(103,176,175)",
// fullcolor: "rgb(103,126,175)",
backgroundcolor: "rgba(103,176,175,0.24)",
emptytextcolor: "rgba(103,176,175,0.90)",
rgb: {
  r: 103,
  g: 166,
  b: 175
},
underlinepos:0,
chevronpos: 46

};

var s3Tab = {

id: "s3-tab",
name: " S3 ",
clicked: false,
fullcolor: "rgb(228, 140, 112)",
backgroundcolor: "rgba(228,140,112,0.24)",
rgb: {
  r: 228,
  g: 140,
  b: 112
},
underlinepos:110,
chevronpos: 150

};

var s3PlusTab = {

id: "s3plus-tab",
name: " S3 Plus ",
clicked: false,
fullcolor: "rgb(131, 87, 164)",
backgroundcolor: "rgba(131, 87, 164, 0.24)",
rgb: {
  r: 131,
  g: 87,
  b: 164
},
underlinepos:220,
chevronpos: 300
};

// 'compare watches' button click

$(".button").on("click",function(){

var tweenContainer = new TweenMax.to($(".container"), 1.35, {ease: Elastic.easeInOut.config(1, 0.5), bottom:0})
var tweenHeader = new TweenMax.to($("header"), 0.7, {ease: Elastic.easeIn.config(1.75, 0.7), bottom:640})


});

// 'back' button click

$(".back").on("click", function(){

  var tweenContainer = new TweenMax.to($(".container"), 0.7, {ease: Elastic.easeIn.config(1.75, 0.7), bottom:-640})
  var tweenHeader = new TweenMax.to($("header"), 1.35, {ease: Elastic.easeInOut.config(1, 0.5), bottom:0})

})


// placing global 'tab' objects into an array

var tabs = [s1Tab, s3Tab, s3PlusTab];


// creates a global 'on click' function that controls all three tab states
$(".watch-column").on('click',function(){

// creates a variable whose value is the data attribute of the element being clicked on
var id = $(this).data("id")

// this is just a cheat workaround for having a background colour on load that doesn't get 'layered' on top of on new clicks
$(".slider-container").css("background-color", "transparent");

// this loops through the array of objects to find the 'id' value in each
for (i = 0; i < tabs.length; i++) {

// variables that make long references to 'this' more readable

var thisColumn = $(this);
var thisHeroImg = thisColumn.find(".hero");
var thisHeader = thisColumn.find(".watch-column-header");
var thisChevron = thisColumn.find(thisHeader).find(".chevron");
var thisPrice = thisColumn.find(".price");

// if the data attribue and the id match, then run everything within the 'if' statement

if (tabs[i].id == id) {

  // Makes .watch-column the background colour specified in the object
  thisColumn.css("background-color", tabs[i].backgroundcolor);

  // makes the sub-class 'watch-column-header' within the 'watch-column' being clicked on the colour specified in the object
  thisHeader.css("background-color", tabs[i].fullcolor);

  // makes the chevron the colour specified within the object
  thisChevron.css("background-color", tabs[i].fullcolor);

  // makes the price the colour specified within the object
  thisPrice.css("color", tabs[i].fullcolor);

  // **** uncommment the below to see the size of the PRICE changing on click
  // *** there's also a matching animation in the 'init' function to uncomment to have this working from the default state

  // var priceSet = new TweenMax.set($(".price"), {scale: 1});
  // var priceTweeen = new TweenMax.to(thisPrice, 0.1, {scale:1.2})

  // changes to the product name in the cta to the one that
  $("#product-name-output").text(tabs[i].name);
  $(".cta-button").css("background-color", tabs[i].fullcolor);

  // This animates the button's state changing
  var buttonSet = new TweenMax.set($(".cta-button"), {scale: 1});
  var buttonTween = new TweenMax.from($(".cta-button"), 0.7, {ease: Elastic.easeOut.config(1, 0.5), scale: 1.1})


  // animates the position of the underline between each column
  var underlineTween = new TweenMax($(".underline"), 0.5, {ease: Expo.easeOut, left: tabs[i].underlinepos})

  // animates the colour of that underline
  var tl = new TimelineMax({});
  tl.to(colors, 0.3, {r:tabs[i].rgb.r, g:tabs[i].rgb.g, b:tabs[i].rgb.b, onUpdate: reColour})

} else {

  // Return the unselected columns to grey - all cases of '.watch-column' not being clicked on
  $('.watch-column').not($(thisColumn)).css("background-color", "rgba(0,0,0,0.03)");

  // Return header to grey
  $('.watch-column-header').not(thisHeader).css("background-color", "#BCBBBB");

  // Return chevron to grey
  $('.watch-column-header').not(thisHeader).find(".chevron").css("background-color", "transparent");

  // Return price to grey
  $('.watch-column').not(thisColumn).find(".price").css("color", colors.defaults.inactiveText);


}

}

// A series of 'if' statements that re-arrange the relationship between the column information
// I could control this using just the objects and 'this' identifiers if there wasn't shared features which have multiple states. Also, the columns don't sit as child elements of the columns; they're absolutely positioned over the top; something I'd change if I did this again
// to mitigate this adoption of an 'easier' workaround, I practiced continually trying to think in functions

if (id=="s1-tab") {

  bounceAnimation(".leftMidThumbs, #storage8GB, #connectivityWifiOnly, #splashOnly, #loBright");
  activateItems("#storage8GB, #connectivityWifiOnly, #loBright, #splashOnly",s1Tab.fullcolor);
  deactivateItems(s3PlusTabClassID);
  sharedItemsLeftAlign(".storage, .connectivity", ".right")
  $("#noSiri, #noGPS").css("color", s1Tab.emptytextcolor);
  $(".farRightThumb").css("display","none");



} else {$("#noSiri, #noGPS").css("color", colors.defaults.inactiveText);};

if (id == "s3-tab") {

  bounceAnimation(".leftMidThumbs, .farRightThumb, #storage8GB, #connectivityWifiOnly, #siriEnabled, #enabledGPS, #waterproof, #hiBright");
  // bounceAnimation(".left, .leftMidThumbs, .farRightThumb");
  deactivateItems("#splashOnly, #loBright, #storage16GB, #connectivityWifiData");
  activateItems("#storage8GB, #connectivityWifiOnly, #siriEnabled, #enabledGPS, #waterproof, #hiBright", s3Tab.fullcolor);
  sharedItemsRightAlign(".storage, .connectivity", ".right");
  sharedItemsLeftAlign("#siriEnabled, #enabledGPS, #waterproof, #hiBright", ".right")

}

if (id == "s3plus-tab") {

  bounceAnimation(".farRightThumb, #siriEnabled, #enabledGPS, #waterproof, #hiBright, #storage16GB, #connectivityWifiData");
  // bounceAnimation(".left, .farRightThumb, #storage16GB, #connectivityWifiData");
  deactivateItems(s1TabClassID);
  activateItems ("#storage16GB, #connectivityWifiData, #siriEnabled, #enabledGPS, #waterproof, #hiBright", s3PlusTab.fullcolor);
  sharedItemsRightAlign("#siriEnabled, #enabledGPS, #waterproof, #hiBright", "#farThumb");
  $(".leftMidThumbs").css("display","none");
  $(".farRightThumb").css("display","flex");


}



})

// created these as easy references to feed into 'deactivateItems' function

var s1TabClassID = "#storage8GB, #connectivityWifiOnly, #splashOnly, #loBright";
var s3PlusTabClassID = "#storage16GB, #connectivityWifiData, #siriEnabled, #enabledGPS, #waterproof, #hiBright";


// ---------------------- FUNCTIONS!---------------------------------

// this adds a 'bounce' animation to anything fed into it as a parameter
function bounceAnimation(classToAnimate) {

  var newcss = new TweenMax.set($(classToAnimate), {x: 0});
  var newtween = new TweenMax.from($(classToAnimate), 1, {ease: Elastic.easeOut.config(2.5, 0.75), x: -5.5}, 0.03)

}

// this is a callback function that updates the colour of the animated underline from the temporary 'color' object
function reColour() {

  var red = Math.floor(colors.r);
  var green = Math.floor(colors.g);
  var blue = Math.floor(colors.b);
  $(".underline").css("background-color",`rgb(${red}, ${green}, ${blue})`);

}

function activateItems (items, objColorRef) {

  $(items).css("background-color", objColorRef).css("color","white").css("border","none");

}

function deactivateItems(items) {

$(items).css("background-color","white").css("color", colors.defaults.inactiveText).css("border", "1px solid rgba(108,107,107,0.15");

}

function sharedItemsLeftAlign(items, tickName) {

$(items).css("flex-flow", "nowrap");
$(tickName).css("display","flex");

}

function sharedItemsRightAlign(items, tickName) {

$(items).css("flex-flow", "row-reverse");
$(tickName).css("display","flex");


}

function init(){

  bounceAnimation(".left, .right");
  activateItems("#storage8GB, #connectivityWifiOnly, #loBright, #splashOnly",s1Tab.fullcolor)
  $(".connectivity").css("flex-flow", "nowrap");
  $("#noSiri, #noGPS").css("color", s1Tab.emptytextcolor);
  $(".right").css("display","flex");
  $(".farRightThumb").css("display","none");
  $("#product-name-output").text(s1Tab.name);
  $(".cta-button").css("background-color", s1Tab.fullcolor);
  // var priceTween = new TweenMax.to($(".init"), 0.1, {scale:1.2})


}

init();

$(function (){

$('.js-smoothscroll').click(function (){
  var speed = 500;
      href = $(this).attr("href");
      target = $(href == "#" || href == "" ? 'html' : href)
      position = target.offset().top;
      $('html, body').animate({scrollTop : position}, speed);
});

$('.js-pagetop').click(function(){
  var speed = 500;
  $('html, body').animate({scrollTop : 0}, speed);
});


})
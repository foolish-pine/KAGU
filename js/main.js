/* ================================================================
  jQuery
   ================================================================ */

// ---------------------------------------------
// ハンバーガーメニュー
// ---------------------------------------------

//ウィンドウのリサイズ後にリロードする
$(function () {
  var timer = false;
  var prewidth = $(window).width();
  $(window).resize(function () {
    if (timer !== false) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      var nowWidth = $(window).width();
      if (prewidth !== nowWidth) {
        location.reload();
      }
      prewidth = nowWidth;
    }, 200);
  });
});

// ヘッダー
$(function () {
  $('.p-header__menu').on('click', function () {
    $('.p-header__menuLine').stop(true).toggleClass('active');
    $('.p-header__nav').stop(true).fadeToggle();
  });
});

$(function () {
  $('.p-header__nav, .p-header__logo').on('click', function () {
    if ($('.p-header__menuLine').hasClass('active')) {
      $('.p-header__menuLine').stop(true).toggleClass('active');
      $('.p-header__nav').stop(true).fadeToggle();
    }
  });
});

// フッター
// ウィンドウサイズが959px以下のときのみ有効
$(function () {
  if ($(window).width() < 960) {
    $(function () {
      $('.p-footer__subNav').on('click', function () {
        $('.p-footer__menuLine').stop(true).toggleClass('active');
        $('.p-footer__subList').stop(true).slideToggle();
      });
    });
  }
});


// ---------------------------------------------
// スムーススクロール（ページ内リンク）
// ---------------------------------------------
$(function () {
  $('.js-smoothscroll').click(function () {
    var speed = 500;
    href = $(this).attr("href"),
    target = $(href == "#" || href == "" ? 'html' : href),
    position = target.offset().top;
    $('html, body').animate({ scrollTop: position }, speed);
  });
});

// ---------------------------------------------
// スムーススクロール（ページトップへ戻る）
// ---------------------------------------------
$(function () {
  $('.js-pagetop').click(function () {
    var speed = 500;
    $('html, body').animate({ scrollTop: 0 }, speed);
  });
});

// ---------------------------------------------
// スライドショー
// ---------------------------------------------
$(function () {
  $('.p-mainVisual__slideshow').each(function () {
    var $container = $(this),
      $slideGroup = $container.find('.p-mainVisual__slideshowSlides'),
      $slides = $slideGroup.find('.p-mainVisual__slide'),
      $indicator = $container.find('.p-mainVisual__slideshowIndicator'),

      slideCount = $slides.length,
      indicatorHTML = '',
      currentIndex = 0,
      duration = 500,
      interval = 7500,
      timer;

    $slides.each(function (i) {
      $(this).css({ left: 100 * i + '%' });
      indicatorHTML += '<a href="#"></a>';
    });

    $indicator.html(indicatorHTML);

    function goToSlide(index) {
      $slideGroup.animate({ left: -100 * index + '%' }, duration);
      currentIndex = index;
      updateNav();
    }

    function updateNav() {
      $indicator.find('a').removeClass('active').eq(currentIndex).addClass('active');
    }

    function startTimer() {
      timer = setInterval(function () {
        var nextIndex = (currentIndex + 1) % slideCount;
        goToSlide(nextIndex);
      }, interval);
    }

    function stopTimer() {
      clearInterval(timer);
    }

    $indicator.on('click', 'a', function (event) {
      event.preventDefault();
      if (!$(this).hasClass('active')) {
        goToSlide($(this).index());
      }
    });

    $container.on({
      mouseenter: stopTimer,
      mouseleave: startTimer
    });

    goToSlide(currentIndex);

    startTimer();
  });
});
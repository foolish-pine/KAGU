/* ================================================================
  jQuery
   ================================================================ */

$(function () {
  // ---------------------------------------------
  // ハンバーガーメニュー
  // ---------------------------------------------

  var mq = window.matchMedia("screen and (max-width:1023px)");

  var $headerNav = $(".p-header__nav"),
    $hamburgerMenu = $(".js-hamburger-menu"),
    $hamburgerMenuLine = $(".js-hamburger-menu-line"),
    $footerSubNav = $(".p-footer__sub-nav"),
    $footerSubList = $(".p-footer__sub-list"),
    $crossMenuLine = $(".js-cross-menu-line");

  $(window).on("resize", function () {
    if (mq.matches) {
      // 画面幅1023px以下のとき
      // navを非表示にする
      $headerNav.hide();
      $footerSubList.hide();
      // メニューアイコンを非activeにする
      $hamburgerMenuLine.removeClass("active");
      $crossMenuLine.removeClass("active");
    } else {
      // 画面幅1024px以上のとき
      // navを表示させる
      $headerNav.show();
      $footerSubList.show();
    }
  });

  // メニューアイコンをクリックしてnavを開閉する
  $hamburgerMenu.on("click", function () {
    $hamburgerMenuLine.stop(true).toggleClass("active");
    $headerNav.stop(true).fadeToggle();
  });

  $footerSubNav.on("click", function () {
    $crossMenuLine.stop(true).toggleClass("active");
    $footerSubList.stop(true).slideToggle();
  });

  // ナビの余白クリックでヘッダーメニュー閉じる
  $headerNav.on("click", function () {
    if ($hamburgerMenuLine.hasClass("active")) {
      $hamburgerMenuLine.stop(true).toggleClass("active");
      $headerNav.stop(true).fadeToggle();
    }
  });

  // ---------------------------------------------
  // スムーススクロール（ページ内リンク）
  // ---------------------------------------------
  $(".js-smoothscroll").click(function () {
    var speed = 500,
      href = $(this).attr("href"),
      target = $(href == "#" || href == "" ? "html" : href),
      headerHeight = $(".p-header").outerHeight(),
      position = target.offset().top - headerHeight; // ヘッダーの高さ分スクロール量を減らす
    $("html, body").animate({ scrollTop: position }, speed);
  });

  // ---------------------------------------------
  // スムーススクロール（ページトップへ戻る）
  // ---------------------------------------------
  $(".js-pagetop").click(function () {
    var speed = 500;
    $("html, body").animate({ scrollTop: 0 }, speed);
  });

  // ---------------------------------------------
  // スライドショー
  // ---------------------------------------------
  $(".p-main-visual__slideshow").each(function () {
    var $container = $(this),
      $slideGroup = $container.find(".p-main-visual__slideshow-slides"),
      $slides = $slideGroup.find(".p-main-visual__slide"),
      $indicator = $container.find(".p-main-visual__slideshow-indicator"),
      slideCount = $slides.length,
      indicatorHTML = "",
      currentIndex = 0,
      duration = 500,
      interval = 7500,
      timer;

      // スライドをもう一組追加する(無限ループ用)
      $slides.clone().appendTo($slideGroup); 
      $slides = $slideGroup.find(".p-main-visual__slide");
      
    $slides.each(function (i) {
      $(this).css({ left: 100 * i + "%" });
    });
    
    // スライドの数だけインジケーターを追加する
    $slides.each(function (i) {
      if (i === slideCount) {
        return false;
      }
      indicatorHTML += '<a href="#"></a>';
    });


    $indicator.html(indicatorHTML);

    function goToSlide(index) {
      $slideGroup.animate({ left: -100 * index + "%" }, duration);
      currentIndex = index;
      updateNav();
    }

    function updateNav() {
      $indicator
        .find("a")
        .removeClass("active")
        .eq(currentIndex)
        .addClass("active");
    }

    function startTimer() {
      timer = setInterval(function () {
        var nextIndex = (currentIndex + 1) % slideCount;

        // 無限ループ
        if (nextIndex === 0) {
          $slideGroup.animate({ left: -100 * slideCount + "%" }, duration, function() {
            $slideGroup.css({ 'left': '0%' });
          });
          currentIndex = 0;
          updateNav();
        } else {
          goToSlide(nextIndex);
        }
      }, interval);
    }

    function stopTimer() {
      clearInterval(timer);
    }

    $indicator.on("click", "a", function (event) {
      event.preventDefault();
      if (!$(this).hasClass("active")) {
        goToSlide($(this).index());
      }
    });

    $container.on({
      mouseenter: stopTimer,
      mouseleave: startTimer,
    });

    goToSlide(currentIndex);

    startTimer();
  });
});

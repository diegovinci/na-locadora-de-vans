/*jslint browser: true*/
/*global $, jQuery, Modernizr, google, _gat*/
/*jshint strict: true */

var isMobile = false;
var isDesktop = false;

$(window).on("load resize", function (e) {

  //mobile detection
  if (Modernizr.mq('only all and (max-width: 767px)')) {
    isMobile = true;
  } else {
    isMobile = false;
  }

  //tablet and mobile detection
  if (Modernizr.mq('only all and (max-width: 1024px)')) {
    isDesktop = false;
  } else {
    isDesktop = true;
  }
});

/*
|--------------------------------------------------------------------------
| DOCUMENT READY
|--------------------------------------------------------------------------
*/

$(document).ready(function () {
  "use strict";

  /*
  |--------------------------------------------------------------------------
  |  fullwidth image
  |--------------------------------------------------------------------------
  */

  if ($('#homeFullScreen').length) {
    fullscreenImage();
  }
  //alert($('#mainHeader').height());
  //alert( $(window).height());
  var $starter = $(window).height() - $('#mainHeader').height();

  $(window).scroll(function () {

    if ($('#fullScreen').length) {
      var $windowScrollPosition = $(window).scrollTop();

      if ($windowScrollPosition >= $starter) {

        $('#mainHeader').css({
          'opacity': 1,
          'transform': ' scaleY(1)'
        });

      } else if ($windowScrollPosition <= 50) {

        $('#mainHeader').css({
          'opacity': 0,
          'transform': ' scaleY(0)'
        });

      }
    }

  });

  /*
   |--------------------------------------------------------------------------
   |  form placeholder for IE
   |--------------------------------------------------------------------------
   */
  if (!Modernizr.input.placeholder) {

    $('[placeholder]').focus(function () {
      var input = $(this);
      if (input.val() == input.attr('placeholder')) {
        input.val('');
        input.removeClass('placeholder');
      }
    }).blur(function () {
      var input = $(this);
      if (input.val() == '' || input.val() == input.attr('placeholder')) {
        input.addClass('placeholder');
        input.val(input.attr('placeholder'));
      }
    }).blur();
    $('[placeholder]').parents('form').submit(function () {
      $(this).find('[placeholder]').each(function () {
        var input = $(this);
        if (input.val() == input.attr('placeholder')) {
          input.val('');
        }
      })
    });

  }


  /*
  |--------------------------------------------------------------------------
  | COLLAPSE
  |--------------------------------------------------------------------------
  */

  $('.accordion').on('show hide', function (e) {
    $('.accordion-toggle').removeClass('active');
    $(e.target).siblings('.accordion-heading').find('.accordion-toggle').addClass('active');
    $(e.target).siblings('.accordion-heading').find('.accordion-toggle i').toggleClass('icon-plus icon-minus', 200);

  });


  /*
  |--------------------------------------------------------------------------
  | MAIN ROLLOVER EFFECTS
  |--------------------------------------------------------------------------
  */

  if ($('.imgHover').length) {

    $('.imgHover article').hover(
      function () {

        var $this = $(this);

        var fromTop = ($('.imgWrapper', $this).height() / 2 - $('.iconLinks', $this).height() / 2);
        $('.iconLinks', $this).css('margin-top', fromTop);

        $('.mediaHover', $this).height($('.imgWrapper', $this).height());

        $('.mask', this).css('height', $('.imgWrapper', this).height());
        $('.mask', this).css('width', $('.imgWrapper', this).width());
        $('.mask', this).css('margin-top', $('.imgWrapper', this).height());

        $('.mask', this).stop(1).show().css('margin-top', $('.imgWrapper', this).height()).animate({
          marginTop: 0
        }, 200, function () {

          $('.iconLinks', $this).css('display', 'block');
          if (Modernizr.csstransitions) {
            $('.iconLinks a').addClass('animated');

            $('.iconLinks a', $this).removeClass('flipOutX');
            $('.iconLinks a', $this).addClass('bounceInDown');

          } else {

            $('.iconLinks', $this).stop(true, false).fadeIn('fast');
          }

        });

      },
      function () {

        var $this = $(this);

        $('.mask', this).stop(1).show().animate({
          marginTop: $('.imgWrapper', $this).height()
        }, 200, function () {

          if (Modernizr.csstransitions) {
            $('.iconLinks a', $this).removeClass('bounceInDown');
            $('.iconLinks a', $this).addClass('flipOutX');

          } else {
            $('.iconLinks', $this).stop(true, false).fadeOut('fast');
          }

        });

      });
  }

  /*
  |--------------------------------------------------------------------------
  | ROLLOVER BTN
  |--------------------------------------------------------------------------
  */

  $('.socialIcon').hover(
    function () {
      $(this).stop(true, true).addClass('socialHoverClass', 300);
    },
    function () {
      $(this).removeClass('socialHoverClass', 300);
    });

  $('.tabs li, .accordion h2').hover(
    function () {
      $(this).stop(true, true).addClass('speBtnHover', 300);
    },
    function () {
      $(this).stop(true, true).removeClass('speBtnHover', 100);
    });

  /*
  |--------------------------------------------------------------------------
  | ALERT
  |--------------------------------------------------------------------------
  */
  $('.alert').delegate('button', 'click', function () {
    $(this).parent().fadeOut('fast');
  });

  /*
  |--------------------------------------------------------------------------
  | CLIENT
  |--------------------------------------------------------------------------
  */

  if ($('.colorHover').length) {
    var array = [];
    $('.colorHover').hover(

      function () {

        array[0] = $(this).attr('src');
        $(this).attr('src', $(this).attr('src').replace('-off', ''));

      },

      function () {

        $(this).attr('src', array[0]);

      });
  }

  /*
  |--------------------------------------------------------------------------
  | Rollover boxIcon
  |--------------------------------------------------------------------------
  */
  if ($('.boxIcon').length) {

    $('.boxIcon').hover(function () {
      var $this = $(this);

      $this.css('opacity', '1');
      //$this.find('.boxContent>p').stop(true, false).css('opacity', 0);
      $this.addClass('hover');
      $('.boxContent>p').css('bottom', '-50px');
      $this.find('.boxContent>p').stop(true, false).css('display', 'block');

      $this.find('.iconWrapper i').addClass('triggeredHover');

      $this.find('.boxContent>p').stop(true, false).animate({
        'margin-top': '0px'
      },
        300,
        function () {
          // stuff to do after animation is complete
        });

    }, function () {
      var $this = $(this);
      $this.removeClass('hover');

      $this.find('.boxContent>p').stop(true, false).css('display', 'none');
      $this.find('.boxContent>p').css('margin-top', '250px');
      $this.find('.iconWrapper i').removeClass('triggeredHover');

    });
  }

  $('#quoteTrigger').click(function (e) {

    //$("#quoteWrapper").scrollTop(0);

    if (!$('#quoteFormWrapper').is(':visible')) {
      $('html, body').animate({
        scrollTop: $("#quoteWrapper").offset().top
      }, 300);
    }

    var $this = $(this);

    $('#quoteFormWrapper').slideToggle('fast', function () {

      $this.text($('#quoteFormWrapper').is(':visible') ? "Close form" : "I have a project");

    });

    e.preventDefault();
  });

  /*
  |--------------------------------------------------------------------------
  | SHARE
  |--------------------------------------------------------------------------
  */
  if ($('#shareme').length) {

    var params = {
      url: ($('#shareme').data('url') != '') ? $('#shareme').data('url') : window.location.href,
      title: $('#shareme').data('title'),
      desc: $('#shareme').data('desc'),
      via: 'LittleNeko1',
      hashtags: 'premium template, awesome web design'
    },

      links = SocialShare.generateSocialUrls(params),
      $target = $('#shareme');

    $target.html(''); //clear!

    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      $target.append('<a class="neko-share-btn btn ' + link.class + '" target="_blank" href="' + link.url + '" title="' + link.name + '"><i class="' + link.icon + '" style="position"></i></a>');
    }

    $target.find('a').on('click', SocialShare.doPopup);

  }

  /*
  |--------------------------------------------------------------------------
  | ROLL OVER PreviewTrigger
  |--------------------------------------------------------------------------
  */
  if ($('.previewTrigger').length) {

    $('.mask').css('height', $('.previewTrigger').height());
    $('.mask').css('width', $('.previewTrigger').width());
    // $('.mask', this).css('top', $('.previewTrigger', this).width());
    // $('.mask', this).css('left', $('.previewTrigger', this).width());

    $('.previewTrigger').hover(function () {

      var $this = $(this);

      $this.children('.mask').fadeIn('fast');

      if (Modernizr.csstransitions) {
        $('.iconWrapper', $this).addClass('animated');
        $('.iconWrapper', $this).css('display', 'block');
        $('.iconWrapper', $this).removeClass('flipOutX');
        $('.iconWrapper', $this).addClass('bounceInDown');
      } else {
        $('.iconWrapper', $this).stop(true, false).fadeIn('fast');
      }

    }, function () {

      var $this = $(this);

      $this.children('.mask').fadeOut('fast');

      if (Modernizr.csstransitions) {
        $('.iconWrapper', $this).removeClass('bounceInDown');
        $('.iconWrapper', $this).addClass('flipOutX');
        $('.iconWrapper', $this).css('display', 'none');
        $('.iconWrapper', $this).removeClass('animated');
      } else {
        $('.iconWrapper', $this).stop(true, false).fadeOut('fast');
      }

    });
  }

  /*
  |--------------------------------------------------------------------------
  | AUTOCLOSE BOOSTRAP MENU
  |--------------------------------------------------------------------------
  */
  $('.nav a').on('click', function () {

    if ($('.navbar-toggle').css('display') != 'none')
      $('.navbar-toggle').click();

  });

  /*
  |--------------------------------------------------------------------------
  | APPEAR
  |--------------------------------------------------------------------------
  */
  if ($('.activateAppearAnimation').length) {
    animAppear();

    $('.reloadAnim').click(function (e) {

      $(this).parent().parent().find('img').removeClass().addClass('img-responsive');

      animAppear();
      e.preventDefault();
    });
  }

  //END DOCUMENT READY   
});

/*
|--------------------------------------------------------------------------
| EVENTS TRIGGER AFTER ALL IMAGES ARE LOADED
|--------------------------------------------------------------------------
*/
$(window).load(function () {

  "use strict";

  /*
  |--------------------------------------------------------------------------
  | PRELOADER
  |--------------------------------------------------------------------------
  */
  $('#status').fadeOut(); // will first fade out the loading animation
  $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
  $('body').delay(350).css({
    'overflow': 'visible'
  });

  /**PROCESS ICONS**/
  $('.iconBoxV3 a').hover(function () {

    if (Modernizr.csstransitions) {

      $(this).stop(false, true).toggleClass('hover', 150);
      $('i', this).css('-webkit-transform', 'rotateZ(360deg)');
      $('i', this).css('-moz-transform', 'rotateZ(360deg)');
      $('i', this).css('-o-transform', 'rotateZ(360deg)');
      $('i', this).css('transform', 'rotateZ(360deg)');

    } else {

      $(this).stop(false, true).toggleClass('hover', 150);

    }

  }, function () {

    if (Modernizr.csstransitions) {
      $(this).stop(false, true).toggleClass('hover', 150);
      $('i', this).css('-webkit-transform', 'rotateZ(0deg)');
      $('i', this).css('-moz-transform', 'rotateZ(0deg)');
      $('i', this).css('-o-transform', 'rotateZ(0deg)');
      $('i', this).css('transform', 'rotateZ(0deg)');

    } else {

      $(this).stop(false, true).toggleClass('hover', 150);
    }

  });

  if ($('.scrollMenu').length || $('.scrollLink').length) {

    $('#globalWrapper').on('click', '#mainHeader .nav li a, .scrollLink', function (event) {

      var $anchor = $(this),
        content = $anchor.attr('href'),
        checkURL = content.match(/^#([^\/]+)$/i);

      if (checkURL) {
        event.preventDefault();
        var Hheight = ($('.navbar-toggle').css('display') == 'none') ? $('.scrollMenu').height() + 10 : $('.navbar-header').height() + 10,
          computedOffset = $($anchor.attr('href')).offset().top - parseInt(Hheight) + parseInt($($anchor.attr('href')).css('padding-top')) - 40;

        $('html, body').stop().animate({
          scrollTop: computedOffset + "px"
        }, 1200, 'easeInOutExpo');
      } else {

      }
    });
  }

  if (isMobile === false && typeof $("section").data('stellar-background-ratio') !== 'undefined') {
    $(window).stellar({
      horizontalScrolling: false,
      responsive: true,
      scrollProperty: 'scroll',
      parallaxElements: false,
      horizontalOffset: 0,
      verticalOffset: 0
    });
  }

  //END WINDOW LOAD
});

/*
|--------------------------------------------------------------------------
| FUNCTIONS
|--------------------------------------------------------------------------
*/

/* Appear function */
function animAppear() {
  $("[data-anim]").each(function () {

    var $this = $(this);

    $this.addClass("anim-invisible");

    if ($(window).width() > 767) {

      $this.appear(function () {

        var delay = ($this.data("delay") ? $this.data("delay") : 1);
        if (delay > 1) $this.css("animation-delay", delay + "ms");

        $this.addClass("anim-animated");
        $this.addClass('anim-' + $this.data("anim"));

        setTimeout(function () {
          $this.addClass("anim-visible");
        }, delay);

      }, {
          accX: 0,
          accY: -150
        });

    } else {
      $this.addClass("anim-visible");
    }
  });
}


/** FULLSCREEN IMAGE **/

function fullscreenImage() {
  $('#homeFullScreen').css({
    height: $(window).height()
  })
}

$(window).on("resize", function (e) {

  if ($('#fullScreen').length) {
    fullscreenImage();
  }
});

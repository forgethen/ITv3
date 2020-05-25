'use strict';

$(document).ready(function() {

  $('header form input').focusout(function() {
    if (!$(this).val()) {
      $(this).next('p').removeClass('not_empty');
    } else {
      $(this).next('p').addClass('not_empty');
    }
  });

  $('input[type="phone"]').focusout(function() {
    if (!$(this).val()) {
      $(this).inputmask("");
    } else {
      $(this).next('p').addClass('not_empty');
    }
  });

  $('input[type="phone"]').click(function() {
    $(this).inputmask("+7 (999) 999 99 99");
  });


  $("input,textarea,email").focus(function() {
    $(this).data("placeholder", $(this).attr("placeholder")), $(this).attr("placeholder", "")
  });

  $("input,textarea,email").blur(function() {
    $(this).attr("placeholder", $(this).data("placeholder"))
  });


  function fromresize() {
    setTimeout(function () {
      clientRandom();
    }, 100);
    resizer();
  }

  $(window).resize(function() {
    fromresize();
  });

  function resizer() {
      var wHeight = $(window).height();
      var wWidth = $(window).width();
      var percent = wWidth*.5625;
      var hHeight = $('header').height();
    if( wHeight < percent) {
        $('header').css('min-height','100vh');
        $('header').css('height','100%');
        $('header').css('max-height','56.25vw');
        setTimeout(function () {
          var hHeight = $('header').height();
          $('.cases--v1').css('height',hHeight);
          $('.cases--v1 .cases__items').css('height',hHeight);
          $('.cases--v1').css('min-height',hHeight);
          $('.cases--v1').css('max-height',hHeight);
        }, 200);
        var hHeight = $('header').height();
    }
    else {
        $('header').css('min-height','100%');
        $('header').css('height','100vh');
        $('header').css('max-height','56.25vw');
        setTimeout(function () {
          var hHeight = $('header').height();
          $('.cases--v1').css('height',hHeight);
          $('.cases--v1 .cases__items').css('height',hHeight);
          $('.cases--v1').css('min-height',hHeight);
          $('.cases--v1').css('max-height',hHeight);
        }, 200);
        var hHeight = $('header').height();
    }
  }

  resizer();

  function clientRandom() {
    $('.recommendation__items__box').each(function() {
      var bodyWidth = $('.recommendation').width();
      var bodyHeight = $('.recommendation__items').height();
      var thisHeight = $(this).find('.recommendation__item').height();
      var min = 0 - thisHeight;
      var max = bodyHeight - thisHeight - 80;
      var randPosY = Math.floor((Math.random() * max));
      $(this).find('.recommendation__item').css('top', randPosY);
    });
  }

  clientRandom();

  $('.recommendation__item').hasClass('clip')

  $('.recommendation__items').slick({
    dots: false,
    arrows: false,
    centerMode: true,
    slidesToShow: 4,
    autoplay: true,
    autoplaySpeed: 0,
    focusOnSelect: false,
    pauseOnHover: false,
    pauseOnFocus: false,
    speed: 7500,
    cssEase: 'linear'
  });

  $('.our_work__items.slider').slick({
    dots: false,
    arrows: false,
    centerMode: false,
    slidesToShow: 3,
    arrows: true,
    autoplay: true,
    responsive: [{
      breakpoint: 501,
      settings: {
        dots: true,
        slidePerRow: 1,
        slidesToShow: 1,
      }
    }, ]
  });

  $('.burger').click(function() {
    $('body').toggleClass('hidden');
    $('.Menu').toggleClass('show');
  });

  $('.Menu .close').click(function() {
    $('.Menu .checked').removeClass('checked');
    $('.Menu .this').removeClass('this');
    $('.burger').click();
  });

  $('.Menu .Menu__list > li > a').click(function() {
    $('.Menu .Menu__list > li > a.this').removeClass('this');
    $('.Menu .Menu__list .checked').removeClass('checked');
    $('.Menu .Menu__list .Menu__submenu li a.this').removeClass('this');
    $('.Menu .Menu__list .Menu__submenu .check').removeClass('check');
    $(this).addClass('this');
    $(this).next().addClass('checked');
  });

  $('.Menu .Menu__submenu > li > a').click(function() {
    $('.Menu .Menu__submenu > li > a.this').removeClass('this');
    $('.Menu .Menu__submenu .check').removeClass('check');
    $(this).addClass('this');
    $(this).next().addClass('check');
  });

  // TEAM SEARCH CUSTOM SELECT

  $(".custom-select").each(function() {
    var classes = $(this).attr("class"),
      id = $(this).attr("id"),
      name = $(this).attr("name");
    var template = '<div class="' + classes + '">';
    template += '<span class="custom-select-trigger">' + $(this).attr("placeholder") + '</span>';
    template += '<div class="custom-options">';
    $(this).find("option").each(function() {
      template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value")  + '"' + 'id="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
    });
    template += '</div></div>';

    $(this).wrap('<div class="custom-select-wrapper"></div>');
    $(this).hide();
    $(this).after(template);
  });

  $(".custom-option:first-of-type").hover(function() {
    $(this).parents(".custom-options").addClass("option-hover");
  }, function() {
    $(this).parents(".custom-options").removeClass("option-hover");
  });

  $(".custom-select-trigger").on("click", function() {
    $('html').one('click', function() {
      $(".custom-select").removeClass("opened");
    });
    $(this).parents(".custom-select").toggleClass("opened");
    event.stopPropagation();
  });

  var filtered = false;
  $(".our_work .custom-option").on("click", function(e) {
    e.preventDefault();
    var $this = $(this),
        link = $this.attr('id'),
        dir = link.replace(/#/, '');

    if(!$this.hasClass('active')){
      $this.addClass('active').siblings().removeClass('active');
    }else{
      $this.removeClass('active');
    }

    //console.log(dir);
    if (filtered === false) {
      $('.our_work__items.slider').slick('slickUnfilter');
      $('.our_work__items.slider').slick('slickFilter', '.' + dir);
      $('.our_work__items.slider').slick('slickGoTo', 0);
    }else {
      $('.our_work__items.slider').slick('slickUnfilter');
      $('.our_work__items.slider').slick('slickFilter', '.' + dir);
      $('.our_work__items.slider').slick('slickGoTo', 0);

      filtered = false;
    }
    $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
    $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
    $(this).addClass("selection");
    $(this).parents(".custom-select").removeClass("opened");
    $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
  });

  $(".clients .custom-option").on("click", function(e) {
    e.preventDefault();
    var $mediaElements = $('.clients .All');

    // get the category from the attribute
    var filterVal = $(this).data('value');

    if(filterVal === 'All'){
      $mediaElements.show();
    }else{
       // hide all then filter the ones to show
       $mediaElements.hide().filter('.' + filterVal).show();
    }
    $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
    $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
    $(this).addClass("selection");
    $(this).parents(".custom-select").removeClass("opened");
    $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
  });

$('.mini_case__preview').each(function() {
  var imgHref = $(this).find('img').attr('src');
  $(this).attr('href',imgHref);
})

// ГРУППИРОВКА  ЭЛЕМЕНТОВ

  // $('.clients__items :nth-child(4n-4)').each(function(){//выбираю каждый шестой элемент и для каждого
  // var i=0;
  // $(this).addClass('group');//присваиваю класс group этому шестому блоку
  // while (i<4){
  // $(this).prevAll('.clients__item').eq(i).addClass('group');//в цикле выбираю предыдущие пять блоков и всем даю класс group
  // i++;
  // }
  // $('.group').wrapAll('<div class="slick-slide"></div>');//заварачиваю все у кого класс group в див
  // $('.clients__item').removeClass('group');// удаляю класс group
  // });

});

//# sourceMappingURL=main.js.map

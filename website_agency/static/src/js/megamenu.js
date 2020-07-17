$( document ).ready(function() {
  // initialization of header
  var header = new HSHeader($('#header')).init();

  // initialization of mega menu
  var megaMenu = new HSMegaMenu($('.js-mega-menu'), {
    desktop: {
      position: 'left'
    }
  }).init();

  // initialization of unfold
  var unfold = new HSUnfold('.js-hs-unfold-invoker').init();

  // initialization of show animations
  $('.js-animation-link').each(function () {
    var showAnimation = new HSShowAnimation($(this)).init();
  });

  // initialization of slick carousel
  $('.js-slick-carousel').each(function() {
    var slickCarousel = $.HSCore.components.HSSlickCarousel.init($(this));
  });

  // initialization of form validation
  $('.js-validate').each(function() {
    $.HSCore.components.HSValidation.init($(this), {
      rules: {
        confirmPassword: {
          equalTo: '#signupPassword'
        }
      }
    });
  });

  // initialization of go to
  $('.js-go-to').each(function () {
    var goTo = new HSGoTo($(this)).init();
  });

});

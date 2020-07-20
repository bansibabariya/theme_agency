$( document ).ready(function() {
  // initialization of header
//  var header = new HSHeader($('#header')).init();

  // initialization of mega menu
  var megaMenu = new HSMegaMenu($('.js-mega-menu'), {
    desktop: {
      position: 'left'
    }
  }).init();

  // initialization of unfold
  var unfold = new HSUnfold('.js-hs-unfold-invoker').init();

  // initialization of show animations
  if($('.js-animation-link')){
      $('.js-animation-link').each(function () {
        var showAnimation = new HSShowAnimation($(this)).init();
      });
  }

  // initialization of slick carousel
  if($('.js-slick-carousel')){
      $('.js-slick-carousel').each(function() {
        var slickCarousel = $.HSCore.components.HSSlickCarousel.init($(this));
      });
  }

  // initialization of form validation
  if($('.js-validate')){
      $('.js-validate').each(function () {
        var validation = $.HSCore.components.HSValidation.init($(this));
      });
  }

  // initialization of go to
  if($('.js-go-to')){
      $('.js-go-to').each(function () {
        var goTo = new HSGoTo($(this)).init();
      });
  }

});

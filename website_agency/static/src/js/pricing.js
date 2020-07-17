$( document ).ready(function() {

       // initialization of sticky blocks
      $('.js-sticky-block').each(function () {
        var stickyBlock = new HSStickyBlock($(this)).init();
      });

      // initialization of slick carousel
      $('.js-slick-carousel').each(function() {
        var slickCarousel = $.HSCore.components.HSSlickCarousel.init($(this));
      });

      // initialization of show animations
      $('.js-animation-link').each(function () {
        var showAnimation = new HSShowAnimation($(this)).init();
      });

      // initialization of toggle switch
      $('.js-toggle-switch').each(function () {
        var toggleSwitch = new HSToggleSwitch($(this)).init();
      });

      // initialization of go to
      $('.js-go-to').each(function () {
        var goTo = new HSGoTo($(this)).init();
      });
    });
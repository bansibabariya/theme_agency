$( document ).ready(function() {

       // initialization of sticky blocks
      $('.js-sticky-block').each(function () {
        var stickyBlock = new HSStickyBlock($(this)).init();
      });

      // initialization of scroll nav
      $('.js-scroll-nav').each(function () {
        var scrollNav = new HSScrollNav($(this)).init();
      });

      // initialization of slick carousel
      $('.js-slick-carousel').each(function() {
        var slickCarousel = $.HSCore.components.HSSlickCarousel.init($(this));
      });

      // initialization of toggle switch
      $('.js-toggle-switch').each(function () {
        var toggleSwitch = new HSToggleSwitch($(this)).init();
      });


    });
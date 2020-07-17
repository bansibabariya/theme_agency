$( document ).ready(function() {

    // initialization of sticky blocks
      $('.js-sticky-block').each(function () {
        var stickyBlock = new HSStickyBlock($(this)).init();
      });

      // initialization of scroll nav
      $('.js-scroll-nav').each(function () {
        var scrollNav = new HSScrollNav($(this)).init();
      });

      // initialization of toggle switch
      $('.js-toggle-switch').each(function () {
        var toggleSwitch = new HSToggleSwitch($(this)).init();
      });

      var windowLoc = $(location).attr('pathname');
      if(windowLoc.search('landings-app-saas') !== -1){
        $('#app_saas_footer').removeClass('d-none');
      }
      else if(windowLoc.search('landings-app-workflow') !== -1){
        $('#app_workflow_footer').removeClass('d-none');
      }
      else if(windowLoc.search('web/login') !== -1){
        $('#header').addClass('d-none');
        $('#agency_footer').addClass('d-none');
        $('#header_login').removeClass('d-none');
      }
      else{
        $('#agency_footer').removeClass('d-none');
      }
});
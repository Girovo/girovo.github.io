$(() => {
  const dropdown = $('.dropdown');
  const dropdownToggle = $('.dropdown-toggle');
  const dropdownMenu = $('.dropdown-menu');
  const showClass = 'show';

  $(window).on('load resize', function () {
    if (this.matchMedia('(min-width: 768px)').matches) {
      dropdown.hover(
        function () {
          const self = $(this);
          self.addClass(showClass);
          self.find(dropdownToggle).attr('aria-expanded', 'true');
          self.find(dropdownMenu).addClass(showClass);
        },
        function () {
          const self = $(this);
          self.removeClass(showClass);
          self.find(dropdownToggle).attr('aria-expanded', 'false');
          self.find(dropdownMenu).removeClass(showClass);
        }
      );
    } else {
      dropdown.off('mouseenter mouseleave');
    }
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $('#back-to-top').fadeIn();
    } else {
      $('#back-to-top').fadeOut();
    }
  });

  // Smooth on external page
  $(function () {
    setTimeout(function () {
      if (location.hash) {
        /* we need to scroll to the top of the window first, because the browser will always jump to the anchor first before JavaScript is ready, thanks Stack Overflow: http://stackoverflow.com/a/3659116 */
        window.scrollTo(0, 0);
        target = location.hash.split('#');
        smoothScrollTo($('#' + target[1]));
      }
    }, 1);

    // taken from: https://css-tricks.com/snippets/jquery/smooth-scrolling/
    $('a[href*=\\#]:not([href=\\#])').click(function () {
      if (
        location.pathname.replace(/^\//, '') ==
          this.pathname.replace(/^\//, '') &&
        location.hostname == this.hostname
      ) {
        smoothScrollTo($(this.hash));
        return false;
      }
    });

    function smoothScrollTo(target) {
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

      if (target.length) {
        $('html,body').animate(
          {
            scrollTop: target.offset().top,
          },
          1000
        );
      }
    }
  });

  // Hide Header on on scroll down
  let didScroll;
  let lastScrollTop = 0;
  let delta = 5;
  let navbarHeight = $('nav').outerHeight();

  $(window).scroll((e) => (didScroll = true));

  setInterval(() => {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

  function hasScrolled() {
    var st = $(this).scrollTop();

    // Make sure they scroll more than delta
    if (Math.abs(lastScrollTop - st) <= delta) return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight) {
      // Scroll Down
      $('nav').removeClass('nav-down').addClass('nav-up');
      $('.nav-up').css('top', -$('nav').outerHeight() + 'px');
    } else {
      // Scroll Up
      if (st + $(window).height() < $(document).height()) {
        $('nav').removeClass('nav-up').addClass('nav-down');
        $('.nav-up, .nav-down').css('top', '0px');
      }
    }

    lastScrollTop = st;
  }

  $('.site-content').css('margin-top', $('header').outerHeight() + 'px');

  // scroll body to 0px on click
  $('#back-to-top').click(function () {
    $('body,html').animate(
      {
        scrollTop: 0,
      },
      400
    );
    return false;
  });
});

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

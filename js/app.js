function initSlideNavigation() {
  const buttonOpenNav = document.querySelector('.button__open-nav'),
    buttonCloseNav = document.querySelector('.button__close-nav'),
    header = document.querySelector('.header'),
    headerActive = header.querySelector('.header--active'),
    headerDefault = header.querySelector('.header--default'),
    headerActiveChilds = document.querySelectorAll('.header--active > *'),
    headerActiveBrandmark = CSSRulePlugin.getRule('.header--active::after');

  let navOpen = false,
    updateNavStatus;

  function addCloseListener() {
    document.addEventListener('keydown', closeNavigation);
    buttonCloseNav.addEventListener('click', closeNavigation);
  }

  function openNavigation() {
    function headerPosition(el) {
      const travelDistance = 0.8;
      let width = window.getComputedStyle(el).width,
        xValue = Math.round(parseInt(width, 10) * travelDistance);

      return xValue;
    }

    tlOpenNav
      .call(() => {
        header.classList.add('is-active');
        headerActive.hidden = false;
        updateNavStatus = !navOpen;
        buttonOpenNav.setAttribute('aria-expanded', updateNavStatus);
      })
      .add('slideIn', null)
      .to(headerActive, { duration: 1.4, xPercent: 100 }, 'slideIn')
      .to(
        headerDefault,
        { duration: 1.4, x: () => headerPosition(header) },
        'slideIn'
      )
      .from(headerActiveChilds, { duration: 1, x: -80 }, 'slideIn+=.3')
      .fromTo(
        headerActiveBrandmark,
        { right: '-6.5rem' },
        { duration: 0.7, right: '-4rem' },
        'slideIn+=.6'
      )
      .call(() => {
        navOpen = true;
      });
  }

  function closeNavigation(e) {
    if (e.type === 'keydown') {
      let keyCode = e.keyCode === 27;
      if (!keyCode) return;
    }

    tlCloseNav
      .call(() => {
        updateNavStatus = !navOpen;
        buttonOpenNav.setAttribute('aria-expanded', updateNavStatus);
        navOpen = false;
      })
      .add('slideOut', null)
      .to(headerActive, { duration: 1, xPercent: 0 }, 'slideOut')
      .to(headerDefault, { duration: 0.9, x: 0 }, 'slideOut+=.1')
      .fromTo(
        headerActiveBrandmark,
        { right: '-4rem' },
        {
          right: '-6.5rem',
          duration: 0.6,
        },
        'slideOut'
      )
      .call(() => {
        headerActive.hidden = true;
        header.classList.remove('is-active');
      });

    document.removeEventListener('keydown', closeNavigation);
  }

  // GSAP Timelines
  const tlOpenNav = gsap.timeline({
    defaults: { ease: 'power3.out' },
    onComplete: () => addCloseListener(),
  });

  const tlCloseNav = gsap.timeline({
    defaults: { ease: 'power1.in' },
  });

  // Event Listeners
  buttonOpenNav.addEventListener('click', openNavigation);
}

function init() {
  initSlideNavigation();
}

window.addEventListener('load', function () {
  init();
});

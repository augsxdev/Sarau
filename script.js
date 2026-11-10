const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-nav');
const video = document.querySelector('.hero__video');
const playback = document.querySelector('.hero__playback');
const bookingForm = document.querySelector('.booking-form');
const formNote = document.querySelector('.form-note');
const dateInput = document.querySelector('input[name="date"]');

if (menuButton && navigation) {
  document.documentElement.classList.add('has-menu');
  const mobile = window.matchMedia('(max-width: 720px)');

  const setMenu = (open) => {
    menuButton.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-open', open);
    navigation.inert = mobile.matches && !open;
  };

  setMenu(false);
  mobile.addEventListener('change', () => setMenu(false));
  menuButton.addEventListener('click', () => {
    setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
  });

  navigation.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link || !mobile.matches) return;
    const target = document.querySelector(link.hash);
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
    setMenu(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || menuButton.getAttribute('aria-expanded') !== 'true') return;
    menuButton.focus();
    setMenu(false);
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.site-header')) setMenu(false);
  });
}

if (video && playback) {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const syncPlayback = () => {
    playback.textContent = video.paused ? 'Continuar animação' : 'Pausar animação';
  };

  const showPoster = () => {
    video.classList.remove('is-playing');
    playback.hidden = true;
  };

  const play = async () => {
    if (motion.matches) return;
    if (!video.hasAttribute('src')) video.src = video.dataset.src;
    try {
      await video.play();
    } catch {
      if (video.paused) showPoster();
    }
  };

  video.addEventListener('playing', () => {
    if (motion.matches) {
      video.pause();
      return;
    }
    video.classList.add('is-playing');
    playback.hidden = false;
    syncPlayback();
  });
  video.addEventListener('pause', syncPlayback);
  video.addEventListener('error', showPoster);

  playback.addEventListener('click', () => {
    if (video.paused) play();
    else video.pause();
  });

  motion.addEventListener('change', () => {
    if (motion.matches) {
      video.pause();
      showPoster();
    } else {
      play();
    }
  });
  play();
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('has-entered');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.12 });

  document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));
}

if (dateInput) {
  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60_000)
    .toISOString()
    .slice(0, 10);
  dateInput.min = localDate;
}

if (bookingForm && formNote) {
  bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!bookingForm.reportValidity()) return;
    formNote.textContent = 'Dados preenchidos. O envio será concluído quando o canal oficial de reservas estiver conectado.';
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

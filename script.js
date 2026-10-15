const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-nav');
const video = document.querySelector('.hero__video');
const bookingForm = document.querySelector('.booking-form');
const formNote = document.querySelector('.form-note');
const dateInput = document.querySelector('input[name="date"]');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    navigation.classList.toggle('is-open', !isOpen);
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      menuButton.setAttribute('aria-expanded', 'false');
      navigation.classList.remove('is-open');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      menuButton.setAttribute('aria-expanded', 'false');
      navigation.classList.remove('is-open');
    }
  });
}

if (video && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  video.pause();
  video.removeAttribute('autoplay');
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

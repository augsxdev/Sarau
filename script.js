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

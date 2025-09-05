$(document).ready(function() {
  function navigateTo(page) {
    $('#page-overview, #page-drivers, #page-violations').addClass('hidden');

    $('.nav-link')
      .removeClass('bg-[#084a9e] text-white')
      .addClass('text-blue-100 hover:bg-[#084a9e] hover:text-white')
      .find('span:first-child')
      .addClass('hidden');

    $(`#page-${page}`).removeClass('hidden');

    $(`#nav-${page}`)
      .addClass('bg-[#084a9e] text-white')
      .removeClass('text-blue-100 hover:bg-[#084a9e] hover:text-white')
      .find('span:first-child')
      .removeClass('hidden');
  }

  function useGPS() {
    const $locationInput = $('#location');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          $locationInput.val(`${lat.toFixed(5)}, ${lon.toFixed(5)}`);
        },
        () => {
          $locationInput.val('40.7128, -74.0060');
          alert('Could not get your location. Using a default location.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
      $locationInput.val('Geolocation not supported');
    }
  }

  navigateTo('overview');

  // Expose functions globally if needed
  window.navigateTo = navigateTo;
  window.useGPS = useGPS;
});
const authToken = localStorage.getItem("authToken");
const payloadBase64 = authToken.split('.')[1];           // take the middle part
const decoded = JSON.parse(atob(payloadBase64));     // decode Base64 → JSON


$(document).ready(function() {

    $("#sidebar-profile-name").text(decoded.sub);
    $(".text-xs.text-blue-200").text(decoded.role);

  // Mobile sidebar toggle
  const $mobileSidebar = $('#mobile-sidebar');
  const $mobileOverlay = $('#mobile-overlay');
  const $mobileMenuBtn = $('#mobile-menu-button');
  const $mobileCloseBtn = $('#mobile-close-button');
    let CurrentPage;

    function openMobile() {
    $mobileSidebar.removeClass('-translate-x-full');
    $mobileOverlay.removeClass('pointer-events-none').addClass('opacity-100');
    $mobileMenuBtn.attr('aria-expanded', 'true');
    $('body').addClass('overflow-hidden');
  }
  function closeMobile() {
    $mobileSidebar.addClass('-translate-x-full');
    $mobileOverlay.addClass('pointer-events-none').removeClass('opacity-100');
    $mobileMenuBtn.attr('aria-expanded', 'false');
    $('body').removeClass('overflow-hidden');
  }
  window.__closeMobile = closeMobile;

  $mobileMenuBtn.on('click', openMobile);
  $mobileCloseBtn.on('click', closeMobile);
  $mobileOverlay.on('click', closeMobile);
  $(document).on('keydown', function(e){ if(e.key === 'Escape') closeMobile(); });
  function navigateTo(page) {
    $('#page-overview, #page-drivers, #page-violations, #page-points, #page-reports,#page-notifications,#page-report').addClass('hidden');

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



    if (page === 'drivers' && PageFunctions.loadDrivers) {
        PageFunctions.loadDrivers();
    }else if (page === 'violations' && PageFunctions.loadViolation) {
        PageFunctions.loadViolation();
    }
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
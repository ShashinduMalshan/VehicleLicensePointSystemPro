$(document).ready(function () {
    // Toggle password show/hide
    $('.btn-show-password').on('click', function () {
        const targetId = $(this).data('target');
        const $input = $('#' + targetId);
        if ($input.attr('type') === 'password') {
            $input.attr('type', 'text');
            $(this).text('HIDE');
        } else {
            $input.attr('type', 'password');
            $(this).text('SHOW');
        }
    });

    const $loginForm = $('#login-form');
    const $signupForm = $('#signup-form');

    // Switch to signup
    $('#show-signup').on('click', function (e) {
        e.preventDefault();
        $loginForm.addClass('d-none');
        $signupForm.removeClass('d-none');
    });

    // Switch to login
    $('#show-login').on('click', function (e) {
        e.preventDefault();
        $signupForm.addClass('d-none');
        $loginForm.removeClass('d-none');
    });

    // Handle login form submission
    $('#login-form-element').on('submit', function (e) {
        e.preventDefault();
        const $form = $(this);
        const username = $form.find('input[type="text"]').val();
        const password = $form.find('input[type="password"]').val();

        $form.find('button[type="submit"]').prop('disabled', true).text('Signing In...');

        $.ajax({
            url: 'http://localhost:8080/api/v1/auth/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                username: username,
                password: password,
            }),

            success: function (response) {

                $form.find('button[type="submit"]').prop('disabled', false).text('Sign In');

                if (response.status === 200 && response.data && response.data.token) {
                    localStorage.setItem('authToken', response.data.token);

                    alert('Login successful!');
                    window.location.href = '../Pages/DashBord.html';
                } else {
                    alert('Login failed: ' + (response.message || 'Invalid credentials'));
                }
            },
            error: function (xhr) {
                $form.find('button[type="submit"]').prop('disabled', false).text('Sign In');
                const errorMessage = xhr.responseJSON && xhr.responseJSON.message
                    ? xhr.responseJSON.message
                    : 'An error occurred. Please try again.';
                alert('Login error: ' + errorMessage);
            }
        });
    });

    // Handle signup form submission
    $('#signup-form-element').on('submit', function (e) {
        e.preventDefault();
        const $form = $(this);
        const fullName = $form.find('input[placeholder="Full Name"]').val();
        const email = $form.find('input[type="email"]').val();
        const password = $form.find('#signup-password').val();
        const confirmPassword = $form.find('#confirm-password').val();
        const $errorDiv = $('#password-match-error');

        // Validate password matching
        if (password !== confirmPassword) {
            $errorDiv.removeClass('d-none');
            return;
        } else {
            $errorDiv.addClass('d-none');
        }

        // Show loading state
        $form.find('button[type="submit"]').prop('disabled', true).text('Signing Up...');

        $.ajax({
            url: 'http://localhost:8080/api/v1/auth/register',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                username: fullName,
                userEmail: email,
                password: password
            }),
            success: function (response) {
                $form.find('button[type="submit"]').prop('disabled', false).text('Sign Up');

                if (response.status === 200) {
                    alert('Signup successful! Please sign in to continue.');

                    $signupForm.addClass('d-none');
                    $loginForm.removeClass('d-none');
                } else {
                    alert('Signup failed: ' + (response.message || 'Unable to create account'));
                }
            },
            error: function (xhr) {
                $form.find('button[type="submit"]').prop('disabled', false).text('Sign Up');
                const errorMessage = xhr.responseJSON && xhr.responseJSON.message
                    ? xhr.responseJSON.message
                    : 'An error occurred. Please try again.';
                alert('Signup error: ' + errorMessage);
            }
        });
    });

    // Handle google login form submission
    // Handle Google login button click
    $('#google_login').on('click', function (e) {
        e.preventDefault();
        // Redirect user to Spring Boot Google OAuth2 endpoint
        window.location.href = "http://localhost:8080/oauth2/authorization/google";

                // Get token from URL query params
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const email = params.get("email");
        const role = params.get("role");

        if (token) {
            // Save token in localStorage for future API calls
            localStorage.setItem("authToken", token);
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userRole", role);
            window.location.href = '../Pages/DashBord.html';

            // Remove token from URL for cleanliness
            window.history.replaceState({}, document.title, window.location.pathname);

        }

    });

});

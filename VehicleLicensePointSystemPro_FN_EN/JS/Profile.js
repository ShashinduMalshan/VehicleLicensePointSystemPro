const userName = decoded.sub;
const userEmail = decoded.email;
const userRole = decoded.role;

$(document).ready(function () {
    $('#profile-name').val(userName);
    $('#profile-email').val(userEmail);
});

const $passwordModal = $('#password-confirm-modal');
const $modalPasswordField = $('#modal-current-password');
const $modalError = $('#modal-error');
let pendingNewName = '';

// --- Show/Hide Password Modal ---
function showPasswordModal() {
    $modalPasswordField.val('');
    $modalError.addClass('hidden').text('');
    $passwordModal.removeClass('hidden');
    $modalPasswordField.focus();
}
function hidePasswordModal() {
    $passwordModal.addClass('hidden');
    pendingNewName = '';
}

// --- Handle username submit ---
$('#submit-userName').on('click', function (e) {
    e.preventDefault();
    const newName = $('#profile-name').val().trim();
    if (newName === userName) {
        alert('Profile name is already set.');
        return;
    }
    pendingNewName = newName;
    showPasswordModal();
});

// --- Confirm password before change ---
$('#modal-confirm-button').on('click', function () {
    const password = $modalPasswordField.val();
    if (!password) {
        $modalError.text('Password is required.').removeClass('hidden');
        return;
    }

    const userCredentials = { username: userName, password };

    $.ajax({
        url: "http://localhost:8080/api/v1/user/checkPassword",
        method: "POST",
        headers: { "Authorization": "Bearer " + token },
        contentType: 'application/json',
        data: JSON.stringify(userCredentials),
        success: function (response) {
            if (response.status === 200) {
                updateUserName();
            }
        },
        error: function (xhr) {
            if (xhr.status === 401) {
                console.log(xhr.status === 401)
                $modalError.text("Invalid password").removeClass("hidden");
            }
        }
    });
});

// --- Update username after password check ---
function updateUserName() {
    $.ajax({
        url: "http://localhost:8080/api/v1/user/username/" + userName + "?newUsername=" + pendingNewName,
        method: "PUT",
        headers: { "Authorization": "Bearer " + token },
        success: function () {
            $('#sidebar-profile-name').text(pendingNewName);
            hidePasswordModal();
            alert('Profile updated successfully Logging Again As ' + $('#profile-name'));
            window.location.href = '../Pages/sing_in_And_Sing_up.html';
        }
    });
}

// --- Handle cancel button ---
$('#modal-cancel-button').on('click', hidePasswordModal);

// --- Add new admin to list ---
$('#add-admin-form').on('submit', function (e) {
    e.preventDefault();
    const name = $('#admin-name').val().trim();
    const email = $('#admin-email').val().trim();
    if (!name || !email) {
        alert('Please provide both name and email.');
        return;
    }

    const userHash = email.split('').reduce((acc, c) => c.charCodeAt(0) + ((acc << 5) - acc), 0);
    $('#admin-list').append(`
        <li class="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div class="flex items-center">
                <img class="h-10 w-10 rounded-full object-cover" src="https://i.pravatar.cc/150?u=${userHash}" alt="${name} avatar">
                <div class="ml-3">
                    <p class="text-sm font-semibold text-slate-800">${name}</p>
                    <p class="text-xs text-slate-500">${email}</p>
                </div>
            </div>
            <button class="text-sm font-medium text-red-600 hover:text-red-800">Remove</button>
        </li>
    `);

    $('#admin-name, #admin-email').val('');
});

$('#submitPassword').on('click', function (e) {
   console.log("submitPassword");

   const currentPassword = $('#current-password').val();
    const newPassword = $('#new-password').val();
    const confirmPassword = $('#confirm-password').val();

    console.log(currentPassword, newPassword, confirmPassword);

    if (!currentPassword || !newPassword || !confirmPassword) {
        $modalError.text("All fields are required").removeClass("hidden");
        return; // stop execution if any field is empty
    }

    if (newPassword !== confirmPassword) {
        $modalError.text("New password and confirm password do not match").removeClass("hidden");
        return;
    }

    let pass ={
         username: userName,
         oldPassword: currentPassword,
         newPassword: newPassword
    }

    // if everything is valid → call AJAX
    $.ajax({
        url: "http://localhost:8080/api/v1/user/changePass",
        method: "PUT",
        headers: {
            "Authorization": "Bearer " + token
        },
        contentType: 'application/json',
        data: JSON.stringify(pass),
        success: function (response) {
            if (response.status === 200) {
                alert("Password updated successfully");
                window.location.href = '../Pages/sing_in_And_Sing_up.html';
            }
        },
        error: function (xhr) {
            if (xhr.status === 401) {
                console.log(xhr.status === 401)
                $modalError.text("Invalid password").removeClass("hidden");
            }
        }
    });

});


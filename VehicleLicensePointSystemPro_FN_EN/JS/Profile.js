// ==========================
// USER PROFILE VARIABLES
// ==========================
const userName = decoded.sub;
const userEmail = decoded.email;
const userRole = decoded.role;
let pendingAction = null;        // "updateName" | "addAdmin"
let pendingNewName = '';
let officerToAdd = null;
let availableOfficers = [];
let adminSearchInitialized = false;

// Cache DOM
const $passwordModal = $('#password-confirm-modal');
const $modalPasswordField = $('#modal-current-password');
const $modalError = $('#modal-error');

// ==========================
// INITIAL SETUP
// ==========================
$(document).ready(function () {
    $('#profile-name').val(userName);
    $('#profile-email').val(userEmail);

    initializeOfficers();
    setupAdminSearch();
    loadAdmins();
});

// ==========================
// PASSWORD MODAL
// ==========================
function showPasswordModal(action) {
    pendingAction = action;
    $modalPasswordField.val('');
    $modalError.addClass('hidden').text('');
    $passwordModal.removeClass('hidden').addClass('flex');
    $modalPasswordField.focus();
}

function hidePasswordModal() {
    $passwordModal.addClass('hidden').removeClass('flex');
    $modalPasswordField.val('');
    $modalError.addClass('hidden').text('');
    pendingAction = null;
    pendingNewName = '';
    officerToAdd = null;
}

// Cancel modal
$('#modal-cancel-button').on('click', hidePasswordModal);

// Outside click/escape close
$('#password-confirm-modal').on('click', e => {
    if ($(e.target).is('#password-confirm-modal')) hidePasswordModal();
});
$(document).on('keydown', e => { if (e.key === 'Escape') hidePasswordModal(); });

// ==========================
// USERNAME CHANGE
// ==========================
$('#submit-userName').on('click', function (e) {
    e.preventDefault();
    const newName = $('#profile-name').val()?.trim();

    if (!newName) {
        alert('Name cannot be empty.');
        return;
    }
    if (newName === userName) {
        alert('Profile name is already set.');
        return;
    }

    pendingNewName = newName;
    showPasswordModal("updateName");
});

// ==========================
// PASSWORD CONFIRM (Shared)
// ==========================
$('#modal-confirm-button').on('click', function () {
    const password = $modalPasswordField.val();
    if (!password) {
        $modalError.text('Password is required.').removeClass('hidden');
        return;
    }

    const creds = { username: userName, password };

    $.ajax({
        url: "http://localhost:8080/api/v1/user/checkPassword",
        method: "POST",
        headers: { "Authorization": "Bearer " + token },
        contentType: 'application/json',
        data: JSON.stringify(creds),
        success: function (response) {
            if (response.status === 200) {
                if (pendingAction === "updateName") {
                    updateUserName();
                } else if (pendingAction === "addAdmin") {
                    confirmAddAdmin();
                }
            }
        },
        error: function (xhr) {
            if (xhr.status === 401) {
                $modalError.text("Invalid password").removeClass("hidden");
            }
        }
    });
});

// ==========================
// UPDATE USERNAME
// ==========================
function updateUserName() {
    $.ajax({
        url: `http://localhost:8080/api/v1/user/username/${userName}?newUsername=${pendingNewName}`,
        method: "PUT",
        headers: { "Authorization": "Bearer " + token },
        success: function () {
            $('#sidebar-profile-name').text(pendingNewName);
            hidePasswordModal();
            alert(`Profile updated successfully. Logging in again as ${pendingNewName}`);
            window.location.href = '../Pages/sing_in_And_Sing_up.html';
        }
    });
}

// ==========================
// PASSWORD CHANGE
// ==========================
$('#submitPassword').on('click', function () {
    const currentPassword = $('#current-password').val();
    const newPassword = $('#new-password').val();
    const confirmPassword = $('#confirm-password').val();

    if (!currentPassword || !newPassword || !confirmPassword) {
        $modalError.text("All fields are required").removeClass("hidden");
        return;
    }
    if (newPassword !== confirmPassword) {
        $modalError.text("New password and confirm password do not match").removeClass("hidden");
        return;
    }

    const pass = { username: userName, oldPassword: currentPassword, newPassword: newPassword };

    $.ajax({
        url: "http://localhost:8080/api/v1/user/changePass",
        method: "PUT",
        headers: { "Authorization": "Bearer " + token },
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
                $modalError.text("Invalid password").removeClass("hidden");
            }
        }
    });
});

// ==========================
// LOAD ADMINS
// ==========================
function loadAdmins() {
    $.ajax({
        url: "http://localhost:8080/api/v1/user/getAdmins",
        method: "GET",
        headers: { "Authorization": "Bearer " + token },
        success: function (admins) {
            const $list = $("#admin-list").empty();
            admins.forEach(admin => {
                const userHash = admin.userEmail.split('').reduce(
                    (acc, char) => char.charCodeAt(0) + ((acc << 5) - acc),
                    0
                );

                $list.append(`
                    <li class="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div class="flex items-center">
                            <img class="h-10 w-10 rounded-full object-cover" 
                                 src="https://i.pravatar.cc/150?u=${userHash}" 
                                 alt="${admin.username} avatar">
                            <div class="ml-3">
                                <p class="text-sm font-semibold text-slate-800">${admin.username}</p>
                                <p class="text-xs text-slate-500">${admin.userEmail}</p>
                            </div>
                        </div>
                        <button class="remove-admin text-sm font-medium text-red-600 hover:text-red-800">Remove</button>
                    </li>
                `);
            });
        }
    });
}

// ==========================
// OFFICER SEARCH
// ==========================
function initializeOfficers() {
    $.ajax({
        url: "http://localhost:8080/api/v1/user/getOfficer",
        method: "GET",
        headers: { "Authorization": "Bearer " + token },
        success: function (officers) {
            availableOfficers = officers;
        }
    });
}

function renderOfficerOptions(officersList) {
    const $container = $('#admin-options-container').empty();
    if (officersList.length === 0) {
        $container.append('<div class="px-3 py-2 text-sm text-slate-500">No officers found.</div>');
        return;
    }
    officersList.forEach(officer => {
        const option = $('<div class="px-3 py-2 text-sm text-slate-700 cursor-pointer hover:bg-slate-100" tabindex="0"></div>');
        option.text(`${officer.username} (ID: ${officer.officerId})`);
        option.data('officer', officer);
        $container.append(option);
    });
}

function setupAdminSearch() {
    if (adminSearchInitialized) return;

    $('#admin-search').on('focus', () => {
        renderOfficerOptions(availableOfficers);
        $('#admin-options-container').removeClass('hidden');
    });

    $('#admin-search').on('input', function () {
        const searchTerm = $(this).val().toLowerCase();
        $('#selected-officer-data').val('');
        const filtered = availableOfficers.filter(o =>
            (o.username && o.username.toLowerCase().includes(searchTerm)) ||
            (String(o.officerId).toLowerCase().includes(searchTerm)) ||
            (o.email && o.email.toLowerCase().includes(searchTerm))
        );
        renderOfficerOptions(filtered);
        $('#admin-options-container').removeClass('hidden');
    });

    $('#admin-options-container').on('click', 'div', function () {
        const officerData = $(this).data('officer');
        if (officerData) {
            $('#admin-search').val(`${officerData.username} (ID: ${officerData.officerId})`);
            $('#selected-officer-data').val(JSON.stringify(officerData));
            $('#admin-options-container').addClass('hidden');
        }
    });

    $(document).on('click', function (e) {
        const $form = $('#add-admin-form');
        if (!$form.is(e.target) && $form.has(e.target).length === 0) {
            $('#admin-options-container').addClass('hidden');
        }
    });

    adminSearchInitialized = true;
}

// ==========================
// ADD ADMIN
// ==========================
$('#submitAdmin').on('click', function (e) {
    e.preventDefault();
    const selectedOfficerVal = $('#selected-officer-data').val();
    if (!selectedOfficerVal) {
        alert('Please select an officer from the list.');
        return;
    }
    officerToAdd = JSON.parse(selectedOfficerVal);
    showPasswordModal("addAdmin");
});

function confirmAddAdmin() {
    if (!officerToAdd) return;

    $.ajax({
        url: "http://localhost:8080/api/v1/user/addAdmins",
        method: "PUT",
        headers: { "Authorization": "Bearer " + token },
        contentType: "application/json",
        data: JSON.stringify(officerToAdd),
        success: function () {
            hidePasswordModal();
            alert("Administrator added successfully!");
            loadAdmins(); // reload list
        }
    });
}

// ==========================
// REMOVE ADMIN
// ==========================
$('#admin-list').on('click', '.remove-admin', function () {
    const email = $(this).closest('li').find('.text-xs').text();

    $.ajax({
        url: `http://localhost:8080/api/v1/user/removeAdmin?email=${encodeURIComponent(email)}`,
        method: "DELETE",
        headers: { "Authorization": "Bearer " + token },
        success: function () {
            alert("Administrator removed successfully!");
            loadAdmins();
        }
    });
});

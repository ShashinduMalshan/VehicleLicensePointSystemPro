let suspendedListenersReady = false;
let trainingListenersReady = false;

let suspensionChart = null;
let currentDriverId = null;
let allSuspendedDrivers = [];

function initializeSuspendedPage() {
    const token = localStorage.getItem("authToken");

    $.ajax({
        url: "http://localhost:8080/api/v1/suspend/all",
        method: "GET",
        headers: { "Authorization": "Bearer " + token },
        dataType: "json",
        success: function(data) {
            console.log(data); // check what the backend returns

            // Use the array inside `content` if pagination is used
            allSuspendedDrivers = Array.isArray(data) ? data : data.content || [];

            renderSuspendedDriverList(allSuspendedDrivers);
            renderSuspensionChart();
            setupSuspendedPageListeners();
        },
        error: function(xhr, status, error) {
            console.error("Error fetching suspended drivers:", status, error);
        }
    });
}

function renderSuspendedDriverList(drivers) {
    console.log("drivers");
    const $list = $('#suspended-driver-list');
    $list.empty();

    if (!drivers || drivers.length === 0) {
        $list.append('<div class="p-4 text-center text-sm text-slate-500">No matching cases found.</div>');
        return;
    }

    drivers.forEach(driver => {
        const itemHtml = `
            <div class="flex items-center p-3 rounded-lg cursor-pointer hover:bg-sky-50 transition-colors" data-driver-id="${driver.id}">
                <img class="h-10 w-10 rounded-full object-cover" src="${driver.photo}" alt="${driver.name}">
                <div class="ml-3">
                    <p class="text-sm font-semibold text-slate-800">${driver.name}</p>
                    <p class="text-xs text-slate-500">${driver.drivingLicNum} &bull; Suspended: ${driver.suspensionDate}</p>
                </div>
            </div>
        `;
        $list.append(itemHtml);
    });

}

function renderDriverDetail(driver) {
    if (!driver) return;
    currentDriverId = driver.id;

    $('#detail-pane-placeholder').addClass('hidden');
    const $content = $('#detail-pane-content');
    $content.removeClass('hidden');

    // Header
    $('#detail-driver-img').attr('src', driver.photo);
    $('#detail-driver-name').text(driver.name);
    $('#detail-driver-license').text(driver.drivingLicNum);
    $('#detail-driver-reason').text(driver.reason);

    // Triggering violation
    const $violation = $('#detail-violation');
    $violation.empty();
    if (driver.triggeringViolation) {
        const v = driver.triggeringViolation;
        const violationHtml = `
            <p class="text-sm"><strong class="font-semibold text-slate-600">Violation:</strong> <span class="text-red-700 font-bold">${v.type}</span></p>
            <p class="text-sm"><strong class="font-semibold text-slate-600">Date:</strong> ${v.date}</p>
            <p class="text-sm"><strong class="font-semibold text-slate-600">Details:</strong> Added ${v.points} points, reported by Officer #${v.officerId}.</p>
        `;
        $violation.html(violationHtml);
    }

    const $timeline = $('#detail-timeline');
    $timeline.empty();
    if (Array.isArray(driver.timeline)) {
        driver.timeline.forEach(item => {
            const itemHtml = `
                <div class="relative">
                    <div class="absolute -left-[2.1rem] top-1 h-4 w-4 bg-[#0a58ca] rounded-full border-4 border-white"></div>
                    <p class="text-sm font-semibold text-slate-800">${item.event}</p>
                    <p class="text-xs text-slate-500">${item.date}</p>
                </div>`;
            $timeline.append(itemHtml);
        });
    }

    renderCommLog(driver);


$.ajax({
         url: `http://localhost:8080/api/v1/violation/driver/${driver.drivingLicNum}?page=0&size=10`,
         method: "GET",
         headers: {"Authorization": "Bearer " + token},
         success: function (response) {
             $('#suspendTbody').empty();

             response.forEach(function(violation) {
                let row = `
                    <tr style="border-bottom:1px solid #ddd;">
                        <td style="padding:10px 15px;">${violation.driver}</td>
                        <td style="padding:10px 15px;">${violation.revenueLic}</td>
                        <td style="padding:10px 15px;">${violation.officerId}</td>
                        <td style="padding:10px 15px;">${violation.violationTime}</td>
                        <td style="padding:10px 15px;">${violation.violationDate}</td>
                        <td style="padding:10px 15px;">${violation.location}</td>
                        <td style="padding:10px 15px;">${violation.description}</td>
                        <td style="padding:10px 15px;">${violation.lawId}</td>
                        
                         
                    </tr>`;
                $('#suspendTbody').append(row);
            });
                     }
     })


}

function renderCommLog(driver) {
    const $commLog = $('#detail-comm-log');
    $commLog.empty();
    if (!Array.isArray(driver.communications) || driver.communications.length === 0) {
        $commLog.append('<div class="p-4 text-center text-sm text-slate-400">No communication logged.</div>');
        return;
    }

    [...driver.communications].reverse().forEach(item => {
        const itemHtml = `
            <div class="p-2.5 bg-slate-50 rounded-md">
                <p class="text-sm text-slate-700">${item.note}</p>
                <p class="text-xs text-slate-500 text-right mt-1">${item.date}</p>
            </div>`;
        $commLog.append(itemHtml);
    });
}

function renderSuspensionChart() {
    if (!Array.isArray(allSuspendedDrivers) || allSuspendedDrivers.length === 0) return;

    const reasons = allSuspendedDrivers.reduce((acc, driver) => {
        acc[driver.reason] = (acc[driver.reason] || 0) + 1;
        return acc;
    }, {});
    const chartData = {
        labels: Object.keys(reasons),
        datasets: [{
            data: Object.values(reasons),
            backgroundColor: ['#ef4444', '#f59e0b', '#3b82f6', '#6b7280'],
            hoverOffset: 4
        }]
    };
    const ctx = document.getElementById('suspension-reasons-chart').getContext('2d');
    if (suspensionChart) suspensionChart.destroy();
    suspensionChart = new Chart(ctx, {
        type: 'doughnut',
        data: chartData,
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, padding: 15, font: {size: 11} } } } }
    });
}

function setupSuspendedPageListeners() {
    if (suspendedListenersReady) return;

    function applyFilters() {
        const searchTerm = $('#suspended-search-input').val().toLowerCase();
        const reasonFilter = $('#suspension-reason-filter').val();

        const filteredDrivers = allSuspendedDrivers.filter(driver => {
            const matchesSearch = driver.name.toLowerCase().includes(searchTerm) || driver.drivingLicNum.toLowerCase().includes(searchTerm);
            const matchesReason = reasonFilter === 'all' || driver.reason === reasonFilter;
            return matchesSearch && matchesReason;
        });

        renderSuspendedDriverList(filteredDrivers);
        $('#detail-pane-placeholder').removeClass('hidden');
        $('#detail-pane-content').addClass('hidden');
        currentDriverId = null;
    }

    $('#suspended-search-input').on('keyup', applyFilters);
    $('#suspension-reason-filter').on('change', applyFilters);

    $('#suspended-driver-list').on('click', '[data-driver-id]', function() {
        const driverId = $(this).data('driver-id');
        const driverData = allSuspendedDrivers.find(d => d.id === driverId);
        if (driverData) {
            $('#suspended-driver-list').find('[data-driver-id]').removeClass('bg-sky-100');
            $(this).addClass('bg-sky-100');
            renderDriverDetail(driverData);
        }
    });

    $('#detail-checklist').on('click', '.update-status-btn', function() {
        const itemKey = $(this).data('item-key');
        const driver = allSuspendedDrivers.find(d => d.id === currentDriverId);
        if (driver) {
            const currentStatus = driver.reinstatement_status[itemKey];
            const nextStatus = prompt(`Update status for "${$(this).closest('div').find('.font-medium').text()}" (Current: ${currentStatus}):`, currentStatus);
            if (nextStatus && nextStatus !== currentStatus) {
                driver.reinstatement_status[itemKey] = nextStatus;
                renderDriverDetail(driver);
            }
        }
    });

    $('#add-comm-log-form').on('submit', function(e){
        e.preventDefault();
        const noteInput = $('#comm-log-input');
        const noteText = noteInput.val().trim();
        if (noteText && currentDriverId) {
            const driver = allSuspendedDrivers.find(d => d.id === currentDriverId);
            const now = new Date();
            const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
            driver.communications = driver.communications || [];
            driver.communications.push({date: timestamp, note: noteText});
            renderCommLog(driver);
            noteInput.val('');
        }
    });

    $('#assign-training-btn').on('click', function() {
        if (!currentDriverId) {
        alert('Please select a driver first.');
        return;
    }

    const token = localStorage.getItem("authToken");
    const driver = allSuspendedDrivers.find(d => d.id === currentDriverId);

    if (!driver) return;

    $.ajax({
        url: `http://localhost:8080/api/v1/training/add`,
        method: "POST",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            driverId: driver.drivingLicNum,   // or driver.id depending on backend
            name: driver.name,
            duration: 4,
            suspendedPoint: 5

        }),

        success: function(response) {
            alert(`Driver ${driver.name} assigned to training successfully.`);
            // Optionally update UI here, e.g., mark as assigned
        },
        error: function(xhr, status, error) {
            console.error("Error assigning training:", status, error);
            alert("Failed to assign training. Please try again.");
        }
    });
    });

    suspendedListenersReady = true;
}

// Initialize page
$(document).ready(function() {
    initializeSuspendedPage();
});

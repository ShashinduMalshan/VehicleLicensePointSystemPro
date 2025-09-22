console.log("point.js");

let pointsSystemListenersReady = false;
let lawCurrentPage = 0; // zero-based
const lawsPerPage = 10;

function initializePointsSystemPage() {
    lawCurrentPage = 0;
    loadLawsPage(lawCurrentPage);
    setupPointsSystemListeners();
}

function loadLawsPage(page) {
    const searchTerm = $('#law-search-input').val().trim();
    const token = localStorage.getItem("authToken");

    $.ajax({
        url: `http://localhost:8080/api/v1/law/all?page=${page}&size=${lawsPerPage}`,
        method: "GET",
        headers: { "Authorization": "Bearer " + token },
        dataType: "json",
        success: function (data) {
            console.log("API Response:", data);

            const laws = data.content || [];
            renderLawsTable(laws);

            const totalPages = data.totalPages || 1;
            updateLawPaginationControls(totalPages);

            lawCurrentPage = page;
        },
        error: function (xhr, status, error) {
            console.error("Failed to load laws:", error);
            $('#laws-tbody').html('<tr><td colspan="4" class="text-center p-8 text-red-500">Error loading laws</td></tr>');
        }
    });
}

function renderLawsTable(laws) {
    const $tbody = $('#laws-tbody');
    $tbody.empty();

    if (!laws || laws.length === 0) {
        $tbody.append('<tr><td colspan="4" class="text-center p-8 text-slate-500">No laws found.</td></tr>');
        return;
    }

    laws.forEach(law => {
        $tbody.append(`
            <tr class="border-b border-slate-200 hover:bg-slate-50">
                <td class="px-6 py-4 font-mono text-slate-800">${law.lawId}</td>
                <td class="px-6 py-4">${law.description}</td>
                <td class="px-6 py-4">${law.category || ''}</td>
                <td class="px-6 py-4 text-center font-bold text-lg text-[#0a58ca]">${law.lawPoint}</td>
            </tr>
        `);
    });
}

function updateLawPaginationControls(totalPages) {
    $('#law-page-info').text(`Showing page ${lawCurrentPage + 1} of ${totalPages}`);
    $('#law-prev-btn').prop('disabled', lawCurrentPage === 0);
    $('#law-next-btn').prop('disabled', lawCurrentPage >= totalPages - 1);
}

function setupPointsSystemListeners() {
    if (pointsSystemListenersReady) return;

    // Search input triggers backend reload
    $('#law-search-input').on('keyup', function () {
        lawCurrentPage = 0;
        loadLawsPage(0);
    });

    $('#law-prev-btn').on('click', function () {
        if (lawCurrentPage > 0) loadLawsPage(lawCurrentPage - 1);
    });

    $('#law-next-btn').on('click', function () {
        loadLawsPage(lawCurrentPage + 1);
    });

    pointsSystemListenersReady = true;
}


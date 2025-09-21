window.PageFunctions = window.PageFunctions || {};

(function () {
    let currentPage = 0;
    let pageSize = 15; // number of drivers per page
    let totalPages = 0;

    function updatePaginationInfo() {
        $("#driver-page-info").text(`Page ${currentPage + 1} of ${totalPages}`);
        $("#driver-prev-btn").prop("disabled", currentPage === 0);
        $("#driver-next-btn").prop("disabled", currentPage >= totalPages - 1);
    }

    PageFunctions.loadDrivers = function (page = 0) {
        const token = localStorage.getItem("authToken");

        if (!token) {
            alert("You are not logged in! Please log in first.");
            window.location.href = '../Pages/sing_in_And_Sing_up.html';
            return;
        }

        $.ajax({
            url: `http://localhost:8080/api/v1/driver/all?page=${page}&size=${pageSize}`,
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            },
            success: function (response) {
                // Clear old data
                $('#driverTbody').empty();

                // If using Spring Data Page<T>, response has "content", "totalPages", etc.
                const drivers = response.content || response; // fallback if plain list
                totalPages = response.totalPages || 1;
                currentPage = response.number || page;

                // Loop and render table rows
                drivers.forEach(function (driver) {
                    let statusBadge = '';

                    if (driver.status === "Active") {
                        statusBadge = `<span class="px-2 py-1 font-semibold leading-tight text-xs rounded-full bg-green-100 text-green-800">Active</span>`;
                    } else if (driver.status === "Suspended") {
                        statusBadge = `<span class="px-2 py-1 font-semibold leading-tight text-xs rounded-full bg-red-100 text-red-800">Suspended</span>`;
                    } else if (driver.status === "Probation") {
                        statusBadge = `<span class="px-2 py-1 font-semibold leading-tight text-xs rounded-full bg-yellow-100 text-yellow-800">Probation</span>`;
                    } else {
                        statusBadge = `<span class="px-2 py-1 font-semibold leading-tight text-xs rounded-full bg-gray-100 text-gray-800">${driver.status}</span>`;
                    }

                    let row = `
                        <tr style="border-bottom:1px solid #ddd;">
                            <td style="padding:10px 15px;">${driver.drivingLicNum}</td>
                            <td style="padding:10px 15px;">${driver.name}</td>
                            <td style="padding:10px 15px;">${driver.email}</td>
                            <td style="padding:10px 15px;">${driver.totalPoint}</td>
                            <td style="padding:10px 15px;">${statusBadge}</td>
                            <td>
                                <button class="font-medium text-[#0a58ca] hover:text-[#084a9e]">
                                    View Details
                                </button>
                            </td>
                        </tr>`;

                    $('#driverTbody').append(row);
                });

                // update pagination UI
                updatePaginationInfo();
            },
            error: function (xhr) {
                if (xhr.status === 401) {
                    alert("Your session has expired. Please log in again.");
                    localStorage.removeItem("authToken");
                    window.location.href = '../Pages/sing_in_And_Sing_up.html';
                } else {
                    alert("Failed to load driver list.");
                }
            }
        });
    };

    // attach events
    $("#driver-prev-btn").on("click", function () {
        if (currentPage > 0) {
            PageFunctions.loadDrivers(currentPage - 1);
        }
    });

    $("#driver-next-btn").on("click", function () {
        if (currentPage < totalPages - 1) {
            PageFunctions.loadDrivers(currentPage + 1);
        }
    });

    // initial load
    $(document).ready(function () {
        PageFunctions.loadDrivers(0);
    });

})();

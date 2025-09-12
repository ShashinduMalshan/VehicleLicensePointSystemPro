
window.PageFunctions = window.PageFunctions || {};

    PageFunctions.loadDrivers = function() {

        const token = localStorage.getItem("authToken");
        console.log("driver");
        if (!token) {
            alert("You are not logged in! Please log in first.");
            window.location.href = '../Pages/sing_in_And_Sing_up.html';

        }

        $.ajax({
            url: "http://localhost:8080/api/v1/driver/all",
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            },
            success: function (response) {



                // Clear old data
                $('#driverTbody').empty();

                // Loop through each job and append to a table
                response.forEach(function (driver) {

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
                            <td
                                <button class="font-medium text-[#0a58ca] hover:text-[#084a9e]">
                                View Details</button>
                            </td>
                        </tr>`;

                    $('#driverTbody').append(row);
                });
            },


            error: function (error) {
                console.error("Error loading driver data:", error);
                alert("Failed to load driver list.");
            }
        });
    }
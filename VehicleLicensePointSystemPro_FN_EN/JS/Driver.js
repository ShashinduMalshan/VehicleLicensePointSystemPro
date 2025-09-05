
    loadAllJobs();

    function loadAllJobs() {

        const token = localStorage.getItem("authToken");
        console.log(token);
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
                    let row = `
                <tr>
                    <td>${driver.lic}</td>
                    <td>${driver.name}</td>
                    <td>${driver.email}</td>
                    <td>${driver.total_point}</td>
                    
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
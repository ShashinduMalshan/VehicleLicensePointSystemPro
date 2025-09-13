    const token = localStorage.getItem("authToken");
    window.PageFunctions = window.PageFunctions || {};

    PageFunctions.loadViolation = function() {

        console.log("violation");
        if (!token) {
            alert("You are not logged in! Please log in first.");
            window.location.href = '../Pages/sing_in_And_Sing_up.html';

        }

        $.ajax({
            url: "http://localhost:8080/api/v1/violation/all",
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            },
            success: function (response) {



                // Clear old data
                $('#violationTbody').empty();

                // Loop through each job and append to a table
                response.forEach(function (violation) {

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
                            <td
                                <button class="font-medium text-[#0a58ca] hover:text-[#084a9e]">
                                View Details</button>
                            </td>
                        </tr>`;

                    $('#violationTbody').append(row);
                });
            },


            error: function (error) {
                console.error("Error loading violation data:", error);
                alert("Failed to load violation list.");
            }
        });
    }

    const $lawModal = $('#lawModal');
        const $openLawModalBtn = $('#openLawModalBtn');
        const $closeLawModalBtn = $('#closeLawModal');
        const $lawList = $('#lawList');
        const $lawIdInput = $('#lawId');
        const $lawSearchInput = $('#lawSearchInput');

        function openLawModal() {
            $lawModal.removeClass('hidden').addClass('flex');
            $openLawModalBtn.attr('aria-expanded', 'true');
            $lawSearchInput.val('').trigger('keyup');
            $lawList.scrollTop(0);
            loadLawsFromServer();
            setTimeout(() => $lawSearchInput.focus(), 100);
        }

        function closeLawModal() {
            $lawModal.addClass('hidden').removeClass('flex');
            $openLawModalBtn.attr('aria-expanded', 'false');
            $openLawModalBtn.focus();
        }

        $openLawModalBtn.on('click', openLawModal);
        $closeLawModalBtn.on('click', closeLawModal);
        $lawModal.on('click', function(e) {
            if (e.target === this) {
                closeLawModal();
            }
        });

        $(document).on('keydown', function(e){ if(e.key === 'Escape' && !$lawModal.hasClass('hidden')) closeLawModal(); });

        $lawList.on('click', '.law-item', function() {
            const $this = $(this);
            const lawId = $this.data('law-id');
            const lawName = $this.find('p.font-semibold').text().trim();

            $lawIdInput.val(lawId).trigger('change');
            $openLawModalBtn.find('span').text(lawName);
            $openLawModalBtn.removeClass('text-slate-500').addClass('text-slate-900 font-medium');
            closeLawModal();
        });

        $lawList.on('keydown', '.law-item', function(e) {
           if (e.key === 'Enter' || e.key === ' ') {
               e.preventDefault();
               $(this).click();
           }
        });

        $lawSearchInput.on('keyup', function() {
            const searchTerm = $(this).val().toLowerCase().trim();
            $('#lawList .law-item').each(function() {
                const lawText = $(this).text().toLowerCase();
                if (lawText.includes(searchTerm)) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        });

        function renderLawList(data) {
            $lawList.empty(); // clear old list
            data.forEach(law => {
                const item = $(`
                 <div class="p-3 hover:bg-blue-50 rounded-md cursor-pointer law-item" 
                         data-law-id="${law.lawId}" tabindex="0">
                        <p class="font-semibold text-slate-800">
                            ${law.lawId} - ${law.description}
                        </p>
                        <p class="text-sm text-slate-500">
                            Points: ${law.lawPoint}
                        </p>
                    </div>
                `);
                $lawList.append(item);
            });
        }

        function loadLawsFromServer() {
            $.ajax({
                url: 'http://localhost:8080/api/v1/violation/laws',
                method: 'GET',
                headers: {
                "Authorization": "Bearer " + token
            },
                success: function(data) {
                    renderLawList(data);
                    console.log(data)
                },
                error: function(err) {
                    console.error('Error loading laws:', err);
                    $lawList.html('<p class="text-red-500">Failed to load laws.</p>');
                }
            });
        }


        $('#log-violation').on('click', function (e) {
            console.log("log-violation");
            const officerId = $('#officerId').val().trim();
            const revenueNumber = $('#revenueNumber').val().trim();
            const driverLicense = $('#driverLicense').val().trim();
            const lawId = $('#lawId').val().trim();
            const location = $('#location').val().trim();
            const description = $('#description').val().trim();

              let violationData = {
            officerId : officerId,
            revenueLic:revenueNumber,
            driver : driverLicense,
            lawId : lawId,
            location : location,
            description : description
        };

              $.ajax({
                url: 'http://localhost:8080/api/v1/violation/violations',
                method: 'POST',
                headers: {
                    "Authorization": "Bearer " + token
                },
                data: JSON.stringify(violationData),
                contentType: 'application/json',
                success: function (response) {
                    alert(response +' !');
                },

                error: function (xhr) {
                // This prints the full backend response
                    console.error("Error response:", xhr);
                    let msg = "Failed to save violation.";

                    // If backend returns a JSON with a message
                    if (xhr.responseJSON && xhr.responseJSON.message) {
                        msg = xhr.responseJSON.message;
                    } else if (xhr.responseText) {
                        msg = xhr.responseText; // fallback
                    }

                    alert(msg);
                }
              })


        // Print to console for testing


        });

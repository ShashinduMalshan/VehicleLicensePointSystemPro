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
                },
                error: function(err) {
                    $lawList.html('<p class="text-red-500">Failed to load laws.</p>');
                }
            });
        }


        $('#log-violation').on('click', function (e) {
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

                if (xhr.status === 401) {
                    alert("Your session has expired. Please log in again.");
                    localStorage.removeItem("authToken");
                    window.location.href = '../Pages/sing_in_And_Sing_up.html';
                } else {
                    alert("Failed to load driver list.");
                }
                }
              })




        });

    $(document).ready(function () {
    const $revenueNumberInput = $('#revenueNumber');
    const $driverLicenseInput = $('#driverLicense');
    const $scanModal = $('#scanModal');
    const $scanModalTitle = $('#scanModalTitle');
    const $closeScanBtn = $('#closeScan');
    const $processImageBtn = $('#processImage');
    const $capturePhotoBtn = $('#capturePhoto');
    const $previewImage = $('#preview');
    const $video = $('#video');
    const $scanStatus = $('#scanStatus');
    const $revenueImageUpload = $('#revenueImageUpload');
    const $driverImageUpload = $('#driverImageUpload');
    const $scanRevenueBtn = $('#scanRevenueBtn');
    const $scanDriverLicenseBtn = $('#scanDriverLicenseBtn');
    let worker = null;
    let stream = null;
    let currentInput = null;

    // HTTPS check
    if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
        $scanStatus.text('Error: Processing requires HTTPS or http://localhost. Please use a local server with HTTPS.')
                   .addClass('error');
        $processImageBtn.prop('disabled', true);
        console.error('Non-secure context detected:', location.protocol, location.hostname);
        return;
    }

    // Initialize Tesseract
    async function initTesseract() {
        try {
            console.log('Initializing Tesseract worker...');
            worker = await Tesseract.createWorker('eng', 1, {
                logger: m => {
                    if (m.status === 'recognizing text') {
                        $scanStatus.text(`Processing... ${Math.round(m.progress * 100)}%`);
                    }
                }
            });
            console.log('Tesseract worker initialized.');
        } catch (err) {
            console.error('Tesseract initialization failed:', err);
            $scanStatus.text('Error: Could not initialize OCR. Please try again.').addClass('error');
            $processImageBtn.prop('disabled', true);
        }
    }

    // Start camera
    async function startCamera() {
        $scanModal.removeClass('hidden');
        $scanStatus.text('Accessing camera...');
        $video.removeClass('hidden');
        $capturePhotoBtn.removeClass('hidden');
        $processImageBtn.addClass('hidden');
        $previewImage.addClass('hidden');

        try {
            stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            $video[0].srcObject = stream;
            $scanStatus.text('Camera ready. Click Capture to take a photo.');
        } catch (err) {
            console.error('Camera access failed:', err);
            $scanStatus.text('Error: Could not access camera. Please try again.').addClass('error');
            $capturePhotoBtn.addClass('hidden');
            $processImageBtn.removeClass('hidden').prop('disabled', true);
        }
    }

    // Handle scan buttons
    $scanRevenueBtn.on('click', function () {
        currentInput = $revenueNumberInput;
        $scanModalTitle.text('Process Revenue License');
        if (confirm('Would you like to take a photo? Click OK to use camera, or Cancel to upload an image.')) {
            startCamera();
        } else {
            $revenueImageUpload.click();
        }
    });

    $scanDriverLicenseBtn.on('click', function () {
        currentInput = $driverLicenseInput;
        $scanModalTitle.text('Process Driver License');
        if (confirm('Would you like to take a photo? Click OK to use camera, or Cancel to upload an image.')) {
            startCamera();
        } else {
            $driverImageUpload.click();
        }
    });

    // Capture photo
    $capturePhotoBtn.on('click', function () {
        const canvas = document.createElement('canvas');
        canvas.width = $video[0].videoWidth;
        canvas.height = $video[0].videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage($video[0], 0, 0);
        $previewImage.attr('src', canvas.toDataURL('image/png')).removeClass('hidden');
        $video.addClass('hidden');
        $capturePhotoBtn.addClass('hidden');
        $processImageBtn.removeClass('hidden').prop('disabled', false);
        $scanStatus.text('Image captured. Click Process to extract license number.');
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            stream = null;
        }
    });

    // Image upload
    $revenueImageUpload.add($driverImageUpload).on('change', function (e) {
        const file = e.target.files[0];
        if (!file) return;

        $scanModal.removeClass('hidden');
        $scanStatus.text('Loading image...');
        $video.addClass('hidden');
        $capturePhotoBtn.addClass('hidden');
        $processImageBtn.removeClass('hidden');

        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = function () {
            $previewImage.attr('src', img.src).removeClass('hidden');
            $scanStatus.text('Image loaded. Click Process to extract license number.');
            $processImageBtn.prop('disabled', false);
        };
        img.onerror = function () {
            $scanStatus.text('Error: Could not load the image. Please try again.').addClass('error');
            $processImageBtn.prop('disabled', true);
        };
    });

    // Process image
    $processImageBtn.on('click', async function () {
        $scanStatus.text('Processing image...');
        $processImageBtn.prop('disabled', true);

        const img = new Image();
        img.src = $previewImage.attr('src');

        img.onload = async function () {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            canvas.getContext('2d').drawImage(img, 0, 0);

            $scanStatus.text('Performing OCR...');
            try {
                await initTesseract();
                if (!worker) return;

                const { data: { text } } = await worker.recognize(canvas, {
                    rectangle: {
                        top: 50,
                        left: img.width * 0.3,
                        width: img.width * 0.4,
                        height: img.height * 0.2
                    }
                });
                console.log('OCR text:', text);

                const licenseNumber = extractLicenseNumber(text);
                if (licenseNumber) {
                    currentInput.val(licenseNumber);
                    $scanStatus.text('Scan successful! License number extracted: ' + licenseNumber)
                               .addClass('success').removeClass('error');
                } else {
                    $scanStatus.text('Could not find a license number. Please try again.')
                               .addClass('error').removeClass('success');
                }

                await worker.terminate();
            } catch (err) {
                console.error('OCR failed:', err);
                $scanStatus.text('OCR failed: ' + err.message + '. Please try again.')
                           .addClass('error').removeClass('success');
            }

            setTimeout(function () {
                $scanModal.addClass('hidden');
                $previewImage.addClass('hidden');
                $video.addClass('hidden');
                $scanStatus.removeClass('error success');
                $processImageBtn.prop('disabled', false);
                $revenueImageUpload.val('');
                $driverImageUpload.val('');
                if (stream) {
                    stream.getTracks().forEach(track => track.stop());
                    stream = null;
                }
            }, 3000);
        };
    });

    // Close scan
    $closeScanBtn.on('click', function () {
        console.log('Closing scan modal...');
        if (worker) {
            worker.terminate();
            console.log('Tesseract worker terminated.');
        }
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            stream = null;
        }
        $scanModal.addClass('hidden');
        $previewImage.addClass('hidden');
        $video.addClass('hidden');
        $scanStatus.removeClass('error success');
        $processImageBtn.prop('disabled', true);
        $capturePhotoBtn.addClass('hidden');
        $processImageBtn.removeClass('hidden');
        $revenueImageUpload.val('');
        $driverImageUpload.val('');
    });

    // Extract license helper
    function extractLicenseNumber(text) {
        const regexPatterns = [
            /[A-Z][0-9]{6,7}/,
            /[A-Z]{1,2}[0-9]{5,7}/,
            /[A-Z]{2}\d{2}\s?\d{4}\s?\d{5}/,
            /[A-Z0-9]{7,8}/,
            /\b\d{3}-\d{3}-\d{3}\b/
        ];
        for (const regex of regexPatterns) {
            const match = text.match(regex);
            if (match) {
                console.log('Matched license number:', match[0]);
                return match[0].replace(/\s/g, '');
            }
        }
        return null;
    }
});


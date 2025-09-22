window.trainingListenersReady = window.trainingListenersReady || false;
window.driversInTraining = window.driversInTraining || [];
window.selectedTrainingDriverId = window.selectedTrainingDriverId || null;

let trainingPhotoUrl = "https://cdn-icons-png.flaticon.com/512/219/219983.png"

function initializeTrainingPage() {
            const token = localStorage.getItem("authToken");
            const $list = $('#training-driver-list');

            $list.empty().append('<div class="text-center p-8 text-slate-500">Loading training data...</div>');

            if (!token) {
                alert("You are not logged in! Please log in first.");
                window.location.href = '../Pages/sing_in_And_Sing_up.html';
                return;
            }

            $.ajax({
                url: "http://localhost:8080/api/v1/training/all",
                method: "GET",
                headers: { "Authorization": "Bearer " + token },
                success: function (data) {
                    const trainingData = data.content || data || [];
                    driversInTraining = trainingData.map(driver => ({
                        id: driver.driverId,
                        name: driver.name,
                        program: driver.program,
                        photo: trainingPhotoUrl,
                        startDate: driver.duration,
                        status: driver.suspendedPoint
                    }));

                    renderTrainingPage();
                    setupTrainingPageListeners();
                },
                error: function (error) {
                    console.error("Error loading training data:", error);
                    $list.empty().append('<div class="text-center p-8 text-red-500">Failed to load training data. Please try again later.</div>');
                }
            });
        }

        function renderTrainingPage() {
            renderTrainingDrivers();
        }

        function renderTrainingDrivers() {
            const $list = $('#training-driver-list');
            $list.empty();

            if (!driversInTraining || driversInTraining.length === 0) {
                $list.append('<div class="text-center p-8 text-slate-500">There are currently no drivers in training programs.</div>');
                return;
            }

            driversInTraining.forEach(driver => {
                const isSelected = driver.id === selectedTrainingDriverId;
                const selectedClass = isSelected ? 'bg-sky-100 border-sky-500' : 'border-slate-200';

                const itemHtml = `
                    <div class="training-driver-item bg-slate-50 p-4 rounded-lg border ${selectedClass} cursor-pointer hover:border-sky-400 transition-colors" data-driver-id="${driver.id}">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <img class="h-12 w-12 rounded-full object-cover" src="${driver.photo}" alt="${driver.name}">
                                <div class="ml-4">
                                    <p class="text-md font-bold text-slate-800">${driver.name}</p>
                                    <p class="text-sm text-slate-600">${driver.id}</p>
                                </div>
                            </div>
                            <div class="text-right flex-shrink-0">
                                <p class="text-xs text-slate-500">Start Date</p>
                                <p class="text-sm font-semibold text-slate-700">${driver.startDate}</p>
                            </div>
                        </div>
                    </div>
                `;
                $list.append(itemHtml);
            });
        }

        function setupTrainingPageListeners() {
            if (trainingListenersReady) return;

            $('#training-driver-list').on('click', '.training-driver-item', function() {
                const clickedDriverId = $(this).data('driver-id');
                if (selectedTrainingDriverId === clickedDriverId) {
                    selectedTrainingDriverId = null;
                    $('#complete-training-btn').prop('disabled', true);
                } else {
                    selectedTrainingDriverId = clickedDriverId;
                    $('#complete-training-btn').prop('disabled', false);
                }
                renderTrainingDrivers();
            });

            $('#complete-training-btn').on('click', function() {
                if (!selectedTrainingDriverId) {
                    alert('Please select a driver first.');
                    return;
                }

                const driverData = driversInTraining.find(d => d.id === selectedTrainingDriverId);
                if (!driverData) return;

                const token = localStorage.getItem("authToken");
                if (!token) {
                    alert("Authentication token not found. Please log in again.");
                    return;
                }

                const $btn = $(this);
                $btn.prop('disabled', true).text('Completing...');
                console.log("Completing Training for Driver:", driverData);

                $.ajax({
                    url: `http://localhost:8080/api/v1/training/complete/${selectedTrainingDriverId}`,
                    method: 'DELETE',
                    headers: { "Authorization": "Bearer " + token },
                    success: function() {
                        console.log("Completed Training for Driver:", driverData);
                        alert(`Training completion for ${driverData.name} has been successfully recorded.`);

                        driversInTraining = driversInTraining.filter(d => d.id !== selectedTrainingDriverId);
                        selectedTrainingDriverId = null;
                        renderTrainingDrivers();
                        $btn.text('Complete Training').prop('disabled', true);
                    },
                    error: function(error) {
                        console.error("Error completing training:", error);
                        alert(`Failed to complete training for ${driverData.name}. Please try again.`);
                        $btn.text('Complete Training').prop('disabled', false);
                    }
                });
            });

            trainingListenersReady = true;
        }

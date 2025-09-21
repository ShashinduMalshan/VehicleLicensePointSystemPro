
        let suspendedListenersReady = false;


        let suspensionChart = null;
        let currentDriverId = null;
function initializeSuspendedPage() {
            // Mock data with enhanced details
            const suspendedDrivers = [
                { id: 1, drivingLicNum: 'B345-67890-12', name: 'John Doe', suspensionDate: '2024-06-15', reason: 'High Points', photo: 'https://i.pravatar.cc/150?u=john_doe', status: 'Suspended', reinstatement_status: { period_served: 'Completed', fines_paid: 'Completed', course_completed: 'Pending', reinstatement_fee: 'Pending' }, timeline: [{date: '2024-06-15', event: 'Suspension Effective'}, {date: '2024-06-01', event: 'Suspension Notice Sent'}, {date: '2024-05-20', event: 'Final Warning Issued'}, {date: '2024-04-10', event: 'Violation: Speeding'}], communications: [{date: '2024-06-20 10:30', note: 'Called driver, left voicemail regarding reinstatement process.'}], triggeringViolation: { type: 'Speeding (3rd Offense)', date: '2024-05-18', points: 6, officerId: '7503' } },
                { id: 2, drivingLicNum: 'C987-65432-10', name: 'Jane Smith', suspensionDate: '2024-07-01', reason: 'DUI', photo: 'https://i.pravatar.cc/150?u=jane_smith', status: 'Suspended', reinstatement_status: { period_served: 'Completed', fines_paid: 'Pending', course_completed: 'Pending', reinstatement_fee: 'Pending' }, timeline: [{date: '2024-07-01', event: 'Suspension Effective'}, {date: '2024-06-15', event: 'Court Mandate Received'}], communications: [], triggeringViolation: { type: 'Driving Under Influence', date: '2024-06-15', points: 12, officerId: '8112' } },
                { id: 3, drivingLicNum: 'D123-45678-90', name: 'Michael Johnson', suspensionDate: '2024-05-20', reason: 'Other', photo: 'https://i.pravatar.cc/150?u=michael_j', status: 'Suspended', reinstatement_status: { period_served: 'Completed', fines_paid: 'Completed', course_completed: 'Completed', reinstatement_fee: 'Paid' }, timeline: [{date: '2024-05-20', event: 'Suspension Effective'}], communications: [{date: '2024-06-05 14:00', note: 'Email sent with reinstatement checklist.'}, {date: '2024-07-10 11:00', note: 'Driver called to confirm receipt of checklist.'}], triggeringViolation: { type: 'Failure to Appear in Court', date: '2024-05-10', points: 0, officerId: 'N/A' } },
                { id: 4, drivingLicNum: 'E567-89012-34', name: 'Emily Davis', suspensionDate: '2024-07-10', reason: 'High Points', photo: 'https://i.pravatar.cc/150?u=emily_d', status: 'Suspended', reinstatement_status: { period_served: 'In Progress', fines_paid: 'Completed', course_completed: 'Pending', reinstatement_fee: 'Pending' }, timeline: [{date: '2024-07-10', event: 'Suspension Effective'}], communications: [], triggeringViolation: { type: 'Reckless Driving', date: '2024-07-02', points: 8, officerId: '9821' } },
                { id: 5, drivingLicNum: 'F901-23456-78', name: 'Chris Brown', suspensionDate: '2024-06-25', reason: 'Unpaid Fines', photo: 'https://i.pravatar.cc/150?u=chris_b', status: 'Suspended', reinstatement_status: { period_served: 'Completed', fines_paid: 'Pending', course_completed: 'N/A', reinstatement_fee: 'Pending' }, timeline: [{date: '2024-06-25', event: 'Suspension Effective due to unpaid fines.'}], communications: [{date: '2024-07-01 09:15', note: 'Automated payment reminder sent.'}], triggeringViolation: { type: 'Multiple Unpaid Parking Tickets', date: '2024-06-01', points: 0, officerId: 'N/A' } },
                { id: 6, drivingLicNum: 'G112-35813-21', name: 'David Wilson', suspensionDate: '2024-07-18', reason: 'Unpaid Fines', photo: 'https://i.pravatar.cc/150?u=david_w', status: 'Suspended', reinstatement_status: { period_served: 'In Progress', fines_paid: 'Pending', course_completed: 'N/A', reinstatement_fee: 'Pending' }, timeline: [{date: '2024-07-18', event: 'Suspension Effective'}], communications: [], triggeringViolation: { type: 'Red Light Camera Fine', date: '2024-06-20', points: 3, officerId: 'CAM-04' } },
                { id: 7, drivingLicNum: 'H465-79135-18', name: 'Jessica Miller', suspensionDate: '2024-04-30', reason: 'DUI', photo: 'https://i.pravatar.cc/150?u=jessica_m', status: 'Suspended', reinstatement_status: { period_served: 'Completed', fines_paid: 'Completed', course_completed: 'Completed', reinstatement_fee: 'Pending' }, timeline: [{date: '2024-04-30', event: 'Suspension Effective'}], communications: [], triggeringViolation: { type: 'Driving Under Influence', date: '2024-04-15', points: 12, officerId: '7503' } }
            ];
            allSuspendedDrivers = suspendedDrivers;
            renderSuspendedDriverList(allSuspendedDrivers);
            renderSuspensionChart();
            setupSuspendedPageListeners();
        }

        function renderSuspendedDriverList(drivers) {
             const $list = $('#suspended-driver-list');
            $list.empty();

            if (drivers.length === 0) {
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
            currentDriverId = driver.id;
            $('#detail-pane-placeholder').addClass('hidden');
            const $content = $('#detail-pane-content');
            $content.removeClass('hidden');

            // Populate header
            $('#detail-driver-img').attr('src', driver.photo);
            $('#detail-driver-name').text(driver.name);
            $('#detail-driver-license').text(driver.drivingLicNum);
            $('#detail-driver-reason').text(driver.reason);
            
            // Populate Triggering Violation
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


            // Populate checklist
            const $checklist = $('#detail-checklist');
            $checklist.empty();
            const statusMap = {
                'Completed': { text: 'Completed', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>'},
                'Pending': { text: 'Pending', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" /></svg>'},
                'Paid': { text: 'Paid', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>'},
                 'In Progress': { text: 'In Progress', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h5M20 20v-5h-5" /><path stroke-linecap="round" stroke-linejoin="round" d="M4 9a9 9 0 0114.13-6.364M20 15a9 9 0 01-14.13 6.364" /></svg>'},
                 'N/A': { text: 'N/A', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd" /></svg>'}
            };
            const items = [
                {key: 'period_served', label: 'Suspension Period'},
                {key: 'fines_paid', label: 'Fines Paid'},
                {key: 'course_completed', label: 'Re-education Course'},
                {key: 'reinstatement_fee', label: 'Reinstatement Fee'},
            ];
            items.forEach(item => {
                const status = driver.reinstatement_status[item.key];
                const itemHtml = `
                <div class="flex items-center justify-between p-2.5 bg-slate-50 rounded-md">
                    <span class="text-sm font-medium text-slate-700">${item.label}</span>
                    <div class="flex items-center space-x-2">
                        ${statusMap[status].icon}
                        <span class="text-sm font-semibold text-slate-800">${statusMap[status].text}</span>
                        <button class="update-status-btn text-xs text-[#0a58ca] hover:underline" data-item-key="${item.key}" ${status === 'N/A' ? 'disabled style="display:none;"' : ''}>Update</button>
                    </div>
                </div>`;
                $checklist.append(itemHtml);
            });
            
            // Populate Timeline
            const $timeline = $('#detail-timeline');
            $timeline.empty();
            driver.timeline.forEach(item => {
                const itemHtml = `
                    <div class="relative">
                        <div class="absolute -left-[2.1rem] top-1 h-4 w-4 bg-[#0a58ca] rounded-full border-4 border-white"></div>
                        <p class="text-sm font-semibold text-slate-800">${item.event}</p>
                        <p class="text-xs text-slate-500">${item.date}</p>
                    </div>`;
                $timeline.append(itemHtml);
            });

            // Populate Comm Log
            renderCommLog(driver);
        }

        function renderCommLog(driver) {
            const $commLog = $('#detail-comm-log');
            $commLog.empty();
            if (driver.communications.length === 0) {
                 $commLog.append('<div class="p-4 text-center text-sm text-slate-400">No communication logged.</div>');
            } else {
                [...driver.communications].reverse().forEach(item => {
                    const itemHtml = `
                    <div class="p-2.5 bg-slate-50 rounded-md">
                        <p class="text-sm text-slate-700">${item.note}</p>
                        <p class="text-xs text-slate-500 text-right mt-1">${item.date}</p>
                    </div>`;
                    $commLog.append(itemHtml);
                });
            }
        }
        
        function renderSuspensionChart() {
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
             if(suspensionChart) {
                suspensionChart.destroy();
            }
            suspensionChart = new Chart(ctx, {
                type: 'doughnut',
                data: chartData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom', labels: { boxWidth: 12, padding: 15, font: {size: 11} } }
                    }
                }
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

            // Delegated click listener for driver list items
            $('#suspended-driver-list').on('click', '[data-driver-id]', function() {
                const driverId = $(this).data('driver-id');
                const driverData = allSuspendedDrivers.find(d => d.id === driverId);
                if (driverData) {
                    $('#suspended-driver-list').find('[data-driver-id]').removeClass('bg-sky-100');
                    $(this).addClass('bg-sky-100');
                    renderDriverDetail(driverData);
                }
            });

            // Delegated click listener for updating status
            $('#detail-checklist').on('click', '.update-status-btn', function() {
                const itemKey = $(this).data('item-key');
                const driver = allSuspendedDrivers.find(d => d.id === currentDriverId);
                if(driver){
                    const currentStatus = driver.reinstatement_status[itemKey];
                    const nextStatus = prompt(`Update status for "${$(this).closest('div').find('.font-medium').text()}" (Current: ${currentStatus}):\nEnter new status (e.g., Completed, Pending, Paid):`, currentStatus);
                    if(nextStatus && nextStatus !== currentStatus){
                         driver.reinstatement_status[itemKey] = nextStatus;
                         renderDriverDetail(driver); // Re-render the detail pane to show changes
                    }
                }
            });

            // Communication log form submission
            $('#add-comm-log-form').on('submit', function(e){
                e.preventDefault();
                const noteInput = $('#comm-log-input');
                const noteText = noteInput.val().trim();
                if(noteText && currentDriverId) {
                    const driver = allSuspendedDrivers.find(d => d.id === currentDriverId);
                    const now = new Date();
                    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
                    driver.communications.push({date: timestamp, note: noteText});
                    renderCommLog(driver);
                    noteInput.val('');
                }
            });
            
            $('#assign-training-btn').on('click', function() {
                if (currentDriverId) {
                    navigateTo('training');
                } else {
                    alert('Please select a driver first.');
                }
            });

            suspendedListenersReady = true;
        }
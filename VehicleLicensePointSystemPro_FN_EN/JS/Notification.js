window.PageFunctions = window.PageFunctions || {};

        let allNotifications = [];
        let driversInTraining = [];

        let notificationListenersReady = false;


function initializeNotificationsPage() {
            // Mock data for notifications
            const notifications = [
                { id: 1, type: 'Suspension', driverName: 'Nimal Fernando', drivingLicNum: 'B5839764', date: '2024-07-21 09:00', subject: 'Urgent: Your Driver\'s License Has Been Suspended', content: `<p>Dear John Doe,</p><p>This is a formal notification that your driver's license, number <strong>B345-67890-12</strong>, has been suspended effective <strong>July 21, 2024</strong>, due to reaching the maximum allowable demerit points.</p><p>Please cease all driving activities immediately. For information on the reinstatement process, please visit our website or contact our office.</p><p>Sincerely,<br>The Vehicle Licensing Department</p>` },
                { id: 2, type: 'Warning', driverName: 'sandaru anuththara', drivingLicNum: 'B5865857', date: '2024-07-20 14:30', subject: 'Warning: High Demerit Point Accumulation', content: `<p>Dear Emily Davis,</p><p>This is a courtesy warning to inform you that you have accumulated <strong>10 demerit points</strong> on your license (<strong>E567-89012-34</strong>). Reaching 12 points will result in an automatic suspension.</p><p>We encourage you to drive safely and be mindful of traffic laws.</p><p>Sincerely,<br>The Vehicle Licensing Department</p>` },
                { id: 3, type: 'Reminder', driverName: 'Saman Jayasinghe', drivingLicNum: 'B5865859', date: '2024-07-19 11:00', subject: 'Reminder: Outstanding Fine Payment Due', content: `<p>Dear Chris Brown,</p><p>This is a reminder that you have an outstanding fine related to violation #V-98765. Failure to pay by the due date may result in further penalties, including license suspension.</p><p>Sincerely,<br>The Vehicle Licensing Department</p>`},
                { id: 4, type: 'Suspension', driverName: 'Kamal Perera', drivingLicNum: 'B5865860', date: '2024-07-18 16:45', subject: 'Urgent: Your Driver\'s License Has Been Suspended', content: `<p>Dear Jane Smith,</p><p>This is a formal notification that your driver's license, number <strong>C987-65432-10</strong>, has been suspended effective <strong>July 18, 2024</strong>, due to a DUI conviction.</p><p>Please cease all driving activities immediately.</p><p>Sincerely,<br>The Vehicle Licensing Department</p>`},
                { id: 5, type: 'Warning', driverName: 'Anil Rajapaksha', drivingLicNum: 'B5865862', date: '2024-07-18 10:15', subject: 'Warning: High Demerit Point Accumulation', content: `<p>Dear David Wilson,</p><p>This is a courtesy warning to inform you that you have accumulated <strong>9 demerit points</strong> on your license (<strong>G112-35813-21</strong>). Reaching 12 points will result in an automatic suspension.</p><p>Sincerely,<br>The Vehicle Licensing Department</p>`}
            ];
            allNotifications = notifications;
            renderNotifications();
            setupNotificationPageListeners();
        }

        function renderNotifications() {
            const $list = $('#notification-list');
            const typeFilter = $('#notification-type-filter').val();
            const sortFilter = $('#notification-sort-filter').val();

            let filteredNotifications = allNotifications;

            if (typeFilter !== 'all') {
                filteredNotifications = filteredNotifications.filter(n => n.type === typeFilter);
            }

            filteredNotifications.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return sortFilter === 'newest' ? dateB - dateA : dateA - dateB;
            });

            $list.empty();
            if (filteredNotifications.length === 0) {
                 $list.append('<div class="p-8 text-center text-sm text-slate-500 bg-white rounded-lg shadow-md">No notifications match the current filters.</div>');
                return;
            }

            const typeMap = {
                'Suspension': {
                    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>',
                    bgColor: 'bg-red-500',
                    tagBgColor: 'bg-red-100',
                    tagTextColor: 'text-red-800'
                },
                'Warning': {
                    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>',
                    bgColor: 'bg-yellow-500',
                    tagBgColor: 'bg-yellow-100',
                    tagTextColor: 'text-yellow-800'
                },
                 'Reminder': {
                    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>',
                    bgColor: 'bg-blue-500',
                    tagBgColor: 'bg-blue-100',
                    tagTextColor: 'text-blue-800'
                }
            };

            filteredNotifications.forEach(n => {
                const config = typeMap[n.type];
                const itemHtml = `
                    <div class="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
                        <div class="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${config.bgColor}">
                            ${config.icon}
                        </div>
                        <div class="flex-grow">
                            <div class="flex justify-between items-center">
                                <p class="text-sm font-semibold text-slate-800">${n.driverName} <span class="ml-2 font-normal text-slate-500 font-mono text-xs">${n.drivingLicNum}</span></p>
                                <span class="text-xs font-semibold px-2 py-1 rounded-full ${config.tagBgColor} ${config.tagTextColor}">${n.type}</span>
                            </div>
                            <p class="text-sm text-slate-600 mt-1">${n.subject}</p>
                            <p class="text-xs text-slate-400 mt-1">${n.date}</p>
                        </div>
                        <div class="flex-shrink-0">
                            <button class="view-notification-btn text-sm font-medium text-[#0a58ca] hover:text-[#084a9e]" data-notification-id="${n.id}">View Details</button>
                        </div>
                    </div>
                `;
                 $list.append(itemHtml);
            });
        }

        function openNotificationModal(notificationId) {
            const notification = allNotifications.find(n => n.id === notificationId);
            if (!notification) return;

            $('#notification-modal-title').text(`${notification.type} Notification`);
            $('#notification-modal-subtitle').text(`Sent on ${notification.date}`);
            $('#notification-modal-to').text(notification.driverName);
            $('#notification-modal-subject').text(notification.subject);
            $('#notification-modal-body').html(notification.content);

            $('#notification-modal').removeClass('hidden').addClass('flex');
        }

        function closeNotificationModal() {
            $('#notification-modal').addClass('hidden').removeClass('flex');
        }

        function setupNotificationPageListeners() {
            if (notificationListenersReady) return;

            $('#notification-type-filter, #notification-sort-filter').on('change', renderNotifications);

            $('#notification-list').on('click', '.view-notification-btn', function() {
                const notificationId = $(this).data('notification-id');
                openNotificationModal(notificationId);
            });

            $('#notification-modal-close-top, #notification-modal-close-bottom').on('click', closeNotificationModal);
            $('#notification-modal').on('click', function(e) {
                if ($(e.target).is('#notification-modal')) {
                    closeNotificationModal();
                }
            });

            notificationListenersReady = true;
        }

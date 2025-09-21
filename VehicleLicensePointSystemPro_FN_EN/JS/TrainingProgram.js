function initializeTrainingPage() {
            driversInTraining = [
                { id: 4, name: 'Emily Davis', photo: 'https://i.pravatar.cc/150?u=emily_d', program: 'Defensive Driving', progress: 75, status: 'In Progress' },
                { id: 7, name: 'Jessica Miller', photo: 'https://i.pravatar.cc/150?u=jessica_m', program: 'DUI Awareness', progress: 100, status: 'Completed' },
                { id: 1, name: 'John Doe', photo: 'https://i.pravatar.cc/150?u=john_doe', program: 'High Points Intervention', progress: 40, status: 'In Progress' },
                { id: 2, name: 'Jane Smith', photo: 'https://i.pravatar.cc/150?u=jane_smith', program: 'DUI Awareness', progress: 15, status: 'Not Started' },
                { id: 5, name: 'Chris Brown', photo: 'https://i.pravatar.cc/150?u=chris_b', program: 'Financial Responsibility', progress: 90, status: 'In Progress' }
            ];

            availablePrograms = [
                { name: 'Defensive Driving', description: 'Covers accident prevention techniques and safe driving strategies.', duration: '4 weeks' },
                { name: 'DUI Awareness', description: 'Educational course on the dangers and consequences of impaired driving.', duration: '6 weeks' },
                { name: 'High Points Intervention', description: 'Aimed at habitual offenders to correct risky driving behaviors.', duration: '8 weeks' },
                { name: 'Rules of the Road Refresher', description: 'A comprehensive review of current traffic laws and regulations.', duration: '2 weeks' }
            ];
            renderTrainingPage();
            setupTrainingPageListeners();
        }

        function renderTrainingPage() {
            renderTrainingDrivers();
            renderAvailablePrograms();
        }

        function renderTrainingDrivers() {
            const $list = $('#training-driver-list');
            $list.empty();
            driversInTraining.forEach(driver => {
                const progressBarColor = driver.progress === 100 ? 'bg-green-500' : 'bg-blue-500';
                const itemHtml = `
                    <div class="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <div class="flex items-center justify-between mb-3">
                            <div class="flex items-center">
                                <img class="h-12 w-12 rounded-full object-cover" src="${driver.photo}" alt="${driver.name}">
                                <div class="ml-3">
                                    <p class="text-md font-bold text-slate-800">${driver.name}</p>
                                    <p class="text-sm text-slate-600">${driver.program}</p>
                                </div>
                            </div>
                            <span class="text-sm font-semibold text-slate-700">${driver.progress}%</span>
                        </div>
                        <div class="w-full bg-slate-200 rounded-full h-2.5">
                            <div class="${progressBarColor} h-2.5 rounded-full" style="width: ${driver.progress}%"></div>
                        </div>
                    </div>
                `;
                $list.append(itemHtml);
            });
        }

        function renderAvailablePrograms() {
            const $list = $('#available-programs-list');
            $list.empty();
            availablePrograms.forEach(program => {
                const itemHtml = `
                    <div class="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <h4 class="font-bold text-slate-800">${program.name}</h4>
                        <p class="text-xs text-slate-500 mb-2">${program.duration}</p>
                        <p class="text-sm text-slate-600">${program.description}</p>
                        <button class="text-sm mt-3 w-full bg-white hover:bg-slate-100 text-slate-700 font-semibold py-2 px-3 border border-slate-300 rounded-lg shadow-sm transition-colors">View Enrolled</button>
                    </div>
                `;
                $list.append(itemHtml);
            });
        }

        function setupTrainingPageListeners() {
            if (trainingListenersReady) return;
            // Add listeners for future interactivity if needed
            trainingListenersReady = true;
        }
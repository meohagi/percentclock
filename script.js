document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const wakeUpPickerContainer = document.getElementById('wakeUpPicker');
    const sleepPickerContainer = document.getElementById('sleepPicker');
    const setButton = document.getElementById('setButton');
    const updateButton = document.getElementById('updateButton');
    const updateInfo = document.getElementById('update-info');
    const barPercentageText = document.getElementById('barPercentage');
    const circlePercentageText = document.getElementById('circlePercentage');
    const graphTypeRadios = document.querySelectorAll('input[name="graphType"]');
    const colorRadios = document.querySelectorAll('input[name="color"]');
    const barContainer = document.getElementById('bar-container');
    const progressBar = document.getElementById('progressBar');
    const circleContainer = document.getElementById('circle-container');
    const circleProgress = document.getElementById('circleProgress');
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const languageSelector = document.getElementById('languageSelector');

    // --- State Variables ---
    let intervalId = null;
    let currentQuote = null;
    let lastPercentage = 0; // For notification logic

    // Circle progress setup
    const radius = circleProgress.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    circleProgress.style.strokeDasharray = `${circumference} ${circumference}`;
    circleProgress.style.strokeDashoffset = circumference;

    // --- Time Picker UI ---
    function createTimePicker(container) {
        const hourSelect = document.createElement('select');
        for (let i = 1; i <= 12; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            hourSelect.appendChild(option);
        }

        const minuteSelect = document.createElement('select');
        for (let i = 0; i < 60; i++) {
            const option = document.createElement('option');
            const value = i.toString().padStart(2, '0');
            option.value = value;
            option.textContent = value;
            minuteSelect.appendChild(option);
        }

        const ampmSelect = document.createElement('select');
        const amOption = document.createElement('option');
        amOption.value = 'AM';
        const pmOption = document.createElement('option');
        pmOption.value = 'PM';
        ampmSelect.appendChild(amOption);
        ampmSelect.appendChild(pmOption);

        container.appendChild(hourSelect);
        container.appendChild(document.createTextNode(':'));
        container.appendChild(minuteSelect);
        container.appendChild(ampmSelect);
    }

    function setTimePickerValue(container, time24) {
        let [hour, minute] = time24.split(':').map(Number);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12; // Convert 0 to 12 for 12-hour format

        const selects = container.querySelectorAll('select');
        selects[0].value = hour;
        selects[1].value = minute.toString().padStart(2, '0');
        selects[2].value = ampm;
    }

    function getTimePickerValue(container) {
        const selects = container.querySelectorAll('select');
        let hour = parseInt(selects[0].value, 10);
        const minute = selects[1].value;
        const ampm = selects[2].value;

        if (ampm === 'PM' && hour !== 12) {
            hour += 12;
        } else if (ampm === 'AM' && hour === 12) {
            hour = 0;
        }
        return `${hour.toString().padStart(2, '0')}:${minute}`;
    }

    // --- Internationalization (i18n) ---
    function setLanguage(lang) {
        const langData = languages[lang];
        document.querySelectorAll('[data-i18n-key]').forEach(element => {
            const key = element.getAttribute('data-i18n-key');
            element.textContent = langData[key];
        });

        // Update AM/PM selectors
        document.querySelectorAll('.time-picker').forEach(picker => {
            const ampmSelect = picker.querySelectorAll('select')[2];
            ampmSelect.options[0].textContent = langData.am;
            ampmSelect.options[1].textContent = langData.pm;
        });

        localStorage.setItem('preferredLanguage', lang);
        renderQuote(); // Re-render quote in the new language
    }

    // --- Quote Logic ---
    function displayRandomQuote() {
        if (typeof quotes !== 'undefined' && quotes.length > 0) {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            currentQuote = quotes[randomIndex];
            renderQuote();
        }
    }

    function renderQuote() {
        if (!currentQuote) return;
        const lang = languageSelector.value;
        const quoteKey = `quote_${lang}`;
        const quoteToDisplay = currentQuote[quoteKey] || currentQuote.quote_en; // Fallback to English

        quoteText.textContent = `"${quoteToDisplay}"`;
        quoteAuthor.textContent = `- ${currentQuote.author}`;
    }

    // --- Notification and Speech ---
    function triggerNotification() {
        const notificationsEnabled = JSON.parse(localStorage.getItem('notificationsEnabled')) ?? true;
        if (!notificationsEnabled) return;

        const lang = languageSelector.value;
        const message = languages[lang].notificationMessage;
        const title = languages[lang].title;

        // 1. Electron Native Notification
        if (window.ipcRenderer) {
            window.ipcRenderer.send('show-notification', title, message);
        } else { // Fallback for standard browser environment
            if (Notification.permission === 'granted') {
                new Notification(title, { body: message });
            }
        }

        // 2. Speech Synthesis
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(message);
            utterance.lang = lang;
            speechSynthesis.speak(utterance);
        }
    }

    function checkAndRequestNotificationPermission() {
        // For standard browser environment. Electron handles this implicitly.
        if (!window.ipcRenderer && 'Notification' in window && Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
    }

    // --- Core Clock and UI Logic ---
    function calculatePercentage() {
        const now = new Date();
        let wakeUpTime = new Date();
        const wakeUpTime24 = getTimePickerValue(wakeUpPickerContainer);
        const [wakeHours, wakeMinutes] = wakeUpTime24.split(':');
        wakeUpTime.setHours(wakeHours, wakeMinutes, 0, 0);

        let sleepTime = new Date();
        const sleepTime24 = getTimePickerValue(sleepPickerContainer);
        const [sleepHours, sleepMinutes] = sleepTime24.split(':');
        sleepTime.setHours(sleepHours, sleepMinutes, 0, 0);

        if (sleepTime <= wakeUpTime) {
            if (now < sleepTime || now >= wakeUpTime) {
                if(now < sleepTime) {
                    wakeUpTime.setDate(wakeUpTime.getDate() - 1);
                } else {
                    sleepTime.setDate(sleepTime.getDate() + 1);
                }
            } else {
                wakeUpTime.setDate(wakeUpTime.getDate() - 1);
            }
        }

        let percentage = 0;
        if (now < wakeUpTime) {
            percentage = 0;
        } else if (now > sleepTime) {
            percentage = 100;
        } else {
            const totalAwakeTime = sleepTime.getTime() - wakeUpTime.getTime();
            const elapsedTime = now.getTime() - wakeUpTime.getTime();
            percentage = (elapsedTime / totalAwakeTime) * 100;
        }

        return Math.max(0, Math.min(100, percentage));
    }

    function updateUI(percentage) {
        const selectedColor = document.querySelector('input[name="color"]:checked').value;
        const selectedGraph = document.querySelector('input[name="graphType"]:checked').value;
        const percentageString = percentage.toFixed(2) + '%';

        // Update both text elements with the new value
        barPercentageText.textContent = percentageString;
        circlePercentageText.textContent = percentageString;

        if (selectedGraph === 'circle') {
            barContainer.style.display = 'none';
            barPercentageText.style.display = 'none';
            circleContainer.style.display = 'block'; // Changed from 'flex'
            circlePercentageText.style.display = 'block';
        } else { // 'bar'
            barContainer.style.display = 'block';
            barPercentageText.style.display = 'block';
            circleContainer.style.display = 'none';
            circlePercentageText.style.display = 'none';
        }

        progressBar.style.width = percentage + '%';
        progressBar.style.backgroundColor = selectedColor;

        const offset = circumference - (percentage / 100) * circumference;
        circleProgress.style.strokeDashoffset = offset;
        circleProgress.style.stroke = selectedColor;
    }

    function updateClock() {
        const percentage = calculatePercentage();

        // Trigger notification only when crossing the 95% threshold
        if (percentage >= 95 && lastPercentage < 95) {
            triggerNotification();
        }

        lastPercentage = percentage; // Update for the next tick
        updateUI(percentage);
    }

    function startClock() {
        if (intervalId) clearInterval(intervalId);

        // Save settings
        localStorage.setItem('wakeUpTime', getTimePickerValue(wakeUpPickerContainer));
        localStorage.setItem('sleepTime', getTimePickerValue(sleepPickerContainer));

        // Perform initial calculation and UI update
        const initialPercentage = calculatePercentage();
        lastPercentage = initialPercentage; // Set baseline to prevent notification on load
        updateUI(initialPercentage);

        // Start the timer
        intervalId = setInterval(updateClock, 1000);
    }

    // --- Initial Setup ---
    function initialize() {
        // 1. Create the time pickers first
        createTimePicker(wakeUpPickerContainer);
        createTimePicker(sleepPickerContainer);

        // 2. Load preferred language (this will also translate AM/PM)
        const preferredLanguage = localStorage.getItem('preferredLanguage') || 'en';
        languageSelector.value = preferredLanguage;
        setLanguage(preferredLanguage);

        // 3. Load saved times, or use defaults, and set the picker values
        const savedWakeUpTime = localStorage.getItem('wakeUpTime') || '07:00';
        const savedSleepTime = localStorage.getItem('sleepTime') || '23:00';
        setTimePickerValue(wakeUpPickerContainer, savedWakeUpTime);
        setTimePickerValue(sleepPickerContainer, savedSleepTime);

        // Set up event listeners
        setButton.addEventListener('click', startClock);
        updateButton.addEventListener('click', () => {
            if (window.ipcRenderer) {
                window.ipcRenderer.send('check-for-update');
            }
        });
        graphTypeRadios.forEach(radio => radio.addEventListener('change', () => updateUI(calculatePercentage())));
        colorRadios.forEach(radio => radio.addEventListener('change', () => updateUI(calculatePercentage())));
        languageSelector.addEventListener('change', (e) => setLanguage(e.target.value));

        // Listen for messages from the main process
        if (window.ipcRenderer) {
            // Update messages
            window.ipcRenderer.on('update-message', (event, messageKey, versions = {}) => {
                const lang = languageSelector.value;
                let message = languages[lang][messageKey] || 'Unknown update status.';

                // Replace placeholders with actual version numbers
                message = message.replace('{currentVersion}', versions.currentVersion || 'N/A');
                message = message.replace('{latestVersion}', versions.latestVersion || 'N/A');

                if (messageKey === 'updateDownloaded') {
                    const restartKey = 'restartAndInstall';
                    const restartText = languages[lang][restartKey] || 'Restart';
                    message += ` <a href="#" id="restart-app">${restartText}</a>`;
                } else if (messageKey === 'updateError') {
                    const errorMessage = versions; // In case of error, 'versions' is the error message
                    console.error('Update Error:', errorMessage);
                    message = languages[lang]['updateErrorMsg'] || 'An error occurred during update.';
                }

                updateInfo.innerHTML = message;

                if (messageKey === 'updateDownloaded') {
                    document.getElementById('restart-app').addEventListener('click', (e) => {
                        e.preventDefault();
                        window.ipcRenderer.send('restart-app');
                    });
                }
            });

            // Settings window closed
            window.ipcRenderer.on('settings-closed', () => {
                // Reload language to apply changes
                const preferredLanguage = localStorage.getItem('preferredLanguage') || 'en';
                if (languageSelector.value !== preferredLanguage) {
                    languageSelector.value = preferredLanguage;
                    setLanguage(preferredLanguage);
                }
                // The clock will automatically respect the new notification setting on its next tick
            });
        }

        // Initial actions
        startClock();
        displayRandomQuote();
        checkAndRequestNotificationPermission(); // Ask for permission on load
    }

    initialize();
});
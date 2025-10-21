document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const wakeUpTimeInput = document.getElementById('wakeUpTime');
    const sleepTimeInput = document.getElementById('sleepTime');
    const setButton = document.getElementById('setButton');
    const percentageText = document.getElementById('percentage');
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
    let notificationSent = false;

    // Circle progress setup
    const radius = circleProgress.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    circleProgress.style.strokeDasharray = `${circumference} ${circumference}`;
    circleProgress.style.strokeDashoffset = circumference;

    // --- Internationalization (i18n) ---
    function setLanguage(lang) {
        const langData = languages[lang];
        document.querySelectorAll('[data-i18n-key]').forEach(element => {
            const key = element.getAttribute('data-i18n-key');
            element.textContent = langData[key];
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
        const lang = languageSelector.value;
        const message = languages[lang].notificationMessage;

        // 1. Browser Notification
        if (Notification.permission === 'granted') {
            new Notification(languages[lang].title, { body: message });
        }

        // 2. Speech Synthesis
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(message);
            utterance.lang = lang;
            speechSynthesis.speak(utterance);
        }
    }

    function checkAndRequestNotificationPermission() {
        if ('Notification' in window && Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
    }

    // --- Core Clock and UI Logic ---
    function calculateAndUpdate() {
        const now = new Date();
        let wakeUpTime = new Date();
        const [wakeHours, wakeMinutes] = wakeUpTimeInput.value.split(':');
        wakeUpTime.setHours(wakeHours, wakeMinutes, 0, 0);

        let sleepTime = new Date();
        const [sleepHours, sleepMinutes] = sleepTimeInput.value.split(':');
        sleepTime.setHours(sleepHours, sleepMinutes, 0, 0);

        if (sleepTime <= wakeUpTime) {
            if (now < sleepTime || now >= wakeUpTime) {
                // Today's cycle, sleep time is tomorrow
                if(now < sleepTime) {
                    wakeUpTime.setDate(wakeUpTime.getDate() - 1);
                } else {
                    sleepTime.setDate(sleepTime.getDate() + 1);
                }
            } else {
                // Yesterday's cycle is still active
                wakeUpTime.setDate(wakeUpTime.getDate() - 1);
            }
        }

        let percentage = 0;
        if (now < wakeUpTime) {
            notificationSent = false; // Reset for the new day
            percentage = 0;
        } else if (now > sleepTime) {
            percentage = 100;
        } else {
            const totalAwakeTime = sleepTime.getTime() - wakeUpTime.getTime();
            const elapsedTime = now.getTime() - wakeUpTime.getTime();
            percentage = (elapsedTime / totalAwakeTime) * 100;
        }

        percentage = Math.max(0, Math.min(100, percentage));
        updateUI(percentage);

        // Check for 95% notification
        if (percentage >= 95 && !notificationSent) {
            triggerNotification();
            notificationSent = true;
        }
    }

    function updateUI(percentage) {
        // ... (UI update logic remains the same)
        const selectedColor = document.querySelector('input[name="color"]:checked').value;
        const selectedGraph = document.querySelector('input[name="graphType"]:checked').value;

        percentageText.textContent = percentage.toFixed(2) + '%';
        barContainer.style.display = selectedGraph === 'bar' ? 'block' : 'none';
        circleContainer.style.display = selectedGraph === 'circle' ? 'block' : 'none';

        progressBar.style.width = percentage + '%';
        progressBar.style.backgroundColor = selectedColor;

        const offset = circumference - (percentage / 100) * circumference;
        circleProgress.style.strokeDashoffset = offset;
        circleProgress.style.stroke = selectedColor;
    }

    function startClock() {
        if (intervalId) clearInterval(intervalId);
        notificationSent = false; // Reset notification on new 'Set'

        // Save current time settings to localStorage
        localStorage.setItem('wakeUpTime', wakeUpTimeInput.value);
        localStorage.setItem('sleepTime', sleepTimeInput.value);

        calculateAndUpdate();
        intervalId = setInterval(calculateAndUpdate, 1000);
    }

    // --- Initial Setup ---
    function initialize() {
        // Load preferred language
        const preferredLanguage = localStorage.getItem('preferredLanguage') || 'en';
        languageSelector.value = preferredLanguage;
        setLanguage(preferredLanguage);

        // Load saved times, or use defaults
        wakeUpTimeInput.value = localStorage.getItem('wakeUpTime') || '07:00';
        sleepTimeInput.value = localStorage.getItem('sleepTime') || '23:00';

        // Set up event listeners
        setButton.addEventListener('click', startClock);
        graphTypeRadios.forEach(radio => radio.addEventListener('change', calculateAndUpdate));
        colorRadios.forEach(radio => radio.addEventListener('change', calculateAndUpdate));
        languageSelector.addEventListener('change', (e) => setLanguage(e.target.value));

        // Initial actions
        startClock();
        displayRandomQuote();
        checkAndRequestNotificationPermission(); // Ask for permission on load
    }

    initialize();
});
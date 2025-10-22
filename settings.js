document.addEventListener('DOMContentLoaded', () => {
    const languageSelector = document.getElementById('languageSelector');
    const notificationToggle = document.getElementById('notificationToggle');
    const saveButton = document.getElementById('saveButton');
    const cancelButton = document.getElementById('cancelButton');

    // Load saved settings
    function loadSettings() {
        const preferredLanguage = localStorage.getItem('preferredLanguage') || 'en';
        const notificationsEnabled = JSON.parse(localStorage.getItem('notificationsEnabled')) ?? true;

        languageSelector.value = preferredLanguage;
        notificationToggle.checked = notificationsEnabled;

        setLanguage(preferredLanguage);
    }

    // Save settings
    function saveSettings() {
        const selectedLanguage = languageSelector.value;
        const areNotificationsEnabled = notificationToggle.checked;

        localStorage.setItem('preferredLanguage', selectedLanguage);
        localStorage.setItem('notificationsEnabled', JSON.stringify(areNotificationsEnabled));

        // Send a message to the main process to close the window
        if (window.ipcRenderer) {
            window.ipcRenderer.send('close-settings-window');
        }
    }

    // Internationalization
    function setLanguage(lang) {
        const langData = languages[lang];
        document.querySelectorAll('[data-i18n-key]').forEach(element => {
            const key = element.getAttribute('data-i18n-key');
            if (langData[key]) {
                element.textContent = langData[key];
            }
        });
    }

    // Event Listeners
    languageSelector.addEventListener('change', (e) => setLanguage(e.target.value));
    saveButton.addEventListener('click', saveSettings);
    cancelButton.addEventListener('click', () => {
        // Send a message to the main process to close the window without saving
        if (window.ipcRenderer) {
            window.ipcRenderer.send('close-settings-window');
        }
    });

    // Initial load
    loadSettings();
});

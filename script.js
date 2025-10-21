document.addEventListener('DOMContentLoaded', () => {
    const wakeUpTimeInput = document.getElementById('wakeUpTime');
    const sleepTimeInput = document.getElementById('sleepTime');
    const setButton = document.getElementById('setButton');
    const progressBar = document.getElementById('progressBar');
    const percentageText = document.getElementById('percentage');

    let intervalId = null;

    function calculateAndUpdate() {
        const now = new Date();

        let wakeUpTime = new Date();
        const [wakeHours, wakeMinutes] = wakeUpTimeInput.value.split(':');
        wakeUpTime.setHours(wakeHours, wakeMinutes, 0, 0);

        let sleepTime = new Date();
        const [sleepHours, sleepMinutes] = sleepTimeInput.value.split(':');
        sleepTime.setHours(sleepHours, sleepMinutes, 0, 0);

        // Handle overnight case by determining the correct 24-hour window
        if (sleepTime <= wakeUpTime) {
            // If current time is in the early morning, it belongs to the previous day's cycle.
            if (now < sleepTime) {
                wakeUpTime.setDate(wakeUpTime.getDate() - 1);
            }
            // Otherwise, it's part of today's cycle, and the sleep time is tomorrow.
            else {
                sleepTime.setDate(sleepTime.getDate() + 1);
            }
        }

        // Now, based on the determined window, calculate the percentage.
        if (now < wakeUpTime) {
            updateUI(0);
            return;
        }
        if (now > sleepTime) {
            updateUI(100);
            return;
        }

        const totalAwakeTime = sleepTime.getTime() - wakeUpTime.getTime();
        const elapsedTime = now.getTime() - wakeUpTime.getTime();

        let percentage = (elapsedTime / totalAwakeTime) * 100;
        percentage = Math.max(0, Math.min(100, percentage)); // Clamp between 0% and 100%

        updateUI(percentage);
    }

    function updateUI(percentage) {
        progressBar.style.width = percentage + '%';
        percentageText.textContent = percentage.toFixed(2) + '%';
    }

    function startClock() {
        if (intervalId) {
            clearInterval(intervalId);
        }
        calculateAndUpdate();
        intervalId = setInterval(calculateAndUpdate, 1000);
    }

    setButton.addEventListener('click', startClock);

    // 페이지 로드 시 기본값으로 시계 시작
    startClock();
});
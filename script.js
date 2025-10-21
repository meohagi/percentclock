document.addEventListener('DOMContentLoaded', () => {
    // Time and settings elements
    const wakeUpTimeInput = document.getElementById('wakeUpTime');
    const sleepTimeInput = document.getElementById('sleepTime');
    const setButton = document.getElementById('setButton');
    const percentageText = document.getElementById('percentage');

    // Graph type and color option elements
    const graphTypeRadios = document.querySelectorAll('input[name="graphType"]');
    const colorRadios = document.querySelectorAll('input[name="color"]');

    // Progress bar elements
    const barContainer = document.getElementById('bar-container');
    const progressBar = document.getElementById('progressBar');

    // Progress circle elements
    const circleContainer = document.getElementById('circle-container');
    const circleProgress = document.getElementById('circleProgress');
    const radius = circleProgress.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    circleProgress.style.strokeDasharray = `${circumference} ${circumference}`;
    circleProgress.style.strokeDashoffset = circumference;

    let intervalId = null;

    function calculateAndUpdate() {
        const now = new Date();
        let wakeUpTime = new Date();
        const [wakeHours, wakeMinutes] = wakeUpTimeInput.value.split(':');
        wakeUpTime.setHours(wakeHours, wakeMinutes, 0, 0);

        let sleepTime = new Date();
        const [sleepHours, sleepMinutes] = sleepTimeInput.value.split(':');
        sleepTime.setHours(sleepHours, sleepMinutes, 0, 0);

        if (sleepTime <= wakeUpTime) {
            if (now < sleepTime) {
                wakeUpTime.setDate(wakeUpTime.getDate() - 1);
            } else {
                sleepTime.setDate(sleepTime.getDate() + 1);
            }
        }

        let percentage = 0;
        if (now >= wakeUpTime && now <= sleepTime) {
            const totalAwakeTime = sleepTime.getTime() - wakeUpTime.getTime();
            const elapsedTime = now.getTime() - wakeUpTime.getTime();
            percentage = (elapsedTime / totalAwakeTime) * 100;
        } else if (now > sleepTime) {
            percentage = 100;
        }

        percentage = Math.max(0, Math.min(100, percentage));
        updateUI(percentage);
    }

    function updateUI(percentage) {
        const selectedColor = document.querySelector('input[name="color"]:checked').value;
        const selectedGraph = document.querySelector('input[name="graphType"]:checked').value;

        // Update text
        percentageText.textContent = percentage.toFixed(2) + '%';

        // Toggle graph visibility
        barContainer.style.display = selectedGraph === 'bar' ? 'block' : 'none';
        circleContainer.style.display = selectedGraph === 'circle' ? 'block' : 'none';

        // Update bar graph
        progressBar.style.width = percentage + '%';
        progressBar.style.backgroundColor = selectedColor;

        // Update circle graph
        const offset = circumference - (percentage / 100) * circumference;
        circleProgress.style.strokeDashoffset = offset;
        circleProgress.style.stroke = selectedColor;
    }

    function startClock() {
        if (intervalId) clearInterval(intervalId);
        calculateAndUpdate();
        intervalId = setInterval(calculateAndUpdate, 1000);
    }

    // Event Listeners
    setButton.addEventListener('click', startClock);
    graphTypeRadios.forEach(radio => radio.addEventListener('change', calculateAndUpdate));
    colorRadios.forEach(radio => radio.addEventListener('change', calculateAndUpdate));

    // Quote elements
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');

    function displayRandomQuote() {
        if (typeof quotes !== 'undefined' && quotes.length > 0) {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            const randomQuote = quotes[randomIndex];
            quoteText.textContent = `"${randomQuote.quote}"`;
            quoteAuthor.textContent = `- ${randomQuote.author}`;
        }
    }

    // Initial start
    startClock();
    displayRandomQuote();
});
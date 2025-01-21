// Initialize an empty array to store ratings
let ratings = JSON.parse(localStorage.getItem('ratings')) || [];

// Reference to the fatigue rating input and display element
const fatigueRatingInput = document.getElementById('fatigueRating');
const ratingValueDisplay = document.getElementById('ratingValue');
const historyList = document.getElementById('historyList');
const historySection = document.getElementById('historySection');

// Update rating value display when slider moves
fatigueRatingInput.addEventListener('input', () => {
    ratingValueDisplay.textContent = fatigueRatingInput.value;
});

// Submit a new rating
function submitRating() {
    const newRating = fatigueRatingInput.value;
    const time = new Date().toLocaleTimeString(); // Capture current time

    // Save rating to the local array and to localStorage
    ratings.push({ time, rating: newRating });
    localStorage.setItem('ratings', JSON.stringify(ratings));

    // Refresh history list and chart
    updateHistoryList();
    updateChart();
}

// Update the list of ratings displayed
function updateHistoryList() {
    historyList.innerHTML = ''; // Clear existing list

    // Add each rating as a list item
    ratings.forEach((entry) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${entry.time}: ${entry.rating} / 10`;
        historyList.appendChild(listItem);
    });
}

// Initialize chart with data
const ctx = document.getElementById('fatigueChart').getContext('2d');
const fatigueChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Mental Fatigue Level',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
            tension: 0.1
        }]
    }
});

// Update chart with new ratings
function updateChart() {
    // Get the times and ratings for the chart
    const times = ratings.map(entry => entry.time);
    const values = ratings.map(entry => entry.rating);

    // Update chart data
    fatigueChart.data.labels = times;
    fatigueChart.data.datasets[0].data = values;
    fatigueChart.update();
}

// Initialize page with existing ratings
updateHistoryList();
updateChart();

// Toggle the visibility of the fatigue history section
function toggleHistory() {
    const historyVisible = historySection.style.display === 'block';
    
    if (historyVisible) {
        // Hide the history section
        historySection.style.maxHeight = '0';
        setTimeout(() => {
            historySection.style.display = 'none';
        }, 500);
        document.getElementById('toggleHistoryBtn').textContent = 'View Fatigue History';
    } else {
        // Show the history section
        historySection.style.display = 'block';
        setTimeout(() => {
            historySection.style.maxHeight = '400px'; // Show history with smooth transition
        }, 10);
        document.getElementById('toggleHistoryBtn').textContent = 'Hide Fatigue History';
    }
}

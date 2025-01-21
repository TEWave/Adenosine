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

    // Update chart
    updateChart();
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
updateChart();

// Initialize an empty array to store ratings
let ratings = JSON.parse(localStorage.getItem('ratings')) || [];
const lastSavedDate = localStorage.getItem('lastSavedDate');

// Reference to the fatigue rating input and display element
const fatigueRatingInput = document.getElementById('fatigueRating');
const ratingValueDisplay = document.getElementById('ratingValue');
const averageRatingDisplay = document.getElementById('averageRating');

// Update rating value display when slider moves
fatigueRatingInput.addEventListener('input', () => {
    ratingValueDisplay.textContent = fatigueRatingInput.value;
});

// Check if it's a new day and reset ratings at 8 AM
function checkDayReset() {
    const currentDate = new Date().toLocaleDateString();
    if (lastSavedDate !== currentDate) {
        ratings = [];  // Clear ratings for the new day
        localStorage.setItem('ratings', JSON.stringify(ratings));
        localStorage.setItem('lastSavedDate', currentDate);  // Save the current date
        updateChart();
    }
}

// Submit a new rating
function submitRating() {
    const newRating = fatigueRatingInput.value;
    const time = new Date().toLocaleTimeString(); // Capture current time

    // Save rating to the local array and to localStorage
    ratings.push({ time, rating: newRating });
    localStorage.setItem('ratings', JSON.stringify(ratings));

    // Update chart and average
    updateChart();
    updateAverage();
}

// Calculate the average rating
function calculateAverage() {
    if (ratings.length === 0) return 0;
    const total = ratings.reduce((sum, entry) => sum + parseInt(entry.rating), 0);
    return (total / ratings.length).toFixed(1); // Return the average, rounded to 1 decimal place
}

// Update the chart with new ratings
function updateChart() {
    const ctx = document.getElementById('fatigueChart').getContext('2d');
    const fatigueChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ratings.map(entry => entry.time),
            datasets: [{
                label: 'Mental Fatigue Level',
                data: ratings.map(entry => entry.rating),
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
                tension: 0.1
            }]
        }
    });
}

// Update the average rating display
function updateAverage() {
    const average = calculateAverage();
    averageRatingDisplay.textContent = `Average Rating: ${average}/10`;
}

// Initialize the page and check for daily reset
checkDayReset();
updateChart();
updateAverage();

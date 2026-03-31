// State Arrays
const historyData = [];

// DOM Elements
const form = document.getElementById('eval-form');
const locationInput = document.getElementById('location');
const ratingInput = document.getElementById('rating');
const ratingVal = document.getElementById('rating-val');

const resultsCard = document.getElementById('results-card');
const statusBadge = document.getElementById('status-badge');
const riskValue = document.getElementById('risk-value');
const progressFill = document.getElementById('progress-fill');
const aiInsight = document.getElementById('ai-insight');

const historySection = document.getElementById('history-section');
const historyList = document.getElementById('history-list');

// Update UI text when slider moves
ratingInput.addEventListener('input', (e) => {
    ratingVal.textContent = e.target.value;
});

// Analyze function matching requested precise UX messaging
function analyzeLocation(location, rating) {
    let riskPercentage = 0;
    let status = '';
    let message = '';
    let colorClass = '';
    let barColor = '';

    // Advanced mapping corresponding exactly to requests
    if (rating == 1) {
        riskPercentage = Math.floor(Math.random() * (100 - 80) + 80); // 80-100%
        status = 'Unsafe 🔴';
        colorClass = 'status-unsafe';
        barColor = 'var(--unsafe)';
        message = 'This area appears unsafe based on current input and community trends. Please exercise caution.';
    } else if (rating == 2) {
        riskPercentage = Math.floor(Math.random() * (79 - 60) + 60); // 60-79%
        status = 'Moderate-High Risk 🟠';
        colorClass = 'status-unsafe';
        barColor = 'var(--unsafe)';
        message = 'Moderate risk detected based on current input. Remain vigilant and plan your routes.';
    } else if (rating == 3) {
        riskPercentage = Math.floor(Math.random() * (59 - 40) + 40); // 40-59%
        status = 'Moderate Risk 🟡';
        colorClass = 'status-moderate';
        barColor = 'var(--moderate)';
        message = 'This area is of moderate risk. Practice standard situational awareness when walking here.';
    } else if (rating == 4) {
        riskPercentage = Math.floor(Math.random() * (39 - 20) + 20); // 20-39%
        status = 'Fairly Safe 🟢';
        colorClass = 'status-safe';
        barColor = 'var(--safe)';
        message = 'This area appears mostly safe based on current input, with no major recurrent anomalies.';
    } else {
        // rating == 5
        riskPercentage = Math.floor(Math.random() * (19 - 5) + 5); // 5-19%
        status = 'Safe 🟢';
        colorClass = 'status-safe';
        barColor = 'var(--safe)';
        message = 'This area appears safe based on current input. Community-driven data reflects a highly secure environment.';
    }

    return {
        location,
        rating,
        riskPercentage,
        status,
        colorClass,
        barColor,
        message,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
}

// Function to update the Previous Entries list visually
function updateHistoryUI(data) {
    historySection.style.display = 'block';
    
    // Create new element
    const div = document.createElement('div');
    div.className = 'history-item fade-in';
    
    div.innerHTML = `
        <div class="h-info">
            <h4>${data.location}</h4>
            <p>Rating: ${data.rating} ⭐️ • ${data.time}</p>
        </div>
        <div class="h-badge ${data.colorClass}">
            ${data.riskPercentage}% Risk
        </div>
    `;
    
    // Add to top of list
    historyList.insertBefore(div, historyList.firstChild);
}

// Intercept form styling
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const loc = locationInput.value.trim();
    if (!loc) return;
    const r = parseInt(ratingInput.value, 10);

    const btn = form.querySelector('.btn-submit');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Analyzing... ⏳';
    btn.disabled = true;

    // Simulate subtle AI loading effect to make UI feel elegant
    setTimeout(() => {
        const result = analyzeLocation(loc, r);
        
        // Push state
        historyData.push(result);

        // Render card with subtle transition
        resultsCard.classList.remove('hidden');
        resultsCard.style.display = 'block';
        
        // Reset animation cleanly
        resultsCard.classList.remove('fade-in');
        void resultsCard.offsetWidth; // browser reflow trick
        resultsCard.classList.add('fade-in');

        // Populate Result Fields
        statusBadge.className = `status-badge ${result.colorClass}`;
        statusBadge.textContent = result.status;
        riskValue.textContent = `${result.riskPercentage}%`;
        
        // Progress bar smooth animation
        progressFill.style.width = '0%';
        setTimeout(() => {
            progressFill.style.width = `${result.riskPercentage}%`;
            progressFill.style.backgroundColor = result.barColor;
        }, 50);

        aiInsight.textContent = result.message;

        // Populate History component
        updateHistoryUI(result);

        // Reset submit button 
        btn.innerHTML = originalText;
        btn.disabled = false;
        
        // Prepare for next entry
        locationInput.value = '';
    }, 800);
});

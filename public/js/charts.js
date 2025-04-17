// public/js/charts.js

const channelID = '2911154'; // 👈 Put your actual channel ID
const readAPIKey = 'PDCDB455C703IJ6C'; // 👈 Put your actual read API Key
const url = '/patient/vitals'; // fetch from your own server

async function fetchData() {
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (!data || !Array.isArray(data.feeds)) {
        console.error('Invalid data format received:', data);
        return [];
      }
  
      return data.feeds;
    } catch (error) {
      console.error('Error fetching ThingSpeak data:', error);
      return [];
    }
  }  

  async function updateCharts() {
    const feeds = await fetchData();
  
    const labels = feeds.map((_, index) => index + 1); // X-Axis (sample 1, 2, 3...)
    const temperatures = feeds.map(feed => parseFloat(feed.field1));
    const heartRates = feeds.map(feed => parseFloat(feed.field2));
    const spo2s = feeds.map(feed => parseFloat(feed.field3));
  
    // Make sure the old chart is removed before creating a new one
    if (window.temperatureChart) window.temperatureChart.destroy();
    if (window.heartRateChart) window.heartRateChart.destroy();
    if (window.spo2Chart) window.spo2Chart.destroy();
  
    const tempCtx = document.getElementById('temperatureChart').getContext('2d');
    window.temperatureChart = new Chart(tempCtx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Temperature (°C)',
          data: temperatures,
          borderColor: 'blue',
          fill: false
        }]
      }
    });
  
    const hrCtx = document.getElementById('heartRateChart').getContext('2d');
    window.heartRateChart = new Chart(hrCtx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Heart Rate (bpm)',
          data: heartRates,
          borderColor: 'red',
          fill: false
        }]
      }
    });
  
    const spo2Ctx = document.getElementById('spo2Chart').getContext('2d');
    window.spo2Chart = new Chart(spo2Ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'SpO₂ (%)',
          data: spo2s,
          borderColor: 'green',
          fill: false
        }]
      }
    });
  }
  
  // ✅ Now OUTSIDE the function
  updateCharts();               // First load
  setInterval(updateCharts, 15000);  // Then refresh every 15 seconds  
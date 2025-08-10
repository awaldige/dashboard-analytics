const ctxLine = document.getElementById('lineChart').getContext('2d');

const fullLabels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const fullData = [1200, 1900, 3000, 500, 2000, 3000, 4000, 2500, 2200, 1800, 2300, 2800];

let lineChart = null;

function updateLineChart(range) {
  const labels = fullLabels.slice(0, range);
  const data = fullData.slice(0, range);

  if (lineChart) lineChart.destroy();

  lineChart = new Chart(ctxLine, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Acessos Diários',
        data,
        fill: true,
        borderColor: 'rgba(78, 115, 223, 1)',
        backgroundColor: 'rgba(78, 115, 223, 0.1)',
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

document.getElementById('rangeSelect').addEventListener('change', (e) => {
  updateLineChart(parseInt(e.target.value));
});

// Inicializa com 12 meses
updateLineChart(12);
;

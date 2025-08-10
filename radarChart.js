const ctxRadar = document.getElementById('radarChart').getContext('2d');
new Chart(ctxRadar, {
  type: 'radar',
  data: {
    labels: ['Velocidade', 'Força', 'Resistência', 'Agilidade', 'Tática', 'Comunicação'],
    datasets: [{
      label: 'Desempenho',
      data: [65, 59, 90, 81, 56, 55],
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      pointBackgroundColor: 'rgba(255, 99, 132, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255, 99, 132, 1)'
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        ticks: { stepSize: 20 }
      }
    }
  }
});


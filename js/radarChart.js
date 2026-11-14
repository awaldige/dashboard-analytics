
let radarChartInstance = null;

function createRadarChart(data) {
    const canvas = document.getElementById('radarChart');

    if (!canvas) return;

    if (radarChartInstance) {
        radarChartInstance.destroy();
    }

    const ctx = canvas.getContext('2d');

    radarChartInstance = new Chart(ctx, {
        type: 'radar',

        data: {
            labels: data.labels,

            datasets: [{
                label: 'Desempenho',
                data: data.values,

                backgroundColor: 'rgba(59, 130, 246, 0.20)',
                borderColor: '#3b82f6',
                borderWidth: 2,

                pointBackgroundColor: '#60a5fa',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    display: false
                },

                tooltip: {
                    backgroundColor: '#151f30',
                    titleColor: '#ffffff',
                    bodyColor: '#cbd5e1',
                    padding: 12,

                    callbacks: {
                        label: function(context) {
                            return ' ' + context.parsed.r + '%';
                        }
                    }
                }
            },

            scales: {
                r: {
                    min: 0,
                    max: 100,

                    ticks: {
                        stepSize: 20,
                        color: '#94a3b8',
                        backdropColor: 'transparent',
                        font: {
                            size: 9
                        }
                    },

                    grid: {
                        color: 'rgba(148, 163, 184, 0.15)'
                    },

                    angleLines: {
                        color: 'rgba(148, 163, 184, 0.15)'
                    },

                    pointLabels: {
                        color: '#94a3b8',
                        font: {
                            size: 10
                        }
                    }
                }
            }
        }
    });
}

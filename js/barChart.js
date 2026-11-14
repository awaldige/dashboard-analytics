
let barChartInstance = null;

function createBarChart(data) {
    const canvas = document.getElementById('barChart');

    if (!canvas) return;

    if (barChartInstance) {
        barChartInstance.destroy();
    }

    const ctx = canvas.getContext('2d');

    barChartInstance = new Chart(ctx, {
        type: 'bar',

        data: {
            labels: data.labels,

            datasets: [{
                label: 'Vendas',
                data: data.values,
                backgroundColor: [
                    '#3b82f6',
                    '#8b5cf6',
                    '#10b981',
                    '#f59e0b',
                    '#06b6d4'
                ],
                borderRadius: 7,
                borderSkipped: false,
                maxBarThickness: 48
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
                    displayColors: false,

                    callbacks: {
                        label: function(context) {
                            return ' ' + context.parsed.y +
                                ' vendas';
                        }
                    }
                }
            },

            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#94a3b8',
                        font: {
                            size: 10
                        }
                    },
                    border: {
                        display: false
                    }
                },

                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(148, 163, 184, 0.10)'
                    },
                    ticks: {
                        color: '#94a3b8',
                        precision: 0,
                        font: {
                            size: 10
                        }
                    },
                    border: {
                        display: false
                    }
                }
            }
        }
    });
}

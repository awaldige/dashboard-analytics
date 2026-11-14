
let lineChartInstance = null;

function createLineChart(data) {
    const canvas = document.getElementById('lineChart');

    if (!canvas) return;

    if (lineChartInstance) {
        lineChartInstance.destroy();
    }

    const ctx = canvas.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.30)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0.01)');

    lineChartInstance = new Chart(ctx, {
        type: 'line',

        data: {
            labels: data.labels,
            datasets: [{
                label: 'Receita',
                data: data.values,
                borderColor: '#3b82f6',
                backgroundColor: gradient,
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 7,
                pointBackgroundColor: '#3b82f6',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2
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
                            return ' Receita: ' +
                                context.parsed.y.toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                });
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
                        font: {
                            size: 10
                        },
                        callback: function(value) {
                            return 'R$ ' +
                                Number(value).toLocaleString('pt-BR');
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

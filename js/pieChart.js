
let pieChartInstance = null;

function createPieChart(data) {
    const canvas = document.getElementById('pieChart');

    if (!canvas) return;

    if (pieChartInstance) {
        pieChartInstance.destroy();
    }

    const ctx = canvas.getContext('2d');

    pieChartInstance = new Chart(ctx, {
        type: 'doughnut',

        data: {
            labels: data.labels,

            datasets: [{
                label: 'Clientes',
                data: data.values,

                backgroundColor: [
                    '#3b82f6',
                    '#10b981',
                    '#f59e0b'
                ],

                borderColor: '#151f30',
                borderWidth: 4,
                hoverOffset: 8
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '68%',

            plugins: {
                legend: {
                    position: 'bottom',

                    labels: {
                        color: '#94a3b8',
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        font: {
                            size: 10
                        }
                    }
                },

                tooltip: {
                    backgroundColor: '#151f30',
                    titleColor: '#ffffff',
                    bodyColor: '#cbd5e1',
                    padding: 12,

                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data
                                .reduce((sum, value) => sum + value, 0);

                            const percentage = (
                                context.parsed / total * 100
                            ).toFixed(1);

                            return ' ' + context.label + ': ' +
                                context.parsed + ' (' +
                                percentage + '%)';
                        }
                    }
                }
            }
        }
    });
}

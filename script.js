
/* =========================================
   DASHBOARD ANALYTICS
   AW TECHNOLOGY
   Dados exclusivamente demonstrativos
========================================= */

// =========================================
// 1. DADOS SIMULADOS
// =========================================

const dashboardData = {

    months: [
        'Dez/24', 'Jan/25', 'Fev/25', 'Mar/25',
        'Abr/25', 'Mai/25', 'Jun/25', 'Jul/25',
        'Ago/25', 'Set/25', 'Out/25', 'Nov/25',
        'Dez/25', 'Jan/26', 'Fev/26', 'Mar/26',
        'Abr/26', 'Mai/26', 'Jun/26', 'Jul/26',
        'Ago/26', 'Set/26', 'Out/26', 'Nov/26'
    ],

    revenue: [
        15000, 16500, 17800, 18200,
        19000, 20500, 18500, 22000,
        19800, 26500, 28900, 31000,
        27800, 34500, 36800, 39200,
        42100, 46500, 43800, 48000,
        51200, 49500, 53500, 58000
    ],

    salesMonthly: [
        35, 38, 39, 40, 42, 43,
        44, 45, 46, 47, 48, 51,
        42, 45, 48, 46, 50, 51,
        49, 53, 55, 56, 58, 62
    ],

    activeCustomersMonthly: [
        500, 510, 520, 525, 530, 540,
        550, 560, 565, 570, 580, 585,
        590, 600, 610, 615, 620, 630,
        640, 650, 655, 665, 670, 680
    ],

    conversionMonthly: [
        3.8, 3.9, 4.0, 4.1, 4.0, 4.1,
        4.2, 4.3, 4.4, 4.5, 4.6, 4.5,
        4.2, 4.3, 4.4, 4.5, 4.6, 4.7,
        4.8, 4.9, 5.0, 5.1, 5.2, 5.9
    ],

    sales: [
        { label: 'Eletrônicos', value: 185 },
        { label: 'Vestuário', value: 142 },
        { label: 'Acessórios', value: 118 },
        { label: 'Casa', value: 96 },
        { label: 'Outros', value: 74 }
    ],

    inactiveCustomers: 190,

    performanceMonthly: {

        retention: [
            82, 83, 83, 84, 84, 85,
            85, 86, 86, 87, 87, 88,
            86, 86, 87, 87, 88, 88,
            89, 89, 90, 90, 91, 92
        ],

        satisfaction: [
            88, 89, 89, 90, 90, 91,
            91, 92, 92, 93, 93, 94,
            90, 91, 91, 92, 92, 93,
            93, 94, 94, 95, 95, 96
        ],

        growth: [
            65, 66, 67, 68, 69, 70,
            71, 72, 73, 74, 75, 76,
            72, 73, 74, 75, 76, 77,
            78, 79, 80, 81, 82, 84
        ],

        efficiency: [
            75, 76, 77, 77, 78, 79,
            80, 80, 81, 82, 83, 84,
            80, 81, 82, 83, 84, 85,
            85, 86, 87, 88, 89, 90
        ]
    },

    activities: [
        {
            description: 'Venda #1048',
            category: 'Eletrônicos',
            value: 2499.90,
            status: 'Concluído'
        },
        {
            description: 'Venda #1047',
            category: 'Vestuário',
            value: 389.90,
            status: 'Concluído'
        },
        {
            description: 'Venda #1046',
            category: 'Acessórios',
            value: 159.90,
            status: 'Pendente'
        },
        {
            description: 'Venda #1045',
            category: 'Casa',
            value: 729.90,
            status: 'Concluído'
        },
        {
            description: 'Venda #1044',
            category: 'Eletrônicos',
            value: 1899.90,
            status: 'Pendente'
        }
    ]
};

// =========================================
// 2. ELEMENTOS E CONFIGURAÇÕES
// =========================================

const rangeSelect = document.getElementById('rangeSelect');
const themeToggle = document.getElementById('themeToggle');

const formatCurrency = value =>
    Number(value || 0).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

const formatNumber = value =>
    Number(value || 0).toLocaleString('pt-BR');

function getPeriodData(data, period) {
    return data.slice(-period);
}

function getAverage(data) {

    if (!data || !data.length) {
        return 0;
    }

    return data.reduce(
        (total, value) => total + value,
        0
    ) / data.length;
}

function getElement(id) {

    const element = document.getElementById(id);

    if (!element) {
        console.error(`Elemento não encontrado: ${id}`);
    }

    return element;
}

// =========================================
// 3. VALIDAÇÃO DOS DADOS
// =========================================

function validateDashboardData() {

    const totalMonths = dashboardData.months.length;

    const monthlyArrays = [
        dashboardData.revenue,
        dashboardData.salesMonthly,
        dashboardData.activeCustomersMonthly,
        dashboardData.conversionMonthly,
        dashboardData.performanceMonthly.retention,
        dashboardData.performanceMonthly.satisfaction,
        dashboardData.performanceMonthly.growth,
        dashboardData.performanceMonthly.efficiency
    ];

    const invalidArray = monthlyArrays.some(
        data => !Array.isArray(data) || data.length !== totalMonths
    );

    if (invalidArray) {
        throw new Error(
            'Os dados mensais possuem quantidades diferentes de registros.'
        );
    }

    if (!dashboardData.sales.length) {
        throw new Error('Não existem categorias de vendas cadastradas.');
    }

    return true;
}

// =========================================
// 4. VALIDAÇÃO DO PERÍODO
// =========================================

function getSelectedPeriod() {

    const selectedValue = Number(rangeSelect?.value ?? 6);

    const totalMonths = dashboardData.months.length;

    if (
        !Number.isInteger(selectedValue) ||
        selectedValue <= 0 ||
        selectedValue > totalMonths
    ) {
        throw new Error('Período selecionado inválido.');
    }

    return selectedValue;
}

// =========================================
// 5. CÁLCULO DE CRESCIMENTO
// =========================================

function calculateGrowth(current, previous) {

    if (
        previous === null ||
        previous === undefined ||
        !Number.isFinite(previous) ||
        previous <= 0
    ) {
        return 0;
    }

    return ((current - previous) / previous) * 100;
}

// Retorna os dados do período anterior.
// Se não houver um período completo disponível,
// a comparação não será realizada.

function getPreviousPeriodData(data, period) {

    const totalMonths = dashboardData.months.length;
    const currentStart = totalMonths - period;
    const previousStart = currentStart - period;

    if (previousStart < 0) {
        return [];
    }

    return data.slice(previousStart, currentStart);
}

// =========================================
// 6. INDICADORES VISUAIS
// =========================================

function updateTrend(elementId, value) {

    const element = document.getElementById(elementId);

    if (!element) {
        console.error(`Elemento não encontrado: ${elementId}`);
        return;
    }

    const safeValue = Number.isFinite(value) ? value : 0;
    const positive = safeValue >= 0;

    element.textContent =
        (positive ? '▲ ' : '▼ ') +
        Math.abs(safeValue).toFixed(1).replace('.', ',') +
        '%';

    element.classList.remove('positive', 'negative');

    element.classList.add(
        positive ? 'positive' : 'negative'
    );
}

// =========================================
// 7. ATUALIZAÇÃO DOS INDICADORES
// =========================================

function updateKPIs(period) {

    const totalMonths = dashboardData.months.length;
    const start = totalMonths - period;

    // RECEITA

    const currentRevenue = getPeriodData(
        dashboardData.revenue,
        period
    );

    const previousRevenue = getPreviousPeriodData(
        dashboardData.revenue,
        period
    );

    const revenue = currentRevenue.reduce(
        (total, value) => total + value,
        0
    );

    const oldRevenue = previousRevenue.reduce(
        (total, value) => total + value,
        0
    );

    // VENDAS

    const currentSales = getPeriodData(
        dashboardData.salesMonthly,
        period
    );

    const previousSales = getPreviousPeriodData(
        dashboardData.salesMonthly,
        period
    );

    const sales = currentSales.reduce(
        (total, value) => total + value,
        0
    );

    const oldSales = previousSales.reduce(
        (total, value) => total + value,
        0
    );

    // CLIENTES ATIVOS

    const customers =
        dashboardData.activeCustomersMonthly[totalMonths - 1];

    const oldCustomers = start > 0
        ? dashboardData.activeCustomersMonthly[start - 1]
        : null;

    // CONVERSÃO

    const conversion = getAverage(
        getPeriodData(
            dashboardData.conversionMonthly,
            period
        )
    );

    const previousConversion = getPreviousPeriodData(
        dashboardData.conversionMonthly,
        period
    );

    const oldConversion = getAverage(previousConversion);

    // ATUALIZAÇÃO DOS CARTÕES

    const revenueElement = getElement('revenueValue');
    const salesElement = getElement('salesValue');
    const customersElement = getElement('customersValue');
    const conversionElement = getElement('conversionValue');

    if (revenueElement) {
        revenueElement.textContent = formatCurrency(revenue);
    }

    if (salesElement) {
        salesElement.textContent = formatNumber(sales);
    }

    if (customersElement) {
        customersElement.textContent = formatNumber(customers);
    }

    if (conversionElement) {
        conversionElement.textContent =
            conversion.toFixed(1).replace('.', ',') + '%';
    }

    // PERCENTUAIS

    updateTrend(
        'revenueTrend',
        previousRevenue.length === period
            ? calculateGrowth(revenue, oldRevenue)
            : 0
    );

    updateTrend(
        'salesTrend',
        previousSales.length === period
            ? calculateGrowth(sales, oldSales)
            : 0
    );

    updateTrend(
        'customersTrend',
        oldCustomers !== null
            ? calculateGrowth(customers, oldCustomers)
            : 0
    );

    updateTrend(
        'conversionTrend',
        previousConversion.length === period
            ? calculateGrowth(conversion, oldConversion)
            : 0
    );
}

// =========================================
// 8. GRÁFICO DE RECEITA
// =========================================

function updateRevenueChart(period) {

    createLineChart({

        labels: getPeriodData(
            dashboardData.months,
            period
        ),

        values: getPeriodData(
            dashboardData.revenue,
            period
        )
    });
}

// =========================================
// 9. GRÁFICO DE VENDAS POR CATEGORIA
// =========================================

function distributeSalesByCategory(totalSales) {

    const baseTotal = dashboardData.sales.reduce(
        (total, item) => total + item.value,
        0
    );

    const categories = dashboardData.sales.map(item => {

        const exactValue =
            (item.value / baseTotal) * totalSales;

        return {
            label: item.label,
            value: Math.floor(exactValue),
            remainder: exactValue - Math.floor(exactValue)
        };
    });

    let remaining = totalSales - categories.reduce(
        (total, item) => total + item.value,
        0
    );

    const ordered = [...categories].sort(
        (a, b) => b.remainder - a.remainder
    );

    for (let i = 0; i < remaining; i++) {
        ordered[i % ordered.length].value++;
    }

    return categories;
}

function updateSalesChart(period) {

    const totalSales = getPeriodData(
        dashboardData.salesMonthly,
        period
    ).reduce(
        (total, value) => total + value,
        0
    );

    const categories = distributeSalesByCategory(totalSales);

    createBarChart({

        labels: categories.map(item => item.label),

        values: categories.map(item => item.value)
    });
}

// =========================================
// 10. GRÁFICO DE CLIENTES
// =========================================

function updateCustomersChart(period) {

    const totalMonths = dashboardData.months.length;
    const start = totalMonths - period;

    const initialCustomers =
        start > 0
            ? dashboardData.activeCustomersMonthly[start - 1]
            : dashboardData.activeCustomersMonthly[0];

    const finalCustomers =
        dashboardData.activeCustomersMonthly[totalMonths - 1];

    const newCustomers = Math.max(
        0,
        finalCustomers - initialCustomers
    );

    createPieChart({

        labels: [
            'Base inicial',
            'Inativos',
            'Novos no período'
        ],

        values: [
            initialCustomers,
            dashboardData.inactiveCustomers,
            newCustomers
        ]
    });
}

// =========================================
// 11. GRÁFICO DE DESEMPENHO
// =========================================

function updatePerformanceChart(period) {

    const conversion = getAverage(
        getPeriodData(
            dashboardData.conversionMonthly,
            period
        )
    );

    const retention = getAverage(
        getPeriodData(
            dashboardData.performanceMonthly.retention,
            period
        )
    );

    const satisfaction = getAverage(
        getPeriodData(
            dashboardData.performanceMonthly.satisfaction,
            period
        )
    );

    const growth = getAverage(
        getPeriodData(
            dashboardData.performanceMonthly.growth,
            period
        )
    );

    const efficiency = getAverage(
        getPeriodData(
            dashboardData.performanceMonthly.efficiency,
            period
        )
    );

    createRadarChart({

        labels: [
            'Conversão',
            'Retenção',
            'Satisfação',
            'Crescimento',
            'Eficiência'
        ],

        values: [
            conversion * 20,
            retention,
            satisfaction,
            growth,
            efficiency
        ]
    });
}

// =========================================
// 12. GERAÇÃO DAS ATIVIDADES
// =========================================

function generateActivities() {

    const allActivities = [];

    dashboardData.months.forEach((month, index) => {

        const monthSales = dashboardData.salesMonthly[index];
        const monthRevenue = dashboardData.revenue[index];

        const averageTicket = monthRevenue / monthSales;

        dashboardData.sales.forEach((category, categoryIndex) => {

            const value = averageTicket * (
                0.65 + categoryIndex * 0.18
            );

            allActivities.push({

                description:
                    `Venda #${1000 + index * 5 + categoryIndex + 1}`,

                category: category.label,

                value,

                status: (index + categoryIndex) % 4 === 0
                    ? 'Pendente'
                    : 'Concluído',

                month,

                monthIndex: index
            });
        });
    });

    return allActivities;
}

// =========================================
// 13. TABELA DE ATIVIDADES RECENTES
// =========================================

function updateActivityTable(period) {

    const table = document.getElementById('activityTable');

    if (!table) {
        console.error('Tabela de atividades não encontrada.');
        return;
    }

    // Limpa os registros anteriores.

    table.innerHTML = '';

    const totalMonths = dashboardData.months.length;
    const start = totalMonths - period;

    // Gera todas as atividades demonstrativas.

    const activities = generateActivities();

    // Filtra somente as atividades do período escolhido.

    const filteredActivities = activities
        .filter(activity => activity.monthIndex >= start)
        .sort((a, b) => a.monthIndex - b.monthIndex);

    if (!filteredActivities.length) {

        const row = document.createElement('tr');
        const cell = document.createElement('td');

        cell.colSpan = 4;
        cell.textContent = 'Nenhuma atividade encontrada.';
        cell.style.textAlign = 'center';

        row.appendChild(cell);
        table.appendChild(row);

        return;
    }

    // Seleciona até cinco atividades distribuídas
    // ao longo do período selecionado.

    const numberOfRows = Math.min(
        5,
        filteredActivities.length
    );

    const selectedActivities = [];

    for (let i = 0; i < numberOfRows; i++) {

        const position = numberOfRows === 1
            ? filteredActivities.length - 1
            : Math.round(
                i * (filteredActivities.length - 1) /
                (numberOfRows - 1)
            );

        selectedActivities.push(
            filteredActivities[position]
        );
    }

    // Exibe da mais recente para a mais antiga.

    selectedActivities.reverse().forEach(activity => {

        const row = document.createElement('tr');

        const description = document.createElement('td');
        description.textContent = activity.description;

        const category = document.createElement('td');
        category.textContent = activity.category;

        const value = document.createElement('td');
        value.textContent = formatCurrency(activity.value);

        const statusCell = document.createElement('td');

        const status = document.createElement('span');

        status.className =
            activity.status === 'Concluído'
                ? 'table-status completed'
                : 'table-status pending';

        status.textContent = activity.status;

        statusCell.appendChild(status);

        row.append(
            description,
            category,
            value,
            statusCell
        );

        table.appendChild(row);
    });
}

// =========================================
// 14. ATUALIZAÇÃO GERAL DO DASHBOARD
// =========================================

function updateDashboard() {

    const period = getSelectedPeriod();

    // INDICADORES

    updateKPIs(period);

    // GRÁFICOS

    updateRevenueChart(period);
    updateSalesChart(period);
    updateCustomersChart(period);
    updatePerformanceChart(period);

    // TABELA DE ATIVIDADES

    updateActivityTable(period);

    console.log(
        `Dashboard atualizado: últimos ${period} meses.`
    );
}

// =========================================
// 15. FILTRO DE PERÍODO
// =========================================

if (rangeSelect) {

    rangeSelect.addEventListener('change', () => {

        try {

            updateDashboard();

        } catch (error) {

            console.error(
                'Erro ao atualizar período:',
                error
            );
        }
    });

} else {

    console.error('Seletor de período não encontrado.');
}

// =========================================
// 16. ALTERNÂNCIA DE TEMA
// =========================================

if (themeToggle) {

    themeToggle.addEventListener('click', () => {

        document.body.classList.toggle('light-theme');

        const lightTheme =
            document.body.classList.contains('light-theme');

        themeToggle.textContent = lightTheme ? '☀' : '☾';
    });
}

// =========================================
// 17. INICIALIZAÇÃO
// =========================================

function initDashboard() {

    try {

        validateDashboardData();

        updateDashboard();

        console.log(
            'Dashboard Analytics inicializado com sucesso.'
        );

    } catch (error) {

        console.error(
            'Erro ao inicializar o dashboard:',
            error
        );
    }
}

initDashboard();

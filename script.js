let chartLine = null;
let chartBar = null;
let chartPie = null;
let chartRadar = null;

async function initDashboard() {
  const data = await fetchDashboardData();

  // Line Chart (Acessos Diários)
  const canvasLine = document.getElementById("lineChart");
  if (canvasLine) {
    if (chartLine) chartLine.destroy();
    chartLine = new Chart(canvasLine.getContext("2d"), {
      type: "line",
      data: {
        labels: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
        datasets: [{
          label: "Acessos",
          data: [120, 190, 150, 220, 300, 250, 400],
          borderColor: "#4e73df",
          backgroundColor: "rgba(78, 115, 223, 0.1)",
          tension: 0.4,
          fill: true,
        }],
      },
      options: { responsive: true },
    });
  }

  // Bar Chart (Vendas por Categoria)
  const canvasBar = document.getElementById("barChart");
  if (canvasBar) {
    if (chartBar) chartBar.destroy();
    chartBar = new Chart(canvasBar.getContext("2d"), {
      type: "bar",
      data: {
        labels: ["Eletrônicos", "Roupas", "Casa", "Beleza", "Livros"],
        datasets: [{
          label: "Vendas",
          data: [200, 150, 100, 80, 120],
          backgroundColor: [
            "#4e73df", "#1cc88a", "#36b9cc", "#f6c23e", "#e74a3b"
          ],
        }],
      },
      options: { responsive: true },
    });
  }

  // Pie Chart (Usuários)
  const canvasPie = document.getElementById("pieChart");
  if (canvasPie) {
    if (chartPie) chartPie.destroy();
    chartPie = new Chart(canvasPie.getContext("2d"), {
      type: "pie",
      data: {
        labels: ["Ativos", "Inativos", "Suspensos"],
        datasets: [{
          label: "Usuários",
          data: [300, 50, 20],
          backgroundColor: [
            "#4e73df", "#1cc88a", "#f6c23e"
          ],
          borderColor: "#fff",
          borderWidth: 2,
        }],
      },
      options: { responsive: true },
    });
  }

  // Radar Chart (Desempenho)
  const canvasRadar = document.getElementById("radarChart");
  if (canvasRadar) {
    if (chartRadar) chartRadar.destroy();
    chartRadar = new Chart(canvasRadar.getContext("2d"), {
      type: "radar",
      data: {
        labels: ["Qualidade", "Velocidade", "Atendimento", "Custo", "Flexibilidade"],
        datasets: [{
          label: "Desempenho",
          data: [80, 90, 70, 85, 75],
          fill: true,
          backgroundColor: "rgba(78, 115, 223, 0.2)",
          borderColor: "#4e73df",
          pointBackgroundColor: "#4e73df",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#4e73df",
        }],
      },
      options: { responsive: true },
    });
  }
}

// Inicializa após DOM pronto
document.addEventListener("DOMContentLoaded", initDashboard);



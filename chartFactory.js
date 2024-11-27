
import ChartJsChart from "./chartJsChart.js";

const roundedRectanglePlugin = {
  id: 'roundedRectangle',
  beforeDraw: (chart) => {
      const ctx = chart.ctx;
      const chartArea = chart.chartArea;

      ctx.save();
      ctx.fillStyle = 'white'; // Fill color for the rounded rectangle
      ctx.beginPath();
      const radius = 20; // Radius for rounding corners

      // Draw rounded rectangle
      ctx.moveTo(chartArea.left + radius, chartArea.top);
      ctx.lineTo(chartArea.right - radius, chartArea.top);
      ctx.quadraticCurveTo(chartArea.right, chartArea.top, chartArea.right, chartArea.top + radius);
      ctx.lineTo(chartArea.right, chartArea.bottom - radius);
      ctx.quadraticCurveTo(chartArea.right, chartArea.bottom, chartArea.right - radius, chartArea.bottom);
      ctx.lineTo(chartArea.left + radius, chartArea.bottom);
      ctx.quadraticCurveTo(chartArea.left, chartArea.bottom, chartArea.left, chartArea.bottom - radius);
      ctx.lineTo(chartArea.left, chartArea.top + radius);
      ctx.quadraticCurveTo(chartArea.left, chartArea.top, chartArea.left + radius, chartArea.top);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
  }
};

function createChartJsLineChart(ctx, config) {
    const mergedConfig = {
      type: 'line',
      data: {
        labels: [],  
        datasets: [{
          label: config.modelTopic,
          data: [], 
          borderColor: config.modelType === "SpectrumModel" ? "rgba(255, 0, 0, 1)": "rgba(70, 130, 180, 1)",  
          backgroundColor: 'rgba(255, 179, 186, 0.2)',  
          pointRadius: config.modelType === "SpectrumModel" ? 0 : 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        animation: {
          duration: 1000, 
        },
        scales: {
          x: {
            reverse: config.modelType === "SpectrumModel" ? true : false,
            display: true,
            title: {
              display: true,
              text: config.xLabel
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: config.yLabel
            },
          }
        },
        layout: {
          padding: {
              left: 10,
              right: 10,
              top: 10,
              bottom: 10
          }
      }
      },
      plugins: [roundedRectanglePlugin]
    };
  
    return new Chart(ctx, mergedConfig);
  }

  function createSubDivs(container, models){
    

    function createDivs(models) {
        for (const model of models) {
 
            const newDiv = document.createElement('div');
            
            newDiv.style.width = `80%`;
            newDiv.style.height = `48%`;
            newDiv.style.border = '1px solid black';
            newDiv.style.margin = '2%';
            newDiv.style.backgroundColor = "#fffbf7";
            newDiv.style.borderRadius = "10px";

            const newCanvas = document.createElement("canvas");
            newCanvas.id = `chartDiv ${model.topic}`;
            newDiv.appendChild(newCanvas);

            container.appendChild(newDiv);
        }
    }

    
    createDivs(models);
  }

  const createConfig = model =>{
    const config = {
        xLabel: `${model.xQuantity} (${model.xUnit})`,
        yLabel: `${model.yQuantity} (${model.yUnit})`,
        modelTopic: model.topic,
        modelType: model.modelType
    };

    return config;
  }

  class ChartJsChartFactory{
    constructor(){}

    createCharts(chartsContainerId, modelManager){
        const charts = [];
        const allModels = modelManager.getAllModels();
        const models = allModels.filter(mdl => !(mdl.topic.includes("setpoint") || mdl.topic.includes("Relay Pattern")));

        const container = document.getElementById(chartsContainerId);
        this.prepareContainer(container);
        createSubDivs(container, models);

        let i = 0;
        for(const model of models){
            const chart = new ChartJsChart(createChartJsLineChart(document.getElementById(`chartDiv ${model.topic}`), createConfig(model)), model);
            modelManager.subscribeToEvent("modelUpdate", chart.onDataUpdate);
            charts.push(chart);
            i++;
        }

        return charts;
    }

    prepareContainer(container){
      const jointJsContainer = document.getElementById("jointJsDiv");
      const [jjWidth, jjHeight] = [jointJsContainer.clientWidth, jointJsContainer.clientHeight];
      console.log("container:", container);
      container.setAttribute("style", `width: ${jjWidth}`);
      container.setAttribute("style", "background-color: #a3d9f9")
      container.style.display = 'flex';
      container.style.overflow = "hidden";
      container.style.flexWrap = "wrap";

    }

  }
  
  export default ChartJsChartFactory;

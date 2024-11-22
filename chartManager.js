

class ChartJsChartManager{
    constructor(){
        this.charts = [];
    };

    appendChart(chart){
        this.charts.push(chart);
    }

    runChartUpdatesPeriodically(updateInterval){
        const onUpdateTriggered = ()=>{
        for(const chart of this.charts){
            chart.chart.update();
            }
        }

        const interval = setInterval(onUpdateTriggered, updateInterval);
    }
}

export default ChartJsChartManager;
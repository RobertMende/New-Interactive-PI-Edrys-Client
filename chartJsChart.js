

class ChartJsChart{
    constructor(chartJsChart, model){
        this.chart = chartJsChart;
        this.onDataUpdate = this.onDataUpdate.bind(this);
        this.model = model;
    }

    onDataUpdate(modelManager, msg){
        const model = msg.data.model;
        if(model.topic != this.model.topic) return;

        this.chart.data.labels = model.x;
        this.chart.data.datasets[0].data = model.y;

        this.chart.update();
    }
}

export default ChartJsChart;
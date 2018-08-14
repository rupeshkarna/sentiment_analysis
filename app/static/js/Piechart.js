var PieChart = (function() {

    function PieChart(tweets) {
        this.tweets = tweets;
        this.json = {}
    }

    PieChart.prototype.plot = function(container) {
        var data = [];
        var positiveSentiment = 0;
        var negativeSentiment = 0;
        this.tweets.forEach(function(row) {
            if(row.sentiment == 1){
                positiveSentiment += 1;
            } else{
                negativeSentiment += 1;
            }
        });
        data.push(['PositiveSentiment', positiveSentiment]);
        data.push({name:'NegativeSentiment', y:negativeSentiment, sliced:true, selected:true});

        var chart = {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        };
        var title = {
            text: 'Recent Tweets Sentiments'
        };
        var tooltip = {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        };
        var plotOptions = {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',

                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}%</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) ||
                            'black'
                    }
                }
            }
        };
        var series = [{
            type: 'pie',
            name: 'Tweets',
            data: data
        }];

        this.json.chart = chart;
        this.json.title = title;
        this.json.tooltip = tooltip;
        this.json.plotOptions = plotOptions;
        this.json.series = series;

        $(container).highcharts(this.json);
    };

    return PieChart;
}());
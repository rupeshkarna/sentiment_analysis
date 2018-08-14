var ColumnChart = (function() {

    function ColumnChart(tweets) {
        this.tweets = tweets;
        this.json = {}
    }

    ColumnChart.prototype.plot = function(container) {
        var chart = {
            type: 'column'
        };
        var title = {
            text: 'Monthly Average Rainfall'
        };
        var subtitle = {
            text: 'Source: WorldClimate.com'
        };
        var xAxis = {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
                'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ],
            crosshair: true
        };
        var yAxis = {
            min: 0,
            title: {
                text: 'Rainfall (mm)'
            }
        };
        var tooltip = {
            headerFormat: '<span style = "font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style = "color:{series.color};padding:0">{series.name}: </td>' +
                '<td style = "padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        };
        var plotOptions = {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        };
        var credits = {
            enabled: false
        };
        var series = [{
                name: 'Tokyo',
                data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6,
                    148.5, 216.4, 194.1, 95.6, 54.4
                ]
            },
            {
                name: 'New York',
                data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3,
                    91.2, 83.5, 106.6, 92.3
                ]
            },
            {
                name: 'London',
                data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6,
                    52.4, 65.2, 59.3, 51.2
                ]
            },
            {
                name: 'Berlin',
                data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4,
                    47.6, 39.1, 46.8, 51.1
                ]
            }
        ];

        this.json.chart = chart;
        this.json.title = title;
        this.json.subtitle = subtitle;
        this.json.tooltip = tooltip;
        this.json.xAxis = xAxis;
        this.json.yAxis = yAxis;
        this.json.series = series;
        this.json.plotOptions = plotOptions;
        this.json.credits = credits;

        $(container).highcharts(this.json);
    };

    return ColumnChart;
}());
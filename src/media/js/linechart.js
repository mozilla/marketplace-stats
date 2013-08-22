/* Marketplace Stats Line Charts
 -----------------
 * Dependencies: d3.js
 *
 * Some definitions:
 * series: individual chart line.
 *
 */
define('linechart', [], function() {
    function createLineChart(lbls, options) {
        var opts = {
            container: document.querySelector('body'),
            forceZeroMin: true,
            height: 500,
            tickPadding: 8, // Axes distance from their tick labels (in px)
            width: 960
        };

        // Almost like $.extend() except worse and no recursion so don't nest!
        for (var prop in options) {
            opts[prop] = options[prop];
        }

        var margin = {top: 20, right: 80, bottom: 30, left: 50},
            width = opts.width - margin.left - margin.right,
            height = opts.height - margin.top - margin.bottom;

        var parseDate = d3.time.format('%Y-%m-%d').parse;
        var formatTime = d3.time.format('%a, %b %e, %Y');
        var xAxisTimeFormat = d3.time.format('%b %e');

        var x = d3.time.scale().range([0, width]);
        var y = d3.scale.linear().range([height, 0]);

        var color = d3.scale.category10();

        var xAxis = d3.svg.axis().scale(x).orient('bottom')
                      .tickFormat(xAxisTimeFormat)
                      .tickPadding(opts.tickPadding);
                      //.ticks(d3.time.weeks, 1);

        var yAxis = d3.svg.axis().scale(y).orient('left')
                      .tickPadding(opts.tickPadding);

        var line = d3.svg.line()
                     .interpolate('cardinal')
                     .x(function(d) {return x(d.date);})
                     .y(function(d) {return y(d.count);})
                     // Drops null values from series.
                     .defined(function(d) {return d.count !== null;});

        var svg = d3.select(opts.container).append('svg')
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)
                    .append('g')
                        .attr('transform',
                              'translate(' + margin.left + ',' + margin.top + ')');

        var tooltip = d3.select(opts.container).append('div')
                        .attr('class', 'tooltip')
                        .style('opacity', 0);

        // Supply URL src.
        d3.json('http://localhost:5000/api/v1/apps/bah/statistics/', function(error, data) {
            var series = [];
            var dates = []; // to store 'extent' for dates
            var valAxis = [];
            var legend;

            color.domain(d3.keys(data));

            function getSeriesName(s) {return s.name;}
            function getSeriesColor(s) {return color(s.name);}

            // `item` is the key of each line (series).
            for (item in data) {
                console.log('Reading graph: ', item);
                data[item].forEach(function(d) {
                    d.date = parseDate(d.date);
                    dates.push(d.date);
                });
                // Populate each series' name.
                series = color.domain().map(function(name) {
                    return {name: name};
                });
            }

            x.domain(d3.extent(dates, function(d) {
                return d;
            }));

            // Populate each series' values.
            for (var i = 0; i < series.length; i++) {
                series[i].values = data[series[i].name].map(function(d) {
                    return {date: d.date, count: d.count};
                });
            }

            console.log('Series is: ', series);

            function getMinValue() {
                return d3.min(series, function(c) {
                    return d3.min(c.values, function(v) {return v.count;});
                });
            }
            function getMaxValue() {
                return d3.max(series, function(c) {
                    return d3.max(c.values, function(v) {return v.count;});
                });
            }

            console.log('Minumum value found is: ', getMinValue());
            console.log('Maximum value found is: ', getMaxValue());

            y.domain([opts.forceZeroMin ? 0 : getMinValue(), getMaxValue()]);

            svg.append('g')
               .attr('class', 'x axis')
               .attr('transform', 'translate(0,' + height + ')')
               .call(xAxis);

            valAxis = svg.append('g').attr('class', 'y axis').call(yAxis);
            valAxis.append('text')
                   .attr('transform', 'rotate(-90)')
                   .attr('y', 6)
                   .attr('dy', '.71em')
                   .style('text-anchor', 'end')
                   .text(lbls.yAxis);

            var graphline = svg.selectAll('.graphline').data(series)
                               .enter()
                               .append('g')
                               .attr('class', function(d) {
                                    return 'graphline ' + d.name;
                               });
            //graphline.append('dot');

            console.log('graphline: ', graphline);

            // Inject tooltips hiding `null` values
            for (i = 0; i < series.length; i++) {
                d3.select(graphline[0][i]).selectAll('dot')
                          .data(series[i].values)
                          .enter()
                            .append('circle')
                            .attr('r', 3)
                            .attr('cx', function(d) {return x(d.date);})
                            .attr('cy', function(d) {return y(d.count);})
                            .style('display', function(d) {
                                if (d.count === null) return 'none';
                            })
                            .style('fill', function(d) {return color(series[i].name);})
                            .attr('class', function(d) {return series[i].name;})
                            .on('mouseover', function(d) {
                                tooltip.transition()
                                       .duration(200)
                                       .style('opacity', .9)
                                       .style('border', '2px solid ' + this.style.fill);
                                tooltip.html('<p class="timeinfo">' +
                                                formatTime(d.date) +
                                                '</p>' + '<b>' + lbls.tooltipValue + ':</b> ' + d.count)
                                    .style('left', (d3.event.pageX) + 'px')
                                    .style('top', (d3.event.pageY - 128) + 'px');
                            })
                            .on('mouseout', function(d) {
                                tooltip.transition()
                                   .duration(500)
                                   .style('opacity', 0);
                            });
            }

            graphline.append('path')
                     .attr('class', 'line')
                     .attr('d', function(d) {return line(d.values);})
                     .style('stroke', getSeriesColor);


            graphline.append('text')
                     .datum(function(d) {
                        return {name: d.name, value: d.values[d.values.length - 1]};
                     })
                     .attr('transform', function(d) {
                        return 'translate(' + x(d.value.date) + ',' + y(d.value.count) + ')';
                     })
                     .attr('x', 10)
                     .attr('dy', '3px')
                     .text(getSeriesName); // Translate this!

            legend = d3.select(opts.container).append('div').attr('class', 'legend')
                            .attr('top', height + 45 + 'px');

            legend.selectAll('a')
                  .data(series)
                  .enter()
                    .append('a')
                    .style('color', getSeriesColor)
                    .attr('href', '#')
                    .attr('id', getSeriesName)
                    .text(getSeriesName);
        });
    }

    return {'createLineChart': createLineChart};
});


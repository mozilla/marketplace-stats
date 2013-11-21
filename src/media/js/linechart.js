/* Marketplace Stats Line Charts
--------------------------------
 * Dependencies: d3.js
 *
 * Some definitions:
 * -----------------
 * series: individual chart line.
 * tooltip: tooltip wrapper div.
 * graphline: container of the SVG tooltip circles and path.
 *
 */
define('linechart', ['log'], function(log) {
    var console = log('linechart');

    function createLineChart(lbls, options) {
        var opts = {
            container: document.getElementById('chart'),
            forceZeroMin: true,
            height: 440,
            dropNulls: true, // Interpret nulls as missing values instead of 0s.
            lineLabels: false, // Append line labels to the end of each line?
            tickPadding: 8, // Axes distance from their tick labels (in px).
            url: 'http://localhost:5000/api/v1/apps/bah/statistics/',
            width: 950
        };

        // Almost like $.extend() except worse and no recursion so don't nest!
        for (var prop in options) {
            opts[prop] = options[prop];
        }

        $(opts.container).empty();

        var margin = {top: 20, right: 30, bottom: 55, left: 50},
            width = opts.width - margin.left - margin.right,
            height = opts.height - margin.top - margin.bottom;

        var parseDate = d3.time.format('%Y-%m-%d').parse;
        var formatTime = d3.time.format('%a, %b %e, %Y');
        var xAxisTimeFormat = d3.time.format('%b %e');
        var line;

        var transTime = 500; // Series toggling transition duration.

        var x = d3.time.scale().range([0, width]);
        var y = d3.scale.linear().range([height, 0]);

        var color = d3.scale.category10();

        var xAxis = d3.svg.axis().scale(x).orient('bottom')
                      .tickFormat(xAxisTimeFormat)
                      .tickPadding(opts.tickPadding);
                      //.ticks(d3.time.weeks, 1);

        var yAxis = d3.svg.axis().scale(y).orient('left')
                      .tickPadding(opts.tickPadding);

        var toggleSeries = [];

        // Based on the mbostock example at: http://bl.ocks.org/mbostock/3750941
        var twoPi = 2 * Math.PI,
            progress = 0;
            // Until 929765 is fixed.
            //formatPercent = d3.format('.0%');

        var arc = d3.svg.arc()
            .startAngle(0)
            .innerRadius(120)
            .outerRadius(180);

        if (opts.dropNulls) {
            line = d3.svg.line()
                         .interpolate('monotone')
                         .x(function(d) {return x(d.date);})
                         .y(function(d) {return y(+d.count);})
                         // Drops null values from series.
                         .defined(function(d) {return d.count !== null;});
        } else {
            line = d3.svg.line()
                         .interpolate('monotone')
                         .x(function(d) {return x(d.date);})
                         .y(function(d) {return y(+d.count);});
        }

        var svg = d3.select(opts.container).append('svg')
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)
                    .append('g')
                        .attr('transform',
                              'translate(' + margin.left + ',' + margin.top + ')');

        var tooltip = d3.select(opts.container).append('div')
                        .attr('class', 'tooltip');

        var $cloak = $('.chartcloak');
        var $rawLinks = $('#raw-links');

        function isNullSeries(vals) {
            for (var i = 0; i < vals.length; i++) {
                if (vals[i].count !== null) return false;
            }
            return true;
        }

        function getSeriesName(s) {return s.name;}
        function getSeriesColor(s) {return color(s.name);}

        // The request itself.
        var req = d3.json(opts.url)
                    .on('progress', handleProgress)
                    .on('load', handleSuccess)
                    .on('error', handleError)
                    .get();

        var spinWrapper = svg.append('g')
                             .attr(
                                'transform',
                                'translate(' + width / 2 + ',' + height / 2 + ')'
                             );

        var meter = spinWrapper.append('g')
            .attr('class', 'progress-meter');

        meter.append('path')
            .attr('class', 'background')
            .attr('d', arc.endAngle(twoPi));

        var foreground = meter.append('path')
            .attr('class', 'foreground');

        /* until 929765
        var progressText = meter.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '.35em');
        */

        /*
        function xGrid() {
            return d3.svg.axis().scale(x).orient('bottom');
        }
        */

        function yGrid() {
            return d3.svg.axis().scale(y).orient('left');
        }

        function handleProgress() {
            // 2000 is a toy for Chrome to play with until we fix bug: 929765
            var i = d3.interpolate(progress, d3.event.loaded / (2000 || d3.event.total));
            d3.transition().tween('progress', function() {
                return function(t) {
                    progress = i(t);
                    foreground.attr('d', arc.endAngle(twoPi * progress));
                    // TODO: bug 929765
                    //progressText.text(formatPercent(progress));
                };
            });
        }

        function handleError(error) {
            var msg = '';

            if (error.status) {
                msg = lbls.strings.errors[error.status];
            } else {
                msg = lbls.strings.errors.unknown;
            }

            console.log('XHR failure:', msg, error);
            showMessage(msg);
            $rawLinks.hide();
        }

        function showMessage(msg) {
            var $msg = $cloak.find('.message');
            if (msg) $msg.text(msg);
            $cloak.toggle(true);
        }

        function handleSuccess(data) {
            var series = [],
                dates = [], // to store 'extent' for dates
                valAxis = [],
                legendSeries = [];
            var legend;

            // The delay() param is time the indicator should stay up before scaling down.
            meter.transition().delay(150).attr('transform', 'scale(0)');

            color.domain(d3.keys(data));

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
                if (!series[i].values.length || isNullSeries(series[i].values)) {
                    console.log('Found empty series: ', series[i].name);
                } else {
                    legendSeries.push(series[i]);
                    toggleSeries.push(true);
                }
            }

            series = legendSeries;

            console.log('Series is: ', series);

            // If this occurs here we got all-null results from a successful XHR.
            $cloak.toggle(series.length === 0);

            console.log('Minumum value found is: ', getMinValue(series));
            console.log('Maximum value found is: ', getMaxValue(series));

            y.domain([opts.forceZeroMin ? 0 : getMinValue(series), getMaxValue(series)]);

            svg.append('g')
               .attr('class', 'grid')
               .call(yGrid().tickSize(-width, 0, 0).tickFormat(''));

            svg.append('g')
               .attr('class', 'x axis')
               .attr('transform', 'translate(0,' + height + ')')
               .call(xAxis)
               // Aaron Ward x-axis rotate text trick.
               .selectAll('text')
                   .style('text-anchor', 'end')
                   .attr('dx', '-10px')
                   .attr('dy', '-2px')
                   .attr('transform', function(d) {return 'rotate(-55)';});

            valAxis = svg.append('g').attr('class', 'y axis').call(yAxis);
            valAxis.append('text')
                   .attr('transform', 'rotate(-90)')
                   .attr('y', 6)
                   .attr('dy', '5px')
                   .style('text-anchor', 'end')
                   .text(lbls.yAxis);

            // Add grid lines.
            /*
            svg.append('g')
                    .attr('class', 'grid')
                    .attr('transform', 'translate(0,' + height + ')')
                    .call(xGrid()
                        .tickSize(-height, 0, 0)
                        .tickFormat('')
                    );
            */

            var graphline = svg.selectAll('.graphline').data(series)
                               .enter()
                               .append('g')
                               .attr('class', function(d) {
                                    return 'graphline ' + d.name;
                               });

            graphline.append('path')
                     .attr('class', 'line')
                     .attr('d', function(d) {return line(d.values);})
                     .style('stroke', getSeriesColor);

            // Inject tooltips while hiding `null` values.
            for (i = 0; i < series.length; i++) {
                d3.select(graphline[0][i]).selectAll('dot')
                          .data(series[i].values)
                          .enter()
                            .append('circle')
                            .attr('r', 2.5)
                            .attr('cx', function(d) {return x(d.date);})
                            .attr('cy', function(d) {return y(d.count);})
                            .style('display', function(d) {
                                if (d.count === null && opts.dropNulls) return 'none';
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
                                                '</p>' + '<b>' + lbls.tooltipValue + ':</b> ' + (+d.count))
                                    .style('left', (d3.mouse(this)[0] + 95) + 'px')
                                    .style('top', (d3.mouse(this)[1] + 130) + 'px');
                            })
                            .on('mouseout', function(d) {
                                tooltip.transition()
                                   .duration(500)
                                   .style('opacity', 0);
                            });
            }

            if (opts.lineLabels) {
                graphline.append('text')
                         .datum(function(d) {
                            return {name: d.name, value: d.values[d.values.length - 1]};
                         })
                         .attr('transform', function(d) {
                            return 'translate(' + x(d.value.date) + ',' + y(d.value.count) + ')';
                         })
                         .attr('x', 10)
                         .attr('dy', '3px')
                         .text(getSeriesName);
            }

            if (series.length > 1) {
                legend = d3.select(opts.container).append('div').attr('class', 'legend')
                                .attr('top', height + 45 + 'px');


                legend.selectAll('a')
                      .data(series)
                      .enter()
                        .append('a')
                        .style('color', getSeriesColor)
                        .attr('href', '#')
                        .attr('id', getSeriesName)
                        .text(getSeriesName)
                        .on('click', function(d, i) {
                            d3.event.preventDefault();
                            $('.graphline.' + getSeriesName(d)).toggle();
                            $(this).toggleClass('hidden');

                            // Set rescale actions.
                            toggleSeries[i] = !toggleSeries[i];
                            rescale(series);
                        })
                        .on('mouseover', function(d, i) {
                            // Toggling a class fails here.
                            $('.graphline.' + getSeriesName(d) + ' .line').css('stroke-width', '3.0px');
                        })
                        .on('mouseleave', function(d, i) {
                            $('.graphline.' + getSeriesName(d) + ' .line').css('stroke-width', '1.5px');
                        });
            }
            $rawLinks.show();
            console.log('...chart created');
        }

        function rescale(series) {
            var newseries = [];

            for (var i = 0, n = series.length; i < n; i++) {
                if (toggleSeries[i]) {
                    newseries.push(series[i]);
                }
            }

            console.log('new chart maxvalue: ', getMaxValue(newseries));

            y.domain([0, getMaxValue(newseries)]);

            svg.select('.y.axis')
                    .transition().duration(transTime).ease('sin-in-out')
                    .call(yAxis);
            svg.select('.grid')
                    .transition().duration(transTime).ease('sin-in-out')
                    .call(yGrid().tickSize(-width, 0, 0).tickFormat(''));
            svg.selectAll('.line')
                    .transition().duration(transTime)
                    .attr('d', function(d) {return line(d.values);});
            svg.selectAll('circle').transition().duration(transTime)
                    .attr('cy', function(d) {return y(d.count);})
        }

        function getMinValue(series) {
            return d3.min(series, function(c) {
                return d3.min(c.values, function(v) {return v.count;});
            });
        }

        function getMaxValue(series) {
            return d3.max(series, function(c) {
                return d3.max(c.values, function(v) {return v.count;});
            });
        }
    }

    return {'createLineChart': createLineChart};
});


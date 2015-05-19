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
define('linechart',
    ['core/log', 'core/urls', 'utils_local'],
    function(log, urls, ml) {
    var console = log('linechart');

    var maxValue = 0;
    var margin = {top: 30, right: 30, bottom: 40, left: 80};
    var valFormat = d3.format(',d');
    var line;
    var parseDate = d3.time.format('%Y-%m-%d').parse;
    var formatTime = d3.time.format('%a, %b %e, %Y');
    var xAxisTimeFormat = d3.time.format('%b %e');
    // Series toggling transition duration.
    var transTime = 500;
    var color = d3.scale.category10();

    // Show RTL charts?
    var reverseDirection = !!$('html[dir=rtl]').length;

    if (reverseDirection) {
        margin.left = 30;
        margin.right = 80;
    }

    // Null series, if any, get hidden later.
    function isNullSeries(vals) {
        for (var i = 0; i < vals.length; i++) {
            if (vals[i].count !== null) return false;
        }
        return true;
    }

    function getSeriesName(s) {return s.name;}
    function getSeriesColor(s) {return color(s.name);}

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

    function createSparkLines(slug) {
        var width = 290;
        var height = 150;
        var x = d3.time.scale().range([0, width]);
        var y = d3.scale.linear().range([height, 0]);
        var range = ml.getRecentTimeDelta(30);
        var url = '';

        if (reverseDirection) {
            x.range([width, 0]);
        }

        var params = {
            'start': range.start,
            'end': range.end,
            'interval': 'day'
        };

        $('.dashboard li a').each(function() {
            var $this = $(this);

            if (slug) {
                url = urls.api.url($this.data('src'), [slug], params);
            } else {
                url = urls.api.params($this.data('src'), params);
            }

            // Thanks aalmossawi.
            var flatline = d3.svg.line()
                .x(function(d) {return x(d.date);})
                .y(function(d) {return 75;})
                .interpolate('linear');

            line = d3.svg.line()
                         .interpolate('linear')
                         .x(function(d) {return x(d.date);})
                         .y(function(d) {return y(+d.count);})
                         .defined(function(d) {return d.count !== null;});

            // Clear previous if any.
            $this.parent().remove('svg');

            var svg = d3.select(this.parentNode).insert('svg')
                        .attr('width', width)
                        .attr('height', height)
                        .append('g');

            d3.json(url)
              .on('load', function(data) {
                var series = [],
                    dates = [], // to store 'extent' for dates
                    valAxis = [],
                    realSeries = [];

                color.domain(d3.keys(data));

                // `item` is the key of each line (series).
                Object.keys(data).forEach(function(item) {
                    data[item].forEach(function(d) {
                        d.date = parseDate(d.date);
                        dates.push(d.date);
                    });
                    // Populate each series' name.
                    series = color.domain().map(function(name) {
                        return {name: name};
                    });
                });

                x.domain(d3.extent(dates, function(d) {
                    return d;
                }));

                // Populate each series' values.
                series.forEach(function(item) {
                    item.values = data[item.name].map(function(d) {
                        return {date: d.date, count: d.count === null ? d.count : +d.count};
                    });
                    if (!item.values.length || isNullSeries(item.values)) {
                    } else {
                        realSeries.push(item);
                    }
                });

                series = realSeries;
                y.domain([0, getMaxValue(series)]);

                var graphline = svg.selectAll('.graphline').data(series)
                                   .enter()
                                   .append('g')
                                   .append('path')
                                   .attr('class', 'line')
                                   .attr('d', function(d) {return flatline(d.values);})
                                   .style('stroke', '#fff')
                                   .transition().duration(1000)
                                   .attr('d', function(d) {return line(d.values);});

                console.log('dash chart created');

              }).on('error', function(error) {
                console.log('dash chart error', error);
              }).get();
        });
    }

    /* Create a full single or multi-series line chart.
     * lbls - required labels object with translated axis, values etc.
     * options - required options object with some defaults as set below.
     */
    function createLineChart(lbls, options) {
        var opts = {
            container: document.getElementById('chart'),
            forceZeroMin: true,
            valueFormat: 'int', // y-axis can be 'int' or 'currency'
            shortRange: false, // Short chart time range? Show every day on x-axis.
            height: 440,
            dropNulls: true, // Interpret nulls as missing values instead of 0s.
            lineLabels: false, // Append line labels to the end of each line?
            tickPadding: 8, // Axes distance from their tick labels (in px).
            url: 'http://localhost:5000/api/v1/apps/bah/statistics/',
            width: 960
        };

        // Almost like $.extend() except worse since no recursion so don't nest!
        for (var prop in options) {
            opts[prop] = options[prop];
        }

        $(opts.container).empty();

        var width = opts.width - margin.left - margin.right,
            height = opts.height - margin.top - margin.bottom;

        valFormat = d3.format(',d');

        if (opts.valueFormat == 'currency') {
            valFormat = d3.format('$,');
        }

        var x = d3.time.scale().range([0, width]);

        // Is this a RTL chart? Flip the range.
        if (reverseDirection) {
            x.range([width, 0]);
        }

        var y = d3.scale.linear().range([height, 0]);

        var xAxis = d3.svg.axis().scale(x).orient('bottom')
                      .tickFormat(xAxisTimeFormat)
                      .tickPadding(opts.tickPadding)
                      .ticks(6);

        if (opts.shortRange) {
            xAxis = d3.svg.axis().scale(x).orient('bottom')
                      .tickFormat(xAxisTimeFormat)
                      .tickPadding(opts.tickPadding)
                      .ticks(d3.time.days, 1);
        }


        var yAxis = d3.svg.axis().scale(y).orient('left')
                      .tickPadding(opts.tickPadding)
                      .tickFormat(valFormat);

        if (reverseDirection) {
            yAxis.tickPadding(-15);
        }

        var toggleSeries = [];

        // Based on the mbostock example at:
        // http://bl.ocks.org/mbostock/3750941
        var twoPi = 2 * Math.PI,
            progress = 0;

        var arc = d3.svg.arc()
            .startAngle(0)
            .innerRadius(120)
            .outerRadius(180);

        line = d3.svg.line()
                     .interpolate('linear')
                     .x(function(d) {return x(d.date);})
                     .y(function(d) {return y(+d.count);});

        // Drop null values from series.
        if (opts.dropNulls) {
            line.defined(function(d) {return d.count !== null;});
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

        function yGrid() {
            if (reverseDirection) {
                return d3.svg.axis().scale(y).orient('right');
            }
            return d3.svg.axis().scale(y).orient('left');
        }

        function handleProgress() {
            // 2000 bytes or d3.event.total
            var i = d3.interpolate(progress, d3.event.loaded / (2000 || d3.event.total));
            d3.transition().tween('progress', function() {
                return function(t) {
                    progress = i(t);
                    foreground.attr('d', arc.endAngle(twoPi * progress));
                };
            });
        }

        function handleError(error) {
            var msg = '';

            if (error && error.status) {
                msg = lbls.strings.errors[error.status];
            } else {
                msg = lbls.strings.errors.unknown;
            }

            console.error('Data parsing failure:', error || 'invalid data');
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
            var i = 0;

            // The delay() param is time the indicator should stay up before scaling down.
            meter.transition().delay(150).attr('transform', 'scale(0)');

            color.domain(d3.keys(data));

            if (data.constructor !== Object) {
                handleError();
                return;
            }

            // `item` is the key of each line (series).
            Object.keys(data).forEach(function(item) {
                console.log('Reading graph: ', item);
                data[item].forEach(function(d) {
                    d.date = parseDate(d.date);
                    dates.push(d.date);
                });
                // Populate each series' name.
                series = color.domain().map(function(name) {
                    return {name: name};
                });
            });

            x.domain(d3.extent(dates, function(d) {
                return d;
            }));

            // Populate each series' values.
            series.forEach(function(item) {
                item.values = data[item.name].map(function(d) {
                    return {date: d.date, count: d.count === null ? d.count : +d.count};
                });
                if (!item.values.length || isNullSeries(item.values)) {
                    console.log('Found empty series: ', item.name);
                } else {
                    legendSeries.push(item);
                    toggleSeries.push(true);
                }
            });

            series = legendSeries;

            console.log('Series is: ', series);

            // If this occurs here we got all-null results from a successful XHR.
            $cloak.toggle(series.length === 0);

            maxValue = getMaxValue(series);
            console.log('Maximum value found is: ', maxValue);

            y.domain([opts.forceZeroMin ? 0 : getMinValue(series), maxValue]);

            if (reverseDirection) {
                svg.append('g')
                   .attr('class', 'grid')
                   .call(yGrid().tickSize(width, 0, 0).tickFormat(''));
            } else {
                svg.append('g')
                   .attr('class', 'grid')
                   .call(yGrid().tickSize(-width, 0, 0).tickFormat(''));
            }

            svg.append('g')
               .attr('class', 'x axis')
               .attr('transform', 'translate(0,' + height + ')')
               .call(xAxis)
               .selectAll('text')
                   .style('text-anchor', 'end')
                   .attr('dx', reverseDirection ? '-15px' : '15px')
                   .attr('dy', '5px');

            valAxis = svg.append('g').attr('class', 'y axis').call(yAxis);

            if (reverseDirection) {
                valAxis.attr('transform', 'translate(' + width + ',0)');
            }

            // Consider removing this for both directions - value axis is obvious.
            if (!reverseDirection) {
                valAxis.append('text')
                       .attr('transform', 'rotate(-90)')
                       .attr('y', 6)
                       .attr('dy', '5px')
                       .style('text-anchor', 'end')
                       .text(lbls.yAxis);
            }

            var flatline = d3.svg.line()
                .x(function(d) {return x(d.date);})
                .y(function(d) {return 200;})
                .interpolate('linear');

            var graphline = svg.selectAll('.graphline').data(series)
                               .enter()
                               .append('g')
                               .attr('class', function(d) {
                                    return 'graphline ' + d.name;
                               });

            var path = graphline.append('path')
                     .attr('class', 'line')
                     .attr('d', function(d) {return flatline(d.values);})
                     .transition().delay(1000)
                     .attr('d', function(d) {return line(d.values);})
                     .style('stroke', getSeriesColor);

            // Inject tooltips while hiding `null` values.
            for (var i = 0; i < series.length; i++) {
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
                                       .style('opacity', 0.9)
                                       .style('background-color', this.style.fill);
                                tooltip.html('<p class="timeinfo">' +
                                                formatTime(d.date) +
                                                '</p>' + valFormat(+d.count) + ' ' + lbls.tooltipValue)
                                    .style('left', (d3.mouse(this)[0] + (margin.left - 30)) + 'px')
                                    .style('top', (d3.mouse(this)[1] + (margin.top + 50)) + 'px');
                            })
                            .on('mouseout', function(d) {
                                tooltip.transition()
                                   .duration(500)
                                   .style('opacity', 0);
                            })
                            .transition().delay(1500)
                            .style('opacity', 1);
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

            barify(series, opts);

            console.log('...chart created');
        }

        function barify(series, opts) {
            var bars = d3.select('#bars').html('');
            var list = {};
            var container = {};

            series.forEach(function(item) {
                container = bars.append('div')
                                .attr('class', 'bar-wrapper')
                                .style('background-color', function(d) {
                                    return ml.hex2rgba(getSeriesColor(item), 1);
                                });

                container.append('h3').attr('class', 'heading')
                         .text(getSeriesName(item));

                list = container.append('ul');

                if (series.length == 1) {
                    // Single series chart.
                    container.attr('class', 'bar-wrapper single');
                } else if (series.length == 2) {
                    container.attr('class', 'bar-wrapper double');
                }

                list.selectAll('li')
                    .data(item.values)
                    .enter().append('li')
                    .append('time')
                    .attr('datetime', function(d) {
                        return ml.getISODate(d.date);
                    })
                    .text(function(d) {
                        return d.date.toDateString();
                    })
                    .select(function() {return this.parentNode;})
                    .append('span')
                    .text(function(d) {
                        if (!opts.dropNulls) {
                            return +d.count;
                        }
                        return d.count;
                    });
            });
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
                    .attr('cy', function(d) {return y(d.count);});
        }
    }

    return {
        'createLineChart': createLineChart,
        'createSparkLines': createSparkLines
    };
});


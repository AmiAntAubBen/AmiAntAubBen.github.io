var margin = { top: 10, right: 30, bottom: 20, left: 50 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

var dataByYear = []
var dataByGenre = []

document.getElementById('dropdown').addEventListener('change', function () {
    var value = document.getElementById('dropdown').value
    if (value == 'Year') {
        drawChartYear(dataByYear, 'publicationDate')
    } else {
        drawChartGenre(dataByGenre, 'album_genre')
    }
})

function renderTooltip(tooltip) {
    let width, height;
    const padding = 8;

    function show(content) {
        tooltip.style("border-color", 'green').html(content);
        const bcr = tooltip.node().getBoundingClientRect();
        width = bcr.width;
        height = bcr.height;
        tooltip.classed("show", true);
    }

    function hide() {
        tooltip.classed("show", false);
    }

    function move(e) {
        let x = (e || d3.event).clientX - width * .75;
        if (x < 0) {
            x = 0;
        } else if (x + width > window.innerWidth) {
            x = window.innerWidth - width;
        }
        let y = (e || d3.event).clientY - height - padding;
        if (y < 0) {
            y = 0;
        }
        tooltip.style("transform", `translate(${x}px,${y - 10}px)`);
    }

    return {
        show,
        hide,
        move,
    };
}

d3.csv("./data.csv", function (d) {
    return {
        album_genre: d.album_genre,
        explicit_content_lyrics: +d.explicit_content_lyrics,
        publicationDate: +d.publicationDate.split('-')[0],
    }
}).then(function (data) {
    data = data.filter(function (d) {
        return d.publicationDate >= 2000 && d.publicationDate <= 2021
    })
    dataByYear = d3.nest().key(function (d) { return d.publicationDate }).entries(data);
    dataByGenre = d3.nest().key(function (d) { return d.album_genre }).entries(data);
    drawChartYear(dataByYear, 'publicationDate')
})


function drawChartYear(data, key) {
    document.getElementById('chart-publicationDate').style.display = 'inline-block'
    document.getElementById('chart-album_genre').style.display = 'none'

    var bar_width = 50
    var totalWidth = bar_width * data.length;
    var margin = { top: 10, right: 30, bottom: 20, left: 50 },
        width = totalWidth - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;


    var svg = d3.select("#chart-" + key)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    var subgroups = Object.keys(data[0].values[0])

    var groups = data.map(function (d) { return +d.key }).sort()

    var chartData = data.map(function (element) {
        var explicitCount = element.values.filter(d => d.explicit_content_lyrics > 0).length
        var nonExplicitCount = element.values.filter(d => d.explicit_content_lyrics == 0).length

        return {
            explicit: explicitCount,
            nonExplicit: nonExplicitCount,
            key: +element.key,
        }
    });
    var maxY = d3.max(chartData, function (d) { return d.explicit + d.nonExplicit })


    var x = d3.scaleBand()
        .domain(groups)
        .range([0, width])
        .padding([0.2])
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSizeOuter(0));

    var y = d3.scaleLinear()
        .domain([0, maxY])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    var subgroups = ['explicit', 'nonExplicit']
    // color palette = one color per subgroup
    var color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(['#377eb8', '#e41a1c'])


    var stackedData = d3.stack()
        .keys(subgroups)
        (chartData)


    svg.append("g")
        .selectAll("g")
        .data(stackedData)
        .enter().append("g")
        .attr("fill", function (d) { return color(d.key); })
        .selectAll("rect")
        .data(function (d) { return d; })
        .enter().append("rect")
        .attr("x", function (d) { return x(d.data.key); })
        .attr("y", function (d) { return y(d[1]); })
        .attr("height", function (d) { return y(d[0]) - y(d[1]); })
        .attr("width", x.bandwidth())

}

function drawChartGenre(data, key) {
    document.getElementById('chart-publicationDate').style.display = 'none'
    document.getElementById('chart-album_genre').style.display = 'inline-block'


    var chartData = data.map(function (element) {
        var explicitCount = element.values.filter(d => d.explicit_content_lyrics > 0).length
        var nonExplicitCount = element.values.filter(d => d.explicit_content_lyrics == 0).length

        return {
            explicit: explicitCount,
            nonExplicit: nonExplicitCount,
            key: element.key,
        }
    });

    chartData = chartData.sort(function (a, b) { return (b.explicit + b.nonExplicit) - (a.explicit + b.nonExplicit) })
    chartData = chartData.slice(0, 10)


    var bar_width = 80
    var totalWidth = bar_width * chartData.length;
    var margin = { top: 10, right: 30, bottom: 20, left: 100 },
        width = totalWidth - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;



    var svg = d3.select("#chart-" + key)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    var maxY = d3.max(chartData, function (d) { return d.explicit + d.nonExplicit })
    var groups = chartData.map(function (d) { return d.key })



    var x = d3.scaleBand()
        .domain(groups)
        .range([0, width])
        .padding([0.2])
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSizeOuter(0));


    var y = d3.scaleLinear()
        .domain([0, maxY])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    var subgroups = ['explicit', 'nonExplicit']
    var color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(['#377eb8', '#e41a1c'])

    var stackedData = d3.stack()
        .keys(subgroups)
        (chartData)

    svg.append("g")
        .selectAll("g")
        .data(stackedData)
        .enter().append("g")
        .attr("fill", function (d) { return color(d.key); })
        .selectAll("rect")
        .data(function (d) { return d; })
        .enter().append("rect")
        .attr("x", function (d) { return x(d.data.key); })
        .attr("y", function (d) { return y(d[1]); })
        .attr("height", function (d) { return y(d[0]) - y(d[1]); })
        .attr("width", x.bandwidth())

}

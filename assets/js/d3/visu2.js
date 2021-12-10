function visu2(db) {

    retrieveAllAlbumId(db);

    const legendCellSize = 30;
    const colors = ['#d4eac7', '#c6e3b5', '#b7dda2', '#a9d68f', '#9bcf7d', '#8cc86a', '#7ec157', '#77be4e', '#70ba45', '#65a83e', '#599537', '#4e8230', '#437029', '#385d22', '#2d4a1c', '#223815'];

    const svg = d3.select('#area2').append("svg")
        .attr("id", "svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("class", "svg");

    var legend = svg.append('g')
        .attr('transform', 'translate(30, 30)');

    legend.selectAll()
        .data(d3.range(colors.length))
        .enter().append('svg:rect')
        .attr('height', legendCellSize + 'px')
        .attr('width', legendCellSize + 'px')
        .attr('x', 5)
        .attr('y', d => d * legendCellSize)
        .style("fill", d => colors[d]);

    var legendScale = d3.scaleLinear().domain([0, 100])
        .range([0, colors.length * legendCellSize]);

    legendAxis = legend.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(legendScale));
}
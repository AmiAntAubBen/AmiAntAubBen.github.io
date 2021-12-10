function visu1($db) {

    var svg = d3.select("#area1")
    svg.append("circle")
        .attr("cx", 2).attr("cy", 2).attr("r", 40).style("fill", "blue");

}
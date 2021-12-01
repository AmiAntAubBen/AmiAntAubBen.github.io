function drawGroupBars() {
/*    var margin = {top: 10, right: 30, bottom: 20, left: 50},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    d3.json("getData", function (data) {

        console.log("get data", data);

        var subgroups = data.columns.slice(1);

        var groups = d3.map(data, function (d) {
            return (d.group)
        }).keys()

        var x = d3.scaleBand()
            .domain(groups)
            .range([0, width])
            .padding([0.2])
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).tickSize(0));

        var y = d3.scaleLinear()
            .domain([0, 40])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));

        var xSubgroup = d3.scaleBand()
            .domain(subgroups)
            .range([0, x.bandwidth()])
            .padding([0.05])

        var color = d3.scaleOrdinal()
            .domain(subgroups)
            .range(['#e41a1c', '#377eb8', '#4daf4a'])

        svg.append("g")
            .selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("transform", function (d) {
                return "translate(" + x(d.group) + ",0)";
            })
            .selectAll("rect")
            .data(function (d) {
                return subgroups.map(function (key) {
                    return {key: key, value: d[key]};
                });
            })
            .enter().append("rect")
            .attr("x", function (d) {
                return xSubgroup(d.key);
            })
            .attr("y", function (d) {
                return y(d.value);
            })
            .attr("width", xSubgroup.bandwidth())
            .attr("height", function (d) {
                return height - y(d.value);
            })
            .attr("fill", function (d) {
                return color(d.key);
            })
            .on("click",function(d){

            });


    })

 */
}


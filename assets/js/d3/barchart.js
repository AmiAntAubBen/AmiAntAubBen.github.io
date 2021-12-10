/*
app.get("/getAlbumData.json",(req,res)=> {
    Wasabi.find({publicationDate: '2010'}, function (err, doc) {

        if (err) {
            console.log("error is", err)
        }
            console.log("data",doc);
            res.send(doc);
            res.end();

    }).limit(56)
})
 */


function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function drawGroupBars() {

    var margin = {top: 10, right: 30, bottom: 20, left: 50},
        width = 500 - margin.left - margin.right,
        height = 480 - margin.top - margin.bottom;

    var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    d3.json("/getAlbumData.json", function (data) {

        console.log("this the data",data)
        let filteredData=[];
        let country="GB";

        data.forEach((d,i)=>{

            if(d.country !== undefined ) {
                if (d.country.localeCompare(country) === 0) {
                    filteredData.push(d)
                    //filteredData.push(d.genres)
                }
            }
        })

        var artistsData = d3.nest().key(function(d){return d.name}).entries(filteredData);

        let groups=[];
        var subgroups=[];

        var genresData=[];

        artistsData.forEach(d=>{
            groups.push(d.key);
            var t =  d3.nest().key(function(c){return c.genre}).entries(d.values);
            genresData.push(t);
        })

        var processedData = [];
        genresData.forEach((d,i)=>{
            var subdoc={};
            subdoc["group"]=groups[i];
            d.forEach(c=>{


                subgroups.push(c.key);
                subdoc[c.key] = c.values.length;


                if(subdoc["max"]==undefined){
                    subdoc["max"]= c.values.length;
                }
                else{
                    subdoc["max"]= c.values.length;
                }
            })
            processedData.push(subdoc);
        })

        //console.log("processdata",processedData);

        subgroups=subgroups.filter(onlyUnique);
        // //console.log("temp",temp);

        //console.log("subgroup",subgroups);

        //console.log("artistname",artistsData);

        //var subgroups = Object.keys(data)
        /*
               var groups = d3.map(data[1], function (d) {
                    return (d.group)
                }).keys()*/



        //console.log("okkk",data)

        var x = d3.scaleBand()
            .domain(groups)
            .range([0, width])
            .padding([0.2])
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).tickSize(0));

        var y = d3.scaleLinear()
            .domain([0, d3.max(processedData, d=>d.max)])
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


        console.log("processedData",processedData);

        svg.append("g")
            .selectAll("g")
            .data(processedData)
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
                console.log("clickkkkk",d);
            });


    })


}
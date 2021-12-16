function visu1() {
    var dataset = {
        "1990": [
            {
                "nom": "rap",
                "nbAlbum": "10"
            },
            {
                "nom": "classique",
                "nbAlbum": "25"
            },
            {
                "nom": "electro",
                "nbAlbum": "13"
            },
            {
                "nom": "variete",
                "nbAlbum": "21"
            }
        ],
        "1991": [
            {
                "nom": "rap",
                "nbAlbum": "20"
            },
            {
                "nom": "classique",
                "nbAlbum": "25"
            },
            {
                "nom": "electro",
                "nbAlbum": "23"
            },
            {
                "nom": "variete",
                "nbAlbum": "25"
            }
        ],
        "1992": [
            {
                "nom": "rap",
                "nbAlbum": "28"
            },
            {
                "nom": "classique",
                "nbAlbum": "30"
            },
            {
                "nom": "electro",
                "nbAlbum": "27"
            },
            {
                "nom": "variete",
                "nbAlbum": "51"
            }
        ],
        "1993": [
            {
                "nom": "rap",
                "nbAlbum": "40"
            },
            {
                "nom": "classique",
                "nbAlbum": "35"
            },
            {
                "nom": "electro",
                "nbAlbum": "38"
            },
            {
                "nom": "variete",
                "nbAlbum": "99"
            }
        ],
        "1994": [
            {
                "nom": "rap",
                "nbAlbum": "50"
            },
            {
                "nom": "classique",
                "nbAlbum": "53"
            },
            {
                "nom": "electro",
                "nbAlbum": "56"
            },
            {
                "nom": "variete",
                "nbAlbum": "200"
            }
        ]
    };


    const svgDimentions = {
        width: 500,
        height: 300
    };

    const margins = {
        top: 50,
        bottom: 50,
        right: 50,
        left: 50

    };

    var scaleX = d3.scaleLinear()
        .range([margins.left, svgDimentions.width - margins.right]);

    var scaleY = d3.scaleBand()
        .range([margins.top, svgDimentions.height - margins.bottom])
        .paddingInner(0.2);

    var axisY = d3.axisLeft(scaleY)
        .tickSizeOuter(0);

    var axisX = d3.axisBottom(scaleX);

    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + (margins.left) + ",0)")
        .call(axisY);
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (svgDimentions.height - margins.bottom) + ")")
        .call(axisX);


    function compare(a, b) {
        if (a.nbAlbum > b.nbAlbum) {
            return -1;
        }
        if (a.nbAlbum < b.nbAlbum) {
            return 1;
        }
        return 0;
    }

    function draw(year) {
        const result = [];

        var tabGenre = [];
        for (let i = 0; i < dataset[year].length; i++) {
            dataset[year][i].nbAlbum = parseInt(dataset[year][i].nbAlbum);
            result.push(dataset[year][i]);
        }

        result.sort(compare);


        for (var genre of result) {
            tabGenre.push(genre.nom);
        }

        scaleY.domain(tabGenre);

        scaleX.domain([0, result[0].nbAlbum]);

        svg.select(".y.axis")
            .transition()
            .duration(2000)
            .call(axisY)

        svg.select(".x.axis")
            .transition()
            .duration(2000)
            .call(axisX)

        bars = svg.selectAll('.bars')
            .data(Object.values(dataset[year]), d => d.nom);

        bars.exit()
            .transition()
            .duration(2000)
            .attr("width", 0)
            .remove();

        bars.enter()
            .append('rect')
            .attr("class", "bars")
            .attr('x', scaleX(0)) // Tous les rectangles démarrent à 0 en X
            .attr('y', d => scaleY(d.nom))
            .attr('width', 0)
            .attr('height', scaleY.bandwidth())
            .transition()
            .duration(2000)
            .attr('width', d => (scaleX(d.nbAlbum) - scaleX(0)))
            .attr('height', scaleY.bandwidth());


        bars.transition()
            .duration(2000)
            .attr('y', d => scaleY(d.nom))
            .attr('width', d => (scaleX(d.nbAlbum) - scaleX(0)))
            .attr('height', scaleY.bandwidth());
    }

    var index = parseInt(2);
    d3.select("#selectMin")
        .attr("min", 0)
        .attr("max", Object.keys(dataset).length)
        .attr("value", index)
        .on("change", updateSelect);

    function updateSelect() {
        index = parseInt(this.value);
        year = Object.keys(dataset)[index];
        draw(year);
    }

    function update() {
        year = Object.keys(dataset)[index];
        draw(year);
    }

    let incrementerDate = function () {
        if (index < Object.keys(dataset).length) {
            index = index + 1;
            d3.select("#selectMin")
                .attr("value", index)
            console.log("index = " + index);
            update();
        }
    }

    var svg = d3.select("#visu1svg1").append("svg").attr("width", svgDimentions.width).attr("height", svgDimentions.height).style('background-color', 'lightgrey');

    var year = 1990;
    draw(year);


    var timer;

    var state = "Play";

    var updateButton = d3.select("#updateButton");

    updateButton.text(state)
        .on("click", onOff)

    function onOff() {
        if (state === "Play") {
            timer = d3.interval(incrementerDate, 2000);
            console.log(updateButton.value);
            state = "Pause";
            updateButton
                .text(state);
        } else if (state === "Pause") {
            timer.stop();
            state = "Play";
            updateButton
                .text(state);
        }
    }
}
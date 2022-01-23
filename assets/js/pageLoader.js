function loadPage(){

    console.log("LOADING PAGE...");

    loadDatabaseInfo();

    loadVisualisation(1, "Animated BarChart", "./components/visu1")
    loadVisualisation(2, "Choroplèthe", "./components/visu2")
    loadVisualisation(3, "Diagrammes en batons", "./components/visu3")
    loadVisualisation(4, "Liste", "./components/visu4")

}

function loadDatabaseInfo(){

    getDbInfo().then(() => {
        document.querySelector("#database_connexion").innerHTML = "artistes : ".bold() + dbinfo.nbArtists + " albums : ".bold() + dbinfo.nbAlbums + " songs : ".bold() + dbinfo.nbSongs
    });
}

function loadVisualisation(idVisu, title, componentURL) {

    console.log("LOADING VISUALISAITON " + idVisu + "...");

    let contentLayout = document.querySelector(".mdl-layout__content")

    document.querySelector("#menuVisu").innerHTML += "<a href=\"#visu" + idVisu + "\" class=\"mdl-layout__tab "
        + ((idVisu === 1) ? "is-active" : "") +
        "\">" + title + " (Visu " + idVisu + ")</a>";

    contentLayout.innerHTML = "<div id=\"visu" + idVisu + "\" class=\"mdl-layout__tab-panel " +
        ((idVisu === 1) ? "is-active" : "") +
        "\" style=\"height: 1000px\">mdr</div>" +
        contentLayout.innerHTML;

    loadVisualisationComponent(idVisu, componentURL).then(() => {

        fetch(componentURL + "/visu" + idVisu + ".js").then((data) => data.text())

            .then((jsContent) => {

                loadVisualisationScript(idVisu, jsContent);

            })
    })

}

async function loadVisualisationComponent(idVisu, componentURL){

    await fetch(componentURL + "/visu" + idVisu + ".html").then((data) => data.text())

        .then((document) => {

            let parser = new DOMParser();
            let html = parser.parseFromString(document, 'text/html');

            loadVisualisationContent(idVisu, html.querySelector("body").innerHTML);
        })
}

function loadVisualisationScript(idVisu, jsContent) {
    var setInnerHTML = function(elm, html) {
        elm.innerHTML = html;
        Array.from(elm.querySelectorAll("script")).forEach( oldScript => {
            const newScript = document.createElement("script");
            Array.from(oldScript.attributes)
                .forEach( attr => newScript.setAttribute(attr.name, attr.value) );
            newScript.appendChild(document.createTextNode(oldScript.innerHTML));
            oldScript.parentNode.replaceChild(newScript, oldScript);
        });
    }
    let elm = document.querySelector("#visu" + idVisu);
    //document.querySelector("#visu" + idVisu).innerHTML += "<script id=\"scriptVisu " + idVisu + "\">" + jsContent + "</script>";
    setInnerHTML(elm,jsContent)

    //document.querySelector("#scriptVisu" + idVisu)).append();
}


function loadVisualisationContent(idVisu, htmlContent){

    document.querySelector("#visu" + idVisu).innerHTML = htmlContent;


}




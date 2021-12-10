function initVisu($idVisu, $nom) {

    if($idVisu === tabFocusIndex){
        $("#menuVisu").append("<a href=\"#visu" + $idVisu + "\" class=\"mdl-layout__tab is-active\">" + $nom + " (Visu " + $idVisu + ")</a>\n")
        $("<div id=\"visu" + $idVisu + "\" class=\"mdl-layout__tab-panel is-active\" style=\"height: 1000px\"></div>").insertBefore(".mdl-mega-footer");
    }
    else{
        $("#menuVisu").append("<a href=\"#visu" + $idVisu + "\" class=\"mdl-layout__tab\">" + $nom + " (Visu " + $idVisu + ")</a>\n")
        $("<div id=\"visu" + $idVisu + "\" class=\"mdl-layout__tab-panel\" style=\"height: 1000px\"></div>").insertBefore(".mdl-mega-footer");
    }

    //$("#visu" + $idVisu).append("<section id=\"section" + $idVisu + "\" class=\"section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp\"></section>")
    $("#visu" + $idVisu).append("<svg style=\"width: 100%\" id=\"area" + $idVisu + "\"></svg>");
}
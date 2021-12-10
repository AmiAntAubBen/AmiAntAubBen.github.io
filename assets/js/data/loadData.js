const tabFocusIndex = 2;

$(document).ready(function (){

    $.get(url.dbinfo, function (data, status){

        let db = {
            nbArtists: 0,
            nbAlbums: 0,
            nbSongs: 0
        };

        if(status === 'success' && data.nbArtist.length !== 0){

            db.nbArtists = data.nbArtist;
            db.nbAlbums = data.nbAlbum;
            db.nbSongs = data.nbSong;
        }

        $("#database_connexion").html("<b>artistes</b> : " + db.nbArtists + " <b>albums</b> : ".bold() + db.nbAlbums + " <b>songs</b> : ".bold() + db.nbSongs);

        initVisu(1, "Visu 1");
        initVisu(2, "Choroplèthe");
        initVisu(3, "Visu 3");
        initVisu(4, "Visu 4");
        initVisu(5, "Visu 5");

        visu1(db);
        visu2(db);
    })

})
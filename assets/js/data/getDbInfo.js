function getDbInfo() {

    let db = {
        nbArtists: 0,
        nbAlbums: 0,
        nbSongs: 0
    };

    $.get(url.dbinfo, function (data, status){

        if(status === 'success' && data.nbArtist.length !== 0){

            $db.nbArtists = data.nbArtist;
            $db.nbAlbums = data.nbAlbum;
            $db.nbSongs = data.nbSong;
        }

        return $db;
    })

}

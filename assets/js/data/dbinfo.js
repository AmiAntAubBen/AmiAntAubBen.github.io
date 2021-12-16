let dbinfo = {
    nbArtists: 0,
    nbAlbums: 0,
    nbSongs: 0
};

async function getDbInfo() {

    let url = 'https://wasabi.i3s.unice.fr/search/dbinfo';

    await fetch(url).then((data)=> data.json()).then((json) => {

        dbinfo.nbArtists = json.nbArtist;
        dbinfo.nbAlbums = json.nbAlbum;
        dbinfo.nbSongs = json.nbSong;
    })
}
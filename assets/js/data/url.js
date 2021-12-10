const url = {
    dbinfo: 'https://wasabi.i3s.unice.fr/search/dbinfo',

    allArtists: function ($count){
        return 'https://wasabi.i3s.unice.fr/api/v1/artist_all/' + $count;
    }
}
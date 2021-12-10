function retrieveAllAlbumId(db) {

    var albumsID = [];

    for (let step = 0, i = 0; step < db.nbArtists; step = step + 201, i++){

        /*$.get(url.allArtists(step), function (data, status){
            if(status === 'success'){
                var i = 0
                data.forEach(artist => {
                    console.log(artist);
                    artist.albums.forEach(album => {
                        albumsID.push(album._id)
                    })
                    i++;
                })
            }
        })*/
    }
    /*

    $.get(url.allArtists(db.nbArtists), function (data, status){
        if(status === 'success'){
            var i = 0
            data.forEach(artist => {
                //albumsID.push(artist.songs)
                artist.albums.forEach(album => {
                    console.log(album._id);
                })
                i++;
            })
            console.log(i);
        }
    })*/
}
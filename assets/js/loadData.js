const url = {
    dbinfo: 'https://wasabi.i3s.unice.fr/search/dbinfo',
    allArtist: 'https://wasabi.i3s.unice.fr/api/v1/artist_all/0'
}



$(document).ready(function (){
    console.log( "ready!" );

    $("#overview").load('./component/visu1.html');

    $.get(url.dbinfo, function (data, status){
        if(status === 'success' && data.nbArtist.length !== 0){
            console.log(data.nbArtist);
            $("#database_connexion").html("<b>artistes</b> : " + data.nbArtist + " <b>albums</b> : ".bold() + data.nbAlbum + " <b>songs</b> : ".bold() + data.nbSong);
        }
    })
})
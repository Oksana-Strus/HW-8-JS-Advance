$('#searchBtn').on('click', () => {
    blabla()
        .then(data => createPosterCards(data.Search))
        .catch(err => console.log(err))
        console.log('clickssssss')
})

async function blabla() {
    let inputValue = $('#inputField').val();
    const response = await fetch(`http://www.omdbapi.com/?s=${inputValue}&apikey=9ad0d8de`);
    return await response.json();
}

async function getDetailInfo(posterId) {
    const response = await fetch(`http://www.omdbapi.com/?i=${posterId}&apikey=9ad0d8de`);
    return await response.json();
}

function createPosterCards(postersInfo) {
    $('#poster-group').empty();
    for (let i = 0; i < postersInfo.length; i++) {
        let posterId = postersInfo[i].imdbID;
        let poster = createPosterCard(postersInfo[i]);
        poster.appendTo('#poster-group');
        poster.find('.cls-btn-info').on('click', () => {
            getDetailInfo(posterId)
                .then(data => showDetailModalWindow(data))
                .catch(err => console.log('Щось пішло не так'))
            console.log('click');
        });
    }
}

function showDetailModalWindow(moreDetails) {
    console.log('show');

    let detailModal = $('#detail-modal');
    let imageUrl = moreDetails.Poster;
    detailModal.find('.detail-img').css("background-image", "url(" + imageUrl + ")");
    detailModal.find('.details-caption').html(moreDetails.Title);
    detailModal.find('.details-description').html(moreDetails.Rated + ' ' + moreDetails.Year + ' ' + moreDetails.Genre);
    detailModal.find('.details-plot').html(moreDetails.Plot);
    detailModal.find('.details-written-by').html(`<b>Written by:</b> ${moreDetails.Writer}`);
    detailModal.find('.details-directed-by').html(`<b>Directed by:</b> ${moreDetails.Director}`);
    detailModal.find('.details-starring').html(`<b>Starring:</b> ${moreDetails.Actors}`);
    detailModal.find('.details-box-office').html(`<b>BoxOffice:</b> ${moreDetails.BoxOffice}`);
    detailModal.find('.details-awards').html(`<b>Awards:</b> ${moreDetails.Awards}`);
    let emptyRating = '';
    for (let i = 0; i < moreDetails.Ratings.length; i++) {
        emptyRating += `${moreDetails.Ratings[i].Source} ${moreDetails.Ratings[i].Value} <br>`;
    }
    detailModal.find('.details-ratings').html(`<b>Ratings:</b>  ${emptyRating }`);
    detailModal.modal('show');
}

function createPosterCard(posterInfo) {
    let poster = $('#empty-poster').clone();
    let imageUrl = posterInfo.Poster;
    poster.find('.movie-img').css("background-image", "url(" + imageUrl + ")");
    poster.find('.movie-caption').html(posterInfo.Title);
    poster.find('.movie-type').html(posterInfo.Type);
    poster.find('.movie-year').html(posterInfo.Year);
    poster.attr('id', `poster-${posterInfo.imdbID}`);
    return poster;
}

$('#inputField').on('keyup', function () {
    $('#cross-btn').css('display', 'block')
})

$('#cross-btn').on('click', function () {
    $('#inputField').val('');
    $('#cross-btn').css('display', 'none');
})
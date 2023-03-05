let ctnMovie;
let tabTitle;
let filmTitleDesc;
let filmOriginTitle;
let desc;
let buttonContainer;
let filmThumbDesc;
let filmStatus;
let filmTotal;
let filmTime;
let filmYear;
let filmQuality;
let filmLanguage;
let filmDirector;
let filmActor;
let filmGenre;
let filmCountry;
let params;
let filmYear2;

let saveTitle = JSON.parse(localStorage.getItem("title") || "[]");
let saveLink = JSON.parse(localStorage.getItem("link") || "[]");
let saveThumb = JSON.parse(localStorage.getItem("thumb") || "[]");
let saveYear = JSON.parse(localStorage.getItem("year") || "[]");
let saveTitleMatches = (title) => title == filmTitleDesc.innerHTML;

async function testFetch(){
    // get phim slug from url
    params = new URLSearchParams(window.location.search);
    const phim = params.get("phim");

    // url api 1 phim
    const url = "https://ophim1.com/phim/" + phim;

    // call api get 1 phim
    await fetch(url,{
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(res=>{
        return res.json();
    }).then(data=>{
        //add content
        ctnMovie = document.getElementById("ctnMovie");
        tabTitle = document.getElementById("tabtitle");
        filmTitleDesc = document.getElementById("filmtitledesc");
        filmOriginTitle = document.getElementById("filmorigintitle");
        desc = document.getElementById("desc");
        buttonContainer = document.getElementById("buttoncontainer");
        filmThumbDesc = document.getElementById("filmthumbdesc");
        filmStatus = document.getElementById("filmstatus");
        filmTotal = document.getElementById("filmtotal")
        filmTime = document.getElementById("filmtime");
        filmYear = document.getElementById("filmyear");
        filmQuality = document.getElementById("filmquality");
        filmLanguage = document.getElementById("filmlanguage");
        filmDirector = document.getElementById("filmdirector");
        filmActor = document.getElementById("filmactor");
        filmGenre = document.getElementById("filmgenre");
        filmCountry = document.getElementById("filmcountry");

        ctnMovie.innerHTML = data.movie.content;
        tabTitle.innerHTML = "Xem phim " + data.movie.name + " | Webphim";
        filmTitleDesc.innerHTML = data.movie.name;
        filmOriginTitle.innerHTML = data.movie.origin_name;
        filmThumbDesc.src = data.movie.thumb_url;
        filmStatus.innerHTML = "<strong>Trạng thái</strong>" + data.movie.episode_current;
        filmTotal.innerHTML = "<strong>Số tập</strong>" + data.movie.episode_total;
        filmTime.innerHTML = "<strong>Thời lượng</strong>" + data.movie.time;
        filmYear.innerHTML = "<strong>Năm</strong>" + data.movie.year;
        filmQuality.innerHTML = "<strong>Chất lượng</strong>" + data.movie.quality;
        filmLanguage.innerHTML = "<strong>Ngôn ngữ</strong>" + data.movie.lang;
        filmDirector.innerHTML = "<strong>Đạo diễn</strong>" + data.movie.director;
        filmActor.innerHTML = "<strong>Diễn Viên</strong>" + data.movie.actor;
        filmGenre.innerHTML = "<strong>Thể loại</strong>" + data.movie.category[0].name;
        filmCountry.innerHTML = "<strong>Quốc gia</strong>" + data.movie.country[0].name;
        filmYear2 = data.movie.year;

        //add video
        const video = document.getElementById("video");
        video.controls = true;

        const hls = new Hls();
        hls.loadSource(
            data.episodes[0].server_data[0].link_m3u8
        );
        hls.attachMedia(video);
        console.log(data.episodes[0].server_data[0].link_m3u8);
        console.log(data.episodes[0].server_data.length);

        for (let i = 0; i < (data.episodes[0].server_data.length); i++) {
            const episodeButton = document.createElement("button");
            episodeButton.className = "episodebutton";
            const episode = i;
            episodeButton.innerHTML = (episode + 1);
            buttonContainer.appendChild(episodeButton);
            episodeButton.addEventListener("click", function() {
                const episode = i;
                    hls.loadSource(
                    data.episodes[0].server_data[episode].link_m3u8
                    );
                    console.log(data.episodes[0].server_data[episode].link_m3u8);
                hls.attachMedia(video);
            });
        }
        if(saveTitle.find(saveTitleMatches) == filmTitleDesc.innerHTML) {
            const favoritesButton = document.getElementById("favoritesbutton");
            favoritesButton.innerHTML = "Xóa khỏi Yêu Thích";
        }
    })
}

testFetch();
function addToFavorites() {
    saveTitle = JSON.parse(localStorage.getItem("title") || "[]");
    saveLink = JSON.parse(localStorage.getItem("link") || "[]");
    saveThumb = JSON.parse(localStorage.getItem("thumbnail") || "[]");
    saveYear = JSON.parse(localStorage.getItem("year") || "[]");
    saveTitleMatches = (title) => title == filmTitleDesc.innerHTML;


    if(saveTitle.find(saveTitleMatches) !== filmTitleDesc.innerHTML) {
    saveTitle.unshift(filmTitleDesc.innerHTML);
    saveLink.unshift(params.get("phim"));
    saveThumb.unshift(filmThumbDesc.src);
    saveYear.unshift(filmYear2);


    localStorage.setItem("title", JSON.stringify(saveTitle));
    localStorage.setItem("link", JSON.stringify(saveLink));
    localStorage.setItem("thumbnail", JSON.stringify(saveThumb));
    localStorage.setItem("year", JSON.stringify(saveYear));
    if(saveTitle.find(saveTitleMatches) == filmTitleDesc.innerHTML) {
        const favoritesButton = document.getElementById("favoritesbutton");
        favoritesButton.innerHTML = "Xoá khỏi Yêu Thích";
    }
    
    } else {
        indexToDelete1 = (title) => title == filmTitleDesc.innerHTML;
        indexToDelete2 = (title) => title == params.get("phim");
        indexToDelete3 = (title) => title == filmThumbDesc.src;
        indexToDelete4 = (title) => title == filmYear2;
        saveTitle.splice(saveTitle.findIndex(indexToDelete1), 1);
        saveLink.splice(saveLink.findIndex(indexToDelete2), 1);
        saveThumb.splice(saveThumb.findIndex(indexToDelete3), 1);
        saveYear.splice(saveYear.findIndex(indexToDelete4), 1);
        localStorage.setItem("title", JSON.stringify(saveTitle));
        localStorage.setItem("link", JSON.stringify(saveLink));
        localStorage.setItem("thumbnail", JSON.stringify(saveThumb));
        localStorage.setItem("year", JSON.stringify(saveYear));
        const favoritesButton = document.getElementById("favoritesbutton");
        favoritesButton.innerHTML = "Thêm vào Yêu Thích";
    }
}

let restoreTitle = JSON.parse(localStorage.getItem("title"));
let restoreLink = JSON.parse(localStorage.getItem("link"));
let restoreThumbLink = JSON.parse(localStorage.getItem("thumbnail"));
let restoreYear = JSON.parse(localStorage.getItem("year"));


function getBoomarksFromLocalStorage() {
    if(restoreTitle !== null) {
      for(let i = 0; i < restoreTitle.length && i < 6; i++) {
      const title = document.createElement("a");
      const titleName = document.createElement("p");
      const thumb = document.createElement("img");
      const year = document.createElement("p");
      const filmContainer = document.getElementById("film-container");
      
      title.className = "film-item";
      year.className = "year";
      titleName.className = "title-name";

      thumb.src = restoreThumbLink[i];
      titleName.innerHTML = restoreTitle[i];
      year.innerHTML = restoreYear[i];
      title.href = "/phim.html?phim=" + restoreLink[i];

      title.appendChild(thumb);
      title.appendChild(titleName);
      title.appendChild(year);
      
      filmContainer.appendChild(title);
      }
    }
}
console.log(restoreTitle);
console.log(restoreLink);
console.log(restoreThumbLink);
console.log(restoreYear);

getBoomarksFromLocalStorage();

async function getSuggested(){
    const url = "https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=1";

    await fetch(url,{
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(res=>{
        return res.json();
    }).then(data=>{
        //add content
        const itemLength = data.items.length;
        for (let i = 0; i < itemLength && i < 6; i++) {
        const title = document.createElement("a");
        const titleName = document.createElement("p");
        const thumb = document.createElement("img");
        const year = document.createElement("p");
        const filmContainer = document.getElementById("film-container-suggested");

        title.className = "film-item";
        year.className = "year";
        titleName.className = "title-name";

        thumb.src = "https://img.hiephanhthienha.com/uploads/movies/" + data.items[i].thumb_url;
        titleName.innerHTML = data.items[i].name;
        year.innerHTML = data.items[i].year;
        title.href = "/phim.html?phim=" + data.items[i].slug;

        title.appendChild(thumb);
        title.appendChild(titleName);
        title.appendChild(year);
        
        filmContainer.appendChild(title);
        console.log(i);
        }
    })
}
getSuggested();
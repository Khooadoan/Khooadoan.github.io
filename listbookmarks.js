let restoreTitle = JSON.parse(localStorage.getItem("title"));
let restoreLink = JSON.parse(localStorage.getItem("link"));
let restoreThumbLink = JSON.parse(localStorage.getItem("thumbnail"));
let restoreYear = JSON.parse(localStorage.getItem("year"));


function getBoomarksFromLocalStorage() {
      if (restoreTitle !== null) {
      for(let i = 0; i < restoreTitle.length; i++) {
      const title = document.createElement("a");
      const titleName = document.createElement("p");
      const thumb = document.createElement("img");
      const year = document.createElement("p");
      const filmContainer = document.getElementById("film-container-bookmarks");
      
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
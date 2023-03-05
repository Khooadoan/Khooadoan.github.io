    async function testFetch(){
        params = new URLSearchParams(window.location.search);
        const page = params.get("page");
    
        const url = "https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=" + page;
    
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
            for (let i = 0; i < itemLength && i < 30; i++) {
            const title = document.createElement("a");
            const titleName = document.createElement("p");
            const thumb = document.createElement("img");
            const year = document.createElement("p");
            const filmContainer = document.getElementById("film-container");

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
            }
        })
    }
testFetch();
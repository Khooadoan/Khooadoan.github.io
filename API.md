API

<!--# BASE_API
-> https://ophim1.cc/_next/data/x5eGH4wObN-EpnueF2sPG

# Search
- {{BASE_API}}/tim-kiem.json?keyword={{key}}

# Detail
- {{BASE_API}}/phim/{{slug}}.json
    + trong detail film có breadCrumb => có thể làm category cho filter

# Filter
- {{BASE_API}}/{{category}}.json?sort_field={{sort_field}}&country={{country}}&year={{year}}
    + category : phim-moi, phim-bo, phim-le, tv-shows, hoat-hinh, phim-sap-chieu, subteam
    + sort_field : _id, modified.time, year
    + country : trung-quoc, han-quoc, nhat-ban, thai-lan, au-my, dai-loan, hong-kong, an-do, anh, phap, canada, quoc-gia-khac, duc, tay-ban-nha, tho-nhi-ky, ha-lan, indonesia, nga, mexico, ba-lan, uc, thuy-dien, malaysia, brazil, philippines, bo-dao-nha, y, dan-mach, uae, na-uy, thuy-si, chau-phi, nam-phi, ukraina, a-rap-xe-ut
    + year : 2010 -> 2023

# Image
- BASE_IMG = https://img.hiephanhthienha.com/uploads/movies
- {{BASE_IMG}}/{{IMG}}
-->

# get list phim
- https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=2

# Xem 1 phim
- https://ophim1.com/phim/loi-sam-hoi-muon-mang-ii

# Xem video 1 phim
- link_m3u8

# hiển thị ảnh
- https://img.hiephanhthienha.com/uploads/movies/loi-sam-hoi-muon-mang-ii-thumb.jpg


________________________________

- ở trang danh sách phim -> hiện ra list phim
- khi họ bấm vào 1 phim
- sẽ cho đi tới trang /xemphim?phim={}
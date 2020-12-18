const axios = require('axios');

getData();

function getData(pageIndex = 0, maxPage = 100) {
    if (pageIndex > maxPage) {
        return
    }

    axios({
        url: 'https://api.boxmedia.vip/bizCards?page=2&biz_type=k_xhs&source=user&identity=kol'
    }).then(res => res.data)
        .then(res => {
            console.log(res);
        })

    // getData(++pageIndex)

}





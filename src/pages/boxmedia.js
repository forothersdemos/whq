const axios = require('axios');
const XLSX = require('xlsx');
const fs = require('fs');
// 所有数据
const queues = [];
const quotas=[]
getData();

/**
 *
 * @param pageIndex 开始遍历的 page
 * @param maxPage 最大页数
 */
function getData(pageIndex = 1, maxPage = 4) {
    if (pageIndex > maxPage) {
        return
    }
    // 获取数据
    axios({
        url: `https://api.boxmedia.vip/bizCards?page=${pageIndex}&biz_type=k_xhs&source=user&identity=kol`
    }).then(res => res.data)
        .then(res => {
            // 追加存储所有数据
            queues.push(...res.data);
            console.log(queues.length);

            // 解析需要的字段
            let quotaJson = res.data.map(item => ({
                city: item.city,
                followers: item.followers,
                name: item.name,
                tags: item.tags
            }));
            console.log(quotaJson);
            quotas.push(...quotaJson);

            // 更新到本地 xlsx
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.json_to_sheet(quotas);
            XLSX.utils.book_append_sheet(workbook, worksheet);
            XLSX.writeFile(workbook, 'quota.xlsx');
        })


    getData(++pageIndex)

}





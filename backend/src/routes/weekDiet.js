const cheerio = require('cheerio');
const express = require('express');
const request = require('request');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('diet');
    var options = {
        method: 'POST',
        url: 'https://www.kduniv.ac.kr/kor/CMS/DietMenuMgr/list.do',
        headers: {
            Cookie: 'JSESSIONID=F4E37BA5A82D4B0EFFF4CC34744F03B2.worker1',
        },
        formData: {
            mCode: 'MN183',
            searchDay: '2023-03-06',
            searchDietCategory: '5',
        },
    };
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        let $ = cheerio.load(body);
        try {
            $('tbody tr td').each(function (index, elem) {
                var rate_text = $(this).text().trim(); //해당 태그의 text부분만 잘라오기
                console.log(rate_text);
                // res.send(rate_text);
            });
        } catch (error) {
            console.error(error);
        }
    });
});

module.exports = router;

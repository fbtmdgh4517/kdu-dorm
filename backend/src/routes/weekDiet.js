const cheerio = require('cheerio');
const express = require('express');
const request = require('request');
const FormData = require('form-data');
const axios = require('axios');
const router = express.Router();

const dietList = {
    date: '',
    breakfast: '',
    dinner: '',
};

router.get('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const meals = [];

    let options = {
        method: 'POST',
        url: 'https://www.kduniv.ac.kr/kor/CMS/DietMenuMgr/list.do',
        headers: {
            Cookie: 'JSESSIONID=D3D68E51124F13D7A286F97E9BEA5696.worker1',
        },
        formData: {
            mCode: 'MN183',
            searchDay: '2023-03-27',
            searchDietCategory: '5',
        },
    };
    request(options, (error, response) => {
        if (error) throw new Error(error);
        let $ = cheerio.load(response.body);
        try {
            $('tbody tr').each(function (index, elem) {
                const date = $(elem).find('th').text().trim();
                const breakfast = $(elem).find('td ul.res-depth1').text().trim().split('\n');
                const dinner = $(elem).find('td ul.res-depth2').text().trim().split('\n');
                if (date === '' && breakfast === '' && dinner === '') {
                    //반복문 탈출
                    return false;
                }
                meals.push({ date, breakfast, dinner });
            });
        } catch (error) {
            console.error(error);
        }
        console.log(meals);
        res.send(meals);
    });
});

module.exports = router;

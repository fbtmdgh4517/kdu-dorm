const cheerio = require('cheerio');
const express = require('express');
const request = require('request');
// const FormData = require('form-data');
// const axios = require('axios');
const router = express.Router();

router.get('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const meals = [];
    const date = new Date();
    let day = date.getDay().toString();

    let options = {
        method: 'POST',
        url: 'https://www.kduniv.ac.kr/kor/CMS/DietMenuMgr/list.do',
        headers: {
            // Cookie: 'JSESSIONID=D3D68E51124F13D7A286F97E9BEA5696.worker1',
        },
        formData: {
            mCode: 'MN183',
            // searchDay: '2023-03-28',
            searchDietCategory: '5',
        },
    };
    request(options, (error, response) => {
        if (error) throw new Error(error);
        let $ = cheerio.load(response.body);
        try {
            if (day === '0') {
                day = '7';
            }
            const todayDate = $(`tbody tr:nth-of-type(${day}) th`)
                .text()
                .trim()
                .replace('\n\t\t\t\t\t\t', '.')
                .replace('\n\t\t\t\t\t\t', ' ');
            const todayBreakfast = $(`tbody tr:nth-of-type(${day}) td:nth-of-type(1)`).text().trim().split('\n');
            const todayDinner = $(`tbody tr:nth-of-type(${day}) td:nth-of-type(2)`).text().trim().split('\n');
            meals.push({ todayDate, todayBreakfast, todayDinner });
            // console.log(meals);
            // $('tbody tr').each(function (index, elem) {
            //     const date = $(elem)
            //         .find('th')
            //         .text()
            //         .trim()
            //         .replace('\n\t\t\t\t\t\t', '.')
            //         .replace('\n\t\t\t\t\t\t', ' ');
            //     const breakfast = $(elem).find('td:nth-of-type(1)').text().trim().split('\n');
            //     const dinner = $(elem).find('td:nth-of-type(2)').text().trim().split('\n');
            //     if (date === '' && breakfast === '' && dinner === '') {
            //         //반복문 탈출
            //         return false;
            //     }
            //     meals.push({ date, breakfast, dinner });
            // });
        } catch (error) {
            console.error(error);
        }
        // console.log(meals);
        res.send(meals);
    });
});

module.exports = router;

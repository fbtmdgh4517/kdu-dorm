const cheerio = require('cheerio');
const express = require('express');
const request = require('request');
// const FormData = require('form-data');
// const axios = require('axios');
const router = express.Router();

router.get('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const meals = [];
    const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const today = new Date();
    const year = today.getFullYear().toString();
    const month = (today.getMonth() + 1).toString();
    const date = today.getDate().toString();
    const day = dayOfWeek[today.getDay()];
    let dayIndex = today.getDay().toString();

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
            const todayDate = `${year}년 ${month}월 ${date}일 ${day}요일`;
            // if (day === '0') {
            //     day = '7';
            // }
            // const todayDate = $(`tbody tr:nth-of-type(5) th`)
            //     .text()
            //     .trim()
            //     .replace('\n\t\t\t\t\t\t', '.')
            //     .replace('\n\t\t\t\t\t\t', ' ');
            if (day === '금' || day === '토' || day === '일') {
                const todayBreakfast = [''];
                const todayDinner = [''];
                meals.push({ todayDate, todayBreakfast, todayDinner });
                console.log(meals);
            } else {
                const todayBreakfast = $(`tbody tr:nth-of-type(${dayIndex}) td:nth-of-type(1)`)
                    .text()
                    .trim()
                    .split('\n');
                const todayDinner = $(`tbody tr:nth-of-type(${dayIndex}) td:nth-of-type(2)`).text().trim().split('\n');
                meals.push({ todayDate, todayBreakfast, todayDinner });
                console.log(meals);
            }
            // $('tbody tr').each(function (index, elem) {
            //     const today = $(elem)
            //         .find('th')
            //         .text()
            //         .trim()
            //         .replace('\n\t\t\t\t\t\t', '.')
            //         .replace('\n\t\t\t\t\t\t', ' ');
            //     const breakfast = $(elem).find('td:nth-of-type(1)').text().trim().split('\n');
            //     const dinner = $(elem).find('td:nth-of-type(2)').text().trim().split('\n');
            //     if (today === '' && breakfast === '' && dinner === '') {
            //         //반복문 탈출
            //         return false;
            //     }
            //     meals.push({ today, breakfast, dinner });
            // });
        } catch (error) {
            console.error(error);
        }
        // console.log(meals);
        res.send(meals);
    });
});

module.exports = router;

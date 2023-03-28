const express = require('express');
const FormData = require('form-data');
const axios = require('axios');
const request = require('request');
const form = new FormData();
const router = express.Router();

form.append('rows', '10');
form.append('bbs_locgbn', 'KY');
form.append('bbs_id', 'notice');
form.append('cPage', '1');

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

router.get('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    axios
        .post('https://metrodorm.kduniv.ac.kr/bbs/getBbsList.kmc', {
            rows: '10',
            bbs_locgbn: 'KY',
            bbs_id: 'notice',
            cPage: '1',
        })
        .then((response) => {
            // console.log(response.data);
            res.send(response.data);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('서버 오류');
        });
    // axios
    //     .post('https://metrodorm.kduniv.ac.kr/bbs/getBbsList.kmc', form, {
    //         headers: {},
    //     })
    //     .then((response) => {
    //         console.log(response.data);
    //         // res.send(response.data);
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //         res.status(500).send('서버 오류');
    //     });
    // let options = {
    //     method: 'POST',
    //     url: 'https://metrodorm.kduniv.ac.kr/bbs/getBbsList.kmc',
    //     headers: {},
    //     formData: {
    //         rows: '10',
    //         bbs_locgbn: 'KY',
    //         bbs_id: 'notice',
    //         cPage: '1',
    //     },
    // };
    // request(options, (error, response) => {
    //     if (error) throw new Error(error);
    //     res.send(response.body);
    // });
});

module.exports = router;

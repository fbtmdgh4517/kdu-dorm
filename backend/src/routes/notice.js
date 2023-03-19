const express = require('express');
const FormData = require('form-data');
const axios = require('axios');
const data = new FormData();
const router = express.Router();

router.get('/', (req, res) => {
    res.send('notice');
    var config = {
        method: 'post',
        url: 'https://metrodorm.kduniv.ac.kr/bbs/getBbsView.kmc?seq=907&bbs_locgbn=KY&bbs_id=notice',
        headers: {
            Cookie: 'JSESSIONID="Da37_SvWUQagRes4nxCaTHxzqNke7gKncJ70h8eP.master:NON-HAKSA-1"; SCOUTER=z36j0dbdjppeus',
            ...data.getHeaders(),
        },
        data: data,
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
});

module.exports = router;

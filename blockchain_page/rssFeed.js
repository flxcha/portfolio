const express = require('express');
const app = express();
const googleAPI = require('google-trends-api')
let tagCloud = require('tag-cloud');

getTrends();

function getTrends() {
    let now = Date.now();
    let h24ago = (Date.now()) - (30 * 24 * 60 * 60 * 1000)
    let Now = new Date(now)
    let H24ago = new Date(h24ago)
    console.log(H24ago)
    googleAPI.relatedQueries({keyword: 'Cryptocurrency', startTime: H24ago})
    .then((res) => {
    let response = JSON.parse(res);
    let data= response.default.rankedList[0].rankedKeyword;

    let chartData =[] 
    for (i=0; i<data.length; i++){
        let query = data[i].query;
        let weight = data[i].value;
        let key = 'query' + i.toString()
        let value = 'value' + i.toString()
        chartData.push({"tagName": query, "count": weight})
        
        
    };
    console.log(chartData)
    tagCloud.tagCloud(chartData, function (err, data) {
        console.log(err, data);
    });
    })
    .catch((err) => {
    console.log(err);
    })
    
};


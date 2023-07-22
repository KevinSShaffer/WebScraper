'use strict';

const https = require('follow-redirects/https');
const cheerio = require('cheerio');

(async () => new Promise((resolve, reject) => {
    let itemId = 16385;

    https.get(`https://www.ffxiah.com/item/${itemId}`, (res) => {
        res.on('data', (data) => {
            scrapeItemInfo(data)
        });

        res.on('end', () => {
            resolve();
        });
    }).on('error', (error) => {
        console.error(error);
        reject(error)
    })
}))();

function scrapeItemInfo(data) {
    let itemData = {};
    const $ = cheerio.load(data);

    const itemTable = $('.stdtbl');
    const itemRows = itemTable.find('tr');
    const itemHeader = itemRows.eq(0);
    const itemBody = itemRows.eq(1);
    console.log(itemBody.text());
    const itemTree = itemRows.eq(2);
    console.log(itemTree.text());

    const npcTable = $('.tbl-item-bazaar');
    const npcRows = npcTable.find('tr');
    for (let i = 2; i < npcRows.length; i++) {
        let npcRow = npcRows.eq(i);
        console.log(npcRow.text());
    }
}
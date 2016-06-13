"use strict";

const config = require('./config.js');
const Twit = require('twit');
const fs = require('fs');
const Bot = new Twit(config);
var cron = require('node-cron');
var emojiis = {
	concernedFace: {
		pic:'ಠ_ಠ',
		link:'https://codegear.io/collections/shirts/products/short-sleeve-mens-t-shirt-2'
	},
	cryingFace: {
		pic:'ಥ_ಥ',
		link:'https://codegear.io/collections/shirts/products/crying-face-t-shirt-light-mens'
	},
	shrugFace: {
		pic: "¯\_(ツ)_/¯",
		link: 'https://codegear.io/collections/totes/products/shrug-tote'
	},
	tableFlip: {
		pic: '(╯°□°）╯︵ ┻━┻)',
		link:'https://codegear.io/collections/shirts/products/short-sleeve-mens-t-shirt-4'
	},
	noo: {
		pic:'(」ﾟﾛﾟ)｣NOOOooooo',
		link:'https://codegear.io/collections/shirts/products/noo-t-shirt-light-mens'
	},
	bear: {
		pic:'ʕ •ᴥ•ʔ',
		link:'https://codegear.io/products/bear-t-shirt-dark-mens'
	}
}

var hashtags = {
	devHumor:'#devHumor',
	programmerHumor:'#programmerHumor',
	webDev:'#webDev',
	dev:'#dev',
	programming:'#programming',
	code:'#code'
}

var promotions = {
	hw:'HELLOWORLD',
	h:'HELLO',
	init: 'INIT'
}
 
cron.schedule('* */5 * * *', promotionPost);
cron.schedule('*/52 * * * *', productPost);
cron.schedule('* */2 * * *', emojiiPost);

function tweet (content) {
	Bot.post('statuses/update', { status: content }, function (err, reply) {
		if (err) {
			console.log(err);
			return;	
		}
	})
};

function promotionPost() {
	let promotion = pickRandomProperty(promotions);
	let hashtag = pickRandomProperty(hashtags);
	let content = "We're rolling out our technical tees and totes today! Use " + promotions[promotion] + ' for 20% off ' + hashtags[hashtag]
	tweet(content);
}

function productPost() {
	let promotion = pickRandomProperty(promotions);
	let hashtag = pickRandomProperty(hashtags);
	let emojii = pickRandomProperty(emojiis);
	let content = "Use the promition code " + promotions[promotion] + ' to get 20% off ' + emojiis[emojii]['pic'] + ' ' + hashtags[hashtag] + ' ' + emojiis[emojii]['link'];
	tweet(content); 
}

function emojiiPost() {
	let promotion = pickRandomProperty(promotions);
	let hashtag = pickRandomProperty(hashtags);
	let emojii = pickRandomProperty(emojiis);
	let content = '#' + emojiis[emojii]['pic'] + ' ' + hashtags[hashtag] + ' ' + emojiis[emojii]['link'];
	tweet(content);
}

function pickRandomProperty(obj) {
    var result;
    var count = 0;
    for (var prop in obj)
        if (Math.random() < 1/++count)
           result = prop;
    return result;
}











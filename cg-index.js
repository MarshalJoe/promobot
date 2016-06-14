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

var election = {
	hrc: {
		msg:'An ascii-art @HillaryClinton to say #ImWithHer #Election2016',
		link:'https://codegear.io/collections/shirts/products/hillary-t-shirt-womens'
	},
	trump: {
		msg:'Support and/or shock your #NeverTrump or #Trump2016 colleagues with ascii @realDonalTrump #Election2016',
		link:'https://codegear.io/collections/shirts/products/trump-shirt-mens'
	}
}

var hashtags = {
	devHumor:'#devHumor',
	programmerHumor:'#programmerHumor',
	webDev:'#webDev',
	dev:'#dev',
	programming:'#programming',
	code:'#code',
	coding:'#coding',
	humor: '#humor'
}

var promotions = {
	hw:'HELLOWORLD',
	h:'HELLO',
	init: 'INIT'
}
 
cron.schedule('0 0 */2 * * *', productPost);
cron.schedule('0 0 */5 * * *', emojiiPost);
cron.schedule('0 0 */6 * * *', electionPost);
cron.schedule('0 0 */13 * * *', promotionPost);

function tweet (content) {
	Bot.post('statuses/update', { status: content }, function (err, reply) {
		if (err) {
			console.log(err);
			return;	
		}
	})
};

function electionPost() {
	let party = pickRandomProperty(election);
	let content = election[party]['msg'] + ' ' + election['link'];
	tweet(content);
}

function promotionPost() {
	let promotion = pickRandomProperty(promotions);
	let hashtag = pickRandomProperty(hashtags);
	let content = "We're rolling out more technical tees and totes today! Use " + promotions[promotion] + ' for 20% off ' + hashtags[hashtag]
	tweet(content);
}

function productPost() {
	let promotion = pickRandomProperty(promotions);
	let hashtag = pickRandomProperty(hashtags);
	let emojii = pickRandomProperty(emojiis);
	let content = "Use the promotion code " + promotions[promotion] + ' to get 20% off ' + emojiis[emojii]['pic'] + ' ' + hashtags[hashtag] + ' ' + emojiis[emojii]['link'];
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











const baseURL = 'http://deckofcardsapi.com/api/deck';

//1
// $.getJSON(`${baseURL}/new/shuffle/?deck_count=1`)
//     .then(data => {
//     console.log("Deck Shuffled");
//     return $.getJSON(`${baseURL}/${data.deck_id}/draw/?count=1`)
//     })
//     .then(resp => {
//         let card = resp.cards[0];
//         console.log(`${card.value} of ${card.suit}`)
//     })

async function drawCard() {
	let res = await $.getJSON(`${baseURL}/new/draw`);
	console.log(`${res.cards[0].value} of ${res.cards[0].suit}`);
}

drawCard();

//2
// const cards = [];
// $.getJSON(`${baseURL}/new/shuffle/?deck_count=1`)
//     .then(data => {
//     console.log("Deck Shuffled");
//     return $.getJSON(`${baseURL}/${data.deck_id}/draw/?count=1`);
//     })
//     .then(resp1 => {
//         cards.push(resp1.cards[0]);
//         return $.getJSON(`${baseURL}/${resp1.deck_id}/draw/?count=1`);
//     })
//     .then(resp2 => {
//         cards.push(resp2.cards[0]);
//         // console.log(cards);
//         cards.forEach(card => {
//             console.log(`${card.value} of ${card.suit}`);
//         })
//     })

async function draw2Cards() {
	const cards = [];

	let r1 = await $.getJSON(`${baseURL}/new/draw`);
	let deckId = r1.deck_id;
	let r2 = await $.getJSON(`${baseURL}/${deckId}/draw/?count=1`);

	cards.push(r1.cards[0], r2.cards[0]);

	cards.forEach((card) => {
		console.log(`${card.value} of ${card.suit}`);
	});
}

draw2Cards();

//3

// $.getJSON(`${baseURL}/new/shuffle/?deck_count=1`).then(data => {
//     deckId = data.deck_id;
//     $btn.show();
// })

// $btn.on('click', function () {
//     $.getJSON(`${baseURL}/${deckId}/draw/?count=1`)
//         .then(data => {
//             console.log(data.remaining);
//             let $cardImg = $(`<img src="${data.cards[0].image}"></img>`)
//             $('#cards').append($cardImg)
//             if (data.remaining === 0) $btn.remove();
//         });
// })

async function setup() {
	let $btn = $('button');

	let deckData = await $.getJSON(`${baseURL}/new/shuffle/?deck_count=1`);

	$btn.show().on('click', async function() {
		let resp = await $.getJSON(`${baseURL}/${deckData.deck_id}/draw/?count=1`);
		let $cardImg = $(`<img src="${resp.cards[0].image}"></img>`);
		$('#cards').append($cardImg);
		if (resp.remaining === 0) $btn.remove();
	});
}

setup();

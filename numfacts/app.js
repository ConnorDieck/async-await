const baseURL = 'http://numbersapi.com';
const favNum = 7;
//1
// Either console.log within the request callback, or use .then to wait for the promise to be fulfilled

// $.getJSON(`${baseURL}/7?json`, res => {
//     numFact = res;
//     console.log(numFact);
// })

// $.getJSON(`${baseURL}/${favNum}?json`).then(data => {
//     console.log(data);
//   });

async function favNumFact(num) {
	let res = await axios.get(`${baseURL}/${favNum}?json`);
	console.log(res.data.text);
}

favNumFact(favNum);

//2
let numRange = [ 1, 2, 3, 5, 18, 177 ];
// $.getJSON(`${baseURL}/${numRange}?json`).then(data => {
//     console.log(data);
//     for (let num in data) {
//         let fact = data[num];
//         let $newLI = $('<li></li>');
//         $newLI.text(fact);
//         $('#num-facts').append($newLI);
//     }
// })

async function multiNumFacts(arr) {
	let res = await axios.get(`${baseURL}/${numRange}?json`);
	// console.log(res.data);
	for (let num in res.data) {
		let fact = res.data[num];
		let $newLI = $('<li></li>');
		$newLI.text(fact);
		$('#num-facts').append($newLI);
	}
}

multiNumFacts(numRange);

//3
let fourNumPromises = [];

// for (let i = 0; i < 4; i++) {
//     fourNumPromises.push(
//         $.getJSON(`${baseURL}/${favNum}?json`)
//     )
// }
// Promise.all(fourNumPromises).then(factArr => {
//     factArr.forEach(data => {
//         let $newLI = $('<li></li>');
//         $newLI.text(data.text);
//         $('#num-facts').append($newLI);
//     })
// })

async function favNumFacts(num) {
	let res = await Promise.all([
		axios.get(`${baseURL}/${favNum}?json`),
		axios.get(`${baseURL}/${favNum}?json`),
		axios.get(`${baseURL}/${favNum}?json`),
		axios.get(`${baseURL}/${favNum}?json`)
	]);

	// console.log(res);
	res.forEach((item) => {
		let $newLI = $('<li></li>');
		$newLI.text(item.data.text);
		$('#num-facts').append($newLI);
	});
}

favNumFacts(favNum);

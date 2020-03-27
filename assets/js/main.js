// made with <3 by afarhansib | visit me on https://afarhansib.github.io/
console.log('%c made with <3 by afarhansib', 'font-weight: bold; font-size: 30px;color: #ff2600; text-shadow: 1px 1px 0px black , -1px -1px 0px white')
console.log('%c visit me on https://afarhansib.github.io/', 'font-weight: bold; font-size: 20px;color: black; text-shadow: 1px 1px 0px #fc0 , -1px -1px 0px white')



// service worker
if ("serviceWorker" in navigator) {
	navigator.serviceWorker
		.register("sw.js")
		.then(function() {
		})
		.catch(function(err) {
		});
} else {
}

const footer = document.getElementById("footer");
const footerHandler = document.getElementById("footerHandler");
const fakeFooter = document.querySelector(".fake-footer");
let data = {
	day1: [false, [0, 2], [0, 2], [0, 4], [0, 4]],
	day2: [false, [0, 3], [0, 3], [0, 6], [0, 6]],
	day3: [false, [0, 4], [0, 6], [0, 8], [0, 6]],
	day4: [false, [0, 8], [0, 6], [0, 4], [0, 6]],
	day5: [false, [0, 10], [0, 8], [0, 6], [0, 4]],
	day6: [false, [0, 5], [0, 5], [0, 2], [0, 4]],
	day7: [false, [0, 2], [0, 2], [0, 4], [0, 2]],
	day8: [false, [0, 6], [0, 8], [0, 10], [0, 2]],
	day9: [false, [0, 8], [0, 12], [0, 10], [0, 8]],
	day10: [false, [0, 4], [0, 8], [0, 4], [0, 8]],
	day11: [false, [0, 12], [0, 8], [0, 10], [0, 6]],
	day12: [false, [0, 16], [0, 8], [0, 6], [0, 6]],
	day13: [false, [0, 14], [0, 12], [0, 14], [0, 12]],
	day14: [false, [0, 5], [0, 8], [0, 5], [0, 10]],
	day15: [false, [0, 10], [0, 15], [0, 10], [0, 15]],
	day16: [false, [0, 5], [0, 5], [0, 10], [0, 5]],
	day17: [false, [0, 20], [0, 10], [0, 10], [0, 8]],
	day18: [false, [0, 8], [0, 15], [0, 8], [0, 8]],
	day19: [false, [0, 15], [0, 10], [0, 15], [0, 5]],
	day20: [false, [0, 10], [0, 20], [0, 10], [0, 8]],
	day21: [false, [0, 10], [0, 14], [0, 18], [0, 10]],
	day22: [false, [0, 20], [0, 5], [0, 5], [0, 5]],
	day23: [false, [0, 10], [0, 20], [0, 10], [0, 10]],
	day24: [false, [0, 5], [0, 10], [0, 5], [0, 10]],
	day25: [false, [0, 5], [0, 15], [0, 10], [0, 10]],
	day26: [false, [0, 25], [0, 15], [0, 15], [0, 10]],
	day27: [false, [0, 10], [0, 10], [0, 20], [0, 8]],
	day28: [false, [0, 30], [0, 5], [0, 5], [0, 5]],
	day29: [false, [0, 15], [0, 15], [0, 15], [0, 15]],
	day30: [false, [0, 50], [0, 0], [0, 0], [0, 0]]
}
let pCheck = document.querySelectorAll(".p-check");

// functions
function toggleFooter(force = false) {
	if (footer.dataset.state === "open") {
		footer.dataset.state = "close";
		footerHandler.style.pointerEvents = "none";
		fakeFooter.toggleAttribute("footer-opened")
	} else {
		footer.dataset.state = "open";
		footerHandler.style.pointerEvents = "all";
		fakeFooter.toggleAttribute("footer-opened")
	}
}

function simpanData() {
	localStorage["semuaKonten"] = JSON.stringify(data)
}

function checkChecked(e) {
	return e.dataset.completed === "1"
}

window.addEventListener("load", function() {
	history.replaceState(null, null, " ");
	let mainHTML = ``;
	if(window.localStorage) { 
	  if(localStorage.getItem("semuaKonten")) {
	    data = JSON.parse(localStorage["semuaKonten"])
	  } else {
	  	simpanData()
	  }
	} else {
		toast("Browser tidak didukung, tidak bisa mengubah pengaturan.", 5000)
	}
	for (let [key, value] of Object.entries(data)) {
		// console.log(value)
		let isCompleted = false;
		if (value[0] === 1) {
			isCompleted = true;
		} else {
			isCompleted = false;
		}
		mainHTML += `
			<a href="#${key}" class="${key}" data-day="true">
	      <span>${key.replace(/\D/g,'')}</span>
	      <div data-completed="${isCompleted}">
	        <div>&#10004;</div>
	        <span>${value[1][1]}</span>
	        <span>${value[2][1]}</span>
	        <span>${value[3][1]}</span>
	        <span>${value[4][1]}</span>
	      </div>
	    </a>
		`
	}
	document.querySelector("main").insertAdjacentHTML("beforeend", mainHTML);
	
	// daftarkan event listener click
	document.addEventListener("click", function(e) {
		let target = e.target;
		let targetItem = location.hash.substr(1);
		switch(target.id) {
			case "footer":
				toggleFooter();
				break;
			case "footerHandler":
				toggleFooter();
				break;
		}

		if (target.dataset.day === "true") {
			if (footer.dataset.state === "close") toggleFooter();
		}

		if (target.classList.contains("p-check")) {
			if (target.dataset.completed === "0") {
				target.dataset.completed = "1";
				data[targetItem][e.target.id.substr(1)][0] = 1;
			} else {
				target.dataset.completed = "0";
				data[targetItem][e.target.id.substr(1)][0] = 0;
			}
			// console.log(typeof target.dataset.completed)

			pCheck = document.querySelectorAll(".p-check");
			let elPCheck = Array.from(pCheck);
			if (elPCheck.every(checkChecked)) {
				// console.log(target)
				data[targetItem][0] = 1;
				document.querySelector(`.${targetItem} div`).dataset.completed = true;
			} else {
				document.querySelector(`.${targetItem} div`).dataset.completed = false;
				data[targetItem][0] = 0;
			}
			simpanData()
		}
		// console.log(e)
	})

	// navigasi
	document.querySelector("body").onhashchange = function() {
		let target = location.hash.substr(1)
		if (target.substr(0, 3) === "day") {
			if (footer.dataset.state === "close") toggleFooter();
			document.querySelectorAll(".p-check").forEach(function(e, i) {
				// console.log(data.target)
				// console.log(target)
				e.dataset.completed = data[target][i + 1][0]
				e.innerText = data[target][i + 1][1]
			})
			document.querySelector(".n-day").innerText = target.substr(3);
			document.querySelector(".progress-title").innerText = `Day ${target.substr(3)}`
		}
	}
})
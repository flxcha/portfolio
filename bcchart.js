const Maincontainer = document.getElementsByClassName('row')[1];
const contVol = Maincontainer.querySelector("#value1");
const contPrice = Maincontainer.querySelector("#value2");
const contTrans = Maincontainer.querySelector("#value3");
const MaincontFng = Maincontainer.querySelector("#chart3");
const donutCont = MaincontFng.querySelector("#donutGraph");
const contFng = MaincontFng.querySelector("#fngIndex")
const divChart1 = Maincontainer.querySelector("#chart1");
const divChart2 = Maincontainer.querySelector("#chart2");

let windowHeight = $(window).height();
let windowWidth = $(window).width();


$(window).resize(function(){
	let height = $(window).height();
	let width = $(window).width();
	if (windowWidth >= 1200 && width <= 1200 ){
		{ location.reload();}
	};
	if (windowWidth <= 1200 && width >= 1200 ){
		{ location.reload();}
	};
	if (windowWidth >= 975 && width <= 975 ){
		{ location.reload();}
	};
	if (windowWidth <= 975 && width >= 975 ){
		{ location.reload();}
	};
	if (windowWidth >= 750 && width <= 750 ){
		{ location.reload();}
	};
	if (windowWidth <= 750 && width >= 750 ){
		{ location.reload();}
	};
	if (windowWidth >= 550 && width <= 550 ){
		{ location.reload();}
	};
	if (windowWidth <= 550 && width >= 550 ){
		{ location.reload();}
	}

})

function liveStats(){
  let dailyAmount = null;
  let TxNum = null;
  fetch('https://api.blockchain.info/stats')
  .then(response => {
    return response.json()
  })
  .then(data => {
    // Work with JSON data here
	dailyAmount = data.estimated_transaction_volume_usd;
	TxNum = data.n_tx;
	contVol.innerHTML = "<h3> $" + ((dailyAmount / 1000000).toLocaleString('en')) + " million <\h3>"
	contTrans.innerHTML = "<h3>" + (TxNum).toLocaleString('en') + "<\h3>"

	}
	)
  .catch(err => {
    // Do something for an error here
  });

 

  fetch('https://blockchain.info/ticker')
  .then(response => {
    return response.json()
  })
  .then(data => {
    // Work with JSON data here
	mrktData = Object.values(data)[0];
	USDPrice = Object.values(mrktData)[0]
	contPrice.innerHTML = "<h3> $" + ((USDPrice).toLocaleString('en'))+ "<\h3>"
	}
	)
  .catch(err => {
    // Do something for an error here
  });
  
  fetch('https://api.blockchain.info/charts/market-price?timespan=92months&format=json&cors=true')
  .then(response => {
    return response.json()
  })
  .then(data => {
    // Work with JSON data here
	let values2 = data.values;
    var coordinates2 = values2.map(function(row){
        return {
            time : row.x, value: row.y
        }}
	)
	areaSeries2.setData(coordinates2);
  })
  .catch(err => {
    // Do something for an error here
  });

  
  fetch('https://api.alternative.me/fng/')
  .then(response => {
    return response.json()
  })
  .then(data => { 
    // Work with JSON data here
	let fng = data.data[0].value
	console.log(fng);
	contFng.innerHTML =  fng + "/100";
	function renderChart() {let chart = new CanvasJS.Chart(donutCont, {
		width: donutCont.offsetWidth,
		height: 250,
		animationEnabled: true,
		backgroundColor: "#252830",
		
		data: [{
			type: "doughnut",
			startAngle: 60,
			innerRadius: 60,
			indexLabelFontSize: 17,
			indexLabelFontColor: "white",
			dataPoints: [
				{ y: fng, label: "Greed" },
				{ y: (100-fng), label: "Fear" }
			]
		}]
	})
	chart.render();
};
renderChart();


	
  })
  .catch(err => {
    // Do something for an error here
  });

  
  fetch('https://api.blockchain.info/charts/n-transactions?timespan=92months&format=json&cors=true')
  .then(response => {
    return response.json()
  })
  .then(data => {
    // Work with JSON data here
	let values3 = data.values;
    var coordinates3 = values3.map(function(row){
        return {
            time : row.x, value: Math.round((row.y)/1000)
        }}
	)
	areaSeries3.setData(coordinates3);
  })
  .catch(err => {
    // Do something for an error here
  });
}
liveStats();
setInterval(liveStats, (15*60000));

let chart2 = LightweightCharts.createChart(divChart1, {
	useCORS: true,
	width: divChart1.offsetWidth + 50,
  	height: 200,
	layout: {
		textColor: '#d1d4dc',
		backgroundColor: '#252830',
	},
	priceScale: {
		scaleMargins: {
			top: 0.3,
			bottom: 0.25,
		},
	},
	crosshair: {
		vertLine: {
			width: 5,
			color: 'rgba(224, 227, 235, 0.1)',
			style: 0,
		},
		horzLine: {
			visible: false,
			labelVisible: false,
		},
	},
	grid: {
		vertLines: {
			color: 'rgba(42, 46, 57, 0)',
		},
		horzLines: {
			color: 'rgba(42, 46, 57, 0)',
		},
	},
});


var areaSeries2 = chart2.addAreaSeries({
  topColor: 'rgba(255, 101, 80, 0.4)',
  bottomColor: 'rgba(255, 101, 80, 0.04)',
  lineColor: 'rgba(255, 101, 80, 0.8)',
  lineWidth: 2,
  crossHairMarkerVisible: false,
});

document.body.style.position = 'relative';

var legend2 = document.createElement('div');
legend2.classList.add('legend2');
divChart1.appendChild(legend2);

var firstRow2 = document.createElement('div');
firstRow2.innerText = 'BTCUSD';
firstRow2.style.color = 'white';
legend2.appendChild(firstRow2);


function pad(n) {
	var s = ('0' + n);
	return s.substr(s.length - 2);
}

chart2.subscribeCrosshairMove((param) => {
	if (param.time) {
		const price2 = param.seriesPrices.get(areaSeries2);
		firstRow2.innerText = 'BTCUSD' + '  ' + price2.toFixed(2);
	}
  else {
  	firstRow2.innerText = 'BTCUSD';
  }
});



let chart3 = LightweightCharts.createChart(divChart2, {
	useCORS: true,
	width: divChart2.offsetWidth + 50,
  height: 200,
	layout: {
		textColor: '#d1d4dc',
		backgroundColor: '#252830',
	},
	priceScale: {
		scaleMargins: {
			top: 0.3,
			bottom: 0.25,
		},
	},
	crosshair: {
		vertLine: {
			width: 5,
			color: 'rgba(224, 227, 235, 0.1)',
			style: 0,
		},
		horzLine: {
			visible: false,
			labelVisible: false,
		},
	},
	grid: {
		vertLines: {
			color: 'rgba(42, 46, 57, 0)',
		},
		horzLines: {
			color: 'rgba(42, 46, 57, 0)',
		},
	},
});

var areaSeries3 = chart3.addAreaSeries({
  topColor: 'rgba(128, 128, 0, 0.56)',
  bottomColor: 'rgba(128, 128, 0, 0.04)',
  lineColor: 'rgba(128, 128, 0, 1)',
  lineWidth: 2,
  crossHairMarkerVisible: false,
});



document.body.style.position = 'relative';

var legend3 = document.createElement('div');
legend3.classList.add('legend');
divChart2.appendChild(legend3);

var firstRow3 = document.createElement('div');
firstRow3.innerText = 'Daily number of BTC transactions';
firstRow3.style.color = 'white';
legend3.appendChild(firstRow3);

function pad(n) {
	var s = ('0' + n);
	return s.substr(s.length - 2);
}

chart3.subscribeCrosshairMove((param) => {
	if (param.time) {
		const price3 = param.seriesPrices.get(areaSeries3);
		firstRow3.innerText = 'Daily number of BTC transactions' + '  ' + price3.toFixed(2);
	}
  else {
  	firstRow3.innerText = 'Daily number of BTC transactions';
  }
});
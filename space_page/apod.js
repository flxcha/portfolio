const div1 = document.getElementById('apod');

fetch('https://api.nasa.gov/planetary/apod?api_key=idtfHPzTNaRaGaWOL94H8XquwQOafqkmHqdICwtE')
  .then(response => {
    return response.json()
  })
  .then(data => {
    // Work with JSON data here
	let Date = data.date;
    let excerpt = data.explanation;
    let imgURL = data.url;
    console.log(excerpt);
    div1.innerHTML = "<img src=" + imgURL + " style = 'width:100%'> </img> <p style = 'padding-top: 30px'>" + excerpt + "</p>";

	}
	)
  .catch(err => {
    // Do something for an error here
  });




/*

let el = document.createElement( 'html' );

fetch('https://apod.nasa.gov/apod/astropix.html')

.then(res => res.text())
  .then(html => {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(html, "text/html");
    let iFrame = htmlDoc.getElementsByTagName("iframe")
    let pImages = htmlDoc.getElementsByTagName("img")
    const div1 = document.getElementById('apod');
    console.log(pImages)
    if (iFrame.length !== 0 ){
        for (i=0; i<iFrame.length; i++){
            iFrameLink = iFrame[i].src;
            div1.innerHTML = iFrame[i]
            //console.log(iFrame.text())
        }
       
    }
    if (pImages.length !== 0 ){
        for (i=0; i<pImages.length; i++){
            imgURL = pImages[i].getAttribute("src")
            finalURL = "https://apod.nasa.gov/apod/" + imgURL
            div1.innerHTML = "<img src=" + finalURL + " style = 'width:100%'> </img>";
        }
    }
  })

.then(function(res) {
    console.log(res.text())

})
.then(function(html) {
    let parser = new DOMParser();
    let webPage = parser.parseFromString(html, "text/html");
    console.log(webPage);
});
*/
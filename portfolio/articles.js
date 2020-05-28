const fetch = require('node-fetch');
const fs = require('fs');
let settings = {method:'Get'};




function getArticles(apiURL){
    fetch(apiURL, settings)
    .then(res => res.json())
    .then((json) => {
        let artJSON = json.data.posts;
        let pageData = [];
        for (i=0; i<artJSON.length; i++){
            let FelixID = "5b1eb9ba57cb010015d90b68"
            let PostAuthorID = (artJSON[i].author.id).toString()
            if (PostAuthorID==FelixID){
                let PostID = artJSON[i].id
                let PostSlug = artJSON[i].slug
                let PostImgURL = artJSON[i].feature_image
                let PostExcerpt = artJSON[i].custom_excerpt
                let PostDate = artJSON[i].created_at
                let PostTitle = artJSON[i].title
                let post = {
                    link: "https://luckbox.com/esports-news/article/" + PostSlug,
                    title: PostTitle,
                    imgLink: PostImgURL,
                    date: PostDate,
                    excerpt: PostExcerpt
                }
                pageData.push(post)
            };
            
        };
    //console.log(pageData);
    return pageData
    });
    };

    function turnPages(){
        let allArticles = [];
        for (i=1; i<47; i++){
            let iLink = i.toString()
            let apiLink = "https://api.luckbox.com/v1/ghost-news?limit=28&page=" + iLink + "&include=author,tags"
            let postPages = getArticles(apiLink);
            console.log(postPages);
            allArticles.push(postPages);
            
        };
       
    };

    turnPages();

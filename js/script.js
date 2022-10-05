"use strict";

function titleClickHandler(event) {
	event.preventDefault();
	console.log("The link was clicked!");
	const clickedElement = this;

	/* remove class 'active' from all article links  */
	const activeLinks = document.querySelectorAll(".titles a.active");
	for (let activeLink of activeLinks) {
		activeLink.classList.remove("active");
	}

	/* add class 'active' to the clicked link */
	clickedElement.classList.add("active");

	/* remove class 'active' from all articles */
	const activeArticles = document.querySelectorAll(".posts article.active");
	for (let activeArticle of activeArticles) {
		activeArticle.classList.remove("active");
	}

	/* get 'href' attribute from the clicked link */
	const hrefAttribute = clickedElement.getAttribute("href");
	console.log(hrefAttribute);

	/* find the correct article using the selector (value of 'href' attribute) */
	const desiredArticle = document.querySelector(hrefAttribute);
	console.log(desiredArticle);

	/* add class 'active' to the correct article */
	desiredArticle.classList.add("active");
}

const optArticleSelector = ".post",
	optTitleSelector = ".post-title",
	optTitleListSelector = ".titles",
	optArticleTagsSelector = ".post-tags .list";

function generateTitleList() {
	/* remove contents of titleList */
	const titleList = document.querySelector(optTitleListSelector);
	titleList.innerHTML = "";

	/* for each article */
	const allArticles = document.querySelectorAll(optArticleSelector);
	let html = "";
	for (let article of allArticles) {
		/* get the article id */
		const articleId = article.getAttribute("id");

		/* find the title element */
		const articleTitle = article.querySelector(optTitleSelector).innerHTML;

		/* create HTML of the link */
		const linkHTML =
			'<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

		/* insert link into titleList */

		html += linkHTML;
	}

	titleList.innerHTML = html;

	const links = document.querySelectorAll(".titles a");

	for (let link of links) {
		link.addEventListener("click", titleClickHandler);
	}
}
generateTitleList();

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);


  /* START LOOP: for every article: */
  for(let article of articles){

  	/* find tags wrapper */
  	const tagWrapper = article.querySelector(optArticleTagsSelector);
 

    /* make html variable with empty string */
    let html ="";

    /* get tags from data-tags attribute */
    const tags = article.getAttribute('data-tags');
    console.log(tags);

    /* split tags into array */
    let tagsArray = [];
    tagsArray = tags.split(" ");
    console.log(tagsArray);

    /* START LOOP: for each tag */
    for(let tag of tagsArray){
    	/* generate HTML of the link */
    	const link = '<li><a href="#tag-' + tag + '"> ' + tag + '</a></li>';
    	
    	/* add generated code to html variable */
    	html += link;
    	console.log(html);

    	/* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;

  /* END LOOP: for every article: */

  }
    
}

generateTags();

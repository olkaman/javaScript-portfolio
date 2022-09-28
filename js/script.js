'use strict'

const links = document.querySelectorAll('.titles a');

function clickHandler(event){
	event.preventDefault();
	console.log('The link was clicked!');
	const clickedElement = this;
  
  /* remove class 'active' from all article links  */
  	const activeLinks = document.querySelectorAll('.titles a.active');
  	for(let activeLink of activeLinks){
  		activeLink.classList.remove('active');
  	}

  /* add class 'active' to the clicked link */
  		clickedElement.classList.add('active');

  /* remove class 'active' from all articles */
  	const activeArticles = document.querySelectorAll('.posts article.active');
  	for(let activeArticle of activeArticles){
  		activeArticle.classList.remove('active');
  	}

  /* get 'href' attribute from the clicked link */
  	const hrefAttribute = clickedElement.getAttribute('href');
  	console.log(hrefAttribute);

  /* find the correct article using the selector (value of 'href' attribute) */
  	const desiredArticle = document.querySelector(hrefAttribute); 
  	console.log(desiredArticle);

  /* add class 'active' to the correct article */
  	desiredArticle.classList.add('active');
}

for(let link of links){
	link.addEventListener('click', clickHandler);
}
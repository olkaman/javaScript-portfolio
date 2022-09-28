'use strict'

const links = document.querySelectorAll('.titles a');

function clickHandler(event){
	console.log('The link was clicked!');
	const clickedElement = this;
  
  /* [DONE] remove class 'active' from all article links  */
  	const activeLinks = document.querySelectorAll('.titles a.active');
  	for(let activeLink of activeLinks){
  		activeLink.classList.remove('active');
  	}

  /* [INPROGRESS] add class 'active' to the clicked link */
  		clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');
  	for(let activeArticle of activeArticles){
  		activeArticle.classList.remove('active');
  	}

  /* get 'href' attribute from the clicked link */

  /* find the correct article using the selector (value of 'href' attribute) */

  /* add class 'active' to the correct article */
}

for(let link of links){
	link.addEventListener('click', clickHandler);
}
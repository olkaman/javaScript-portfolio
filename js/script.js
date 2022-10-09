'use strict';

function titleClickHandler(event) {
  event.preventDefault();

  const clickedElement = this;

  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const hrefAttribute = clickedElement.getAttribute('href');

  /* find the correct article using the selector (value of 'href' attribute) */
  const desiredArticle = document.querySelector(hrefAttribute);

  /* add class 'active' to the correct article */
  desiredArticle.classList.add('active');
}

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optTitleLinkSelector = '.titles a';
const optArticleTagsSelector = '.post-tags .list';
const optAuthorSelector = '.post-author';
const optArticleAuthorSelector = '.post-author a';
const optTagsListSelector = '.sidebar .tags';
let optCloudClassCount = 5;
const optCloudClassPrefix = 'tag-size-';
const optAuthorsListSelector = '.sidebar .authors';
const optAuthorsLinkSelector = '.sidebar .authors a';

function generateTitleList(customSelector = '') {
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */
  const allArticles = document.querySelectorAll(
    optArticleSelector + customSelector
  );

  let html = '';
  for (let article of allArticles) {
    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      '</span></a></li>';

    /* insert link into titleList */

    html += linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll(optTitleLinkSelector);

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleList();

function calculateTagsParams(tags) {
  const params = {
    min: 999999,
    max: 0,
  };

  for (let tag in tags) {
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }

  return params;
}

function calculateTagClass(count, params) {
  const percentValue = (count * 100) / params.max;
  console.log(percentValue);

  if (percentValue < 20) {
    optCloudClassCount = 1;
  } else if (percentValue >= 20 && percentValue < 40) {
    optCloudClassCount = 2;
  } else if (percentValue >= 40 && percentValue < 60) {
    optCloudClassCount = 3;
  } else if (percentValue >= 60 && percentValue < 80) {
    optCloudClassCount = 4;
  } else {
    optCloudClassCount = 5;
  }

  return optCloudClassPrefix + optCloudClassCount;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagWrapper = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const tags = article.getAttribute('data-tags');

    /* split tags into array */
    let tagsArray = [];
    tagsArray = tags.split(' ');

    /* START LOOP: for each tag */
    for (let tag of tagsArray) {
      /* generate HTML of the link */
      const link = '<li><a href="#tag-' + tag + '"> ' + tag + '</a></li>';

      /* add generated code to html variable */
      html += link;

      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags.hasOwnProperty(tag)) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;

    /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  const tagParams = calculateTagsParams(allTags);

  /* create variable for all links HTML code */
  let allTagsHTML = '';

  /* START LOOP: for each tag in allTags */
  for (let tag in allTags) {
    const tagLinkHTML =
      '<li><a href="#tag-' +
      tag +
      '" class="' +
      calculateTagClass(allTags[tag], tagParams) +
      '">' +
      tag +
      '(' +
      allTags[tag] +
      ') </a></li>';
    allTagsHTML += tagLinkHTML;
  }
  /* Add html from allTagsHTML to tagList*/
  tagList.innerHTML = allTagsHTML;
}

generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.slice(5);

  /* find all tag links with class active */
  //????????????????????CZY TA CZĘŚĆ MUSI BYC? - dodawanie i usuwanie klasy ACTIVE dla tagów?
  //const activeTags = document.querySelectorAll('.post-tags .list a.active');

  /* START LOOP: for each active tag link */
  //for (let tag of activeTags) {
  //  /* remove class active */
  //  tag.classList.remove('active');
  //}
  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  //const hrefAttributeTags = document.querySelectorAll(
  //  '.post-tags .list a[href="' + href + '"]'
  //);
  //console.log(hrefAttributeTags);
  /* START LOOP: for each found tag link */
  //for (let tag of hrefAttributeTags) {
  /* add class active */
  //  tag.classList.add('active');
  //}
  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleList('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const linksToTags = document.querySelectorAll('.post-tags .list a');
  /* START LOOP: for each link */
  for (let link of linksToTags) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  }
  /* END LOOP: for each link */
}

function addClickListenersToCloudTags() {
  /* find all links to tags */
  const linksToTags = document.querySelectorAll('.sidebar .tags a');
  /* START LOOP: for each link */
  for (let link of linksToTags) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  }
  /* END LOOP: for each link */
}

addClickListenersToTags();
addClickListenersToCloudTags();

function generateAuthors() {
  const allAuthors = {};

  //take all articles
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    //for each article get author data from the attribute
    const authorName = article.getAttribute('data-author');
    //generate link
    const authorLink = 'by <a href="' + authorName + '">' + authorName + '</a>';
    //insert link to the wrapper
    const authorWrapper = article.querySelector(optAuthorSelector);
    authorWrapper.innerHTML = authorLink;

    /* [NEW] check if this link is NOT already in allAuthors */
    if (!allAuthors.hasOwnProperty(authorName)) {
      /* [NEW] add author to allAuthors object */
      allAuthors[authorName] = 1;
    } else {
      allAuthors[authorName] += 1;
    }
  }

  for (let authorName in allAuthors) {
    const allAuthorsLink =
      '<li><a href="' +
      authorName +
      '">' +
      authorName +
      ' (' +
      allAuthors[authorName] +
      ')</a></li>';

    const allAuthorsWrapper = document.querySelector(optAuthorsListSelector);
    allAuthorsWrapper.innerHTML += allAuthorsLink;
  }
}
generateAuthors();

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;

  const authorName = clickedElement.getAttribute('href');

  generateTitleList('[data-author="' + authorName + '"]');
}

function addClickListenersToAuthor() {
  const linksToAuthors = document.querySelectorAll(optArticleAuthorSelector);
  for (let authorLink of linksToAuthors) {
    authorLink.addEventListener('click', authorClickHandler);
  }
}

function addClickListenersToAuthors() {
  const linksToAuthors = document.querySelectorAll(optAuthorsLinkSelector);
  for (let authorLink of linksToAuthors) {
    authorLink.addEventListener('click', authorClickHandler);
    console.log(authorLink);
  }
}

addClickListenersToAuthor();
addClickListenersToAuthors();

'use strict';

const templates = {
  articleLink: Handlebars.compile(
    document.querySelector('#template-article-link').innerHTML
  ),
  articleTagLink: Handlebars.compile(
    document.querySelector('#template-article-tag-link').innerHTML
  ),
  articleAuthorLink: Handlebars.compile(
    document.querySelector('#template-article-author-link').innerHTML
  ),
  tagCloudLink: Handlebars.compile(
    document.querySelector('#template-tag-cloud-link').innerHTML
  ),
  allAuthorsListLink: Handlebars.compile(
    document.querySelector('#template-authors-list-links').innerHTML
  ),
};

let optCloudClassCount = 5;

const opts = {
  articleSelector: '.post',
  titleSelector: '.post-title',
  titleListSelector: '.titles',
  titleLinkSelector: '.titles a',
  articleTagsSelector: '.post-tags .list',
  authorSelector: '.post-author',
  articleAuthorSelector: '.post-author a',
  tagsListSelector: '.sidebar .tags',
  cloudClassPrefix: 'tag-size-',
  authorsListSelector: '.sidebar .authors',
  authorsLinkSelector: '.sidebar .authors a',
};

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

function generateTitleList(customSelector = '') {
  /* remove contents of titleList */
  const titleList = document.querySelector(opts.titleListSelector);
  titleList.innerHTML = '';

  /* for each article */
  const allArticles = document.querySelectorAll(
    opts.articleSelector + customSelector
  );

  let html = '';
  for (let article of allArticles) {
    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    const articleTitle = article.querySelector(opts.titleSelector).innerHTML;

    /* create HTML of the link - created with Handlebars*/
    const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML = templates.articleLink(linkHTMLData);

    /* insert link into titleList */

    html += linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll(opts.titleLinkSelector);

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

  return opts.cloudClassPrefix + optCloudClassCount;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(opts.articleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagWrapper = article.querySelector(opts.articleTagsSelector);

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
      const linkData = { tag: tag };
      const link = templates.articleTagLink(linkData);

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
  const tagList = document.querySelector(opts.tagsListSelector);

  const tagParams = calculateTagsParams(allTags);

  /* create variable for all links HTML code */
  const allTagsData = { tags: [] };

  /* START LOOP: for each tag in allTags */
  for (let tag in allTags) {
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagParams),
    });
  }
  /* Add html from allTagsHTML to tagList*/
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
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
  //????????????????????CZY TA CZ?????? MUSI BYC? - dodawanie i usuwanie klasy ACTIVE dla tag??w?
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
  const articles = document.querySelectorAll(opts.articleSelector);

  for (let article of articles) {
    //for each article get author data from the attribute
    const authorName = article.getAttribute('data-author');
    //generate link
    const authorLinkData = { authorName: authorName };
    const authorLink = templates.articleAuthorLink(authorLinkData);
    //insert link to the wrapper
    const authorWrapper = article.querySelector(opts.authorSelector);
    authorWrapper.innerHTML = authorLink;

    /* [NEW] check if this link is NOT already in allAuthors */
    if (!allAuthors.hasOwnProperty(authorName)) {
      /* [NEW] add author to allAuthors object */
      allAuthors[authorName] = 1;
    } else {
      allAuthors[authorName] += 1;
    }
  }
  const allAuthorsData = { authorName: [] };

  for (let authorName in allAuthors) {
    allAuthorsData.authorName.push({
      authorName: authorName,
      count: allAuthors[authorName],
    });

    const allAuthorsWrapper = document.querySelector(opts.authorsListSelector);
    allAuthorsWrapper.innerHTML = templates.allAuthorsListLink(allAuthorsData);
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
  const linksToAuthors = document.querySelectorAll(opts.articleAuthorSelector);
  for (let authorLink of linksToAuthors) {
    authorLink.addEventListener('click', authorClickHandler);
  }
}

function addClickListenersToAuthors() {
  const linksToAuthors = document.querySelectorAll(opts.authorsLinkSelector);
  for (let authorLink of linksToAuthors) {
    authorLink.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthor();
addClickListenersToAuthors();

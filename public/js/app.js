// https://api.pushshift.io/reddit/search?q=542871131165&limit=100&subreddit=fashionreps - example reddit request

// q=542871131165 = taobao id
// limit = how many results we want
// subreddit = subreddit name

// on app page have summary of what people are saying
// add link (using data.permalink) to take to actual reddit page

const searchInput = document.querySelector('.search-input'),
      formEl = document.querySelector('.search-form'),
      welcomeMsg = document.querySelector('.welcome-msg'),
      resultCountEl = document.querySelector('.result-count'),
      resultsContainerEl = document.querySelector('.results-container'),
      subreddits = ['/r/fashionreps', '/r/designerreps'];

function getRedditData(url, subreddit) {
  const xhr = new XMLHttpRequest(),
        tbID = convertURL(url).split('id=')[1];
  
    xhr.onload = function() {
      if (xhr.status === 200) {
        const redditResults = JSON.parse(xhr.response),
              resultsDOMFrag = document.createDocumentFragment();  
        resultCountEl.textContent = `Found ${redditResults.data.length} conversations.`;
        welcomeMsg.style.display = 'none';


        console.log(redditResults);
        
        // loop through results and append to DocumentFragment
        redditResults.data.forEach((result) => {
          const resultEl = document.createElement('div'),
                resultAuthor = document.createElement('h2'),
                resultBody = document.createElement('p'),
                resultDate = document.createElement('span');

          const resultAuthorText = document.createTextNode(result.author);
          resultAuthor.classList.add('result-author');
          resultAuthor.appendChild(resultAuthorText);

          const resultBodyText = document.createTextNode(result.body);
          resultBody.classList.add('result-body');
          resultBody.appendChild(resultBodyText);

          const resultDateText = document.createTextNode(result.created_utc);
          resultDate.classList.add('result-date');
          resultDate.appendChild(resultDateText)

          resultEl.classList.add('result');
          resultEl.appendChild(resultAuthor);
          resultEl.appendChild(resultBody);
          resultEl.appendChild(resultDate);
          
          resultsDOMFrag.appendChild(resultEl);
        })

        resultsContainerEl.appendChild(resultsDOMFrag);

      } else {
        console.log(`There was an error ${xhr.statusCode}`);
      }
    }
    
    xhr.open('GET', `https://api.pushshift.io/reddit/search?q=${tbID}&limit=50&subreddit=fashionreps`);
    
    xhr.send();
}

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  
  getRedditData(searchInput.value);
  searchInput.value = '';
})


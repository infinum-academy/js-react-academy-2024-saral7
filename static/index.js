

function renderPage() {
   let reviews = getCurrentReviews();
   let reviewWrapper = document.getElementById('reviews');
   reviewWrapper.innerHTML = "";

   reviews.forEach((review) => {
      let reviewDiv = document.createElement('div');
      reviewDiv.classList = ['review round'];
      let reviewText = document.createElement('p');
      reviewText.textContent = review.text;
      let reviewRating = document.createElement('p');
      reviewRating.textContent = `${review.rating} / 5`;

      reviewDiv.appendChild(reviewText);
      reviewDiv.appendChild(reviewRating);

      reviewWrapper.appendChild(reviewDiv);
   });
}

function getCurrentReviews() {
   if (!localStorage.getItem('reviews')) {
      localStorage.setItem('reviews', JSON.stringify([]));
      return [];
   }
   return JSON.parse(localStorage.getItem('reviews'));
}

function addToLocalStorageReviews(reviewList) {
   localStorage.setItem('reviews', JSON.stringify(reviewList));
}

function reviewPostHandler() {
   let reviewText = document.getElementById('review-post-text');
   let reviewRating = document.getElementById('review-post-rating');
   
   if (!reviewText.value || !reviewRating.value) return;

   let reviews = getCurrentReviews();

   let newReview = {
      text: reviewText.value,
      rating: reviewRating.value
   };

   reviews.push(newReview);
   addToLocalStorageReviews(reviews);

   reviewText.value = "";
   reviewRating.value = "";

   renderPage();
}

renderPage();
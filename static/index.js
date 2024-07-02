function renderPage() {
   let reviews = getCurrentReviews();
   let reviewWrapper = document.getElementById('reviews');
   reviewWrapper.innerHTML = "";

   reviews.forEach((review) => {
      reviewWrapper.appendChild(createReviewDiv(review, reviews));
   });

   let averageRating = document.getElementById('average-rating');
   averageRating.textContent = `${getAverage().toFixed(1)} / 5`;
   show.appendChild(averageRating);
}

function createReviewDiv(review, reviews) { 
   // saljem reviews kao argument da se reference poklapaju za filter

   let reviewDiv = document.createElement('div');
   reviewDiv.classList = ['review round'];
   let reviewText = document.createElement('p');
   reviewText.textContent = review.text;
   let reviewRating = document.createElement('p');
   reviewRating.textContent = `${review.rating} / 5`;

   let removeButton = document.createElement('input');
   removeButton.type = 'button';
   removeButton.value = "Remove";

   //let reviews = getCurrentReviews();
   removeButton.onclick = () => {
      reviews = reviews.filter(
         (t) => {
            return (t !== review);
            //return !(JSON.stringify(review) === JSON.stringify(t));
            // vazno: ovo ne jer ce obrisati razlicite reviewe ako imaju isti sadrzaj
         }
      );
      addToLocalStorageReviews(reviews);
      renderPage();
   };
   reviewDiv.appendChild(reviewText);
   reviewDiv.appendChild(reviewRating);
   reviewDiv.appendChild(removeButton);

   return reviewDiv;
}

function getAverage() {
   let reviews = getCurrentReviews();
   if (!reviews.length) return 0;
   return reviews.map((t) => t.rating).reduce((a, b) => {return parseInt(a)+parseInt(b);})/reviews.length;
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
   
   if (!reviewText.value 
      || !reviewRating.value
      || reviewRating.value%1
      || !(1 <= parseInt(reviewRating.value) && parseInt(reviewRating.value) <= 5)
   ) return;

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
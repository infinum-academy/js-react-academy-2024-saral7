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

   setUpStars();
}

function createReviewDiv(review, reviews) { 
   // saljem reviews kao argument da se reference poklapaju za filter

   let reviewDiv = document.createElement('div');
   reviewDiv.classList = ['review round'];
   let reviewText = document.createElement('p');
   reviewText.textContent = review.text;
   let reviewRating = document.createElement('p');
   reviewRating.textContent = `${review.rating} / 5`;


   // dodavanje zvjezdica na reviewove
   let reviewStars = document.createElement('div');
   for (let i = 1; i <= 5; i++) {
      let star = document.createElement('img');
      star.src = (i <= review.rating) ? 'images/star-yellow.png' : 'images/star-white.png';
      star.classList = ['stars'];   // da se primjeni stil za klasu stars

      reviewStars.appendChild(star);
   }

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
   reviewDiv.appendChild(reviewStars);
   reviewDiv.appendChild(removeButton);

   return reviewDiv;
}

function setUpStars () {
   // slike zvjezdica transparentne pozadine, na klik se mijenja slika
   // svaka zvijezda je klase 'stars'
   let stars = document.getElementsByClassName('stars-ogs');

   // prva po defaultu uvijek odabrana 
   let firstStar = stars[0];
   firstStar.setAttribute('src', "images/star-yellow.png");
   firstStar.onclick = () => {
      for (let s of stars) {
         s.setAttribute('src', "images/star-white.png");
      }
      firstStar.setAttribute('src', "images/star-yellow.png");
   }
   for (let star of stars) {
      if (star === firstStar) continue;
      let ind = parseInt(star.id.substring(5));

      // na klik mijenjamo boju i svih onih prije
      star.onclick = () => {
         for (let s of stars) {
            s.setAttribute('src', "images/star-white.png");
         }
         let i = 0;
         for (let s of stars) {
            if (i == ind) break;
            s.setAttribute('src', "images/star-yellow.png");
            i++;
         }
      }
   }
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
   
   if (!reviewText.value) return;

   let stars = [... document.getElementsByClassName('stars-ogs')]; // stars-ogs je klase zvjezdica koje klikcemo
   
   // sada je rating broj zutih zvjezdica
   let reviewRating = stars.filter((s) => {
      return s.src[s.src.length - 5] == 'w'; // zadnje slovo src slike je 'w' (od yellow)
   }).length;

   let reviews = getCurrentReviews();


   let newReview = {
      text: reviewText.value,
      rating: reviewRating
   };

   reviews.push(newReview);
   addToLocalStorageReviews(reviews);

   reviewText.value = "";
   reviewRating.value = "";

   // reset boja
   let firstStar = stars[0];
   firstStar.setAttribute('src', "images/star-yellow.png");
   for (let star of stars) {
      if (star === firstStar) continue;
      star.setAttribute('src', "images/star-white.png");
   }

   renderPage();
}

renderPage();
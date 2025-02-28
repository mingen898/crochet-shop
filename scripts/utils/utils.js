export function generateStars(starRating) {
  let ratingHTML = '';
  let htmlAdded = 0;

  for (let i = 0; i < starRating; i++) {
    ratingHTML += `<span class="fa fa-star checked"></span>`;
    htmlAdded += 1;
  }

  for (let i = 0; i < 5 - htmlAdded; i++) {
    ratingHTML += `<span class="fa fa-star"></span>`;;
  }

  return ratingHTML;
};


export default function renderPictures(pictures) {
    return pictures.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    return `
    <a href="${largeImageURL}">
        <article class="post">
            <div class="photo-card gallery__item">
                <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
                <div class="info">
                    <p class="info-item">
                    <b>Likes</b>
                    ${likes}
                    </p>
                    <p class="info-item">
                    <b>Views</b>
                    ${views}
                    </p>
                    <p class="info-item">
                    <b>Comments</b>
                    ${comments}
                    </p>
                    <p class="info-item">
                    <b>Downloads</b>
                    ${downloads}
                    </p>
                </div>
            </div>
        </article>
    </a>
        `;
        })
    .join("");
 };
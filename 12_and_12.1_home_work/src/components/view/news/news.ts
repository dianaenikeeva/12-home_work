import { IArticle } from '../../../types/interfaces';
import './news.css';

class News {
    draw(data: IArticle[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement; 

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            if (idx % 2) {
                const newsItem = newsClone.querySelector('.news__item');
                if (newsItem) {
                    newsItem.classList.add('alt');
                }
            }

            const backgroundImage = item.urlToImage || 'img/news_placeholder.jpg';
            const metaPhoto = newsClone.querySelector('.news__meta-photo') as HTMLElement;
            if (metaPhoto) {
                metaPhoto.style.backgroundImage = `url(${backgroundImage})`;
            }

            const metaAuthor = newsClone.querySelector('.news__meta-author');
            if (metaAuthor) {
                metaAuthor.textContent = item.author || 'Неизвестный автор';
            }

            const metaDate = newsClone.querySelector('.news__meta-date');
            if (metaDate) {
                metaDate.textContent = item.publishedAt
                    .slice(0, 10)
                    .split('-')
                    .reverse()
                    .join('-');
            }

            const descriptionTitle = newsClone.querySelector('.news__description-title');
            if (descriptionTitle) {
                descriptionTitle.textContent = item.title;
            }

            const descriptionSource = newsClone.querySelector('.news__description-source');
            if (descriptionSource) {
            descriptionSource.textContent = item.source?.name || 'Неизвестный источник';
            }

            const descriptionContent = newsClone.querySelector('.news__description-content');
            if (descriptionContent) {
                descriptionContent.textContent = item.description || '';
            }

            const readMoreLink = newsClone.querySelector('.news__read-more a');
            if (readMoreLink) {
                readMoreLink.setAttribute('href', item.url);
            }

            fragment.append(newsClone);
        });

        const newsContainer = document.querySelector('.news');
        if (newsContainer) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        }
    }
}

export default News;
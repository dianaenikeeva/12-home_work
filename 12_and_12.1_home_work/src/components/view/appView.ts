import News from './news/news';
import Sources from './sources/sources';
import { INewsResponse, ISourseResponse, IArticle, ISource } from '../../types/interfaces';

const API_URL = 'https://newsapi.org/v2/';
const API_KEY = 'bb40f87b11e949c38890a7ec5ce79d1b';

export class AppView {
    private news: News;  
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: INewsResponse): void {
        const values: IArticle[] = data?.articles || [];  
        this.news.draw(values);
        
    }

    drawSources(data: ISourseResponse): void {
        const values: ISource[] = data?.source || [];  
        this.sources.draw(values);
    }
    
}

async function fetchNews(): Promise<void> {
    try {
        const response = await fetch(`${API_URL}top-headlines?sources=techcrunch&apiKey=${API_KEY}`);

        if (!response.ok) {
            throw new Error(`HTTP ошибка! Статус: ${response.status}`);
        }

        const data: INewsResponse = await response.json();
        
        console.log(data); 

        if (data.status !== 'ok') {
            throw new Error(`Ошибка: ${data.status}`);
        }

        appView.drawNews(data); 
    } catch (error) {
        console.error('Ошибка при загрузке новостей:', error);
    }
}

const appView = new AppView();
fetchNews();

export default AppView;
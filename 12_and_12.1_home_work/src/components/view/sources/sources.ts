import './sources.css';
import { ISource } from '../../../types/interfaces';

class Sources {
    draw(data: ISource[]): void {  
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp');

        data.forEach((item) => {
            const sourceClone = (sourceItemTemp as HTMLTemplateElement)?.content.cloneNode(true) as DocumentFragment;
            sourceClone.querySelector('.source__item-name')!.textContent = item.name;
            sourceClone.querySelector('.source__item')!.setAttribute('data-source-id', item.id || '');

            fragment.append(sourceClone);
        });

        const sourcesContainer = document.querySelector('.sources');
        if (sourcesContainer) {
            sourcesContainer.append(fragment);
        }
    }
}

export default Sources;
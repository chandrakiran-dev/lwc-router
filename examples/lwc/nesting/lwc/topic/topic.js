import { LightningElement} from 'lwc';
import {getParam} from 'c/lwcRouter';

export default class Topic extends LightningElement {
    topicId;
    async connectedCallback(){
        await getParam(this, (param) => {
            this.topicId = param.topicId;
        })
        console.log(this.topicId)
    }
}
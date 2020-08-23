export default class URLMatcher {
    constructor(isMatching, url, urlParam, queryParam){
        this._isMatching = isMatching;
        this._urlParam = (urlParam)?urlParam:{};
        this._queryParam = (queryParam)?queryParam:{};
        this._url = url;
    }
    get isMatching(){
        return this._isMatching;
    }
    set isMatching(value){
        this._isMatching = value;
    }
    get urlParam(){
        return this._urlParam;
    }
    set urlParam(value){
        this._urlParam = value;
    }
    get queryParam(){
        return this._queryParam;
    }
    set queryParam(value){
        this._queryParam = value;
    }
    get url(){
        return this._url;
    }
    set url(value){
        this._url = value;
    }
}
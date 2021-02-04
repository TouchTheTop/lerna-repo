

class GenRequest {
    options: object;
    constructor(options: object) {
        this.options = options;
    }
    post() {
        console.log('action post')
    }
}


export default GenRequest
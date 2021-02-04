
class GenRequest  {
  static install: (Vue) => void
  option: object
  static option: any;
  constructor(option) {
    GenRequest.option = option;
  }
  post() {
    console.log("action post");
  }
}

GenRequest.install = function (Vue: any) { 
  Vue.prototype.$loginInfo = GenRequest.option

}
export default GenRequest
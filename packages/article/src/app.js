import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from './Index';
import {default as Article} from './components';

import "../../../style/themes/index.less";

export {
    Article
}
export default Index

Vue.use(VueRouter)
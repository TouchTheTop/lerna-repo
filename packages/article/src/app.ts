import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from './Index';
import {default as Article} from './components';


import { GenRequest } from "core/util";

import "../../../style/themes/index.less";

export {
    Article,
    GenRequest
}
export default Index

Vue.use(VueRouter)
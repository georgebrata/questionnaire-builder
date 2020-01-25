import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3bf8753a = () => interopDefault(import('../pages/answer/_formId.vue' /* webpackChunkName: "pages/answer/_formId" */))
const _6a1a9f4e = () => interopDefault(import('../pages/form-builder/_formId.vue' /* webpackChunkName: "pages/form-builder/_formId" */))
const _d0374316 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/answer/:formId?",
    component: _3bf8753a,
    name: "answer-formId"
  }, {
    path: "/form-builder/:formId?",
    component: _6a1a9f4e,
    name: "form-builder-formId"
  }, {
    path: "/",
    component: _d0374316,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}

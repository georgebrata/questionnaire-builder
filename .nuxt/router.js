import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _72445194 = () => interopDefault(import('../pages/answer/_formId.vue' /* webpackChunkName: "pages/answer/_formId" */))
const _1ffb5fb0 = () => interopDefault(import('../pages/form-builder/_formId.vue' /* webpackChunkName: "pages/form-builder/_formId" */))
const _341f564a = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _72445194,
    name: "answer-formId"
  }, {
    path: "/form-builder/:formId?",
    component: _1ffb5fb0,
    name: "form-builder-formId"
  }, {
    path: "/",
    component: _341f564a,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}

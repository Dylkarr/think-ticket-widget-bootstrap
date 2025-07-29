import { defineCustomElement } from 'vue'
import AppWidget from './AppWidget.ce.vue'
export function register(tag = 'think-ticket-login'){ if(!customElements.get(tag)){customElements.define(tag, defineCustomElement(AppWidget))} }

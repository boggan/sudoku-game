import Vue from 'vue';
import App from './App.vue';

// program bootstrapping code

document.onreadystatechange = () => {
    if (document.readyState === "complete") {
        // load single app component into "app" div
        new Vue({
            el: '#app',
            components: {
                App
            },
            template: '<App />'
        });
    }
}
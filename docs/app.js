var url = window.location.href;
var swLocation = '/pokedex/sw.js';

var swReg;

if (navigator.serviceWorker) {


    if (url.includes('localhost')) {
        swLocation = '/sw.js';
    }


    window.addEventListener('load', function () {

        navigator.serviceWorker.register(swLocation).catch(console.error)

    });

}

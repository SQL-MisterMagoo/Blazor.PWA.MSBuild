window.updateAvailable = new Promise(function (resolve, reject) {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register(serviceWorkerFileName)
            .then(function (registration) {
                console.log('Registration successful, scope is:', registration.scope);
                registration.onupdatefound = () => {
                    const installingWorker = registration.installing;
                    installingWorker.onstatechange = () => {
                        switch (installingWorker.state) {
                            case swInstalledEvent:
                                if (navigator.serviceWorker.controller) {
                                    resolve(true);
                                } else {
                                    resolve(false);
                                }
                                break;
                            default:
                        }
                    };
                };
            })
            .catch(error =>
                console.log('Service worker registration failed, error:', error));
    }
});

window.addEventListener('beforeinstallprompt', function (e) {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    window.PWADeferredPrompt = e;

    showAddToHomeScreen();

});

function showAddToHomeScreen() {
    var pwaInstallPrompt = document.createElement('div');
    var pwaInstallButton = document.createElement('button');
    var pwaCancelButton = document.createElement('button');

    pwaInstallPrompt.id = 'pwa-install-prompt';
    pwaInstallPrompt.style.position = 'absolute';
    pwaInstallPrompt.style.bottom = '0';
    pwaInstallPrompt.style.display = 'flex';
    pwaInstallPrompt.style.width = '100vw';
    pwaInstallPrompt.style.backgroundColor='darkslategrey';
    pwaInstallPrompt.style.color='white';
    pwaInstallPrompt.style.fontSize='2rem';

    pwaInstallButton.style.marginLeft='auto';
    pwaInstallButton.style.width='4em';
    pwaInstallButton.style.backgroundColor='green';
    pwaInstallButton.style.color='white';

    pwaCancelButton.style.marginLeft='0.3rem';
    pwaCancelButton.style.backgroundColor='darkslategray';
    pwaCancelButton.style.color='white';

    pwaInstallPrompt.innerText = 'Add to your homescreen!';
    pwaInstallButton.innerText = 'OK';
    pwaCancelButton.innerText = 'Ignore';

    pwaInstallPrompt.appendChild(pwaInstallButton);
    pwaInstallPrompt.appendChild(pwaCancelButton);
    document.body.appendChild(pwaInstallPrompt);

    pwaInstallButton.addEventListener('click', addToHomeScreen);
    pwaCancelButton.addEventListener('click', hideAddToHomeScreen);
    setTimeout(hideAddToHomeScreen, 10000);
}

function hideAddToHomeScreen() {
    var pwa = document.getElementById('pwa-install-prompt');
    if (pwa) document.body.removeChild(pwa);
}

function addToHomeScreen(s, e) {
    hideAddToHomeScreen();
    if (window.PWADeferredPrompt) {
        window.PWADeferredPrompt.prompt();
        window.PWADeferredPrompt.userChoice
            .then(function (choiceResult) {
                window.PWADeferredPrompt = null;
            });
    }
}

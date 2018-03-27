const IFRAME_ID = 'reviewbot-extension';

const el = document.getElementById(IFRAME_ID);

if(el) {
  document.body.removeChild(el);
} else {
  const iframe = document.createElement('iframe');

  iframe.id = IFRAME_ID;
  iframe.src = window.chrome.runtime.getURL('index.html');
  iframe.style = `
    border: none;

    position: fixed;
    top: 0;
    right: 0;

    height: 100%;
    width: 65%;
    max-width: 420px;

    z-index: 2147483647;
  `;

  document.body.appendChild(iframe);
}

import '../styles/globals.css';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    window.copyToClipboard = (button, preId) => {
      const pre = document.getElementById(preId);
      const commandText = pre.textContent.trim();

      navigator.clipboard.writeText(commandText).then(() => {
        const copiedMessage = pre.querySelector('.copied-message');
        copiedMessage.classList.remove('hidden');
        copiedMessage.classList.add('text-green-500');
        setTimeout(() => {
          copiedMessage.classList.add('hidden');
          copiedMessage.classList.remove('text-green-500');
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    };
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;

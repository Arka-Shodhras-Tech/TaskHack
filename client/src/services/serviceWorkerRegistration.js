// serviceWorkerRegistration.js

const isPWA = () => {
    return (window.matchMedia('(display-mode: standalone)').matches) || (window.navigator.standalone === true);
  };
  
  const register = () => {
    if (isPWA() && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
          .then(registration => {
            console.log('SW registered: ', registration);
          })
          .catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  };
  
  export { register };
  
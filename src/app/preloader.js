// Function which returns a function: https://davidwalsh.name/javascript-functions
const preloader = function(url) {
  // This promise will be used by Promise.all to determine success or failure
  return new Promise(function(resolve, reject) {
    let element = new Image();

    element.onload = function() {
      resolve(url);
    };
    element.onerror = function() {
      reject(url);
    };

    element['src'] = url;
  });
};
  
export default preloader;

// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());



/* Place any jQuery/helper plugins in here. */


// Modified from http://stackoverflow.com/a/105074/1296925
window.guid = (function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
  }
  return function() {
    return s4() + s4() + s4() + s4();
  };
})();


// Modified from http://stackoverflow.com/a/27054491/1296925
window.findObjectById = function(root, uid) {
    if(root.uid == uid){
      return root;
    } else if (root.flow) {
        for (var k in root.flow) {
            if (root.flow[k].uid == uid) {
              return root; 
            }
            else if (root.flow[k].flow.length) {
                return findObjectById(root.flow[k], uid);
            }
        }
    }
};
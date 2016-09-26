if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/js/sw.js', { scope: '/js/' }).then(function(reg) {

    if(reg.installing) {
      console.log('Service worker installing');
    } else if(reg.waiting) {
      console.log('Service worker installed');
    } else if(reg.active) {
      console.log('Service worker active');
    }

  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
};

function delayedThrottle(fun, time) {
  time = time || 250;
  var lastCallTime = 0;
  return function() {
    var now = new Date().getTime();
    if (now - lastCallTime > time) {
      lastCallTime = now;
      setTimeout(fun, time);
    }
  };
}

$(window).scroll(
    {
        previousTop: 0
    },
    delayedThrottle(function () {
    var currentTop = $(window).scrollTop();
    if (currentTop < this.previousTop) {
        $(".site-header").animate({ opacity: 1 }, 250);
    } else if (currentTop > 200 && currentTop > this.previousTop) {
        $(".site-header").animate({ opacity: 0 }, 250);
    }
    this.previousTop = currentTop;
}));

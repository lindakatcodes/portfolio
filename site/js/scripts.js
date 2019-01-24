var smoothScroll = require('smooth-scroll');
   
   //smooth scroll for jumping to sections on page
    var scroll = new smoothScroll('a[href*="#"]',{
        header: '[navigation]',
        speed: 1200,
        easing: 'easeInOutQuad'
      });

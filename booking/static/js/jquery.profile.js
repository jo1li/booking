$(document).ready(function() {
  initFixedBlocks();
  bindLinks();
});

function initFixedBlocks() {
  var win = jQuery(window);
  var fixedClass = 'fixed-bar';

  jQuery('#wrapper').each(function(){
    var barHolder = jQuery('.artist-placeholder');
    var main = jQuery('.main-content');
    var offsetTop = barHolder.outerHeight() - 64;

    win.on('resize orientationchange', function(){
      offsetTop = barHolder.outerHeight() - 64;
    });

    // var onScroll = function() {
    //   if (win.scrollTop() >= offsetTop) {
    //     bar.css({
    //       position: 'fixed',
    //       top: '64px',
    //       bottom: 'auto'
    //     }).addClass(fixedClass);
    //   } else {
    //     bar.css({
    //       position: 'absolute',
    //       top: '',
    //       bottom: ''
    //     }).removeClass(fixedClass);
    //   }
    // };

    var onScroll = function() {
      if (win.scrollTop() >= offsetTop) {
        barHolder.css({
          position: 'fixed',
          top: '-84px',
          bottom: 'auto'
        }).addClass(fixedClass);
        main.css({
          paddingTop: '256px'
        });
      } else {
        barHolder.css({
          position: 'relative',
          top: '',
          bottom: ''
        }).removeClass(fixedClass);
        main.css({
          paddingTop: '40px'
        });
      }
    };


    win.on('scroll', onScroll);
    onScroll(); // Get the header to the right location on initial load
  });
}

function bindLinks() {
  var link = document.getElementById('see-full-bio-link');
  var fullBio = document.getElementById('biography-long');
  // var header = document.getElementById('artist-scroll');
  var header = document.getElementsByClassName('artist-placeholder')[0];

  link.onclick = function(event) {
    event.preventDefault();

    fullBio.scrollIntoView();

    var fullBioTop = fullBio.getBoundingClientRect().top;
    var headerBottom = header.getBoundingClientRect().bottom;
    if(fullBioTop < headerBottom) {
      window.scrollBy(0, fullBioTop - headerBottom);
    }
  }
}

/*
 * Responsive Layout helper
 */
window.ResponsiveHelper = (function($){
  // init variables
  var handlers = [],
    prevWinWidth,
    win = $(window),
    nativeMatchMedia = false;

  // detect match media support
  if(window.matchMedia) {
    if(window.Window && window.matchMedia === Window.prototype.matchMedia) {
      nativeMatchMedia = true;
    } else if(window.matchMedia.toString().indexOf('native') > -1) {
      nativeMatchMedia = true;
    }
  }

  // prepare resize handler
  function resizeHandler() {
    var winWidth = win.width();
    if(winWidth !== prevWinWidth) {
      prevWinWidth = winWidth;

      // loop through range groups
      $.each(handlers, function(index, rangeObject){
        // disable current active area if needed
        $.each(rangeObject.data, function(property, item) {
          if(item.currentActive && !matchRange(item.range[0], item.range[1])) {
            item.currentActive = false;
            if(typeof item.disableCallback === 'function') {
              item.disableCallback();
            }
          }
        });

        // enable areas that match current width
        $.each(rangeObject.data, function(property, item) {
          if(!item.currentActive && matchRange(item.range[0], item.range[1])) {
            // make callback
            item.currentActive = true;
            if(typeof item.enableCallback === 'function') {
              item.enableCallback();
            }
          }
        });
      });
    }
  }
  win.bind('load resize orientationchange', resizeHandler);

  // test range
  function matchRange(r1, r2) {
    var mediaQueryString = '';
    if(r1 > 0) {
      mediaQueryString += '(min-width: ' + r1 + 'px)';
    }
    if(r2 < Infinity) {
      mediaQueryString += (mediaQueryString ? ' and ' : '') + '(max-width: ' + r2 + 'px)';
    }
    return matchQuery(mediaQueryString, r1, r2);
  }

  // media query function
  function matchQuery(query, r1, r2) {
    if(window.matchMedia && nativeMatchMedia) {
      return matchMedia(query).matches;
    } else if(window.styleMedia) {
      return styleMedia.matchMedium(query);
    } else if(window.media) {
      return media.matchMedium(query);
    } else {
      return prevWinWidth >= r1 && prevWinWidth <= r2;
    }
  }

  // range parser
  function parseRange(rangeStr) {
    var rangeData = rangeStr.split('..');
    var x1 = parseInt(rangeData[0], 10) || -Infinity;
    var x2 = parseInt(rangeData[1], 10) || Infinity;
    return [x1, x2].sort(function(a, b){
      return a - b;
    });
  }

  // export public functions
  return {
    addRange: function(ranges) {
      // parse data and add items to collection
      var result = {data:{}};
      $.each(ranges, function(property, data){
        result.data[property] = {
          range: parseRange(property),
          enableCallback: data.on,
          disableCallback: data.off
        };
      });
      handlers.push(result);

      // call resizeHandler to recalculate all events
      prevWinWidth = null;
      resizeHandler();
    }
  };
}(jQuery));

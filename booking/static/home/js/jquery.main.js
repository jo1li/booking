jQuery(function() {
	initBackgroundVideo();
});


// background video init
function initBackgroundVideo() {
	jQuery('.bg-video').backgroundVideo({
		activeClass: 'video-active'
	});
};


/*
 * jQuery video background plugin
*/
(function($, $win) {
	var BgVideoController = (function() {
		var videos = [];

		return {
			init: function() {
				$win.on('load.bgVideo resize.bgVideo orientationchange.bgVideo', this.resizeHandler.bind(this));
			},

			resizeHandler: function() {
				if (this.isInit) {
					$.each(videos, this.resizeVideo.bind(this));
				}
			},

			buildPoster: function($video, $holder) {
				$holder.css({
					'background-image': 'url(' + $video.attr('poster') + ')',
					'background-repeat':'no-repeat',
					'background-size':'cover'
				});
			},

			resizeVideo: function(i) {
				var item = videos[i];
				var styles = this.getDimensions({
					videoRatio: item.ratio,
					maskWidth: item.$holder.outerWidth(),
					maskHeight: item.$holder.outerHeight()
				});

				item.$video.css({
					width: styles.width,
					height: styles.height,
					marginTop: styles.top,
					marginLeft: styles.left
				});
			},

			getRatio: function($video) {
				return $video[0].videoWidth / $video[0].videoHeight ||
				$video.attr('width') / $video.attr('height') ||
				$video.width() / $video.height();
			},

			getDimensions: function(data) {
				var ratio = data.videoRatio,
					slideWidth = data.maskWidth,
					slideHeight = slideWidth / ratio;

				if (slideHeight < data.maskHeight) {
					slideHeight = data.maskHeight;
					slideWidth = slideHeight * ratio;
				}
				return {
					width: slideWidth,
					height: slideHeight,
					top: (data.maskHeight - slideHeight) / 2,
					left: (data.maskWidth - slideWidth) / 2
				};
			},

			add: function($video, options) {
				var $holder = options.videoHolder ? $video.closest(options.videoHolder) : $video.parent();
				var item = {
					$video: $video,
					$holder: $holder,
					options: options
				};

				if ($video.attr('poster')) {
					this.buildPoster($video, $holder);
				}

				if ($video[0].readyState) {
					this.onVideoReady(item);
					if ($video[0].paused) {
						$video[0].play();
					} else {
						$holder.addClass(options.activeClass);
					}
				} else {
					$video.one('loadedmetadata', function() {
						if ($video[0].paused) {
							$video[0].play();
						 } else {
							$holder.addClass(options.activeClass);
						 }
						 this.onVideoReady(item);
					}.bind(this));
				}

				$video.one('play', function() {
					$holder.addClass(options.activeClass);
					this.makeCallback.apply($.extend(true, {}, this, item), ['onPlay']);
				}.bind(this));


				this.makeCallback.apply($.extend(true, {}, this, item), ['onInit']);
				return this;
			},

			onVideoReady: function(item) {
				if (!this.isInit) {
					this.isInit = true;
					this.init();
				}
				videos.push($.extend(item, {
					ratio: this.getRatio(item.$video)
				}));
				this.resizeVideo(videos.length - 1);
			},

			destroy: function($video) {
				if (!$video) {
					videos = videos.filter(this.destroySingle);
				} else {
					videos = videos.filter(function(item) {
						var removeFlag = item.$video.is($video);

						removeFlag && this.destroySingle(item);

						return !removeFlag;
					}.bind(this));
				}

				if (!videos.length) {
					this.isInit = false;
					$win.off('.bgVideo');
				}
			},

			destroySingle: function(item) {
				item.$video.removeAttr('style').removeData('BackgroundVideo')[0].pause();
				item.$holder.removeClass(item.options.activeClass);
			},

			makeCallback: function(name) {
				if (typeof this.options[name] === 'function') {
					var args = Array.prototype.slice.call(arguments);
					args.shift();
					this.options[name].apply(this, args);
				}
			}
		};
	}());

	$.fn.backgroundVideo = function(opt) {
		var args = Array.prototype.slice.call(arguments);
		var method = args[0];
		var options = $.extend({
			activeClass: 'video-active',
			videoHolder: null
		}, opt);

		return this.each(function() {
			var $video = jQuery(this);
			var instance = $video.data('BackgroundVideo');

			if (typeof opt === 'object' || typeof opt === 'undefined') {
				$video.data('BackgroundVideo', BgVideoController.add($video, options));
			} else if (typeof method === 'string' && instance) {
				if (typeof instance[method] === 'function') {
					args.shift();
					instance[method].apply(instance, args);
				}
			}
		});
	};

	window.BgVideoController = BgVideoController;

	return BgVideoController;
}(jQuery, jQuery(window)));

// slick
$(document).ready(function(){
    $('.slick-shows').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 6000,
        prevArrow: '<a href="#" class="btn-prev"><img src="/static/home/images/ico-left.svg" alt="left-chevron" width="15" height="27"></a>',
        nextArrow: '<a href="#" class="btn-next"><img src="/static/home/images/ico-right.svg" alt="right-chevron" width="15" height="27"></a>',
        responsive: [
          {
            breakpoint: 567,
            settings: {
              slidesToShow: 1,
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
            }
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 3,
            }
          },
        ]
    });

    $('.slick-why').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 6000,
        prevArrow: '<a href="#" class="btn-prev"><img src="/static/home/images/ico-left.svg" alt="left-chevron" width="15" height="27"></a>',
        nextArrow: '<a href="#" class="btn-next"><img src="/static/home/images/ico-right.svg" alt="right-chevron" width="15" height="27"></a>',
        responsive: [{
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
            }
          }
        ]
    });
});

// naive email form validation
$(document).ready(function(){

  var selector = 'form input.form-control';

  $(selector).keyup(function(){
    var formElements = new Array();

    $(selector).each(function(){
      formElements.push($(this).val());
    });

    var all_not_empty = formElements.every(function(i) { return i !== ""; });

    if( all_not_empty ) {
      $("#mc-embedded-subscribe").fadeTo('fast', 1);
      $("#submit-contact-us").fadeTo('fast', 1);
    } else {
      $("#mc-embedded-subscribe").fadeTo('fast', .5);
      $("#submit-contact-us").fadeTo('fast', .5);
    }
  });

});

$(document).ready(function(){

  $("#submit-contact-us").click(function(){

    var from_name = $('#mce-FNAME').val() + ' ' + $('#mce-LNAME').val();
    var from_email = $('#mce-EMAIL').val();
    var body = $('#mce-COMMENT').val() + "<br /><br />From<br />" + from_name;

    Email.send(
      from_email,
      "info@opuslive.io",
      "Message from Opus Homepage",
      body,
      {
        token: "c97ac045-f778-497b-b36d-ff1e1f0a9375",
        callback: function done(message) {

          console.log(message);

          // clear form
          $('#mce-FNAME').val('');
          $('#mce-LNAME').val('');
          $('#mce-EMAIL').val('');
          $('#mce-COMMENT').val('');

          // show button again
          $("#submit-contact-us").show();
          $("#contact-us-spinner").hide();

          $("#mce-success-response").show();

        }
      }
    );

    // show spinner
    $("#submit-contact-us").hide();
    $("#contact-us-spinner").show();


  });

});

// Looping workaround
$(document).ready(function(){
  $('video').on('ended', function(){
    console.log('vid ended');
    this.pause();
    this.currentTime = 0;
    this.play();
  });
})

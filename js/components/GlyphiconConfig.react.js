define(["react", "dispatchers/AppDispatcher"], function(React, AppDispatcher) {



	var GlyphiconConfig = React.createClass({
      emitClose: function(){
        AppDispatcher.dispatch({
          actionType: 'TOGGLE_SLIDE',
          data: { open: false }
        });
      },
      render: function() {

      	var _this = this;

        // Glyphicon list from getbootstrap.com

        return (
          <div className="glyphiconConfig">
            <ul className="glyphicons-list">
              <li>
                <span className="glyphicon glyphicon-asterisk" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-asterisk</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-plus</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-euro" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-euro</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-minus" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-minus</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-cloud" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-cloud</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-envelope" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-envelope</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-pencil</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-glass" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-glass</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-music" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-music</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-search</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-heart" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-heart</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-star</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-star-empty" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-star-empty</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-user" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-user</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-film" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-film</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-th-large" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-th-large</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-th" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-th</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-th-list" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-th-list</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-ok</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-remove</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-zoom-in" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-zoom-in</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-zoom-out" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-zoom-out</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-off" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-off</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-signal" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-signal</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-cog" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-cog</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-trash</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-home" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-home</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-file" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-file</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-time" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-time</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-road" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-road</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-download-alt" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-download-alt</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-download" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-download</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-upload" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-upload</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-inbox" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-inbox</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-play-circle" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-play-circle</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-repeat" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-repeat</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-refresh" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-refresh</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-list-alt" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-list-alt</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-lock" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-lock</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-flag" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-flag</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-headphones" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-headphones</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-volume-off" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-volume-off</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-volume-down" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-volume-down</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-volume-up" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-volume-up</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-qrcode" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-qrcode</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-barcode" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-barcode</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-tag" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-tag</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-tags" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-tags</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-book" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-book</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-bookmark" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-bookmark</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-print" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-print</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-camera" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-camera</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-font" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-font</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-bold" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-bold</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-italic" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-italic</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-text-height" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-text-height</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-text-width" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-text-width</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-align-left" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-align-left</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-align-center" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-align-center</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-align-right" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-align-right</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-align-justify" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-align-justify</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-list" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-list</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-indent-left" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-indent-left</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-indent-right" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-indent-right</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-facetime-video" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-facetime-video</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-picture" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-picture</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-map-marker" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-map-marker</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-adjust" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-adjust</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-tint" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-tint</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-edit</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-share" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-share</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-check" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-check</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-move" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-move</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-step-backward" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-step-backward</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-fast-backward" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-fast-backward</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-backward" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-backward</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-play" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-play</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-pause" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-pause</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-stop" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-stop</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-forward" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-forward</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-fast-forward" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-fast-forward</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-step-forward" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-step-forward</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-eject" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-eject</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-chevron-left</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-chevron-right</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-plus-sign</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-minus-sign" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-minus-sign</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-remove-sign" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-remove-sign</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-ok-sign" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-ok-sign</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-question-sign" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-question-sign</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-info-sign</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-screenshot" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-screenshot</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-remove-circle</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-ok-circle</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-ban-circle" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-ban-circle</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-arrow-left</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-arrow-right" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-arrow-right</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-arrow-up" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-arrow-up</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-arrow-down" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-arrow-down</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-share-alt" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-share-alt</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-resize-full" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-resize-full</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-resize-small" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-resize-small</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-exclamation-sign</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-gift" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-gift</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-leaf" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-leaf</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-fire" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-fire</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-eye-open</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-eye-close" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-eye-close</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-warning-sign" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-warning-sign</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-plane" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-plane</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-calendar" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-calendar</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-random" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-random</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-comment" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-comment</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-magnet" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-magnet</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-chevron-up</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-chevron-down</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-retweet" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-retweet</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-shopping-cart</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-folder-close" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-folder-close</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-folder-open" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-folder-open</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-resize-vertical" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-resize-vertical</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-resize-horizontal" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-resize-horizontal</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-hdd" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-hdd</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-bullhorn" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-bullhorn</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-bell" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-bell</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-certificate" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-certificate</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-thumbs-up</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-thumbs-down" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-thumbs-down</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-hand-right" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-hand-right</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-hand-left" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-hand-left</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-hand-up" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-hand-up</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-hand-down" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-hand-down</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-circle-arrow-right" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-circle-arrow-right</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-circle-arrow-left" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-circle-arrow-left</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-circle-arrow-up" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-circle-arrow-up</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-circle-arrow-down" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-circle-arrow-down</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-globe" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-globe</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-wrench" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-wrench</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-tasks" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-tasks</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-filter" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-filter</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-briefcase" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-briefcase</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-fullscreen</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-dashboard" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-dashboard</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-paperclip" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-paperclip</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-heart-empty" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-heart-empty</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-link" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-link</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-phone" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-phone</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-pushpin" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-pushpin</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-usd" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-usd</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-gbp" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-gbp</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-sort" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-sort</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-sort-by-alphabet" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-sort-by-alphabet</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-sort-by-alphabet-alt" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-sort-by-alphabet-alt</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-sort-by-order" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-sort-by-order</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-sort-by-order-alt" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-sort-by-order-alt</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-sort-by-attributes" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-sort-by-attributes</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-sort-by-attributes-alt" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-sort-by-attributes-alt</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-unchecked" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-unchecked</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-expand" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-expand</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-collapse-down" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-collapse-down</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-collapse-up" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-collapse-up</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-log-in" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-log-in</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-flash" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-flash</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-log-out" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-log-out</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-new-window" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-new-window</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-record" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-record</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-save" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-save</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-open" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-open</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-saved" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-saved</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-import" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-import</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-export" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-export</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-send" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-send</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-floppy-disk</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-floppy-saved" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-floppy-saved</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-floppy-remove" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-floppy-remove</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-floppy-save" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-floppy-save</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-floppy-open" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-floppy-open</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-credit-card" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-credit-card</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-transfer" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-transfer</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-cutlery" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-cutlery</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-header" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-header</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-compressed" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-compressed</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-earphone" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-earphone</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-phone-alt" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-phone-alt</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-tower" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-tower</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-stats" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-stats</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-sd-video" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-sd-video</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-hd-video" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-hd-video</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-subtitles" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-subtitles</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-sound-stereo" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-sound-stereo</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-sound-dolby" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-sound-dolby</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-sound-5-1" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-sound-5-1</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-sound-6-1" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-sound-6-1</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-sound-7-1" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-sound-7-1</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-copyright-mark" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-copyright-mark</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-registration-mark" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-registration-mark</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-cloud-download" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-cloud-download</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-cloud-upload" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-cloud-upload</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-tree-conifer" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-tree-conifer</span>
              </li>
            
              <li>
                <span className="glyphicon glyphicon-tree-deciduous" aria-hidden="true"></span>
                <span className="glyphicon-class">glyphicon glyphicon-tree-deciduous</span>
              </li>
            </ul>
          </div>
        );
      }
    });

    return GlyphiconConfig;

});
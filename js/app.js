/*---------------
 * jQuery Last.Fm Plugin by Pinceladas da Web
 * Example and documentation at: https://github.com/pinceladasdaweb/Lastfm-Recent-Tracks
 * Copyright (c) 2013
 * Version: 1.1.0 (13-ABR-2013)
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 * Requires: jQuery v1.9 or later and Handlebars 1.0 or later
---------------*/

  //Clean up the URL's
  function stripslashes( str ) {   
    return (str+'').replace(/\0/g, '0').replace(/\\([\\'"])/g, '$1');
  }

var Lastfm = {
	init: function(config) {
		this.url = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user='+config.username+'&api_key='+config.apikey+'&limit='+config.count+'&format=json';
		this.template = config.template;
		this.container = config.container;
		this.fetch();

	    if(config.artsize == 'small'){imgsize = 0}
	    if(config.artsize == 'medium'){imgsize = 1}
	    if(config.artsize == 'large'){imgsize = 2}
	    if(config.artsize == 'extralarge'){imgsize = 3}
	},
	attachTemplate: function() {
		var template = Handlebars.compile(this.template);

		this.container.empty().append(template(this.tracks));
	},
	fetch: function() {
		var self = this;

		$.getJSON(this.url, function(data) {
			var feed = data.recenttracks.track;

			self.tracks = $.map(feed, function(track) {
				return {
					image: stripslashes(track.image[imgsize]['#text']),
					song: track.name,
					artist: track.artist['#text'],
					album: track.album['#text'],
					link: track.url
				}
			});
			self.attachTemplate();
		});
	}
}

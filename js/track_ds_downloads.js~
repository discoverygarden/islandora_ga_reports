(function ($) {

  Drupal.behaviors.islandoraGATrack = {
    attach: function (context, settings) {
      $('td.datastream-download a').click(function() {
        var url = $(this).attr('href');
        _gaq.push(['_trackPageview', url]);
      });
      
      //this is for the google analytics to track site searches
      var path = window.location.pathname;      if (path.indexOf("islandora/solr/search") != -1) {      var r = new RegExp("/islandora/solr/search/([^/]*)/?(.*)?");      var m = path.match(r);      _gaq.push(['_trackPageview', '/islandora/solr/search/?q='+m[1]]);      _gaq.push(["_setAccount", ""]);}
    }
  };

})(jQuery);

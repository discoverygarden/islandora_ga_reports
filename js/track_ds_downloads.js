(function ($) {

  Drupal.behaviors.islandoraGATrack = {
    attach: function (context, settings) {
      $('td.datastream-download a').click(function() {
        var url = $(this).attr('href');
        _gaq.push(['_trackPageview', url]);
      });
      
      //this is for the google analytics to track site searches
      var path = window.location.pathname;       if (path.indexOf("islandora/search") != -1) {
        path = decodeURIComponent(path);
        
        var trackPageViewString = '/islandora/search/';
        path = path.replace(/"/g,'#'); 
        var facetRegEx = new RegExp(/\#(.*?)\#/g);
        var facetArray=path.match(facetRegEx);
        if (facetArray){
          for (var i = 0; i<facetArray.length;i++)
          {
            facetArray[i] = facetArray[i].replace(/#/g,''); 

          }
        }

        //regular expression for simple search
        var basicRegex = new RegExp(/islandora\/search\/([^}]*)\?/);
        //regular expression for advanced search
        var advancedRegex = new RegExp(/\((.*?)\)/);
        //try and match the simple search
        var m= path.match(basicRegex);
        //if there is not result try the advanced regular expression
        if (!m ){
          var m= path.match(advancedRegex);
        }
        trackPageViewString = trackPageViewString.concat('?q='+m[1]);

        if (facetArray){
          for (var j = 0; j < facetArray.length;j++)
          {
            trackPageViewString = trackPageViewString.concat( '&c='+facetArray[j]);
          }
        }
      }
         _gaq.push(['_trackPageview', trackPageViewString]);      _gaq.push(["_setAccount", ""]);     }
    
  };

})(jQuery);

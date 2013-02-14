(function ($) {

  Drupal.behaviors.islandoraGATrack = {
    attach: function (context, settings) {
      $('td.datastream-download a').click(function() {
        var url = $(this).attr('href');
        _gaq.push(['_trackPageview', url]);
      });
      
      //this is for the google analytics to track site searches
      var path = window.location.pathname;      if (path.indexOf("drupal7/islandora/search") != -1) {
        //decode the url        
        path = decodeURIComponent(path);
        //initialize the trackPageView
        var trackPageViewString = '/islandora/search/';
        
        //we need to replace the " to be # for the regular expression to work
        path = path.replace(/"/g,'#');
        
        //regular expression to strip out the facets and push them in an array 
        var facetRegEx = new RegExp(/\#(.*?)\#/g);
        var facetArray = path.match(facetRegEx);
        
        //if there are contents in the array we want to stripe out the # 
        if (facetArray) {
          for (var i = 0; i<facetArray.length;i++) {
            facetArray[i] = facetArray[i].replace(/#/g,''); 
          }
        }
        
        //regular expression for advanced search
        var advancedRegex = new RegExp(/\((.*?)\)/);
        var result = path.match(advancedRegex);
                
        //if there is no result try the advanced regular expression
        if (!result ) {
           //regular expression for simple search
          //var basicRegex = new RegExp("/islandora/search/(.+)*\?type");
           var basicRegex =new RegExp(/earch\/(.*?)\?/);
          //try and match the simple search
          var result = path.match(basicRegex);
          //we want to strip out the ? after the search term
          //result[1] = result[1].replace(/\?/g,'');  
        }
        
        //concatenate the search term to the trackpageview variable
        trackPageViewString = trackPageViewString.concat('?q='+result[1]);
        
        //concatenate all of the facet terms to the trackpageview variable
        if (facetArray) {
          trackPageViewString = trackPageViewString.concat('&c='+facetArray[0]);
          for (var j = 1; j < facetArray.length;j++) {
            trackPageViewString = trackPageViewString.concat('+'+facetArray[j]);
          }
        }
                   _gaq.push(['_trackPageview', trackPageViewString]);        _gaq.push(["_setAccount", ""]); 
      }    } 
  };

})(jQuery);

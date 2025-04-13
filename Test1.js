var current = this;

// Hide UI elements
document.getElementById("nav-bar").hidden = true; // Hides the navigation bar
document.getElementById("TabsToolbar").hidden = true; // Hides the tab bar
document.getElementById("titlebar").style.display = "none"; // Hides title bar


var quitObserver = {
   QueryInterface: function(aIID) {
      if (aIID.equals(Components.interfaces.nsIObserver) || aIID.equals(Components.interfaces.nsISupports)) {
         return this;
      }
      throw Components.results.NS_NOINTERFACE;
   },
   observe: function(aSubject,aTopic,aData ) {
      var mainWindow = current._windowMediator.getMostRecentWindow("navigator:browser");
      var sidebar  = mainWindow.document.getElementById("sidebar");
      if (sidebar.contentWindow.location.href == "chrome://daisy/content/sidebar.xul") {
         mainWindow.toggleSidebar('openDaisySidebar', false);
      }
   }
};

setTimeout(function() {
   var mainWindow = current._windowMediator.getMostRecentWindow("navigator:browser");
   var observerService = Components.classes["@mozilla.org/observer-service;1"].getService(Components.interfaces.nsIObserverService);
   observerService.addObserver(quitObserver,"quit-application-granted",false);
},2000);

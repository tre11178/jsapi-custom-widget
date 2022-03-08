import './style.css'

import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import * as intl from "@arcgis/core/intl";

import DropdownWidget from './widget';

/*
* Messages are for rendering strings within the widget.
* When the MessageBundleLoader object is registered, it will be used to 
* fetch the strings in the user's locale.
*
* The Vite guide has more information about using the /public directory. 
* https://vitejs.dev/guide/assets.html#the-public-directory
*/
const loader = {
  pattern: "/esm-widget-vite/assets/",
  async fetchMessageBundle(bundleId: string, locale: any) {
    const [, filename] = bundleId.split("/t9n/");

    const knownLocale = intl.normalizeMessageBundleLocale(locale);
    const bundlePath = `./assets/t9n/${filename}_${knownLocale}.json`;

    const response = await fetch(bundlePath);
    return response.json();
  }
}

intl.registerMessageBundleLoader(loader);

const map = new ArcGISMap({
  basemap: "streets-vector"
});

const view = new MapView({
  map: map,
  container: "viewDiv",
  center: [-118.244, 34.052],
  zoom: 12 
});

view.when(() => {
  console.log("Map is loaded");

  // Initialize the custom widget and set its properties using the constructor
  const dropdownWidget = new DropdownWidget();
  view.ui.add(dropdownWidget, "top-right");  
});

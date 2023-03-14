import './style.css'

import WebMap from "@arcgis/core/WebMap";
import SceneView from "@arcgis/core/views/SceneView";
import FloorFilter from "@arcgis/core/widgets/FloorFilter";
import Portal from "@arcgis/core/portal/Portal"
import * as intl from "@arcgis/core/intl";
import esriConfig from "@arcgis/core/config";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer"

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


const PORTAL_URL = "https://dev0018792.esri.com/portal"

const arcgisPortal =  new Portal({
  authMode: "immediate",
  url: "https://www.arcgis.com/" // First instance
});

arcgisPortal.load().then(() => {
  const webmap = new WebMap({
    portalItem: {
      id: "f133a698536f44c8884ad81f80b6cfc7"
    }
  });

  const missionPortal = new Portal({
    authMode: "immediate",
    url: PORTAL_URL
  });

  missionPortal.load().then(() => {
    const view = new SceneView({
      container: "viewDiv",
      map: webmap
    });
  
    esriConfig.portalUrl = PORTAL_URL

    FeatureLayer
    // const tracksFeatureLayer = new FeatureLayer({
    //   url: "https://dev0018792.esri.com/portal/home/item.html?id=035b03a8151649c8befe57c4be08df84"
    // })
    // webmap.layers.add(tracksFeatureLayer);


    const queryParameters = {
      query: "username:tresh_idt"
    };
 
    missionPortal.queryUsers(queryParameters).then((queryResults) => {
      queryResults.results[0].fetchItems().then((fetchItemResult: any) => {
        console.log("next start index: ", fetchItemResult.nextStart);
        fetchItemResult.items.forEach((item: any) => {
          console.log("portal item title:", item.title);
        });
     });
    });
    
    view.when(() => {
      const floorFilter = new FloorFilter({
        view: view
      });
      view.ui.add(floorFilter, "top-trailing");
    });
  })
})





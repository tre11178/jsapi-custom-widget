//calcite assets
import { setAssetPath } from "@esri/calcite-components/dist/components";
setAssetPath("https://js.arcgis.com/calcite-components/1.0.0-beta.77/assets");

import "@esri/calcite-components/dist/components/calcite-dropdown";
import "@esri/calcite-components/dist/components/calcite-dropdown-group";
import "@esri/calcite-components/dist/components/calcite-dropdown-item";

//calcite styles
import "@esri/calcite-components/dist/calcite/calcite.css";

import { tsx } from "@arcgis/core/widgets/support/widget";
import Widget from "@arcgis/core/widgets/Widget";

class DropdownWidget extends Widget {
  constructor(params?: any) {
    super(params);
  }

  render() {
    return (
      <div style="background-color: white">
        <calcite-dropdown disable-close-on-select>
          <calcite-button slot="dropdown-trigger">
            Activate Dropdown
          </calcite-button>
          <calcite-dropdown-group
            selection-mode="single"
            group-title="Selection Mode: Single"
          >
            <calcite-dropdown-item>Relevance</calcite-dropdown-item>
            <calcite-dropdown-item active>Date modified</calcite-dropdown-item>
            <calcite-dropdown-item>Title</calcite-dropdown-item>
          </calcite-dropdown-group>
          <calcite-dropdown-group
            selection-mode="multi"
            group-title="Selection Mode: Multi"
          >
            <calcite-dropdown-item active>Maps</calcite-dropdown-item>
            <calcite-dropdown-item>Layers</calcite-dropdown-item>
            <calcite-dropdown-item active>Data</calcite-dropdown-item>
          </calcite-dropdown-group>
          <calcite-dropdown-group
            selection-mode="none"
            group-title="Selection Mode: None"
          >
            <calcite-dropdown-item>Mountain</calcite-dropdown-item>
            <calcite-dropdown-item>River</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>
      </div>
    );
  }
}

export default DropdownWidget;

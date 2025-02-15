import { config } from "../../package.json";

export { createZToolkit };

function createZToolkit() {
  // const _ztoolkit = new ZoteroToolkit();
  /**
   * Alternatively, import toolkit modules you use to minify the plugin size.
   * You can add the modules under the `MyToolkit` class below and uncomment the following line.
   */
  const _ztoolkit = new MyToolkit();
  initZToolkit(_ztoolkit);
  return _ztoolkit;
}

function initZToolkit(_ztoolkit: ReturnType<typeof createZToolkit>) {
  const env = __env__;
  _ztoolkit.basicOptions.log.prefix = `[${config.addonName}]`;
  _ztoolkit.basicOptions.log.disableConsole = env === "production";
  _ztoolkit.UI.basicOptions.ui.enableElementJSONLog = __env__ === "development";
  _ztoolkit.UI.basicOptions.ui.enableElementDOMLog = __env__ === "development";
  _ztoolkit.basicOptions.debug.disableDebugBridgePassword =
    __env__ === "development";
  _ztoolkit.basicOptions.api.pluginID = config.addonID;
  _ztoolkit.ProgressWindow.setIconURI(
    "default",
    `chrome://${config.addonRef}/content/icons/favicon.png`,
  );
}

import { BasicTool, unregister } from "zotero-plugin-toolkit/dist/basic";
import { UITool } from "zotero-plugin-toolkit/dist/tools/ui";
import { PreferencePaneManager } from "zotero-plugin-toolkit/dist/managers/preferencePane";
import { LargePrefHelper } from "zotero-plugin-toolkit/dist/helpers/largePref";
import { ProgressWindowHelper } from "zotero-plugin-toolkit/dist/helpers/progressWindow";
import { VirtualizedTableHelper } from "zotero-plugin-toolkit/dist/helpers/virtualizedTable";
import { DialogHelper } from "zotero-plugin-toolkit/dist/helpers/dialog";
import { MenuManager } from "zotero-plugin-toolkit/dist/managers/menu";

class MyToolkit extends BasicTool {
  UI: UITool;
  Menu: MenuManager;
  PreferencePane: PreferencePaneManager;
  ProgressWindow: typeof ProgressWindowHelper;
  LargePref: typeof LargePrefHelper;
  VirtualizedTable: typeof VirtualizedTableHelper;
  Dialog: typeof DialogHelper;

  constructor() {
    super();
    this.UI = new UITool(this);
    this.Menu = new MenuManager(this);
    this.PreferencePane = new PreferencePaneManager(this);
    this.ProgressWindow = ProgressWindowHelper;
    this.LargePref = LargePrefHelper;
    this.VirtualizedTable = VirtualizedTableHelper;
    this.Dialog = DialogHelper;
  }

  unregisterAll() {
    unregister(this);
  }
}

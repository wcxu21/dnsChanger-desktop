import electronStore from "electron-store";

import { Server } from "../../shared/interfaces/server.interface";
import { serversConstant } from "../../shared/constants/servers.cosntant";
import {
  SettingInStore,
  StoreKey,
} from "../../shared/interfaces/settings.interface";
import { defaultSetting } from "../../shared/constants/default-setting.contant";

export const store = new electronStore<StoreKey>({
  defaults: {
    dnsList: serversConstant,
    settings: defaultSetting,
  },
  name: "dnsChangerStore_1.9.0",
});

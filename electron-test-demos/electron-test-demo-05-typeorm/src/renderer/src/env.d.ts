/// <reference types="vite/client" />
import {ElectronWindow} from "src/main/ipc/interfaces";

declare global {
    const __ELECTRON_EXPOSURE__: ElectronWindow["__ELECTRON_EXPOSURE__"];
}

declare var window: Window; // eslint-disable-line no-var

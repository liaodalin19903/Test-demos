// no need to put API implementation logic here
// but only API definition and service instance creating
// as this file is supposed to be shared between the provider and client implementations
import {ActionType, ScanService, createIpcMainApiService} from "electron-rpc-api";

import { ConfigEntities } from "../../shared/db-entities/Config";

const apiDefinition = {
    //ping: ActionType.SubscribableLike<{ domain: string, times: number }, { domain: string, value: number }>(),
    //sanitizeHtml: ActionType.Promise<string, string>(),
    quitApp: ActionType.Promise(),
    test: ActionType.Promise<void, string>(),  // <void, string>: void: 指的是传入类型， string: 指的是返回类型
    testInsertDb: ActionType.Promise<ConfigEntities, ConfigEntities>()
};

export const IPC_MAIN_API_SERVICE = createIpcMainApiService({
    channel: "some-event-name", // event name used to communicate between the event emitters
    apiDefinition,
});

// optionally exposing inferred API structure
export type ScannedIpcMainApiService = ScanService<typeof IPC_MAIN_API_SERVICE>;

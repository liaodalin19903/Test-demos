import tcpPing from "tcp-ping";
import {app} from "electron";
import {interval} from "rxjs";
import {map, mergeMap, take} from "rxjs/operators";
import {observableToSubscribableLike} from "electron-rpc-api";
import {promisify} from "util";

import {IPC_MAIN_API_SERVICE, ScannedIpcMainApiService} from "./ipc-main-api-definition";

export function register(): ScannedIpcMainApiService["ApiClient"] {
    const api: ScannedIpcMainApiService["ApiImpl"] = {
        // ping: ({domain, times}) => {
        //     return observableToSubscribableLike(
        //         interval(/*one second*/ 1000).pipe(
        //             take(times),
        //             mergeMap(() => promisify(tcpPing.ping)({address: domain, attempts: times} )),
        //             map(({avg: value}) => {
        //                 if (typeof value === "undefined" || isNaN(value)) {
        //                     throw new Error(`Host "${domain}" is unreachable`);
        //                 }
        //                 return {domain, value};
        //             }),
        //         )
        //     );
        // },

        async quitApp() {
            app.quit();
        },

        async test() {
          const promise = new Promise((resolve, reject) => {

            console.log('get test call on backend')

            setTimeout(() => {
              resolve('Async operation completed.');
            }, 2000);
          })

          const result = await promise
          return result 
        }
    };

    IPC_MAIN_API_SERVICE.register(api);

    return api;
}

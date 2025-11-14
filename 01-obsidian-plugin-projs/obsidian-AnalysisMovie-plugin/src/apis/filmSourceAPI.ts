// src/api/filmSourceAPI.ts

import { App, TAbstractFile, TFolder, TFile } from "obsidian";

export interface FilmItem {
    name: string;
    sourcepath: string;
    metapath: string;
}

/**
 * 获取指定路径下的所有影片资源
 * @param app Obsidian App 实例
 * @param path 基础路径，默认为 "0.拉片/0.片源"
 */
export async function getFilmSourceList(
    app: App,
    path: string = "0.拉片/0.片源"
): Promise<FilmItem[]> {
    const folder = app.vault.getAbstractFileByPath(path);

    if (!folder || !(folder instanceof TFolder)) {
    throw new Error(`路径不存在或不是文件夹: ${path}`);
    }

    const results: FilmItem[] = [];

    for (const child of folder.children) {
    if (child instanceof TFolder) {
        const name = child.name;
        let sourcepath: string | null = null;
        let metapath: string | null = null;

        for (const file of child.children) {
        if (file instanceof TFile && file.extension === "mp4") {
            sourcepath = `${path}/${name}/${file.name}`;
        } else if (file.name === "metadata") {
            metapath = `${path}/${name}/metadata`;
        }
        }

        results.push({
        name,
        sourcepath: sourcepath ?? "",
        metapath: metapath ?? ""
        });
    }
    }

    return results;
}
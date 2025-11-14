import { ItemView, WorkspaceLeaf, Scope, Notice } from "obsidian";

import { Root, createRoot } from 'react-dom/client';
import { ReactView } from './ReactView';
import { AppContext } from "./context";

export const VIEW_TYPE_EXAMPLE = "analysismoview-view";

export class ExampleView extends ItemView {

  root: Root | null = null;
  constructor(leaf: WorkspaceLeaf) {
    super(leaf);

    // 👉 创建一个新的 Scope，继承自 app 的主 scope
    this.scope = new Scope(this.app.scope);

    // 👉 在这个 scope 上注册快捷键
    this.addShortcuts();
  }

  getViewType() {
    return VIEW_TYPE_EXAMPLE;
  }

  getDisplayText() {
    return "拉片";
  }

  async onOpen() {

    this.root = createRoot(this.contentEl);
		this.root.render(
      <AppContext.Provider value={this.app}>
        <ReactView />
      </AppContext.Provider>
		);
  }

  async onClose() {
    // Nothing to clean up.
    this.root?.unmount();
  }

  private addShortcuts() {

    console.log('注册快捷键！')

    this.scope!.register(
      ['Mod', 'Shift'],
      'K',
      () => {
          console.log('Plugin A1: 快捷键触发！');
          new Notice("Plugin A1 Shortcut Executed!");
      }
    );

    this.scope!.register(
      ['Mod', 'Shift'],
      'M',
      () => {
          console.log('Plugin A2: 快捷键触发！');
          new Notice("Plugin A2 Shortcut Executed!");
      }
    );
  }

}
import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, WorkspaceLeaf } from 'obsidian';
import { ExampleView, VIEW_TYPE_EXAMPLE } from './view';

export default class MyPlugin extends Plugin {
	async onload() {
		
		this.registerView(
			VIEW_TYPE_EXAMPLE,
			(leaf) => new ExampleView(leaf)
		  );
	

		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon('monitor-play', '拉片', (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			new Notice('点击了拉片插件');
			this.activateView(VIEW_TYPE_EXAMPLE, "tab");
		});

		// 快捷键注册
        this.addCommand({
            id: 'open-plugin-a-view',
            name: 'open-plugin-a-view',
			hotkeys: [{ modifiers: ['Mod', 'Shift'], key: 'K' }],
        });
		
		this.addCommand({
            id: 'open-plugin-a2-view',
            name: 'open-plugin-a2-view',
			hotkeys: [{ modifiers: ['Mod', 'Shift'], key: 'M' }],
        });

	}

	async activateView(VIEW_TYPE_EXAMPLE: string, side: "left" | "right" | "tab") {

		if (this.app.workspace.getLeavesOfType(VIEW_TYPE_EXAMPLE).length === 0) {
			
			console.log('this.app.workspace.getLeavesOfType(VIEW_TYPE_EXAMPLE).length === 0')	
			const { workspace } = this.app;
			let leaf: WorkspaceLeaf | null = null;

			if (side === "tab") {
				leaf = this.app.workspace.getLeaf("tab");
			} else if (side === 'left') {
				leaf = this.app.workspace.getLeftLeaf(false);
			} else if (side === 'right') {
				leaf = workspace.getRightLeaf(false);
			}

			await leaf!.setViewState({
				type: VIEW_TYPE_EXAMPLE,
				active: true,
			});	
		}
		
		this.app.workspace.revealLeaf(
			this.app.workspace.getLeavesOfType(VIEW_TYPE_EXAMPLE)[0]
		);
	}

	onunload() {
        this.app.workspace.detachLeavesOfType(VIEW_TYPE_EXAMPLE);
    }
}


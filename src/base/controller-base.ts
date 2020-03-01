import HookBase from './hook-base';

interface HookMap {
  [propName: string]: HookBase[],
}

export default abstract class ControllerBase<Hook extends HookBase> {
  activateHook(hook: Hook): void {
    if (this.hooks.has(hook)) {
      return;
    }
    this.hooks.add(hook);
    if (!(hook.eventName in this.hooksMap)) {
      this.hooksMap[hook.eventName] = [];
    }
    this.hooksMap[hook.eventName].push(hook);
  }

  deactivateHook(hook: Hook): void {
    if (!this.hooks.has(hook)) {
      return;
    }
    this.hooks.delete(hook);
    const list = this.hooksMap[hook.eventName];
    list.splice(list.indexOf(hook), 1);
  }

  abstract touch(eventName: string, ...params: any[]): void | Promise<void> ;

  protected hooks: Set<Hook> = new Set();
  protected hooksMap: HookMap = {};
}
import { anyEvent, errorEvent } from '../consts';
import { ControllerBase } from '../base';
import Hook from './hook';

export default class Controller extends ControllerBase<Hook> {
  public async touch(eventName: string, ...params: any[]): Promise<void> {
    if (!this.hooksMap[eventName]) {
      return;
    }
    try {
      await Promise.all(this.hooksMap[eventName].map(hook => hook.handler(...params)));
      await this.touchAny(eventName, params);
    } catch (e) {
      await this.touchError(e);
    }
  }

  public async touchAny(eventName: string, params: any[]) {
    if (!this.hooksMap[anyEvent]) {
      return;
    }
    try {
      await Promise.all(this.hooksMap[anyEvent].map(hook => hook.handler(eventName, ...params)));
    } catch (e) {
      await this.touchError(e);
    }
  }

  public async touchError(params: any) {
    if (!this.hooksMap[errorEvent]) {
      return;
    }
    try {
      await Promise.all(this.hooksMap[errorEvent].map(hook => hook.handler(params)));
    } catch {}
  }
}

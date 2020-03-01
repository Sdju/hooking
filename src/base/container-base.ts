import ControllerBase from './controller-base';
import HookBase from './hook-base';

export default abstract class ContainerBase<Hook extends HookBase> {
  add(controller: ControllerBase<Hook>, hook: Hook) {
    if (!this.hooksMap.has(controller)) {
      this.hooksMap.set(controller, []);
    }
    hook.addController(controller);
    hook.activate();

    (<Hook[]> this.hooksMap.get(controller)).push(hook);
    return hook;
  }

  clear() {
    this.hooksMap.forEach(hooks => hooks.forEach(hook => hook.deactivate()));
  }

  protected hooksMap: Map<ControllerBase<Hook>, Hook[]> = new Map();
}

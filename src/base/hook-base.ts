import ControllerBase from './controller-base';

export default class HookBase {
  constructor(eventName: string, handler: Function) {
    this.eventName = eventName;
    this.handler = handler;
  }

  deactivate() {
    this.controllers.forEach(controller => controller.deactivateHook(this));
  }

  deactivateFor(controller: ControllerBase<HookBase>) {
    controller.deactivateHook(this);
  }

  activate() {
    this.controllers.forEach(controller => controller.activateHook(this));
  }

  activateFor(controller: ControllerBase<HookBase>) {
    controller.activateHook(this);
  }

  addController(controller: ControllerBase<HookBase>) {
    this.controllers.add(controller);
  }

  removeController(controller: ControllerBase<HookBase>) {
    this.controllers.delete(controller);
  }

  public readonly eventName: string;
  public handler: Function;
  public controllers: Set<ControllerBase<HookBase>> = new Set();
}

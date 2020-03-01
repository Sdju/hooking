import { Hook, Container, Controller } from '../src';

const base = 0;
const result = 5;
const resultMod = 'test';
const testEvent = 'test';

test('base', async () => {
  const container = new Container();
  const controller = new Controller();

  let f = base;
  const hook = new Hook(testEvent, () => {
    f = result;
  });

  container.add(controller, hook);
  await controller.touch(testEvent);

  expect(f).toEqual(result);
});

test('multiple touch', async () => {
  const container = new Container();
  const controller = new Controller();

  let f = base;
  const hook = new Hook(testEvent, () => {
    f += result;
  });

  container.add(controller, hook);
  await controller.touch(testEvent);
  await controller.touch(testEvent);

  expect(f).toEqual(result * 2);
});

test('multiple hooks + touch', async () => {
  const container = new Container();
  const controller = new Controller();

  let f = base;
  let f2 = base;
  const hook = new Hook(testEvent, () => {
    f += result;
  });
  const hook2 = new Hook(testEvent, () => {
    f2 += result;
  });

  container.add(controller, hook);
  container.add(controller, hook2);
  await controller.touch(testEvent);
  await controller.touch(testEvent);

  expect(f).toEqual(result * 2);
  expect(f2).toEqual(result * 2);
});

test('multiple controller hook', async () => {
  const container = new Container();
  const controller = new Controller();
  const controller2 = new Controller();

  let f = base;
  const hook = new Hook(testEvent, () => {
    f += result;
  });

  container.add(controller, hook);
  container.add(controller2, hook);

  await controller.touch(testEvent);
  await controller2.touch(testEvent);

  expect(f).toEqual(result * 2);
});

test('multiple container hook', async () => {
  const container = new Container();
  const container2 = new Container();
  const controller = new Controller();

  let f = base;
  const hook = new Hook(testEvent, () => {
    f += result;
  });

  container.add(controller, hook);
  container2.add(controller, hook);

  await controller.touch(testEvent);

  expect(f).toEqual(result);
});

test('deactivate hook', async () => {
  const container = new Container();
  const controller = new Controller();
  const controller2 = new Controller();

  let f = base;
  const hook = new Hook(testEvent, function (this: Hook) {
    f += result;
    if (f === result * 2) {
      this.deactivate();
    }
  });

  container.add(controller, hook);
  container.add(controller2, hook);

  await controller.touch(testEvent);
  await controller2.touch(testEvent);
  await controller2.touch(testEvent);

  expect(f).toEqual(result * 2);
});

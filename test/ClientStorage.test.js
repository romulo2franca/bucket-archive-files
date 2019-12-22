/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const storage = require('../src/config/storage');

test('Test listFiles', () => {
  const spy = jest.spyOn(storage, 'listFiles');
  const result = storage.listFiles();

  expect(storage.listFiles).toHaveBeenCalled();
  expect(storage.listFiles).toHaveBeenCalledWith();
});

test('Test info', () => {
  const spy = jest.spyOn(storage, 'info');
  const result = storage.info({ prefix: 'test' });

  expect(storage.info).toHaveBeenCalled();
  expect(storage.info).toHaveBeenCalledWith({ prefix: 'test' });
});

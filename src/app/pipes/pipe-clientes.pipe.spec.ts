import { PipeClientesPipe } from './pipe-clientes.pipe';

describe('PipeClientesPipe', () => {
  it('create an instance', () => {
    const pipe = new PipeClientesPipe();
    expect(pipe).toBeTruthy();
  });
});

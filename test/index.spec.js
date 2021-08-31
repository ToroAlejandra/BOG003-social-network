// importamos la funcion que vamos a testear
import { signUpWithEmailPassword } from '../src/lib/utils/firebaseIndex.js';

const register = ['tefyrabih@gmail.com', '123456'];
describe('Sign up with email password', () => {
  it('show return a function ', () => {
    expect(typeof signUpWithEmailPassword).toBe('function');
  });
  it('show return a object', () => {
    expect(signUpWithEmailPassword(register[0], register[1])).toBe('object');
  });
});

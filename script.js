import {Matriz, traspuesta, multiplicarPorEscalar, inversa, multiplicar, sumar, restar, imprimir, determinante} from './modules/Matrix.js';

let m = new Matriz();

m.crear(2,2,1);
imprimir(m);

let n = new Matriz();
n.agregarFila([2,3,6,4,2]);
n.agregarFila([4,5,2,6,1]);
n.agregarFila([3,6,8,2,2]);
n.agregarFila([6,7,3,4,5]);
n.agregarFila([5,7,2,5,4]);
imprimir(inversa(n));
export class Matriz 
{
    constructor()
    {
        this.data = [];
    }

    // 1
    crear(filas, columnas=filas, opcion = 0)
    {
        if (opcion == 1 || opcion == 0)
        {
            // Se crea una matriz con ceros automaticamente. Si se desea crear una matriz identidad, se sustituyen los valores determinados. Asimismo, si solo se especifican las filas, se crea una matriz cuadrada.
            for (let i=0; i<filas; i++)
            {
                // Por cada iteracion se arregla un arreglo al arreglo. Es decir, una nueva fila a la matriz.
                this.data[i] = [];
                for(let j=0; j<columnas; j++)
                {
                    // Agregando columna.
                    this.data[i][j] = 0;
                }
            }

                // Matriz identidad.
                if (opcion == 1)
                {
                    if (filas==columnas)
                    {
                        for (let i=0; i<filas; i++)
                        {
                            // Cada miembro de la diagonal principal se intercambia por un 1.
                            this.data[i][i] = 1;
                        }
                    }
                    else 
                    {
                        alert('No se puede crear una matriz identidad que no sea cuadrada. Se ha creado una matriz con ceros por defecto.')
                    }
                }
        }

        else 
        {
            alert('Opcion de creacion de matriz no disponible.');
        }
    }

    // 8
    agregarColumna(datos)
    {  
        // Si la matriz no tiene filas, se agregan el mismo numero de arrays que de elementos de la columna.
        if (this.data.length == 0)
        {
            for (let i=0; i<datos.length; i++)
            {
                this.data.push([]);
            }
        }

        // Se itera en cada fila y se agrega un elemento del arreglo insertado. 
        for (let i=0; i<datos.length; i++)
        {
            this.data[i].push(datos[i]);
        }
    }

    // 9
    agregarFila(datos)
    {
        this.data.push(datos);
    }
}

// 2
export function traspuesta(matriz)
{
    // Se comprueba que todas las filas de la matriz tengan el mismo numero de columnas.
    if (uniforme(matriz))
    {
        let resultado = new Matriz();

        let filas = matriz.data.length;
        let columnas = matriz.data[0].length;

        // El bucle referente a las filas itera segun el numero de columnas, y viceversa.
        for (let i=0; i<columnas; i++)
        {
            // Se agrega una nueva fila en cada iteracion.
            resultado.agregarFila([]);
            for (let j=0; j<filas; j++)
            {
                // Cada elemento de la columna i se agrega a la fila progresivamente.
                resultado.data[i].push(matriz.data[j][i]);         
            }
        }
        return resultado;
    }
    else
    {
        alert('Las filas de la matriz no comparten el mismo numero de columnas. Por lo tanto, no tiene matriz traspuesta.');
    } 
}

// 3
export function multiplicarPorEscalar(matriz, escalar)
{
    let resultado = new Matriz();

    for (let i=0; i<matriz.data.length; i++)
    {
        // Se agrega una nueva fila en cada iteracion.
        resultado.agregarFila([]);
        for (let j=0; j<matriz.data[i].length; j++)
        {
            // se multiplica cada numero por el escalar ingresado
            resultado.data[i].push(matriz.data[i][j]*escalar); 
        }
    }

    return resultado;
}

// 4
export function multiplicar(matriz1, matriz2)
{
    // No pueden multiplicarse 2 matrices que no sean cuadradas.
    if (cuadrada(matriz1) && cuadrada(matriz2))
    {
        // No pueden multiplicarse 2 matrices que no tengan el mismo numero de filas y columnas.
        if (matriz1.data.length == matriz2.data.length){

            let multiplicacion;
            let resultado = new Matriz();

            // La primera fila de la matriz resultante en esta operacion viene siendo la multiplicacion de la primera fila de matriz1 por cada columna de matriz2. Y asi sucesivamente.
            for (let i=0; i<matriz1.data.length; i++)
            {
                // Se agrega una nueva fila en cada iteracion
                resultado.agregarFila([]);
                for (let j=0; j<matriz1.data[i].length; j++)
                {
                    // Se actualiza el resultado
                    multiplicacion = 0;

                    for (let k=0; k<matriz1.data[i].length; k++)
                    { 
                        // Cada elemento de la fila i de la matriz1 va a multiplicarse por el respectivo elemento de cada columna de la matriz2. Cada elemento itera segun k, cada columna itera segun j, y cada fila itera segun i.
                        multiplicacion += matriz1.data[i][k] * matriz2.data[k][j];
                    }

                    // Se agrega el resultado de la multiplicacion a cada columna. Es decir, a cada elemento de la fila i.
                    resultado.data[i].push(multiplicacion);
                }        
            }
            return resultado;
        }
        else 
        {
            alert('Ambas matrices deben tener el mismo numero de filas y columnas.');
        }
    }
    else 
    {
        alert('Ambas matrices deben ser cuadradas y tener el mismo numero de filas y columnas.');
    }
}

// 5
export function inversa(matriz)
{
    // No existe la inversa de una matriz que no sea cuadrada.
    if (cuadrada(matriz))
    {
        // No existe la inversa de una matriz cuyo determinante es cero.
        if (determinante(matriz) != 0)
        {

            if (matriz.data.length == 1)
            {
                let resultado = new Matriz();
                resultado.agregarFila([1/matriz.data[0][0]]);
                return resultado; 
            }

            else 
            {
                // Se calcula a traves del metodo de cofactores. La matriz inversa sera igual a la adjunta de la trapuesta entre el determinante de la misma. 
                let t = traspuesta(matriz);
                let a = adjunta(t);
                let d = determinante(matriz);

                return multiplicarPorEscalar(a, 1/d);
            }
        }
        else
        {
            alert('Esta matriz no tiene inversa, ya que su determinante es igual a cero.')
        }
    }
    else 
    {
        alert('Esta matriz no tiene inversa, ya que no es cuadrada.');
    }
}

// 6
export function sumar(matriz1, matriz2)
{
    // No pueden multiplicarse 2 matrices que no sean cuadradas.
    if (cuadrada(matriz1) && cuadrada(matriz2))
    {   

        // No pueden multiplicarse 2 matrices que no tengan el mismo numero de filas y columnas.
        if (matriz1.data.length == matriz2.data.length)
        {
            let suma = 0;
            let resultado = new Matriz();
            for (let i=0; i<matriz1.data.length; i++)
            {
                // se agrega una nueva fila en cada iteracion
                resultado.agregarFila([]);
                for (let j=0; j<matriz1.data[i].length; j++)
                {
                    suma = matriz1.data[i][j] + matriz2.data[i][j];

                    // Se agrega el resultado de la suma a cada columna. Es decir, a cada elemento de la fila i.
                    resultado.data[i].push(suma); 
                }
            }
            return resultado;
        }
        else
        {
            alert('Ambas matrices deben tener el mismo numero de filas y columnas.');
        }
    }
    else 
    {
        alert('Ambas matrices deben ser cuadradas.');
    }
}

// 7
export function restar(matriz1, matriz2)
{
    // No pueden multiplicarse 2 matrices que no sean cuadradas.
    if (cuadrada(matriz1) && cuadrada(matriz2))
    {

        // No pueden multiplicarse 2 matrices que no tengan el mismo numero de filas y columnas.
        if (matriz1.data.length == matriz2.data.length)
        {

            let resta = 0;
            let resultado = new Matriz();
            for (let i=0; i<matriz1.data.length; i++)
            {
                // se agrega una nueva fila en cada iteracion
                resultado.agregarFila([]);
                for (let j=0; j<matriz1.data[i].length; j++)
                {
                    resta = matriz1.data[i][j] - matriz2.data[i][j];

                    // Se agrega el resultado de la resta a cada columna. Es decir, a cada elemento de la fila i.
                    resultado.data[i].push(resta); 
                }
            }
            return resultado;
        }
        else 
        {
            alert('Ambas matrices deben tener el mismo numero de filas y columnas.');
        }
    }
    else 
    {
        alert('Ambas matrices deben ser cuadradas.');
    }
}

function cofactor(matriz, fila, columna)
{
    // Se crea una matriz de ceros por defecto que contenga una dimension de un rango menor a la matriz actual.
    let resultado = new Matriz();
    resultado.crear(matriz.data.length-1);
    
    // Coordenadas para ubicar los elementos en el cofactor (f=fila y c=columna).
    let f = 0;
    let c = 0;

    for (let i=0; i<matriz.data.length; i++)
    {
        for (let j=0; j<matriz.data[i].length; j++)
        {
            // Excluimos la fila y la columna a la que pertenece el elemento para construir la matriz resultante.
            if (i != fila && j != columna)
            {
                resultado.data[f][c] = matriz.data[i][j];
                c++// Iterando sobre la fila.

                if (c == resultado.data.length)
                {
                    // Una vez se alcance el limite de columnas en la respectiva fila, se avanza a la siguiente (y, por consiguiente, se reinicia el numero de la columna).
                    f++;
                    c = 0;
                }
            }
        }
    }

    return resultado;
}

export function determinante(matriz)
{
    let resultado = 0;

    if (matriz.data.length==1)
    {
        return matriz.data[0][0];
    }
    
    else if (matriz.data.length==2)
    {
        // Se multiplica la primera diagonal y se resta con la multiplicacion de la segunda diagonal.
        return (matriz.data[0][0]*matriz.data[1][1]) - (matriz.data[0][1]*matriz.data[1][0]);
    }

    else {
        // Se elige una columna de la matriz (por defecto, la primera) y cada elemento de la misma se multiplica por el determinante de su cofactor. Todos estos resultados se suman para dar como resultado el determinante de la matriz.

        // Se arranca con signo positivo, ya que hemos elegido utilizar la primera columna. Se alterna despues de cada iteracion. 
        let signo = 1
        for (let i=0; i<matriz.data.length; i++)
        { 
            resultado += signo * matriz.data[i][0] * determinante(cofactor(matriz, i, 0));
            signo *= -1;
        }
    }

    return resultado;
}

function adjunta(matriz)
{  
    let resultado = new Matriz();
    resultado.crear(matriz.data.length); 

    // Cada elemento de la adjunta de la matriz sera igual al determinante del cofactor del mismo. El signo se intercala en cada elemento, empezando en positivo.
    let signo = 1;
        
    for (let i=0; i<matriz.data.length; i++)
    {
        for (let j=0; j<matriz.data[i].length; j++)
        {
            resultado.data[i][j] = signo*determinante(cofactor(matriz, i, j));
            signo *= -1; 
        }

        // Si el numero de filas es par, se debe invertir el signo de nuevo una vez se haya cambiado de fila. 
        if (resultado.data.length % 2 == 0)
        {
            signo *= -1;
        }
    }
    
    return resultado;
    
}

function cuadrada(matriz)
{
    // Se comprueba que la matriz sea n*n.
    for (let i=0; i<matriz.data.length; i++)
    {
        // filas != columnas
        if (matriz.data.length != matriz.data[i].length) 
        {
            return false;
        }
    }

    return true;
}

function uniforme(matriz)
{
    // Se comprueba que la matriz sea n*m de manera uniforme. Es decir, que todas las filas tengan el mismo numero de columnas.

    // Se toma la primera fila como referencia (numero de columnas).
    let columnas = matriz.data[0].length;

    // Se itera a partir de la segunda fila y se comprueba que todas tengan el mismo numero de columnas que la primera fila.
    for (let i=1; i<matriz.data.length;i++)
    {
        if (matriz.data[i].length != columnas)
        {
            return false;
        }
    }

    return true;
}

export function imprimir(matriz)
{
    let resultado = '';
    for (let i=0; i<matriz.data.length; i++)
    {
        for (let j=0; j<matriz.data[i].length; j++)
        {
            resultado += matriz.data[i][j] + ' '
        }
        resultado += '\n';
    }
    console.log(resultado);
}


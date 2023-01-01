//Variables de obtenciond de datos del html
let textIng = document.getElementById("texto_ingreso");
let result = document.getElementById("texto_resultado");
let blWait = document.getElementById("espera");
let blResult = document.getElementById("resultado");

//Array de las condiciones de codificacion
const code = [
    { "letter": "a", "form": "ai" },
    { "letter": "e", "form": "enter" },
    { "letter": "i", "form": "imes" },
    { "letter": "o", "form": "ober" },
    { "letter": "u", "form": "ufat" },
]

//funcion para pasar un array a text
function arrayToText(array) {
    let noComma = array.toString().split(',').join(''); //la como es eliminada
    return noComma.replaceAll(/-COMMA-/g, ","); //en cada funcion se cambia la coma por otros caracteres, por lo que la volvemos a cambiar
}
//"Alerta" de campo sin texto
function alert() {
    let alert = document.getElementById("p_uno");
    if (alert.style.animation == '') {
        alert.style.animation = "animacion 2s";
    } else {
        alert.style.removeProperty("animation");
    }
}
//Cambio para mostrar el resultado
function cambioUno(objUno, objDos) {
    if (objDos.style.display = 'none') {
        objDos.style.display = 'block';
        objDos.style.animation = "aparicion 1s"
        objUno.style.display = 'none';
        objUno.style.removeProperty("animation");
    }
}
//Cambio para mostrar la pestaña de espera
function cambioDos(objUno, objDos) {
    if (objUno.style.display = 'none') {
        objUno.style.display = 'block';
        objDos.style.display = 'none';
        if (objDos.style.animation) {
            objUno.style.animation = "aparicion 1s"
            objDos.style.removeProperty("animation");
        }
    }
    alert();
}

//funcion de encriptacion
function encrypt() {
    //variables para la funcion
    let arrayResult = [];
    let text = textIng.value;

    if (!text == '') {
        //Conversion del text a un array y encriptacion
        for (let i = 0; i < text.length; i++) {
            arrayResult.push(text.charAt(i));

            //Compara la letra ingresada al nuevo array
            //y la cambia si coincide con las condiciones dadas
            let a = 0;
            while (a < code.length) {
                if (arrayResult[i] == code[a].letter) {
                    arrayResult[i] = code[a].form;
                    a = code.length
                } else { a++ }
            }
            if (text.charAt(i) == ",") {
                arrayResult[i] = "-COMMA-" //cambiando la "." por una cadena de caracteres
            }
        }
        //impresion del resultado
        result.value = arrayToText(arrayResult);
        //Pequeña animacion para mostrar el resultado
        cambioUno(blWait, blResult);
    } else {
        //Vuelve a mostrar la imagen de espera
        cambioDos(blWait, blResult);
    }
}

//funcion de deaencriptar
function decrypt() {
    //variables para la funcion
    let arrayResult = [];
    let text = textIng.value;
    let validation = true; //La validacion hace toda letra sea comparada 

    if (!text == '') {
        for (let i = 0; i < text.length; i++) {
            if (validation) {
                validation = false;

                let a = 0;
                while (a < code.length) {
                    let num;
                    num = i + code[a].form.length

                    //Compara una seccion del texto con las formas posibles de codificacion
                    //E ingresa al arrayResult la forma decodificada en caso coincida
                    if (text.substring(i, num) == code[a].form) {
                        validation = true;
                        i = i + code[a].form.length - 1;
                        arrayResult.push(code[a].letter);
                        a = code.length;
                    } else { a++ }
                }
            }
            if (!validation) {
                validation = true;
                arrayResult.push(text.charAt(i));
                if (text.charAt(i) == ",") {
                    arrayResult[i] = "-COMMA-" //cambiando la "." por una cadena de caracteres
                }
            }
        }
        //impresion del resultado
        result.value = arrayToText(arrayResult);
        //Pequeña animacion para mostrar el resultado
        cambioUno(blWait, blResult);
    } else {
        //Vuelve a mostrar la imagen de espera
        cambioDos(blWait, blResult);
    }
}

//funcion de copiar
function copy() {
    //Creacion un imput momentaneo al que copia el texto y lo selecciona 
    let copyText = document.createElement('input');
    copyText.setAttribute('value', result.value);
    document.body.appendChild(copyText);
    copyText.select();
    document.execCommand('copy');
    //Eliminacion del input momentaneo
    document.body.removeChild(copyText);
}
const form = document.getElementById('form')
const inputs = document.querySelectorAll('#form input')
const zipSearch = document.getElementById('zip')
const city = document.getElementById('city')
const state = document.getElementById('state')
const listaCoincidencias = document.getElementById('coincidencias')
const zipSearch2 = document.getElementById('zip2')
const city2 = document.getElementById('city2')
const state2 = document.getElementById('state2')
const listaCoincidencias2 = document.getElementById('coincidencias2')

const zips = [
    { zip: '00501', city: 'Holtsville', state: 'New York' },
    { zip: '00212', city: 'Portsmouth', state: 'New Hampshire'}
]


const expresiones = {
    letraYNumeros: /^[a-zA-Z0-9À-ÿñ\s]+$/,
    letras: /^[a-zA-ZÀ-ÿñ\s]+$/,
    numeros: /^[0-9\s]+$/,
    email: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
    telefono: /^[0-9\s]+$/,
}

zipSearch.addEventListener('input', e => {
    const zip = e.target.value

    let coincidencias = zips.filter(z => z.zip.includes(zip))

    if (zip.length == 0) {
        coincidencias = []
        listaCoincidencias.innerHTML = ''
        console.log('Limpiar ')
    }
    MostrarCoincidencias(coincidencias, listaCoincidencias)
})
zipSearch2.addEventListener('input', e => {
    const zip = e.target.value

    let coincidencias = zips.filter(z => z.zip.includes(zip))

    if (zip.length == 0) {
        coincidencias = []
        listaCoincidencias2.innerHTML = ''
        console.log('Limpiar ')
    }
    MostrarCoincidencias(coincidencias, listaCoincidencias2)
})

const MostrarCoincidencias = (coincidencias, show) => {
    if (coincidencias.length > 0) {
        const html = coincidencias.map(c => `
            <div id=${ c.zip }>
                <p>${ c.zip }</p>
            </div>
        `).join('')

        show.innerHTML = html

        
        coincidencias.forEach(c => {
            const elemento = document.getElementById(c.zip)
            elemento.addEventListener('click', () => {
                show.innerHTML = '';
                city.value = c.city;
                zipSearch.value = c.zip;
                state.innerHTML = `
                    <option>${ c.state }</option>
                `;
            })
        })
    } else {
        show.innerHTML = ''
    }
}

document.getElementById('phone').addEventListener('keyup', function (e) {
    // var x = e.target.value.replace(/\D/g, '').match(/(\d{3})(\d{3})(\d{4})/);
    const x = e.target.value.split('')
    console.log(x)
});

const validar = e => {
    switch (e.target.name) {
        case 'company':
            validarInput('company', expresiones.letraYNumeros, e.target.value)
        break;
        case 'dba':
            validarInput('dba', expresiones.letraYNumeros, e.target.value)
        break;
        case 'name':
            validarInput('name', expresiones.letras, e.target.value)
        break;
        case 'usdot':
            validarInput('usdot', expresiones.numeros, e.target.value)
        break;
        case 'phone':

        break;
        case 'email':
            validarInput('email', expresiones.email, e.target.value)
        break;
    }
}

const validarInput = (input, expresion, text) => {
    if (expresion.test(text)) {
        document.getElementById(input).classList.remove('incorrecto')
    } else {
        document.getElementById(input).classList.add('incorrecto')
    }
}

inputs.forEach(input => {
    input.addEventListener('keyup', validar)
    input.addEventListener('blur', validar)
})





form.addEventListener('submit', e => {
    e.preventDefault();
})





function doFormat(x, pattern, mask) {
    var strippedValue = x.replace(/[^0-9]/g, "");
    var chars = strippedValue.split('');
    var count = 0;

    var formatted = '';
    for (var i=0; i<pattern.length; i++) {
        const c = pattern[i];
        if (chars[count]) {
        if (/\*/.test(c)) {
            formatted += chars[count];
            count++;
        } else {
            formatted += c;
        }
        } else if (mask) {
        if (mask.split('')[i])
            formatted += mask.split('')[i];
        }
    }
    return formatted;
    }

document.querySelectorAll('[data-mask]').forEach(function(e) {
    function format(elem) {
        const val = doFormat(elem.value, elem.getAttribute('data-format'));
        elem.value = doFormat(elem.value, elem.getAttribute('data-format'), elem.getAttribute('data-mask'));
        
        if (elem.createTextRange) {
        var range = elem.createTextRange();
        range.move('character', val.length);
        range.select();
        } else if (elem.selectionStart) {
        elem.focus();
        elem.setSelectionRange(val.length, val.length);
        }
    }
    e.addEventListener('keyup', function() {
        format(e);
    });
    e.addEventListener('keydown', function() {
        format(e);
    });
    format(e)
});
// Variables
const carrito = document.querySelector('#carrito'); //linea 23
const listaCursos = document.querySelector('#lista-cursos');//linea 85
const contenedorCarrito = document.querySelector('#lista-carrito tbody');//linea 35
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); //linea 38
const pag = document.querySelectorAll('.pag');
const row1 = document.querySelector("#row1");
const row2 = document.querySelector("#row2");
const row3 = document.querySelector("#row3");
const row4 = document.querySelector("#row4");
let articulosCarrito = [];

// Listeners
cargarEventListeners();

function cargarEventListeners() {
     // Dispara cuando se presiona "Agregar Carrito"
     listaCursos.addEventListener('click', agregarCurso);

     // Cuando se elimina un curso del carrito
     carrito.addEventListener('click', eliminarCurso);

     // Al Vaciar el carrito
     vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

     row2.style.display = "none";
     row3.style.display = "none";
     row4.style.display = "none";
     //Paginación
     for (let i = 0; i < pag.length; i++) {
          //console.log(pag[i].firstChild);
          pag[i].addEventListener('click', () => {
               for(element of pag){
                    if (element.classList.contains('active')) {
                         element.classList.remove('active');
                    }
               }/*
               for(element2 of rows){
                    if (element2.classList.contains('show')) {
                         element2.classList.remove('show');
                    }
               }*/

               if (!pag[i].classList.contains('active')) {
                    pag[i].classList.toggle('active');
               }/*
               if (!rows[i].classList.contains('show')) {
                    rows[i].classList.toggle('show');
               }*/
               //row1.style.visibility = "hidden";
               switch(i){
                    case 0:   row1.style.display = "block"; 
                              row2.style.display = "none";
                              row3.style.display = "none";
                              row4.style.display = "none";  
                              break;  
                    case 1:   row1.style.display = "none"; 
                              row2.style.display = "block";
                              row3.style.display = "none";
                              row4.style.display = "none";  
                              break;
                    case 2:   row1.style.display = "none"; 
                              row2.style.display = "none";
                              row3.style.display = "block";
                              row4.style.display = "none";  
                              break;
                    case 3:   row1.style.display = "none"; 
                              row2.style.display = "none";
                              row3.style.display = "none";
                              row4.style.display = "block";  
                              break;
               }
              // console.log("Pagina nro: " + pag[i]);
          });
          //row[i].style.visibility = "visible";
          
          
     };
     //pag[1].addEventListener("click", paginacion);
     

}




// Funciones
// Función que añade el curso al carrito
function agregarCurso(e) {
     e.preventDefault();
     // Delegation para agregar-carrito
     if(e.target.classList.contains('agregar-carrito')) {
          const curso = e.target.parentElement.parentElement;
          // Enviamos el curso seleccionado para tomar sus datos
          leerDatosCurso(curso);
     }
}

// Lee los datos del curso
function leerDatosCurso(curso) {
     const infoCurso = {
          imagen: curso.querySelector('img').src,
          titulo: curso.querySelector('h4').textContent,
          precio: curso.querySelector('.precio span').textContent,
          id: curso.querySelector('a').getAttribute('data-id'), 
          cantidad: 1
     }


     if( articulosCarrito.some( curso => curso.id === infoCurso.id ) ) { 
          const cursos = articulosCarrito.map( curso => {
               if( curso.id === infoCurso.id ) {
                    curso.cantidad++;
                    return curso;
               } else {
                    return curso;
               }
          })
          articulosCarrito = [...cursos];
     }  else {
          articulosCarrito = [...articulosCarrito, infoCurso];
          }

     console.log(articulosCarrito)

     // console.log(articulosCarrito)
     carritoHTML();
}

// Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
     e.preventDefault();
     if(e.target.classList.contains('borrar-curso') ) {
          // e.target.parentElement.parentElement.remove();
          const cursoId = e.target.getAttribute('data-id')
          
          // Eliminar del arreglo del carrito
          articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

          carritoHTML();
     }
}
//var tit = document.getElementById("parrafo")

// Muestra el curso seleccionado en el Carrito
function carritoHTML() {

     vaciarCarrito();

     articulosCarrito.forEach(curso => {
          const row = document.createElement('tr');
          row.innerHTML = `
               <td>  
                    <img src="${curso.imagen}" width=100>
               </td>
               <td>${curso.titulo}</td>
               <td>${curso.precio}</td>
               <td>${curso.cantidad} </td>
               <td>
                    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
               </td>
          `;
          contenedorCarrito.appendChild(row);
     });

}

// Elimina los cursos del carrito en el DOM
function vaciarCarrito() {
     // forma lenta
     // contenedorCarrito.innerHTML = '';


     // forma rapida (recomendada)
     while(contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
     }
}

function paginacion(objeto){
     //console.log(objeto.value);
     //console.log(objeto.className);
     if (objeto.className != "pag active") {
          for (let index = 0; index < pag.length; index++) {
               console.log(pag[index]);
               //console.log(typeof(pag[index]));
               //console.log("Prueba");
               console.log(pag[index].classList.contains("pag active"));
               if (pag[index].classList.contains("pag active")) {
                    //console.log(pag[index]);
                    pag[index].classList.toggle(" active");
               }
          }
          objeto.className += " active";
     }
     
}
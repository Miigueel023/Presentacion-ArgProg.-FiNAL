const mostrarPublicaciones = (publicaciones, elementoHtml) => {

    let secciones = "";
    publicaciones.forEach( (pub) => {
        secciones += `
                <tr>
                    <td>${pub.id}</td>
                    <td>
                        <div class="d-flex align-items-center">
                            <img
                                src="${ pub.url_imagen == null ? 'https://mdbcdn.b-cdn.net/img/new/slides/017.webp':pub.url_imagen }"
                                alt="${pub.titulo}"
                                style="width: 45px; height: 45px"
                                class="rounded-circle" />
                            <div class="ms-3">
                                <p class="fw-bold mb-1">${pub.autor}</p>
                                <p class="text-muted mb-0">${pub.email}</p>
                            </div>
                        </div>
                    </td>
                    <td>
                        <p class="fw-normal mb-1">${pub.titulo}</p>
                    </td>
                    <td>${pub.fecha}</td>
                    <td class="text-center">
                        <div class="flex flex-cols-2 gap-5">
                            <a href="/editar/${pub.id}" class="btn btn-info">Editar</a>
                            <button onclick="EliminarPublicacion(${pub.id})" class="btn btn-danger">Eliminar</button>
                        </div>
        
                    </td>
                </tr>
        `
    })

    elementoHtml.innerHTML = secciones;
    
}

const obtenerPublicaicones = async () => {
    const response = await fetch('/publicaciones')
    const data = await response.json()
    return data;
}



document.addEventListener('DOMContentLoaded', async () => {
    
    const publicaciones = await obtenerPublicaicones()
    const main = document.querySelector('#admin-publicaciones')
    mostrarPublicaciones(publicaciones, main)
})

function EliminarPublicacion(id){
    Swal.fire({
        title: 'Esta seguro?',
        text: "Esta publicacion se eliminara permanentemente!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Eliminada!',
            'Publicacion borrada!.',
            'success'
          )
          ElminarDefinitivo(id)
        }
      })

}

async function ElminarDefinitivo(id){
    const url = '/publicacion/' + id;
    // Enviar los datos al servidor para crear la nueva publicación
    const respuesta = await fetch(url, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const datos = await respuesta.json();
    //alert(datos.msg);
    location.href = "/admin";
}
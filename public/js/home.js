const mostrarPublicaciones = (publicaciones, elementoHtml) => {

    let secciones = "";
    publicaciones.forEach( (pub) => {
        secciones += `
            <div class="card bg-dark text-white" style="margin: 50px 0;">
                <img src="${ pub.url_imagen }" class="card-img" alt="${pub.titulo}" height="400"/>
                <div class="card-img-overlay">
                <h5 class="card-title">${pub.titulo}</h5>
                <p class="card-text">
                    ${pub.detalle}
                </p>
                <p class="card-text">${pub.fecha}</p>
                </div>
            </div>
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
    const main = document.querySelector('#lista-publicaciones')
    mostrarPublicaciones(publicaciones, main)
})
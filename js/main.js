let cm = null;

async function cargarModuloMeals()
{
    let url = "modules/meals.html";
    
    let resp = await fetch (url);
    
    let contenido = await resp.text();
    
    document.getElementById("divPrincipal").innerHTML = contenido;
    
    cm = await import('./meals.js');
    
    cm.inicializar();
}
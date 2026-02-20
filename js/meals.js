let listaRecetas = [];

export function inicializar()
{
    setDetalleVisible(false);
    conectarAPI();
}

async function conectarAPI()
{
    let url = 'https://www.themealdb.com/api/json/v1/1/search.php?f=b';
    let resp = await fetch(url);
    let datos = await resp.json(); 
    
    listaRecetas = datos.meals;
    
    cargarListaMeals();
}

function cargarListaMeals()
{
    let contenido = '';
    
    for(let i=0; i<listaRecetas.length; i++){
        contenido += 
                '<tr>'+
                    '<td>' + listaRecetas[i].strMeal + '</td>' +
                    '<td>' + listaRecetas[i].strCategory + '</td>' +
                    '<td>' + listaRecetas[i].strArea + '</td>' +
                    '<td>' + '<a href="#" onclick="cm.verDetalleMeal(' + i + ');">Ver Detalle</a>' + '</td>' +
                '</tr>';
    }
    
    document.getElementById("tbodyMeals").innerHTML = contenido;
}

export function verDetalleMeal(posicion)
{
    let p = listaRecetas[posicion];
    
    document.getElementById("imgMeal").src = p.strMealThumb;
    document.getElementById("txtMealId").value = p.idMeal;
    document.getElementById("txtMealName").value = p.strMeal;
    document.getElementById("txtMealCategory").value = p.strCategory;
    document.getElementById("txtMealArea").value = p.strArea;
    document.getElementById("txtMealInstructions").value = p.strInstructions;
    document.getElementById("btnMealYtTutorial").href = p.strYoutube;
    document.getElementById("btnMealWebTutorial").href = p.strSource;
    
    let contenido = '';
    for(let i = 1; i <= 20; i++)
    {
        if (p['strIngredient' + i] !== '')
        {
            contenido += 
                '<tr>'+
                    '<td>' + p['strIngredient' + i] + '</td>' +
                    '<td>' + p['strMeasure' + i] + '</td>' +
                '</tr>';
        }
        else
        {
            break;
        }
    }
    
    document.getElementById("tbodyIngredients").innerHTML = contenido;
    setDetalleVisible(true);
}

export function setDetalleVisible(valor)
{
    if(valor === true)
    {
        document.getElementById("divCatalogo").style.display = 'none';
        document.getElementById("divDetalle").style.display = '';
    }
    else
    {
        document.getElementById("divDetalle").style.display = 'none';
        document.getElementById("divCatalogo").style.display = '';
    }
}

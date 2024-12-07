document.addEventListener('DOMContentLoaded', function() 
{
    const contenedorRopa = document.getElementById("seccion-articulos");

    const fetchCategory = async (category) => 
    {
        try 
        {
            const response = await fetch(`https://dummyjson.com/products/category/${category}?limit=20`);
            console.log(response);
            if (response.ok) 
            {
                const data = await response.json();
                console.log(data);
                return data.products;
            } 
            else 
            {
                console.error(`Error en el fetch de ${category}, status ${response.status}`);
                return [];
            }

        } 
        catch (error) 
        {
        console.error(`Error en el fetch de ${category}:`, error);
        return [];
        }
    };

    const cargarRopa = async()=>
    {
        try
        {
            const categories = ['mens-shirts', 'mens-shoes', 'womens-dresses', 'womens-shoes'];
    
            // se llamam a fetchCategory pasandole como parametro cada categoria
            // devuelve un array de arrays (para cada categoria un array)
            const productPromises = categories.map(fetchCategory);
            const products = await Promise.all(productPromises);//se espera a la promesa y se guarda 
            
            // Convertimos el array de arrays en un array solo 
            const combinedData = products.flat();
            let productos = '';

            combinedData.forEach(articulo =>
                {
                    productos += `
                    <div class="articulo">
                        <div>
                            <a><img src="${articulo.images[0]}" alt=""></a>
                        </div>
                        <div>
                            <h5>${articulo.title}</h5>
                        </div>
                        <div>
                            <span>$ ${articulo.price}</span>
                        </div>
                        <div>
                            <button type="button" class="btn btn-secondary">Agregar al carrito</button>
                        </div>
                    </div>
                    `;            
                });

            contenedorRopa.innerHTML = productos; 
        }
        catch (error)
        {
            console.log(error.message);
        }
    }
    cargarRopa();
});

/* Ocultar/Mostrar menu */
const menu = document.getElementById("menu");
const linkMenu = document.getElementById("button-menu");
const desplegable = document.getElementById("menu-desplegable");

menu.addEventListener("click", () =>
{
    if(desplegable.style.display == "flex")
    {
        desplegable.style.display = "none";
        linkMenu.style.filter = "invert(0%)";
    }
    else
    {
        desplegable.style.display = "flex";
        desplegable.style.flexDirection = "column";
        desplegable.style.justifyContent = "center";
        linkMenu.style.filter = "invert(100%)";
        menuAbierto = true;
    }
});

document.addEventListener("click", (e) =>
{
    if(!menu.contains(e.target))
    {
        desplegable.style.display = "none";
        linkMenu.style.filter = "invert(0%)";
    }
})
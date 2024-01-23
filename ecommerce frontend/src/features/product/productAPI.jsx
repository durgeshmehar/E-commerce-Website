
export function fetchProductsByFilter({filter,sort,pagination,admin}) {

    //filter ={"category":["smartphone","laptops"]}
    //sort = {_sort:"price",_order:"asc"}
    let queryString = '';

    for(let key in filter){
        const categoryValue = filter[key]
        if(categoryValue.length>0){
            queryString+=`${key}=${categoryValue}&`
        }
    }
     
    for(const key in sort){
        queryString+=`${key}=${sort[key]}&`
    }
    for(const key in pagination){
        queryString+=`${key}=${pagination[key]}&`
    }
    if(queryString.length>0){
        queryString = queryString.slice(0,-1)
    }
    if(admin){
        queryString+=`&admin=true`
    }

    return new Promise(async (resolve) =>{
        const response = await fetch(`/products?${queryString}`)
        const data = await response.json()
        const totalItems = await response.headers.get('X-Total-Count')
        resolve({data:{products:data,totalItems:totalItems}})
    });
}


export  function fetchCategories() {
    return new Promise(async (resolve) =>{
        const response = await fetch('/categories')
        const data = await response.json()
        resolve({data})
    });
}

export  function fetchBrands() {
    return new Promise(async (resolve) =>{
        const response = await fetch('/brands')
        const data = await response.json()
        resolve({data})
    });
}

export  function fetchProductById(id) {
    return new Promise(async (resolve,reject) =>{
        const response = await fetch('/products/'+id);
        if(response.ok){
            const data = await response.json()
            resolve({data})
        }
        else{
            const err = await response.json()
            reject({err})
        }
    });
}

export  function addProduct(productData) {
    return new Promise(async (resolve) =>{
        const response = await fetch('/products',{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(productData)
           })
        const data = await response.json()
        resolve({data})
    });
}

export function updateProduct(product){
    return new Promise(async (resolve)=>{
        const response = await fetch('/products/'+product.id,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(product)
        })
        const data = await response.json()
        resolve({data})
    })
}
export  function fetchAllProducts() {
    return new Promise(async (resolve) =>{
        const response = await fetch('http://localhost:8080/products')
        const data = await response.json()
        console.log("DAata",data);
        resolve({data})
    });
}
export function fetchProductsByFilter({filter,sort,pagination}) {

    //filter ={"category":["smartphone","laptops"]}
    //sort = {_sort:"price",_order:"asc"}
    // console.log("filter & sort & pagination :",filter,sort,pagination);


    let queryString = '';
    for(let key in filter){
        const categoryValue = filter[key]
        if(categoryValue.length>0){
            const lastValue = categoryValue[categoryValue.length-1]
            queryString+=`${key}=${lastValue}&`
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
    console.log("api qeury:",queryString);

    return new Promise(async (resolve) =>{
        const response = await fetch(`http://localhost:8080/products?${queryString}`)
        const data = await response.json()
        const totalItems = await response.headers.get('X-Total-Count')
        resolve({data:{products:data,totalItems:totalItems}})
    });
}
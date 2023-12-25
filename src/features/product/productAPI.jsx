export  function fetchAllProducts() {
    return new Promise(async (resolve) =>{
        const response = await fetch('http://localhost:8080/products')
        const data = await response.json()
        console.log("DAata",data);
        resolve({data})
    });
}
export function fetchProductsByFilter(filter) {
    let queryString = '';
    filter.map((filterObj)=>{
        for(const key in filterObj){
        queryString+=`${key}=${filterObj[key]}&`
        }
    })
    queryString = queryString.slice(0,-1)
    return new Promise(async (resolve) =>{
        const response = await fetch(`http://localhost:8080/products?${queryString}`)
        const data = await response.json()
        resolve({data})
    });
}
export function fetchProductsBySort(filter) {
    let queryString = '';
    const sort = Object.keys(filter)[0]
    const order = filter[sort]
    queryString+=`_sort=${sort}&_order=${order}`
    
     console.log("qeury:",queryString);
    return new Promise(async (resolve) =>{
        const response = await fetch(`http://localhost:8080/products?${queryString}`)
        const data = await response.json()
        resolve({data})
    });
}
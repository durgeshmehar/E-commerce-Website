export function createOrder(order) {
    return new Promise(async (resolve) =>{
        const response = await fetch('http://localhost:8080/orders',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(order)
        })
        const data = await response.json()
        console.log("received data :",data);
        resolve({data})
    });
}

export function updateOrder(order) {
    return new Promise(async (resolve) =>{
        const response = await fetch(`http://localhost:8080/orders/${order.id}`,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(order)
        })
        const data = await response.json()
        resolve({data})
    });
}

export function fetchAllOrders({sort,pagination}){
    let queryString="";
    for(const key in sort){
        queryString+=`${key}=${sort[key]}&`
    }
    for(const key in pagination){
        queryString+=`${key}=${pagination[key]}&`
    }
    if(queryString.length>0){
        queryString = queryString.slice(0,-1)
    }

    return new Promise(async (resolve) =>{
        const response = await fetch(`http://localhost:8080/orders?${queryString}`)
        const data = await response.json()
        const totalOrders = await response.headers.get('X-Total-Count')
        resolve( { data: { orders :data , totalOrders :totalOrders }} )
    });
}
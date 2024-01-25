export function createOrder(order) {
    return new Promise(async (resolve) =>{
        const response = await fetch(`/orders`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(order)
        })
        const data = await response.json()
        resolve({data})
    });
}

export function updateOrder(order) {

    return new Promise(async (resolve,reject) =>{
        const response = await fetch(`/orders/${order.id}`,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(order)
        })
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error updating order:', errorData);
            reject(errorData);
            return;
        }
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
        const response = await fetch(`/orders?${queryString}`)
        const data = await response.json()
        const totalOrders = await response.headers.get('X-Total-Count')
        resolve( { data: { orders :data , totalOrders :totalOrders }} )
    });
}
/* eslint-disable no-async-promise-executor */
export function fetchLoggedInUserOrders() {
    return new Promise(async (resolve) =>{
        const response = await fetch('http://localhost:8080/orders/own')
        const data = await response.json()
        resolve({data})
    });
}
export function fetchLoggedInUser() {
    return new Promise(async (resolve) =>{
        console.log("Calling to fetchLoggedInUser =>");
        const response = await fetch('http://localhost:8080/users/own')
        const data = await response.json()
        console.log("data at userAPI fetchLoggedInUser:", data);
        resolve({data})
    });
}

export function updateUser(update){
    return new Promise( async (resolve)=> {
        const response = await fetch("http://localhost:8080/users/"+update.id,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(update)
        })
        const data = await response.json();
        resolve({data});
    })
}
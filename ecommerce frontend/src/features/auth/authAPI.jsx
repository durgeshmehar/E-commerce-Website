/* eslint-disable no-async-promise-executor */
export function createUser(userData){
    return new Promise( async( resolve)=>{
        const response = await fetch("http://localhost:8080/auth/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userData)
        })
        const data = await response.json();
        resolve({data});
    })
}
export function checkUser(loginInfo){
    return new Promise( async( resolve,reject )=>{
        try{
            const response = await fetch("http://localhost:8080/auth/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(loginInfo)
            })
            if(response.ok){
                const data = await response.json();
                resolve({data});
            }
            else{
                const err = await response.text();
                reject(err);
            }
        }
        catch(err){
            reject({err})
        }
    })
}

export function signOut(){
    return new Promise( async( resolve )=>{
       resolve({data :{message:"Sign out successful"}})
    })
}


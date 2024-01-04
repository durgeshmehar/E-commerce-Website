export function fetchCount() {
    return new Promise(async (resolve) =>{
        const response = await fetch('http://localhost:8080/users/'+userId)
        const data = await response.json()
        resolve({data})
    });
}
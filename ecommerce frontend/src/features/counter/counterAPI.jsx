export function fetchCount() {
    return new Promise(async (resolve) =>{
        const response = await fetch('/users/'+userId)
        const data = await response.json()
        resolve({data})
    });
}
export default function fetchCount(amount = 1) {
    return new Promise(async (resolve) =>{
        const response = await fetch('https://localhost:5173')
        const data = await response.json()
        resolve({data})
    });
}
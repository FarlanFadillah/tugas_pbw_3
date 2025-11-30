export async function getData(key){
    const res = await fetch('../data/dataBahanAjar.json');
    const data = await res.json();
    if(!res.ok){
        console.log('Something broke');
    }
    return data[key];
}
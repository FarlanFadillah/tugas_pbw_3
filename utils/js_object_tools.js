export function arrObjIncludes(arr, key, val){
    for(const index in arr){
        if(arr[index][key].toLowerCase() === val.toLowerCase()){
            return {
                index,
                found : true
            }
        }
    }
    return {
        index : null,
        found : false
    }
}
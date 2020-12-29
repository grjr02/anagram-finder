//Gets animations for each substring combination
export function wordAnimations(array, list) {
    const animations = [];
    var set4 = new Set(); 
    
    dfs(array, set4, '', list, animations );
    //list.push("");

    return animations;
}  
  
function dfs(array, set4, sb, list, animations){

    if(sb.length === array.length)return;

    for(let i = 0; i < array.length; i++){

        if(set4.has(i))continue;
        
        set4.add(i);
        animations.push([i]);

        sb = sb + array[i];
        sb = sb.toLowerCase();
        list.push(sb);
     
        dfs(array, set4, sb, list, animations);

        set4.delete(i);
        list.push(sb);
        sb = sb.substring(0,sb.length-1);
        animations.push([i]);

    }

}
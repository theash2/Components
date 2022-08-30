export function THROTTLE(callback,delay=300){
    let timer;
    return function (...rest){
        let that = this;
        if(!timer){
            timer = setTimeout(()=>{
                callback.apply(that,rest);
                clearTimeout(timer);
            },delay)
        }
    }
}
export function DEBOUNCE(callback,delay=300){
    let timer;
    return function (...rest){
        let that = this;
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(()=>{
            callback.apply(that,rest);
        },delay)
    }
}
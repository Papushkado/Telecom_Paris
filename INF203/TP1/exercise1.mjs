"use strict";

// programming with a loop
export function fibo_it(n) {
    if(n==0){
        return 0;
    }
    if(n==1){
        return 1;
    }

    let a = 0; 
    let b = 1;
    for(let i=2; i<=n; i++){
        let c = a; 
        a = b; 
        b = a+c; 
    }
    return b;
}

// recursive version
export function fiboRec(n) {
    if(n==0){
        return 0;
    }
    if(n==1){
        return 1;
    }
    return (fiboRec(n-1)+fiboRec(n-2));
    
}


// use a loop
export function fibArr(t) {
    let results = []; 
    let n=t.length;
    for(let i = 0; i<n; i++){
        results.push(fiboRec(t[i]));
    }
    return results;

}

// with map
export function fibMap(t) {
    return t.map(fiboRec);
}


"use strict";

export function wcount(s){
    let dico = {};
    let j = s.split(" ");
    
    for (const words of j){
        dico[words]=( dico[words] || 0)+1;
    }
    console.log(dico);
    return dico;   
}

export class WrdLst{
    constructor(s){
        this.s = s;
        this.dico = wcount(this.s);
    }

    getWords(){
        let results= [];
        for(const keys in this.dico){
            results.push(keys);
        }
        return results.sort();
    }

    maxCountWord(){
        let dico = this.dico;
        let max = 0;
        let results=[]; 
        for (const keys in dico){
            if(dico[keys]>max){
                max = dico[keys];
            }
        }
        for (const keys in dico){
            if(dico[keys]===max){
                results.push(keys);
            }
        }
        return results.sort();

    }

    minCountWord(){
        let dico = this.dico;
        let  min = 0;
        let i = 0;
        let results=[]; 
        for (const keys in dico){
            if(i==0){
                min = dico[keys];
                i=73;
            }
            if(dico[keys]<min){
                min = dico[keys];
            }
        }
        for (const keys in dico){
            if(dico[keys]===min){
                results.push(keys);
            }
        }
        return results.sort();

    }


    getCount(word){
        return this.dico[word];
    }
    applyWordFunc(f) {
        const words = this.getWords();
        return words.map(f);
    }

}

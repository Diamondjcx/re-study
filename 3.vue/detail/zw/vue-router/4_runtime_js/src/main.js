// import _ from "lodash";
// import {name} from './module1';
export const getData = () => {

    // console.log(name)
    import("./module1").then(({name}) => {
        console.log(name)
    })
    console.log("data");

}

// main.js -|||> module1.js -> common.js
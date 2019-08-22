import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'orderBy'
})

export class OrderByPipe implements PipeTransform {
    transform(array: Array<any>, orderType: boolean): Array<string> {

        // if (!orderType) {
        //     return array;
        // } else {
            console.log("Pipe is called", array);
        array.sort((a: any, b: any) => {
            return orderType ? (a.timestamp - b.timestamp) : (b.timestamp - a.timestamp);
        });
        console.log(array);
        return array;
        // }
    }
}
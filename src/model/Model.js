//@ts-check
export default class Model {


    constructor(minValue, value, maxValue){
        this.value = value;
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.counter = 0;
    }

    //Returns true if you can adjust the model by a certain delta, or false otherwise.
    available(delta) {
        //you can only go further if you're >= minValue or <= maxValue
        return (this.value + delta >= this.minValue) && (this.value + delta <= this.maxValue);
    }

    //Adjusts the model by a given delta, if possible.
    adjust(delta) {
        this.counter++;
        if(this.available(delta)) {
            this.value += delta;
        }
    }

    copy(){
        return new Model(this.minValue, this.value, this.maxValue);
    }

}

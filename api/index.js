class Person{
    #firstName = ""
    constructor(firstName){
        this.#firstName = firstName
    }
    walk(){
        console.log(`${this.#firstName} is walking`);
    }
    dancing(){
        console.log(`${this.#firstName} is dancing`);
    }
}

const person1 = new Person('John')
const person2 = new Person('Jane')

console.log(person1.firstName);
person1.walk()
person2.dancing()
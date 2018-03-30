// statement syntax
var square = (x) =>{
	var result = x * x;
	return result;
};
// console.log(square(3));
//expression syntax
//don't need to explicity add the return keyword
// more than one expression need {}
var square1 = (x) => x * x;
console.log(square1(9));


//complex object
var user = {
	name:"prashant",
	sayHi: () => {
		console.log(`Hi. I'm ${this.name} `);/*Hi. I'm Undefined*/
	},
	sayHiAlt (){
		console.log(arguments);
		console.log(`Hi. I'm ${this.name} `); /*Hi. I'm prashant*/
	}
};
user.sayHiAlt(1,2,3);
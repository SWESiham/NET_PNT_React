const products = [
  {
    id: 1,
    name: "T-shirt",
    price: 30,
    category: "clothes",
    inStock: true
  },
  {
    id: 2,
    name: "skirt",
    price: 50,
    category: "clothes",
    inStock: true
  },
  {
    id: 3,
    name: "sneakers",
    price: 300,
    category: "shoes",
    inStock: false
  },
  {
    id: 4,
    name: "sandal",
    price: 120,
    category: "shoes",
    inStock: false
  }
];
// 1-retrieve all categories ,
// 2- products with prices less than 100 and in stock , 
// 3- total prices , 
// 4- sort prices in ascending order
const cat = products.map(p=>p.category)
console.log(cat);


console.log(products.filter(p=>p.price<100 && p.inStock));

const total = products.reduce((acc, p) => acc + p.price, 0);

console.log(total);

console.log(products.sort((a,b)=>a.price-b.price));


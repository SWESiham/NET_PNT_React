let Products = [
  {
    name: "vegetables",
    desc: "vegetables is benefit for healthy life",
    img: "https://www.healthyfood.com/wp-content/uploads/2020/01/Bigger-bodies-need-bigger-vege-serves-iStock-589415708-1100x900-1024x838.jpg",
    price: 3,
  },
  {
    name: "Fruits",
    desc: "Friuts is benefit for healthy life",
    img: "https://media.istockphoto.com/id/529664572/photo/fruit-background.jpg?s=612x612&w=0&k=20&c=K7V0rVCGj8tvluXDqxJgu0AdMKF8axP0A15P-8Ksh3I=",
    price: 4,
  },
  {
    name: "Pizza",
    desc: "Pizza is benefit for healthy life",
    img: "https://img.magnific.com/premium-psd/pizza-with-olives-tomatoes-olives-it_1268410-858.jpg?semt=ais_hybrid&w=740&q=80",
    price: 8,
  },
  {
    name: "Koshari",
    desc: "Koshari is benefit for healthy life",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMPiIQCbgjIZWOy9e-FTkcisFj8dEOfahGlmPnjFkvgg&s",
    price: 50,
  },
];
let prod = document.getElementById("products");
for (const pro of Products) {
  let n = pro.name;
  let d = pro.desc;
  let i = pro.img;
  let p = pro.price;

  prod.innerHTML += `
    <div class="card" id="myCard">
    <img src="${i}"/>
    <div class="card-body">
    <h2>${n}</h2>
    <p>${d}</p>
    <p>Price: ${p}</p>
    <button class="add-to-cart">Add to Cart</button>
    </div>
    </div>

`;
}

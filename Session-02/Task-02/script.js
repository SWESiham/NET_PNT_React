const body = document.getElementById('body')
const colorBtn = document.getElementById('colorBtn')
const apply = document.getElementById('apply')
function changeColor() {
    console.log(colorBtn.style.content);
    
    body.style.backgroundColor =( body.style.backgroundColor==='black') ? "#f5d04e" : "black"
    colorBtn.style.backgroundColor =( body.style.backgroundColor==='black') ? "#f5d04e" : "black"
    colorBtn.style.color =( colorBtn.style.backgroundColor==='black') ? "white" : "black"
    colorBtn.textContent = (colorBtn.textContent === 'Dark Mode') ? "Duck Mode" : "Dark Mode"
    // body.style.backgroundColor="black"
}
apply.addEventListener('click', function(e) {
    party.confetti(e.target, {
        count: party.variation.range(20, 40),
        size: party.variation.range(0.8, 1.2),
    });
    apply.textContent = (apply.textContent === 'Apply') ? "Applied" : "Apply"
    // apply.disabled = true
});
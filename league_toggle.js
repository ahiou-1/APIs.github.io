const moreBtn1 = document.querySelector('.moreBtn1')
const moreBtn2 = document.querySelector('.moreBtn2')
const moreBtn3 = document.querySelector('.moreBtn3')

const toggler1 = document.querySelector('.toggle1')
const toggler2 = document.querySelector('.toggle2')
const toggler3 = document.querySelector('.toggle3')

moreBtn1.addEventListener('click', toggleMore1)
moreBtn2.addEventListener('click', toggleMore2)
moreBtn3.addEventListener('click', toggleMore3)

let shown1 = false;
let shown2 = false;
let shown3 = false;

function toggleMore1() {
    if(!shown1) {
        shown1 = !shown1;
        toggler1.style.display = 'inline';
    } else {
        shown1 =! shown1;
        toggler1.style.display = 'none'
    }
}
function toggleMore2() {
    if(!shown2) {
        shown2 = !shown2;
        toggler2.style.display = 'inline';
    } else {
        shown2 =! shown2;
        toggler2.style.display = 'none'
    }
}
function toggleMore3() {
    if(!shown3) {
        shown3 = !shown3;
        toggler3.style.display = 'inline';
    } else {
        shown3 =! shown3;
        toggler3.style.display = 'none'
    }
}

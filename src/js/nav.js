const respBtn = document.querySelector('.respBtn');
const responsiveMenu = document.querySelector('.responsiveMenu')


respBtn.addEventListener('click', function() {
    respBtn.querySelector('i').classList.toggle('fa-times');
    responsiveMenu.classList.toggle('active');
})

const big = document.querySelector('.responsiveMenu .big')

big.addEventListener('click', function() {
    big.classList.toggle('active')
})

window.addEventListener('scroll', function() {
    document.querySelector('nav').classList.toggle('active', window.scrollY > 0);
})

const bigLink = document.querySelector('.bigLink');

bigLink.addEventListener('mouseenter', function() {
    document.querySelector('.hoverBacvi').classList.toggle('active');
})

bigLink.addEventListener('mouseout', function() {
    document.querySelector('.hoverBacvi').classList.remove('active');
})
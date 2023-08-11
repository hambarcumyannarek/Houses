const leftRightBtn = document.querySelectorAll('.lRBtn');
let imgIndex = 0;
const imagesCont = document.querySelector('.offer .cards')
const cards = imagesCont.querySelectorAll('.card')

cards.forEach((card) => {
    card.addEventListener('mousedown', function(evn) {
        evn.preventDefault()
    })
})

leftRightBtn.forEach((btn) => {
    btn.addEventListener('click', function(elm) {
        clcikBtn(elm.target);
        ditablishLR();
        curcleChange(imgIndex)
    })
})

function clcikBtn(elm) {
    if(elm.className.search('left') !== -1) {
        imgIndex--;
    } else {
        imgIndex++;
    }
    
    imagesCont.style.transform = `translateX(${(-imgIndex * document.querySelector('.offer .card').offsetWidth) - imgIndex * 15}px)`
}


function ditablishLR() {
    if(document.querySelector('.left').getAttribute('disabled', '') !== null || document.querySelector('.right').getAttribute('disabled', '') !== null) {
        leftRightBtn.forEach((btnn) => {
            btnn.removeAttribute('disabled');
        });
    }    
    if(imgIndex === 0) {
        document.querySelector('.left').setAttribute('disabled', '');
    } else if(imgIndex === cards.length-Math.floor((document.querySelector('.cont').offsetWidth / document.querySelector('.offer .card').offsetWidth))) {
        document.querySelector('.right').setAttribute('disabled', '');
    }
}

ditablishLR();


// first
const circule = document.querySelector('.circle');
let circuleArr = [];

// secont

function starterDrow() {
    circule.innerHTML = '';
    circuleArr = [];
    for(let i = 0; i < cards.length-Math.floor((document.querySelector('.cont').offsetWidth / document.querySelector('.offer .card').offsetWidth)); i++) {
        if(i === 0) {  
            circuleArr.push(`<div class="bold circleBtn"></div>`)
        }
        circuleArr.push(`<div class="empty circleBtn"></div>`)
    }

    circule.innerHTML = circuleArr.join(''); 
}  
starterDrow();

let bodyWidth =  document.body.offsetWidth;

setInterval(() => {

    if(bodyWidth !== document.body.offsetWidth) {
        let id = setInterval(() => {
            if(document.body.offsetWidth < 1350 && document.body.offsetWidth > 1150) {
                bodyWidth =  document.body.offsetWidth;
                restart();
                clearInterval(id);
            } else if(document.body.offsetWidth < 1150 && document.body.offsetWidth > 750){
                bodyWidth =  document.body.offsetWidth;
                restart();
                clearInterval(id);
            } else if (document.body.offsetWidth < 750 && document.body.offsetWidth > 550){
                bodyWidth =  document.body.offsetWidth;
                restart();
                clearInterval(id);
            }else if (document.body.offsetWidth < 550){
                bodyWidth =  document.body.offsetWidth;
                restart();
                clearInterval(id);
            } else {
                bodyWidth =  document.body.offsetWidth;
                restart();
                clearInterval(id);
            }
        }, 0)
    }    
}, 0)

function restart() {
        setTimeout(() => {
            imgIndex = 0;
            starterDrow();
            drowCircule();
            ditablishLR();
             imagesCont.style.transform = `translateX(${(-imgIndex * document.querySelector('.offer .card').offsetWidth)}px)`
        }, 1000)
}

function drowCircule() {    
    circuleArr = circuleArr.map((icon, i) => {
        if(imgIndex !== i) {
            return '<div class="empty circleBtn"></div>';
        } else if(imgIndex === i) {
            return '<div class="bold circleBtn"></div>';
        }
    })

    circule.innerHTML = circuleArr.join('');
    clickCircule(circule)
}


function clickCircule(circule) {
    circule.querySelectorAll('.circleBtn').forEach((val, i) => {
        val.addEventListener('click', function(evn) {
            imgIndex = i;
            imagesCont.style.transform = `translateX(${(-imgIndex * document.querySelector('.offer .card').offsetWidth) - imgIndex * 15}px)`;
     
            //drowCircule();
            curcleChange(imgIndex)
            evn.target.classList.remove('empty');
            evn.target.classList.add('bold');
            ditablishLR();
        })
    })
}


function curcleChange(index) {
    circule.querySelectorAll('.circleBtn').forEach((val, i) => {
        if(index !== i) {
            val.classList.remove('bold');
            val.classList.add('empty');
        } else {
            val.classList.add('bold');
            val.classList.remove('empty'); 
        }
    })
}
clickCircule(circule)


let scrollNum;
let ids = 1;
let trueScroll;
let lastNum;
let lastX;
let fr = 1;
function myFunc(evn) {
    if((imgIndex !== 0 || fr > 1) && (evn.clientX !== undefined ? evn.clientX : evn.touches[0].clientX) > lastNum) {
        fr += lastX - (evn.clientX !== undefined ? evn.clientX : evn.touches[0].clientX);
        imagesCont.style.transform = `translateX(calc(${(-imgIndex * document.querySelector('.offer .card').offsetWidth)-fr}px))`;   
    } else if((imgIndex !== circuleArr.length-1 || fr < 0) && (evn.clientX !== undefined ? evn.clientX : evn.touches[0].clientX) < lastNum) {
        fr += lastX - (evn.clientX !== undefined ? evn.clientX : evn.touches[0].clientX);
        imagesCont.style.transform = `translateX(calc(${(-imgIndex * document.querySelector('.offer .card').offsetWidth)-fr}px))`; 

    }

    lastX = evn.clientX || evn.touches[0].clientX;

    if(fr > imagesCont.offsetWidth/2+imagesCont.offsetWidth || fr < -(imagesCont.offsetWidth/2+imagesCont.offsetWidth)) {
        document.querySelector('.offer').removeEventListener('mousemove', myFunc)
    }

    if(fr > document.querySelector('.offer .card').offsetWidth/2) {
        trueScroll = 'goRight';
    } else if(fr < -document.querySelector('.offer .card').offsetWidth/2){
        trueScroll = 'goLeft';
    } else {
        trueScroll = 'stop';
    }
}
function clcikDown(evn) {
        imagesCont.style.cursor = 'grabbing';
        scrollNum = evn.clientX !== undefined ? evn.clientX : evn.touches[0].clientX;
        lastNum = scrollNum;
        lastX = scrollNum;
        document.querySelector('.offer').addEventListener('mousemove', myFunc);
        document.querySelector('.offer').addEventListener('touchmove', myFunc);
        // alert('a')
}    

imagesCont.addEventListener('mousedown', clcikDown)
imagesCont.addEventListener('touchstart', clcikDown)


document.querySelector('.offer').addEventListener('mouseup', clickUp)
document.querySelector('.offer').addEventListener('touchend', clickUp);

function clickUp(evn) {
        imagesCont.style.cursor = 'grab';
        document.querySelector('.offer').removeEventListener('mousemove', myFunc); 

        if(trueScroll === 'goRight') {
            trueScroll = "stop";
            if(imgIndex + Math.abs(Math.round(fr/document.querySelector('.offer .card').offsetWidth)) <= circuleArr.length-1) {
                imgIndex += Math.round(fr/document.querySelector('.offer .card').offsetWidth);
            } else {
                imgIndex = circuleArr.length-1;
            }
            curcleChange(imgIndex)
            ditablishLR();
        } else if(trueScroll === 'goLeft') {
            trueScroll = "stop";
            if(imgIndex - Math.abs(Math.round(fr/document.querySelector('.offer .card').offsetWidth)) >= 0) {
                imgIndex += Math.round(fr/document.querySelector('.offer .card').offsetWidth);
            } else {
                imgIndex = 0;
            }
            curcleChange(imgIndex)
            ditablishLR();
        } else {
            // stop
            imgIndex = imgIndex;
        }
        
        fr = 1;
        console.log(imgIndex)
        imagesCont.style.transform = `translateX(${(-imgIndex * document.querySelector('.offer .card').offsetWidth) - imgIndex * 15}px)`;
        // console.log(imgIndex, cards.length-Math.round((document.querySelector('.slider').offsetWidth / document.querySelector('.offer .card').offsetWidth)))
}    

//# sourceMappingURL=sliderCards.js.map

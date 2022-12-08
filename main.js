function init(){
    checkForImageCredits();
    domSetup();
    addBindings();
    slider.displayImage();
    timeAdvance;
}

function domSetup(){ 
    let imageSlider = document.getElementById("slider");
    const slideCount = imageSlider.children.length;
    let navBar = document.getElementById("navBar");
    let lArrow = document.createElement("button");
    lArrow.textContent = "<";
    lArrow.classList.add("lArrow");
    let rArrow = document.createElement("button");
    rArrow.textContent = ">";
    rArrow.classList.add("rArrow");
    navBar.appendChild(lArrow);
    for(let i = 0; i<slideCount;i++){
        let newCircle = document.createElement("button");
        newCircle.classList.add("circle");
        navBar.appendChild(newCircle);
    }
    navBar.appendChild(rArrow);
}

const Slider = ()=>
{
    let imageSlider = document.getElementById("slider");
    const slideCount = imageSlider.children.length;
    let currentSlide = 0;
    let creditSlider = document.getElementById("creditBar");
    let navigationBar = document.getElementById("navBar");
    let slideSet = imageSlider.children;
    let creditSet = creditSlider.children;
    let navButtons = navigationBar.children;

    const advanceSlide = () =>
    {
        if(currentSlide === slideCount-1){
            currentSlide = 0;
        }
        else{
            currentSlide = currentSlide+1;
        }
        displayImage();
    }

    const backSlide = () =>
    {
        if(currentSlide === 0){
            currentSlide = slideCount - 1;
        }
        else{
            currentSlide = currentSlide - 1;
        }
        displayImage();
    }

    const goTo = (i) =>
    {
        currentSlide = i;
        displayImage();
    }

    const displayImage = () =>
    {
        for(let i=0;i<slideCount;i++){
            if(i!==currentSlide){
                slideSet[i].classList.add("hidden");
                creditSet[i].classList.add("hiddenCredit");
                navButtons[i+1].classList.remove("currentCircle");
            }
            else{
                slideSet[i].classList.remove("hidden");
                creditSet[i].classList.remove("hiddenCredit");
                navButtons[i+1].classList.add("currentCircle");
            }
        }
    }

    return{advanceSlide,backSlide,goTo,displayImage}
}

const slider = Slider();

function addBindings(){
    let navBar = document.getElementById("navBar");
    let buttons = navBar.children;
    let rArrow = buttons.item(buttons.length-1);
    let lArrow = buttons.item(0);
    for(let i=1;i<buttons.length-1;i++){
        buttons[i].addEventListener("click",function(){
            slider.goTo(i-1);
            clearInterval(timeAdvance);
            timeAdvance = setInterval(()=>{slider.advanceSlide()},5000);
        });
    };
    rArrow.addEventListener("click",function(){
        slider.advanceSlide();
        clearInterval(timeAdvance);
        timeAdvance = setInterval(()=>{slider.advanceSlide()},5000);
    });
    lArrow.addEventListener("click",function(){
        slider.backSlide();
        clearInterval(timeAdvance);
        timeAdvance = setInterval(()=>{slider.advanceSlide()},5000);
    });
}

function checkForImageCredits(){
    let imageSlider = document.getElementById("slider");
    let creditSlider = document.getElementById("creditBar");
    if(imageSlider.children.length>creditSlider.children.length){
        console.log("It looks like you may be missing a credit for one of your images.");
    }
    if(imageSlider.children.length<creditSlider.children.length){
        console.log("It looks like you have more credits than images.");
    }
}

let timeAdvance = setInterval(()=>{slider.advanceSlide()},5000);

init();
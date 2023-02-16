//header scroll

const onScrollHeader = () => {
    const header = document.querySelector('header')
    let prevScroll = window.pageYOffset
    let currentScroll
    window.addEventListener('scroll', () => {
        currentScroll = window.pageYOffset
        const headerHidden = () => header.classList.contains('header-hidden')
        if (currentScroll >= 200 && !headerHidden()) {
            header.classList.add('header-hidden')
        }
        if (currentScroll < prevScroll && headerHidden()) {
            header.classList.remove('header-hidden')
        }
        if (currentScroll > prevScroll ) {
            header.classList.add('header-scroll')
        }
        if (currentScroll <= 0 ) {
            header.classList.remove('header-scroll')
        }
        prevScroll = currentScroll
    })
}

//add class if list has children for chevron
function childrenClass() {
    const list = document.querySelectorAll('li');

    list.forEach(function(element) {
    const children = element.querySelector('ul')
        if (children) {
            element.classList.add('children');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    onScrollHeader()
    childrenClass()
    activateAccordion()
});

//mobile menu
function toggleActive(){
    document.querySelector('nav.header__nav').classList.toggle('active');
    document.querySelector('body').classList.toggle('fade');
    document.querySelector('.overlay').classList.toggle('active');
}

document.querySelector('.menu_mob').addEventListener('click', function(){
    toggleActive()
});

document.querySelector('.mob_close').addEventListener('click', function(){
    toggleActive()
});

document.querySelector('.overlay').addEventListener('click', function(event){
    if(event.target.classList.contains('active')){
        toggleActive()
    }
});

//toggle

function toggleAccordion(e, listItems) {
    listItems?.forEach(list => {
        //debugger;
        const target = e.currentTarget;
        const expandedItem = list.nextElementSibling;

        const force = target === list ? !target.classList.contains('active') : false;

        expandedItem?.classList.add('is-transitioning');
        expandedItem?.style.setProperty('--max-height', expandedItem.scrollHeight + 'px');
        const onTransitionend = event => {
            expandedItem?.style.removeProperty('--max-height');
            expandedItem?.classList.remove('is-transitioning');
            console.log('123')
        }
        expandedItem.addEventListener('transitionend', onTransitionend, { once: true, composed: true });

        window.requestAnimationFrame(() => {
            list?.classList.toggle('active', force);
            expandedItem?.classList.toggle('active', force);
        })
    })
}

function activateAccordion(){
    const headerList = document.querySelectorAll('.header__list .children > a');

    headerList?.forEach(
        list => list.addEventListener('click', (e) =>
            toggleAccordion(e, [...headerList])
        )
    );
}

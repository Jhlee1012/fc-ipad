import ipads from '../data/ipads.js'
import navigations from '../data/navigations.js'


// BASKET
const basketStarterEl = document.querySelector('header .basket-starter')
const basketEl = basketStarterEl.querySelector('.basket')

basketStarterEl.addEventListener('click',function(event){
  event.stopPropagation()
 if(basketEl.classList.contains('show')){
  hideBasket()
 }else{
  showBasket()
 }
})
basketEl.addEventListener('click',function(event){
  event.stopPropagation()
})

window.addEventListener('click', function(){
  hideBasket()
})

function showBasket(){
  basketEl.classList.add('show')
}
function hideBasket(){
  basketEl.classList.remove('show')
}

//SEARCHING
const headerEl = document.querySelector('header')
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')] 

const searchWrapEl =document.querySelector('.search-wrap')
const searchStarterEl = document.querySelector('.search-starter')
const searchCloserEl = document.querySelector('.search-closer')
const shadowEl = document.querySelector('.shadow')
const searchDelayEls =[...searchWrapEl.querySelectorAll('li')] 
const searchInputEls = searchWrapEl.querySelector('input')

searchStarterEl.addEventListener('click',showSearch)
searchCloserEl.addEventListener('click',function(event){
  event.stopPropagation()
  hideSearch()
})
shadowEl.addEventListener('click',hideSearch)


function showSearch(){
  headerEl.classList.add('searching')
  playScroll()
  
  headerMenuEls.reverse().forEach(function(el, index){
    el.style.transitionDelay = index * .4 /headerMenuEls.length + 's'
  })
  searchDelayEls.forEach(function(el, index){
    el.style.transitionDelay = index * .4 /searchDelayEls.length + 's'
  })

  setTimeout(()=>{searchInputEls.focus()},600)


}

function hideSearch(){
  headerEl.classList.remove('searching')  
  playScroll()
  headerMenuEls.reverse().forEach(function(el, index){
    el.style.transitionDelay = index * .4 /headerMenuEls.length + 's'
  })
  searchDelayEls.reverse().forEach(function(el, index){
    el.style.transitionDelay = index * .2 /searchDelayEls.length + 's'
  })
  searchDelayEls.reverse()
  searchInputEls.value=''
}


//헤더메뉴 토글
const menuStarterEl = document.querySelector('header .menu-starter')
menuStarterEl.addEventListener('click',function(){
  if(headerEl.classList.contains('menuing')){
    headerEl.classList.remove('menuing')
    searchInputEls.value=''
    playScroll();
  } else {
    headerEl.classList.add('menuing')
    stopScroll();
  }
})

//헤더 검색
const searchTextfieldEl = document.querySelector('header .textfield')
const searchCancelEl = document.querySelector('header .search-canceler')
searchTextfieldEl.addEventListener('click',function(){
  headerEl.classList.add('searching--mobile')
})
searchCancelEl.addEventListener('click',function(){
  headerEl.classList.remove('searching--mobile')
})

window.addEventListener('resize',function(){
  if(this.window.innerWidth <= 740){
    headerEl.classList.remove('searching')
  }else{
    headerEl.classList.remove('searching--mobile')
  }
})

const navEl = document.querySelector('nav')
const navMenuTogglerEl = navEl.querySelector('.menu-toggler')
const navShadowEl = navEl.querySelector('.shadow')

navMenuTogglerEl.addEventListener('click',function(){
  if(navEl.classList.contains('menuing')){
    hideNavMenu()
  }else{
    showNavMenu()
  }
})
navShadowEl.addEventListener('click',hideNavMenu)
navEl.addEventListener('click',function(event){
  event.stopPropagation()
})
window.addEventListener('click',hideNavMenu)

function showNavMenu(){
  navEl.classList.add('menuing')
}
function hideNavMenu(){
  navEl.classList.remove('menuing')
}

//keyframe
//요소의 가시성 관찰
const io = new IntersectionObserver(function (entries){
  entries.forEach(function(entry){
    if (!entry.isIntersecting){
      return
    }
    entry.target.classList.add('show')
    console.log(entry)
  })
})

const infoEls = document.querySelectorAll('.info')
infoEls.forEach((el)=> io.observe(el))


//비디오 재생
const video = document.querySelector('.stage video')
const playBtn = document.querySelector('.controller--play')
const pauseBtn = document.querySelector('.controller--pause')

playBtn.addEventListener('click',function(){
  video.play()
  playBtn.classList.add('hide')
  pauseBtn.classList.remove('hide')
})
pauseBtn.addEventListener('click',function(){
  video.pause()
  pauseBtn.classList.add('hide')
  playBtn.classList.remove('hide')
})


const itemEls = document.querySelector('section.compare .items')

ipads.forEach(function(ipad){
  const itemEl = document.createElement('div')
  itemEl.classList.add('item')

  let colorList =''
  ipad.colors.forEach(function(color){
    colorList +=`<li style="background-color: ${color}"></li>`
  })
  itemEl.innerHTML = /* html */`
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}" />
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">₩${ipad.price.toLocaleString('en-US')}부터</p>
    <button class="btn">구입하기</button>
    <a href="javascript:void(0)" class="link">더 알아보기</a>
  `

  itemEls.append(itemEl)
})

const navigationsEl = document.querySelector('footer .navigations')
navigations.forEach(function(nav){
  const mapEl = document.createElement('div')
  let maplist = ''
  nav.maps.forEach(function(map){
    maplist += /* html */`
    <li>
      <a href="${map.url}">${map.name}</a>
    </li>`


  })
  mapEl.classList.add('map')

  mapEl.innerHTML=/*html */`
  <h3>
  <span class="text">${nav.title}</span>
  <span class="icon">+</span>
  </h3>
  <ul>
    ${maplist}
  </ul>
  `

  navigationsEl.append(mapEl)
})



const dateEl = document.querySelector('footer .legal .copyright .this-year')
const thisYear = new Date().getFullYear()
dateEl.innerHTML=thisYear 

//스크롤 
function playScroll(){
  document.documentElement.classList.remove('fixed')
}
function stopScroll(){
  document.documentElement.classList.add('fixed')
}

//map 아코디언
const mapEls = document.querySelectorAll('footer .navigations .map')
mapEls.forEach(function(el){
  const h3El = el.querySelector('h3')
  h3El.addEventListener('click',function(){
    el.classList.toggle('active')
  })

})
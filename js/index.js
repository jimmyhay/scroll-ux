// var links = document.querySelectorAll('.image-link');
// var dots = document.querySelectorAll('.image-link-dot');
// var body = document.querySelector('body');
var wrapper = document.querySelector('#pages-container');
var page2Wrapper = document.querySelector('#page-2-container');
var page4Wrapper = document.querySelector('#page-4-container');
// var pages = document.querySelectorAll('.page');

console.log("LOADED");

// var currentLink = 0;
// var currentPage = pages[0];
// var scrollCounter = 0;
//
// var direction = 0;
// var canScroll = true;
// var inertia = 0;
// var spring = 0.8;

// window.addEventListener('wheel', scroll);
// window.ontouchmove = function(e){ e.preventDefault(); }

// var hammertime = new Hammer(body);
page2Wrapper.style.width = (page2Wrapper.getElementsByClassName('page').length * 100) + 'vw';
page4Wrapper.style.width = (page4Wrapper.getElementsByClassName('page').length * 100) + 'vw';

var verticalScrollIndex = new ScrollIndex(wrapper, wrapper.children, document.querySelector('#verticalPageLinks'), 'vertical', true, pageChanged);
var page2Scroll = new ScrollIndex(page2Wrapper, document.querySelectorAll('#page-2-container > .page'), document.querySelector('#page-2-page-links'), 'horizontal');
var page4Scroll = new ScrollIndex(page4Wrapper, document.querySelectorAll('#page-4-container > .page'), document.querySelector('#page-4-page-links'), 'horizontal');

window.onresize = function () {
  verticalScrollIndex.resize();
  page2Scroll.resize();
  page4Scroll.resize();
};

function pageChanged(index) {
  console.log('pageChanged', index);

  page2Scroll.setActive(false);
  page4Scroll.setActive(false);

  if (index == 1) page2Scroll.setActive(true);
  if (index == 3) page4Scroll.setActive(true);
}

// console.log(verticalScrollIndex.dots);
// console.log(horizontalScrollIndex);
// hammertime.get('swipe').set({
//   direction: Hammer.DIRECTION_ALL,
//   threshold: 1,
//   velocity:0.1
// });
//
// hammertime.on('swipedown', function(ev) {
// 	console.log(ev);
//   scrollPage(currentLink-1);
// });
//
// hammertime.on('swipeup', function(ev) {
// 	console.log(ev);
//   scrollPage(currentLink+1);
// });

// window.requestAnimationFrame(step);
//
// function step() {
//   inertia *= spring;
//
//   window.requestAnimationFrame(step);
// }
//
// function touchStart(e) {
// }
//
// function touchMove(e) {
//   // e.preventDefault();
//
//   scrollPage(currentLink+1);
// }
//
// function touchEnd(e) {
// }
//
// function scroll(e) {
//   e.preventDefault();
//   // console.log('WHEEL', e);
//
//   var scrollVal = e.deltaY;
//
//   if (scrollVal > 20) scrollVal = 20;
//   if (scrollVal < -20) scrollVal = -20;
//
//   if (canScroll) {
//     inertia += scrollVal;
//
//     if (inertia > 20) {
//       canScroll = false;
//
//       inertia = 0;
//
//       scrollPage(currentLink+1);
//
//       window.setTimeout(function() {
//         canScroll = true;}, 700);
//     } else if (inertia < -20) {
//       canScroll = false;
//
//       inertia = 0;
//
//       scrollPage(currentLink-1);
//
//       window.setTimeout(function() {
//         canScroll = true;}, 700);
//     }
//   }
// }
//
// function scrollPage(page) {
//   // console.log("scrollPage");
//   simulatedClick(dots[page]);
// }
//
// for (var i = 0; i < links.length; i++) {
//   var link = links[i];
//
//   link.addEventListener('click', setClickedItem, false);
//
//   link.itemID = i;
// }
//
// dots[0].classList.add('image-link-active');
//
// function setClickedItem(e) {
//   if (e.currentTarget.itemID != currentLink) {
//     resetLinks();
//     changePos(e);
//   }
// }
//
// function resetLinks() {
//   for (var i=0; i < links.length; i++) {
//     dots[i].classList.remove('image-link-active');
//   }
// }
//
// function changePos(e) {
//   currentPage = pages[e.currentTarget.itemID];
//   currentLink = e.currentTarget.itemID;
//
//   wrapper.style.transform = 'translate3d(0,'+ -currentPage.offsetTop +'px, 0)';
//
//   dots[currentLink].classList.add('image-link-active');
// }

var VERTICAL = 'vertical';
var HORIZONTAL = 'horizontal';

function ScrollIndex(container, scrollPages, scrollDots, scrollDirection, active=false) {
  // console.log('ScrollIndex', container, scrollPages, scrollDots, scrollDirection);

  this.body = document.querySelector('body');

  this.containerDiv;
  this.linksContainerDiv;
  this.pages;
  this.links;
  this.dots;
  this.direction;

  this.currentLink = 0;
  this.currentPage;
  this.scrollCounter = 0;

  this.direction = 0;
  this.active = true;
  this.canScroll = true;
  this.inertia = 0;
  this.spring = 0.8;

  this.hammertime = new Hammer(this.body);

  this.containerDiv = container;
  this.linksContainerDiv = scrollDots;
  this.pages = scrollPages;
  this.direction = scrollDirection;

  this.links = this.linksContainerDiv.getElementsByClassName('image-link');
  this.dots = this.linksContainerDiv.getElementsByClassName('image-link-dot');

  this.currentPage = this.pages[0];

  this.init = function() {
    window.addEventListener('wheel', this.scroll.bind(this));
    window.ontouchmove = function(e){ e.preventDefault(); }
    
    window.requestAnimationFrame(this.step.bind(this));

    for (var i = 0; i < this.links.length; i++) {
      var link = this.links[i];

      link.addEventListener('click', this.setClickedItem.bind(this), false);

      link.itemID = i;
    }

    this.dots[0].classList.add('image-link-active');
  }

  this.step = function() {
    this.inertia *= this.spring;

    window.requestAnimationFrame(this.step.bind(this));
  }

  function touchStart(e) {
  }

  function touchMove(e) {
    // e.preventDefault();

    this.scrollPage(this.currentLink+1);
  }

  function touchEnd(e) {
  }

  this.scroll = function (e) {
    e.preventDefault();
    // console.log('WHEEL', e);

    var scrollVal;

    if (this.canScroll && this.active) {
      if (this.direction == VERTICAL) {
        scrollVal = e.deltaY;

        if (scrollVal > 20) scrollVal = 20;
        if (scrollVal < -20) scrollVal = -20;
      } else {
        scrollVal = e.deltaX;

        if (scrollVal > 20) scrollVal = 20;
        if (scrollVal < -20) scrollVal = -20;
      }

      this.inertia += scrollVal;
      this.scrollDirection();
    }
  }

  this.scrollDirection = function() {
    if (this.inertia > 20) {
      this.canScroll = false;

      this.inertia = 0;

      this.scrollPage(this.currentLink+1);

      window.setTimeout(this.resetCanScroll.bind(this), 700);
    } else if (this.inertia < -20) {
      this.canScroll = false;

      this.inertia = 0;

      this.scrollPage(this.currentLink-1);

      window.setTimeout(this.resetCanScroll.bind(this), 700);
    }
  }

  this.resetCanScroll = function() {
    this.canScroll = true;
  }

  this.scrollPage = function(page) {
    console.log('scrollPage', page);
    simulatedClick(this.dots[page]);
  }

  this.setClickedItem = function(e) {
    // console.log('setClickedItem', e.currentTarget.itemID);

    if (e.currentTarget.itemID != this.currentLink) {
      this.resetLinks();
      this.changePos(e);
    }
  }

  this.resetLinks = function() {
    for (var i=0; i < this.links.length; i++) {
      this.dots[i].classList.remove('image-link-active');
    }
  }

  this.changePos = function(e) {
    this.currentPage = this.pages[e.currentTarget.itemID];
    this.currentLink = e.currentTarget.itemID;

    if (this.direction == VERTICAL) {
      this.containerDiv.style.transform = 'translate3d(0,'+ -this.currentPage.offsetTop +'px, 0)';
    } else {
      this.containerDiv.style.transform = 'translate3d('+ -this.currentPage.offsetLeft +'px, 0, 0)';
    }

    this.dots[this.currentLink].classList.add('image-link-active');
  }

  this.resize = function() {
    if (this.direction == VERTICAL) {
      this.containerDiv.style.transform = 'translate3d(0,'+ -this.currentPage.offsetTop +'px, 0)';
    } else {
      this.containerDiv.style.transform = 'translate3d('+ -this.currentPage.offsetLeft +'px, 0, 0)';
    }
  }

  this.init();

  // this.containerDiv.window.onresize = this.resize.bind(this);
}

// function init() {
//   window.addEventListener('wheel', scroll);
//   window.ontouchmove = function(e){ e.preventDefault(); }
//
//   window.requestAnimationFrame(step);
//
//   for (var i = 0; i < links.length; i++) {
//     var link = links[i];
//
//     link.addEventListener('click', setClickedItem, false);
//
//     link.itemID = i;
//   }
//
//   dots[test].classList.add('image-link-active');
// }
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
// function setClickedItem(e) {
//   console.log('setClickedItem', e.currentTarget.itemID);
//
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
//   // console.log(pages);
//   //
//   // console.log(currentPage, currentLink);
//   //
//   // containerDiv.style.transform = 'translate3d(0,'+ -currentPage.offsetTop +'px, 0)';
//   console.log(dots);
//   dots[currentLink].classList.add('image-link-active');
// }

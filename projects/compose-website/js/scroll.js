let scrollItems = document.querySelectorAll('.scroll-item');

function scrollAnimation(){
  scrollItems.forEach((item) => {
  let itemTop = item.getBoundingClientRect().top; 
  let itemBottom = item.getBoundingClientRect().bottom; 
  let windowHeight = window.innerHeight;

    if(itemTop < windowHeight - 100 && itemBottom > 100){ 

      item.classList.add('active');
    }
  });
};

window.addEventListener('scroll',scrollAnimation);
scrollAnimation(); 

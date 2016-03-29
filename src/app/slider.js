import velocity from 'velocity-animate';
import preloader from './preloader'

class Slider {
  constructor(container, params = {}) {
    this.container = container;
    this.controls = {};
    this.slides = [];
    this.currentIndex = 0;

    this.initSlider(params);
  }

  initSlider(params) {
    this._setContainerParams(params);
    this._prepareObjects();
    this._initSlides(params.slides);
    this._preloadImages().then(e => this.show());
    this._bindControls();
  }
  
  nextSlide() {
    let index = this.currentIndex + 1;
    if (index == this.slides.length) index = 0;

    console.log(index);
    this.showSlide(index);
  }

  prevSlide() {
    let index = this.currentIndex - 1;
    if (index < 0) index = this.slides.length - 1;

    console.log(index);
    this.showSlide(index);
  }

  show() {
    velocity(this.container, { opacity: 1 },
             { duration: 500, easing: 'easeInOutBounce' });

    this.controls.controlPanel.style.bottom = this.container.clientHeight / 3 + 'px';

    velocity(this.controls.controlPanel, { opacity: 1, bottom: 10 },
             { duration: 1000, easing: 'easeOutQuart' });
  }

  showSlide(index) {
    const currentSlide = this.slides[this.currentIndex];
    const newSlide = this.slides[index];

    this.currentIndex = index;

    this.controls.imageElement.insertBefore(newSlide.element, currentSlide.element);
    velocity(currentSlide.element, { opacity: 0 });
    newSlide.element.style.opacity = 1;
    this._displayInfo(index);
  }

  _bindControls() {
    this.controls.rightButton.addEventListener('click', e => {
      this.nextSlide();
    });

    this.controls.leftButton.addEventListener('click', e => {
      this.prevSlide();
    });

    this.controls.link.addEventListener('click', e => {
      location.href = this.slides[this.currentIndex].link;
    });
  }

  _displayInfo(index) {
    const { imgTitle, link } = this.controls;
    const currentSlide = this.slides[index];

    imgTitle.textContent = currentSlide.text;
  }

  _initSlides(slides) {
    this.slides = slides;

    slides.forEach((s, index) => {
      const img = document.createElement('img');
      img.src = s.img;
      img.width = 512;
      img.height = 384;
      this.controls.imageElement.appendChild(img);
      this.slides[index].element = img;
    });

    this._displayInfo(0);
    this.slides[0].element.style.opacity = 1;
  }

  _setContainerParams(params) {
    this.container.style.width = `${params.width}px`;
    this.container.style.height = `${params.height}px`;
    this.container.style.opacity = 0;
  }

  // We need a template engine =)
  _prepareObjects() {
    const imageElement = document.createElement('div');
    imageElement.classList.add('images');

    const controlPanel = document.createElement('div');
    controlPanel.classList.add('control-panel');

    const controls = ['prev', 'next', 'link', 'title']
      .map(e => {
        const element = document.createElement('div');
        element.classList.add(e);
        return element;
      });

    controls.forEach(c => controlPanel.appendChild(c));

    const linkSpan = document.createElement('span');
    controls[3].appendChild(linkSpan);
    controls[3] = linkSpan;

    const [ leftButton, rightButton, link, imgTitle ] = controls;

    Object.assign(this.controls, {
      controlPanel, leftButton, rightButton, link, imgTitle, imageElement
    });
    link.textContent = 'Перейти по ссылке';

    controlPanel.style.opacity = 0;

    this.container.appendChild(imageElement);
    this.container.appendChild(controlPanel);
  }

  _preloadImages() {
    const promises = this.slides
      .map(o => preloader(o.img))

    return Promise.all(promises);
  }
}

const slider = function(element, params) {
  return new Slider(element, params);
}

export default slider;

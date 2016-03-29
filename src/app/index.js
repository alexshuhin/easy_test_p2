import slider from './slider';

document.addEventListener('DOMContentLoaded', () => {
  const element = document.querySelector('#slider-container');
  const sliderParams = {
    width: 512,
    height: 384,
    slides: [
      { img: 'images/каменка-плешанка.jpg',
        text: 'Каменка-пленашка: вид птиц из семейства мухоловковых',
        link: 'https://ru.wikipedia.org/wiki/%D0%9A%D0%B0%D0%BC%D0%B5%D0%BD%D0%BA%D0%B0-%D0%BF%D0%BB%D0%B5%D1%88%D0%B0%D0%BD%D0%BA%D0%B0' },
      { img: 'images/крапивник.jpg',
        text: 'Крапивник: единственный представитель семейства крапивниковые',
        link: 'https://ru.wikipedia.org/wiki/%D0%9A%D1%80%D0%B0%D0%BF%D0%B8%D0%B2%D0%BD%D0%B8%D0%BA' },
      { img: 'images/кулик-сорока.jpg',
        text: 'Кулик-сорока: Наиболее распространённый вид небольшого семейства Haematopodidae',
        link: 'https://ru.wikipedia.org/wiki/%D0%9A%D1%83%D0%BB%D0%B8%D0%BA-%D1%81%D0%BE%D1%80%D0%BE%D0%BA%D0%B0' },
      { img: 'images/пеночка-весничка.jpg',
        text: 'Пеночка-весничка: певчая птица из семейства пеночковых (Phylloscopidae)',
        link: 'https://ru.wikipedia.org/wiki/%D0%9F%D0%B5%D0%BD%D0%BE%D1%87%D0%BA%D0%B0-%D0%B2%D0%B5%D1%81%D0%BD%D0%B8%D1%87%D0%BA%D0%B0' }
    ]
  };

  slider(element, sliderParams);
});

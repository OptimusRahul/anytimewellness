import './styles/index.css'
import { initNavigation } from './components/Navigation'
import { initCarousel } from './components/Carousel'
import { initScrollReveal } from './components/ScrollReveal'

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initCarousel();
  initScrollReveal();
});

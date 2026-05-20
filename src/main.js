import './styles/index.css'
import { initNavigation } from './components/Navigation'
import { initCarousel } from './components/Carousel'
import { initScrollReveal } from './components/ScrollReveal'
import { initBlog } from './components/Blog'

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initCarousel();
  initScrollReveal();
  initBlog();
});

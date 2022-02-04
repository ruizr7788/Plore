class ServiceSection {
  #parent_element = document.querySelector(".section");

  addHandlerRender(handler) {
    const observer = new IntersectionObserver(handler, {
      root: null,
      threshold: 0.1,
    });
    observer.observe(this.#parent_element);
  }
}

export default new ServiceSection();

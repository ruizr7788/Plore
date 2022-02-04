class NavbarView {
  #parentEl = document.getElementById("home");
  #navbarEl = document.getElementById("navbar");
  addHandlerRender(handler) {
    const lanPageObserver = new IntersectionObserver(handler, {
      root: null,
      threshold: 0,
    });
    lanPageObserver.observe(this.#parentEl);
  }
}

export default new NavbarView();

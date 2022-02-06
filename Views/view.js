export default class View {
  renderSpinner(parentEl) {
    const spinnerMarkup = this._generateSpinnerMarkup();
    parentEl.insertAdjacentHTML("beforeend", spinnerMarkup);
  }

  _generateSpinnerMarkup() {
    return `
        <div class="spinner"></div>
    `;
  }
}

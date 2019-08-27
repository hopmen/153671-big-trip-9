export const TripControls = (data) => `
  <nav class="trip-controls__trip-tabs  trip-tabs">
    ${data.length > 0 ? data.map((i) => `<a class="trip-tabs__btn ${i.isActive ? `trip-tabs__btn--active` : ``}" href="#">${i.title}</a>`).join(``) : ``}
  </nav>
`;

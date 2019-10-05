import AbstractComponent from '../components/absctract-component.js';

export default class DayList extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `
      <ul class="trip-days">
      </ul>
    `.trim();
  }
}

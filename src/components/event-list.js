export const EventList = (data) => `
  <ul class="trip-days">
      ${data.map((elem) => `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${data.indexOf(elem) + 1}</span>
        <time class="day__date" datetime="${new Date(elem).toLocaleString()}">${new Date(elem).getMonth()} ${new Date(elem).getDate()}</time>
      </div>

      <ul class="trip-events__list">
      </ul>
    </li>`).join(``)}
  </ul>`;

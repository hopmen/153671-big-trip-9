export const Event = ({title, startTime, endTime, price, typeIcon, options}) => `
  <li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${typeIcon}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${title}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${new Date(startTime).toLocaleString()}">${new Date(startTime).getHours()}H ${new Date(startTime).getMinutes()}M</time>
          &mdash;
          <time class="event__end-time" datetime="${new Date(endTime).toLocaleString()}">${new Date(endTime).getHours()}H ${new Date(endTime).getMinutes()}M</time>
        </p>
        <p class="event__duration">${new Date(endTime).getHours() - new Date(startTime).getHours()}H ${new Date(endTime).getMinutes() - new Date(startTime).getMinutes()}M</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>
      
      ${options.length > 0 ? `<h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
      
        ${options.filter((option) => option.isChecked === true)
                 .map((option) => `
        <li class="event__offer">
          <span class="event__offer-title">${option.title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${option.price}</span>
        </li>`).join(``)} 
        
      </ul>` : ``}
      

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>
`;

export const TripInfo = (data) => `
    <div class="trip-info__main">
      <h1 class="trip-info__title">${data.length > 3 ? `${data[0]} &mdash; ... &mdash; ${data[data.length - 1]}` : `${data.join(` &mdash; `)}`}</h1> 
      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;21</p>
    </div>`;

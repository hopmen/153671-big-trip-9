import Card from "../components/card.js";
import CardEdit from "../components/card-edit.js";
import {Position, Mode, KeyCode, Action, ButtonText, render, unrender} from '../utils.js';
import {types} from '../models/model-types.js';
import {allDestinations, allOffers} from '../main.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';
import moment from 'moment';

export default class CardController {
  constructor(container, data, mode, onDataChange, onChangeView, activateAddCardBtn) {
    this._container = container;
    this._data = data;
    this._card = new Card(data);
    this._cardEdit = new CardEdit(data);
    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;
    this._activateAddCardBtn = activateAddCardBtn;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._mode = mode;
    this._currentView = this._card;

    this.create();
  }

  create() {
    if (this._mode === Mode.ADDING) {
      this._cardEdit.getElement().classList.add(`trip-events__item`);
      this._cardEdit.getElement().querySelector(`.event__favorite-btn`).remove();
      this._cardEdit.getElement().querySelector(`.event__rollup-btn`).remove();
      this._cardEdit.getElement().querySelector(`.event__reset-btn`).innerHTML = ButtonText.CANCEL;
      this._currentView = this._cardEdit;
    }

    this._addFlatpickr();
    this._subscribeOnEvents();

    render(this._container, this._currentView.getElement(), Position.BEFOREEND);
  }

  setDefaultView() {
    if (this._container.contains(this._cardEdit.getElement())) {
      this._container.replaceChild(this._card.getElement(), this._cardEdit.getElement());
    }
  }

  _addFlatpickr() {
    const inputStartTime = this._cardEdit.getElement().querySelector(`input[name=event-start-time]`);
    const inputEndTime = this._cardEdit.getElement().querySelector(`input[name=event-end-time]`);

    flatpickr(inputStartTime, {
      enableTime: true,
      dateFormat: `Y.m.d H:i`,
      defaultDate: this._data.startTime,
      onChange: (dateStr, dateObj) => {
        flatpickrEndTime.set(`minDate`, dateObj);
      }
    });

    const flatpickrEndTime = flatpickr(inputEndTime, {
      enableTime: true,
      dateFormat: `Y.m.d H:i`,
      defaultDate: this._data.endTime,
      minDate: this._data.startTime
    });
  }

  _subscribeOnEvents() {
    this._card.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._onDownClick.bind(this));
    this._subscribeOnCardEditEvents();
  }

  _subscribeOnCardEditEvents() {
    if (this._mode === Mode.DEFAULT) {
      this._cardEdit.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._onUpClick.bind(this));
    }
    this._cardEdit.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._onDeleteClick.bind(this));
    this._cardEdit.getElement().addEventListener(`submit`, this._onSubmitClick.bind(this));
  }

  _resetCardEvent() {
    this._container.replaceChild(this._card.getElement(), this._cardEdit.getElement());
    this._cardEdit.removeElement();
    this._cardEdit.getElement();
    this._cardEdit.create();
    this._addFlatpickr();
    this._subscribeOnCardEditEvents();
  }

  _onEscKeyDown(evt) {
    if (evt.key === KeyCode.ESCAPE || evt.key === KeyCode.ESC) {
      if (this._container.contains(this._cardEdit.getElement())) {
        this._resetCardEvent();
      }
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _onDownClick() {
    this._onChangeView();
    this._container.replaceChild(this._cardEdit.getElement(), this._card.getElement());
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _onUpClick() {
    this._container.replaceChild(this._card.getElement(), this._cardEdit.getElement());
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _onDeleteClick() {
    if (this._mode === Mode.DEFAULT) {
      this._onDataChange(Action.DELETE, this._data, this._cardEdit);
    } else if (this._mode === Mode.ADDING) {
      unrender(this._currentView.getElement());
      this._currentView.removeElement();
      this._activateAddCardBtn();
    }
  }

  _onSubmitClick(evt) {
    evt.preventDefault();

    const formData = new FormData(this._cardEdit.getElement());
    const newData = {
      id: this._data.id,
      type: types[types.findIndex((it) => it.id === formData.get(`event-type`))],
      city: allDestinations[allDestinations.findIndex((it) => it.name === formData.get(`event-destination`))],
      startTime: moment(formData.get(`event-start-time`)).format(),
      endTime: moment(formData.get(`event-end-time`)).format(),
      price: +formData.get(`event-price`),
      isFavorite: !!formData.get(`event-favorite`),
    };

    newData.type.offers = allOffers[allOffers.findIndex((it) => it.type === formData.get(`event-type`))].offers;
    newData.type.offers.forEach((it) => {
      if (formData.get(`event-offer-${it.id}`)) {
        it.isApplied = true;
      } else {
        it.isApplied = false;
      }
    });

    this._onDataChange(this._mode === Mode.DEFAULT ? Action.UPDATE : Action.CREATE, newData, this._cardEdit);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}

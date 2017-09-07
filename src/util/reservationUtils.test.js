import {availableRooms} from './index'
const allReservations = require('./reservations.json')

it('renders without crashing', () => {
  const reservations = {}
  const need = {}
  const result = availableRooms(reservations, need).sort()

  const expected = ["B123", "A111"].sort()

  expect(result).toEqual(expected)
})
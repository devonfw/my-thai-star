import * as chai from 'chai';
import * as _ from 'lodash';
import * as business from '../src/logic';
import * as types from '../src/model/interfaces';
import * as config from '../src/config';

const expect = chai.expect;
const should = chai.should();

describe('Testing the application logic', () => {
    before(() => {
        //silence the console
        // console.log = () => {};
        // console.error = () => {};
    });

    describe('findUser', () => {
        it('should return the user if exists', (done) => {
            business.findUser('waiter').then((user) => {
                expect(user).is.not.undefined;
                expect(user[0].userName).to.be.equals('waiter');
                done();
            }, (err) => {
                done(err);
            });
        });

        it('should return a empty array if user not exists', (done) => {
            business.findUser('amigo').then((user) => {
                expect(user).is.not.undefined;
                expect(user.length).is.equals(0);
                done();
            }, (err) => {
                done(err);
            });
        });
    });

    describe('getDishes', () => {
        it('should return all dishes if not filter is given', (done) => {
            const filter: types.FilterView = {
                categories: [],
            };

            business.getDishes(filter, (err, dishes) => {
                should.not.exist(err);

                expect(dishes).to.not.be.undefined;
                expect(dishes!.result.length).to.be.equals(6);
                done();
            });
        });

        it('should return only some dishes if filter is given', (done) => {
            const filter: types.FilterView = {
                categories: [],
                searchBy: 'curry',
                maxPrice: 15,
                sort: [{ name: 'name', direction: 'ASC' }],
            };

            business.getDishes(filter, (err, dishes) => {
                should.not.exist(err);

                expect(dishes).to.not.be.undefined;
                expect(dishes!.result.length).to.be.equals(1);
                expect((dishes!.result[0] as types.DishesView).dish.name.toLowerCase()).to.be.equals('Thai Green Chicken Curry'.toLowerCase());
                done();
            });
        });
    });

    let fbookingToken: string;
    let nbookingToken: string;
    let fbookingId: string;
    let fguestToken: string;

    describe('createBooking', () => {
        it('should return a booking token', (done) => {
            const b1: types.BookingPostView = {
                booking: {
                    bookingDate: '2030-06-16T10:30:00.000Z',
                    name: 'test',
                    email: 'test@test.com',
                    bookingType: 0,
                    assistants: 5,
                },
            };

            const b2: types.BookingPostView = {
                booking: {
                    bookingDate: '2030-06-16T10:30:00.000Z',
                    name: 'test',
                    email: 'test2@test.com',
                    bookingType: 1,
                    assistants: 5,
                },
                invitedGuests: [
                    {
                        email: 'test3@test.com',
                    },
                ],
            };

            business.createBooking(b1, (err, bookingToken) => {
                nbookingToken = bookingToken!;
            });

            business.createBooking(b2, (err, bookingToken) => {
                should.not.exist(err);

                expect(typeof bookingToken === 'string').to.be.true;
                expect((bookingToken as string).startsWith('CB_')).to.be.true;

                fbookingToken = bookingToken!;

                done();
            });
        });

        it('should fail when there are not more tables available', (done) => {
            const b: types.BookingPostView = {
                booking: {
                    bookingDate: '2030-06-16T10:30:00.000Z',
                    name: 'test',
                    email: 'test@test.com',
                    bookingType: 0,
                    assistants: 50,
                },
            };

            business.createBooking(b, (err, bookingToken) => {
                should.exist(err);

                expect(err!.message).to.be.equals('No more tables');

                done();
            });
        });
    });

    describe('getAllInvitedBookings', () => {
        it('should return all bookings if no date is given', (done) => {
            business.getAllInvitedBookings().then((bookings) => {
                console.log(bookings);
                expect(bookings).to.be.instanceof(Array);

                expect(bookings.length).to.be.equals(1);
                console.log(fbookingToken);
                expect(bookings[0].bookingToken).to.be.equals(fbookingToken);

                done();
            });
        });

        it('should return only some bookings when a date is given', (done) => {
             business.getAllInvitedBookings('2030-06-16T10:30:00.000Z').then((bookings) => {
                expect(bookings).to.be.instanceof(Array);

                expect(bookings.length).to.be.equals(1);
                expect(bookings[0].bookingToken).to.be.equals(fbookingToken);

                done();
            });
        });

        it('should return an empty array when there are no booking at the specified date', (done) => {
            business.getAllInvitedBookings('2029-06-16T10:30:00.000Z').then((bookings) => {
                expect(bookings).to.be.instanceof(Array);

                expect(bookings.length).to.be.equals(0);
                done();
            });
        });
    });

    describe('updateBookingWithTable', () => {
        it('should add the table to the booking', (done) => {
            business.updateBookingWithTable(fbookingId, '0').catch((err) => {should.not.exist(err); }).then((elem) => {
                expect(elem).to.be.false;

                done();
            });
        });
    });

    describe('searchBooking', () => {
        it('should return all bookings if no search criteria is given', (done) => {
            const search: types.SearchCriteria = {
                pagination: {
                    size: 30,
                    page: 1,
                    total: 1,
                },
            };

            business.searchBooking(search, (err, bookings) => {
                should.not.exist(err);

                expect(bookings!.result).to.not.be.undefined;
                expect(bookings!.result.length).to.be.equals(2);

                done();
            });
        });

        it('should return some bookings if search criteria is given', (done) => {
            const search: types.SearchCriteria = {
                pagination: {
                    size: 30,
                    page: 1,
                    total: 1,
                },
                bookingToken: fbookingToken,
            };

            business.searchBooking(search, (err, bookings) => {
                should.not.exist(err);

                fguestToken = ((bookings!.result[0] as types.BookingPostView).invitedGuests![0].guestToken)!;
                fbookingId = (bookings!.result[0] as types.BookingPostView).booking.id!.toString();
                expect(bookings!.result).to.not.be.undefined;
                expect(bookings!.result.length).to.be.equals(1);

                done();
            });
        });

        it('should return an empty array if no booking match with the search criteria', (done) => {
            const search: types.SearchCriteria = {
                pagination: {
                    size: 30,
                    page: 1,
                    total: 1,
                },
                bookingToken: 'fail',
            };

            business.searchBooking(search, (err, bookings) => {
                should.not.exist(err);

                expect(bookings!.result).to.not.be.undefined;
                expect(bookings!.result.length).to.be.equals(0);

                done();
            });
        });
    });

    describe('updateInvitation', () => {
        it('should change the InvitedGuest accepted to true if the response is true', (done) => {
            business.updateInvitation(fguestToken, true, (err) => {
                should.not.exist(err);

                done();
            });
        });

        it('should return a error when the invitation is already accepted', (done) => {
             business.updateInvitation(fguestToken, true, (err) => {
                should.exist(err);

                done();
            });
        });

        it('should cancel the InvitedGuest if the response is false', (done) => {
             business.updateInvitation(fguestToken, false, (err) => {
                should.not.exist(err);

                done();
            });
        });

        it('should return an error if the InvitedGuest is already canceled', (done) => {
             business.updateInvitation(fguestToken, false, (err) => {
                should.exist(err);

                done();
            });
        });
    });

    describe('getAssistantsForInvitedBooking', () => {
        it('should return the number of accepted InvitedGuest', (done) => {
            business.getAssistansForInvitedBooking(fbookingId).catch((err) => {
                should.not.exist(err);

                done(err);
            }).then((assistants) => {
                expect(assistants).to.be.equal(1);

                done();
            });
        });
    });

    describe('cancelBooking', () => {
        it('should cancel a booking with guests', (done) => {
            business.cancelBooking(fbookingToken, (err) => {
                should.not.exist(err);

                done();
            });
        });

        it('should return an error if a invalid token is given', (done) => {
            business.cancelBooking('INVALID_TOKEN', (err) => {
                should.exist(err);

                done();
            });
        });

        it('should return an error if the token do not correspond to a booking with guest', (done) => {
            business.cancelBooking(nbookingToken, (err) => {
                should.exist(err);

                done();
            });
        });
    });

    after(() => {
        // delete console.log;
        // delete console.error;
    });
});

var assert = require('assert');
const {splitSlots, splitSlotPeriod, removeConflicts} = require("../slot-util");

describe('Array', function() {

    describe('#splitSlotPeriod()', function() {
        it('should split slot to 0 slot', function() {
            var result = splitSlotPeriod(
                { 
                    start: '2020-12-08T13:00:00Z', 
                    end: '2020-12-08T13:59:00Z' 
                });
            assert.strictEqual(0, result.length);
            
        });

        it('should split slot to 1 slot', function() {
            var result = splitSlotPeriod(
                { 
                    start: '2020-12-08T13:00:00Z', 
                    end: '2020-12-08T14:00:00Z' 
                });            
            assert.strictEqual(1, result.length);
            assert.strictEqual("Tue Dec 08 2020 13:00:00 GMT+0000 (Greenwich Mean Time)", result[0].start);
            assert.strictEqual("Tue Dec 08 2020 14:00:00 GMT+0000 (Greenwich Mean Time)", result[0].end);            
        });

        it('should split slot to 4 slots', function() {
            var result = splitSlotPeriod(
                { 
                    start: '2020-12-08T13:00:00Z', 
                    end: '2020-12-08T17:00:00Z' 
                });
            
            assert.strictEqual(4, result.length);
            assert.strictEqual("Tue Dec 08 2020 13:00:00 GMT+0000 (Greenwich Mean Time)", result[0].start);
            assert.strictEqual("Tue Dec 08 2020 14:00:00 GMT+0000 (Greenwich Mean Time)", result[0].end);
            assert.strictEqual("Tue Dec 08 2020 14:00:00 GMT+0000 (Greenwich Mean Time)", result[1].start);
            assert.strictEqual("Tue Dec 08 2020 15:00:00 GMT+0000 (Greenwich Mean Time)", result[1].end);
            assert.strictEqual("Tue Dec 08 2020 15:00:00 GMT+0000 (Greenwich Mean Time)", result[2].start);
            assert.strictEqual("Tue Dec 08 2020 16:00:00 GMT+0000 (Greenwich Mean Time)", result[2].end);
            assert.strictEqual("Tue Dec 08 2020 16:00:00 GMT+0000 (Greenwich Mean Time)", result[3].start);
            assert.strictEqual("Tue Dec 08 2020 17:00:00 GMT+0000 (Greenwich Mean Time)", result[3].end);
        });
    });

    describe('#splitSlots()', function() {
        it('should split multiple slots', function() {
            period1 = { 
                start: '2020-12-08T11:00:00Z', 
                end: '2020-12-08T12:00:00Z' 
            };
            period2 = { 
                start: '2020-12-08T13:00:00Z', 
                end: '2020-12-08T14:00:00Z' 
            };
            result = splitSlots([period1, period2])
            assert.strictEqual(result.length, 2);
        });

        it('should split multiple slots into multiples', function() {
            period1 = { 
                start: '2020-12-08T09:00:00Z', 
                end: '2020-12-08T12:00:00Z' 
            };
            period2 = { 
                start: '2020-12-08T13:00:00Z', 
                end: '2020-12-08T17:00:00Z' 
            };
            result = splitSlots([period1, period2])
            assert.strictEqual(result.length, 7);
        });

        it('should split multiple slots into multiples across days', function() {
            period1 = { 
                start: '2020-12-08T09:00:00Z', 
                end: '2020-12-08T12:00:00Z' 
            };
            period2 = { 
                start: '2020-12-08T13:00:00Z', 
                end: '2020-12-08T17:00:00Z' 
            };
            period3 = { 
                start: '2020-12-09T09:00:00Z', 
                end: '2020-12-09T12:00:00Z' 
            };
            period4 = { 
                start: '2020-12-09T13:00:00Z', 
                end: '2020-12-09T17:00:00Z' 
            };
            result = splitSlots([period1, period2, period3, period4])
            assert.strictEqual(result.length, 14 );
        });
    });

    describe('#splitSlots()', function() {

        it('should intersect', function() {
            bookable = [ 
                { start: 'Tue Dec 09 2020 14:00:00 GMT+0000 (Greenwich Mean Time)', end: 'Tue Dec 09 2020 15:00:00 GMT+0000 (Greenwich Mean Time)' }
            ];

            booked = [ { start: '2020-12-09T14:00:00Z', end: '2020-12-09T15:00:00Z' } ];
            var result = removeConflicts(bookable, booked);
            assert.strictEqual(result.length, 0 );
        })

        it('should intersect', function() {
            bookable = [ 
                { start: 'Tue Dec 08 2020 13:00:00 GMT+0000 (Greenwich Mean Time)', end: 'Tue Dec 08 2020 14:00:00 GMT+0000 (Greenwich Mean Time)' },
                { start: 'Tue Dec 08 2020 14:00:00 GMT+0000 (Greenwich Mean Time)', end: 'Tue Dec 08 2020 15:00:00 GMT+0000 (Greenwich Mean Time)' },
                { start: 'Tue Dec 08 2020 15:00:00 GMT+0000 (Greenwich Mean Time)', end: 'Tue Dec 08 2020 16:00:00 GMT+0000 (Greenwich Mean Time)' },
                { start: 'Tue Dec 08 2020 16:00:00 GMT+0000 (Greenwich Mean Time)', end: 'Tue Dec 08 2020 17:00:00 GMT+0000 (Greenwich Mean Time)' } 
            ];

            booked = [ { start: '2020-12-08T14:00:00Z', end: '2020-12-08T15:00:00Z' } ];
            var result = removeConflicts(bookable, booked);
            assert.strictEqual(result.length, 3 );
        })
    })
});
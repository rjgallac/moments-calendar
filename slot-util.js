
function splitSlots(bookableSlots){
    slots = [];
    bookableSlots.forEach(element => {
        slots = slots.concat(splitSlotPeriod(element));
    });
    return slots;
}

function splitSlotPeriod(slot){
    slots = []
    var start = new Date(slot.start);
    var end = new Date(slot.end);
    
    do {
        saveStart = new Date(start);
        start.setHours(start.getHours() + 1)
        if(start <= end){
            slots.push({"start": saveStart.toString(), "end": start.toString()});
        }
    }while(start < end);
    return slots;
}

function removeConflicts(slots, booked) {
    var noConflicts = [];
    slots.forEach(slot =>{
        var found = false;
        booked.forEach(book =>{
            if(intersects(slot, book)){
                found = true;
            }
        })
        if(!found){
            noConflicts.push(slot);
        }
    })
    return noConflicts;

}

function intersects(slot, booked) {
    if(new Date(slot.start) >= new Date(booked.start) && new Date(slot.end) <= new Date(booked.end)) return true;
    if(new Date(slot.start) <= new Date(booked.start) && new Date(slot.end) >= new Date(booked.end)) return true;
    return false;
}

module.exports = {splitSlots, splitSlotPeriod, removeConflicts}
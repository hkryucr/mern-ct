
const Hour = require('../models/Hour');
// const Business = require('../../models/Business');

const newHour = new Hour({
    isOvernight: true,
    start: "22:00",
    end: "22:30",
    day: 2,
    businessId: "5e6dcfeb8f74e14a9175e94a"
})
newHour.save();

// const newHour = await new Hour({
    //     isOvernight: true,
    //     start: "02:00",
    //     end: "23:00",
    //     day: 5,
    //     businessId: "5e6dcfeb8f74e14a9175e94a"
    // });

    // await newHour.save();
// Business.create({
//     businessName: "The House",
//     yelpUrl: "http://google.com",
//     latitude: "22",
//     longitude: "-122",
//     categories: "American",
//     hours: {
//         type: Schema.Types.ObjectId,
//         ref: "hours"
//     },
//     phone: {
//         type: String,
//         required: true
//     },
//     reviewCount: {
//         type: Number,
//         required: true
//     },
//     price: {
//         type: String,
//         required: true
//     },
//     rating: {
//         type: String,
//         required: true
//     },
//     zipcode: {
//         type: String,
//         required: true
//     },
//     country: {
//         type: String,
//         required: true
//     },
//     state: {
//         type: String,
//         required: true
//     },
//     city: {
//         type: String,
//         required: true
//     },
//     address1: {
//         type: String,
//         required: true
//     },
//     address2: {
//         type: String
//     },
//     address3: {
//         type: String
//     },
//     isClosed: {
//         type: Boolean
//     },
// })
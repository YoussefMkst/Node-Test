const mongoose = require('mongoose');

const ObservationSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
      },
    species: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    location: {
        type: {
          type: String, 
          enum: ['Point'],
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      }
});

const Observation = mongoose.model('Observation', ObservationSchema);

module.exports = Observation;
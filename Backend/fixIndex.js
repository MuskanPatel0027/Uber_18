const mongoose = require('mongoose');
require('dotenv').config();

async function fixIndex() {
    try {
        await mongoose.connect(process.env.DB_CONNECT);
        console.log('Connected to MongoDB');

        const db = mongoose.connection.db;
        const collection = db.collection('captains');

        // Drop the old index
        await collection.dropIndex('vehicle.plateNumber_1');
        console.log('Dropped old index on vehicle.plateNumber');

        // Optionally, create new index on vehicle.plate
        await collection.createIndex({ 'vehicle.plate': 1 }, { unique: true });
        console.log('Created new unique index on vehicle.plate');

        console.log('Index fixed successfully');
    } catch (error) {
        console.error('Error fixing index:', error);
    } finally {
        await mongoose.disconnect();
    }
}

fixIndex();
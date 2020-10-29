const mongoose = require('mongoose');


const fieldSchema = mongoose.Schema({
    imagePath: {
        type: String
    }
});


fieldSchema.statics.addPlayers = function() {
    const path = `http://localhost:3000/images/players/`;
    let array = ['manu.webp', 'phil.webp', 'kimich.webp', 'lewi.webp', 'thiago.webp', 'tomi.webp'];
    array = array.map(el => {
        return { imagePath: path + el }
    });

    this.insertMany(array)
        .then(() => {
            console.log('Data inserted!');
        })
        .catch((err) => {
            console.error(err);
            process.exit(1);
        });
}

fieldSchema.statics.getPlayers = async function() {
    const players = await this.find({}).exec();

    return players;
}


const Field = mongoose.model('Field', fieldSchema);

module.exports = Field;
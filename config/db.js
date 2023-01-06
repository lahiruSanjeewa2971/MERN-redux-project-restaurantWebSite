const mongoose = require('mongoose')
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            process.env.MONGODB_URL, {
                useCreateIndex: true,
                useFindAndModify: false,
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )

        console.log(`Mongodb connected`.cyan.underline);
    } catch (err) {
        console.log(err);
        process.exit(1)
    }
}
module.exports = connectDB
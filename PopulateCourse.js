require('dotenv').config()

const connectDB = require('./db/connect')
const AllCourseJson = require('./AllCourse.json')

const course = require('./model/StudentCourse')

const start = async () => {
  try {
    await connectDB(process.env.MANGO_URL)
    await course.deleteMany()
    await course.create(AllCourseJson)

    process.exit(0)
  } catch (error) {

    process.exit(1)
  }
}

start()

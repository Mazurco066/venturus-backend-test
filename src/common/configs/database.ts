// Dependencies
import { config } from 'dotenv'
config()

// Mongoi Atlas uri
const uri = `${process.env.MONGODB_PROTOCOL}${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_ADDRESS}${(process.env.MONGODB_PROTOCOL.endsWith('srv://') ? '' : ':' + process.env.MONGODB_PORT)}`

// Named export
export default uri
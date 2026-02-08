const express = require("express")
const cors = require("cors")
require("dotenv").config()

const app = express()

app.use(cors({
  origin: [
    "https://electronics-store-frontend.onrender.com"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}))

app.options("*", cors())

app.use(express.json())

// routes
app.use("/api/auth", require("./src/routes/authRoutes"))
app.use("/api/products", require("./src/routes/productRoutes"))
app.use("/api/users", require("./src/routes/userRoutes"))

const connectDB = require("./src/config/db")
connectDB()

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
)

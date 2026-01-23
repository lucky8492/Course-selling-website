const {userRouter} = require("./router/user")
const {adminRouter} = require("./router/admin")
const cors = require("cors");
const {express , MONGODB_URL,mongoose} = require("./path")

const app = express();

app.use(express.json());

const cors = require('cors');

app.use(cors({
  origin: function(origin, callback) {
    // Allow all Vercel domains and localhost
    if (!origin || 
        origin.endsWith('.vercel.app') || 
        origin.includes('localhost')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

mongoose.connect(MONGODB_URL)

// user section
app.use("/user",userRouter)
// admin section
app.use("/admin" , adminRouter);

app.listen(3000);


//error in .env file
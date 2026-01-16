const {userRouter} = require("./router/user")
const {adminRouter} = require("./router/admin")
const cors = require("cors");
const {express , MONGODB_URL,mongoose} = require("./path")

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(MONGODB_URL)

// user section
app.use("/user",userRouter)
// admin section
app.use("/admin" , adminRouter);

app.listen(3000);


//error in .env file
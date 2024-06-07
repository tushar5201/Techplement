const express = require("express");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
const Quote = require("./quoteModel.js");
const cors = require("cors");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(cors(
    {
        origin: "https://techplement-frontend.vercel.app",
        methods: ["POST", "GET", "DELETE", "PUT"]
    }
));

dotenv.config();
mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Connected to db");
}).catch((err) => {
    console.log(err.message);
});

app.get('/', async (req, res) => {
    res.json("Hello");
})

app.post("/create-quote", async (req, res) => {
    const { quote, author } = req.body;
    try {
        const create = await new Quote({ quote, author }).save();
        if (create) {
            res.status(201).send({
                success: true,
                message: 'new quote created',
                create
            })
        } else {
            res.status(400).send({ success: false })
        }
    } catch (error) {
        console.log(error);
    }
});

app.put("/api/update-quote/:id", async (req, res) => {
    let { quote, author } = req.body;
    const id = req.params.id;
    try {
        const exist = await Quote.findById(id);
        if (quote === "") {
            quote = exist.quote;
        }
        if (author === "") {
            author = exist.author;
        }
        if (exist) {
            const update = await Quote.findByIdAndUpdate(id, { quote, author });
            if (update) {
                res.status(201).send({
                    success: true,
                    message: 'new quote updated',
                    update
                })
            } else {
                res.status(400).send({ success: false })
            }
        }
    } catch (error) {
        console.log(error);
    }
});

app.get("/api/get-all-authors", async (req, res) => {
    try {
        const data = await Quote.distinct("author");
        res.status(201).send(data);
    } catch (error) {
        console.log(error);
    }
})

app.get("/api/get-quote", async (req, res) => {
    try {
        const quotes = await Quote.find({});

        const randomNum = Math.round(Math.random() * 10);
        res.status(200).send(quotes[randomNum])
    } catch (err) {
        console.log(err.message);
    }
});

app.get("/api/get-quote/:authorName", async (req, res) => {
    try {
        const authorName = req.params.authorName;
        const quotes = await Quote.find({ "author": authorName })
        let randomNum = Math.random();

        if (randomNum < 0.5)
            randomNum = 0
        else
            randomNum = 1
        res.status(201).send(quotes[randomNum])
    } catch (error) {
        console.log(error);
    }
})

app.get("/api/get-a-quote/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Quote.findById(id);
        if (data) {
            res.status(201).send(data);
        }
    } catch (error) {
        console.log(error);
    }
});

app.delete("/api/delete-quote/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const quote = await Quote.findById(id);
        if (quote) {
            const del = await Quote.findByIdAndDelete(id);
            if (del) {
                res.status(201).send({
                    success: true,
                    message: "Deleted successfully."
                });
            } else {
                res.status(401).send({
                    success: false,
                    message: "Delete unsuccessfully."
                });
            }
        } else {
            res.status(405).send({
                success: false,
                message: "Quote not found."
            });
        }
    } catch (err) {
        console.log(err);
    }
})

app.listen(5000, () => {
    console.log("http://localhost:5000/");
})
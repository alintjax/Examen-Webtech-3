const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var LocalStorage = require('node-localstorage').LocalStorage;

app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port 3000');
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

var answers = ["It is certain.", "It is decidedly so.", "Without a doubt.", "Yes - definitely.", "You may rely on it.", "As I see it, yes.",
    "Most likely.", "Outlook good.", "Yes.", "Signs point to yes.", "Reply hazy", "try again", "Ask again later.", "Better not tell you now.",
    "Cannot predict now.", "Concentrate and ask again.", "Don't count on it.", "My reply is no.", "My sources say no",
    "Outlook not so good.", "Very doubtful."] ;

app.get('/', (req, res) => {
    res.render('submit.ejs', {result: null});
    if (typeof localStorage === "undefined" || localStorage === null) {
        localStorage = new LocalStorage('./scratch');
    }
})
app.post('/ask', (req, res) => {
        var name=req.body.name;
        var exam=req.body.exam;
        var reason=req.body.reason;
        var date = getVarDate();
        console.log("Naam student: "+name+", Examen: "+exam, "Reden: "+reason,"Indien datum: "+date);

    if (localStorage.getItem(name) != null) {
        console.log("Bestaat al")
        answer = localStorage.getItem(name);
    }
    else {
        name = req.body.name;

        localStorage.setItem(name, exam, reason, date);

    }
    res.render('result.ejs', {result: (name, exam, reason, date), submit: (name, exam, reason, date) });
})


app.get('/clear', (req, res) => {
    localStorage.clear()
    res.redirect('/')
})
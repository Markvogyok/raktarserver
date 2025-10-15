const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const fs = require('fs');
const { error } = require('console');
app.use(cors());
app.use(express.jshon());
app.use(express.static('public'));

const file = 'adatok.json';

if (!fs.existsSync(file)){
    fs.writeFileSync(file, JSON.stringify([]));
}

function betoltadatok() {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function mentadatok(adatok) {
    fs.writeFileSync(file, JSON.stringify(adatok, null, 2));
}

app.get('/api/termekek', (req, res) => {
    res.json(betoltadatok());
});

app.post('/api/termekek', (req, res) => {
    const {nev, tipus, mennyiseg} = req.body;
    if (!nev || !tipus || !mennyiseg){
        return res.status(400).json({error: 'Minen mező kitöltése kötelező'})
    }
    const adatok = betoltadatok();
    const uj = {id: Date.now(), nev, tipus, mennyiseg:parseFloat(mennyiseg)};
    adatok.push(uj);
    mentadatok(adatok);
    res.json({message: "Termék hozzáadva", uj});
});

app.put('/api/termekek/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nev, tipus, mennyiseg} = req.body;
    let adatok = betoltadatok();
    const index = adatok.findIndex(t => t.id === id);

});
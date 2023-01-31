const express = require('express')
const app = express()
const cors = require('cors')
const { response } = require('express')
const PORT = 8080
const MongoClient = require('mongodb').MongoClient
const connectionString = "mongodb+srv://onyedikaij:fSjU4WFZou246z28@cluster0.n6xaokk.mongodb.net/?retryWrites=true&w=majority"

// const characters = {
//     "rand":{
//         'characterName' : "Rand al'Thor",
//         'birthPlace' : 'Dragonmount',
//         'nationality': 'Andoran',
//         'description': ['Reddish curls', '6 foot 6 inches', 'Blue eyes', '235 lbs','Muscular'],
//         'titles': ['Dragon Reborn', 'Coramoor', "Car'a'carn", 'Lord of the Morning', 'King of Illian', 'Shadowkiller'],
//         'abilities': ['Swordmaster', 'Channeling'],
//         'image': 'https://static.wikia.nocookie.net/wot/images/2/28/Rand_2.jpg/revision/latest?cb=20101025153809'
//     },
//     'mat': {
//         'characterName' : 'Matrim Cauthon',
//         'birthPlace' : 'Emond\'s Field',
//         'nationality': 'Andoran',
//         'description': ['Brown hair', 'Brown eyes', '5 foot 11 inches', '170 lbs', 'Wiry'],
//         'titles': ['Gambler', 'Son of Battles', 'Prince of Ravens'],
//         'abilities': ['Quarterstaff Master', 'Extreme Luck', 'Master Tactician' ],
//         'image': 'https://static.wikia.nocookie.net/wot/images/3/32/Mat.jpg/revision/latest?cb=20091212050852'
//     },
//     'perrin': {
//         'characterName' : 'Perrin Aybara',
//         'birthPlace' : 'Emond\'s Field',
//         'nationality': 'Andoran',
//         'description': ['Brown curls', 'Golden Eyes', '6 foot 1.5 inches', '245 lbs', 'Heavily Muscled'],
//         'titles': 'Lord of the Two Rivers',
//         'abilities': 'Wolfbrother',
//         'image': 'https://static.wikia.nocookie.net/wot/images/b/bd/Perrin_aybara_wolf_king_by_reddera-d993otl.jpg/revision/latest?cb=20160605153745'
//     },
//     "nynaeve": {
//         'characterName' : 'Nynaeve al\'Meara',
//         'birthPlace' : 'Emond\'s Field',
//         'nationality': 'Andoran',
//         'description': ['Dark Braided Hair', 'Dark eyes', '5 feet 4 inches', 'Slender'],
//         'titles': 'Queen of Malkier',
//         'abilities': 'Channeling(Healing)',
//         'image': 'https://static.wikia.nocookie.net/wot/images/6/6b/Nynaeve_2.jpg/revision/latest?cb=20101223181052'
//     },
//     "egwene": {
//         'characterName' : 'Egwene al\'Vere',
//         'birthPlace' : 'Emond\'s Field',
//         'nationality': 'Andoran',
//         'description': ['Dark, flowing hair', 'Brown eyes', '5 foot 3inches','Slender'],
//         'titles': 'Amyrlin Seat',
//         'abilities': 'Channeling(Battle channeling)',
//         'image': 'https://static.wikia.nocookie.net/wot/images/e/e2/Wot-_egwene.jpg/revision/latest?cb=20160605153945'
//     },
//     'moiriane':{
//         'characterName' : 'Moiriane Damodred',
//         'birthPlace' : 'Sun Palace',
//         'nationality': 'Cairienin',
//         'description': ['Dark hair', ' Dark eyes', 'Short', 'Slender'],
//         'titles': 'Lady',
//         'abilities': 'Channeling',
//         'image': 'https://static.wikia.nocookie.net/wot/images/1/18/Wot_card_teasers_moiraine_by_reddera-d3r8il3.jpg/revision/latest?cb=20160607234439'
//     },
//     'lan': {
//         'characterName' : 'al\'Lan Mandragoran',
//         'birthPlace' : 'Malkier',
//         'nationality': 'Malkieri',
//         'description': ['Gray tinged black hair', 'Blue eyes', '6\' 5"', 'Muscular'],
//         'titles': [ 
// 'Lord of the Seven Towers', 'Lord of the Lakes', 'True Blade of Malkier', 'Defender of the Wall of First Fires', 'Bearer of the Sword of the Thousand Lakes', 'Dai Shan', 'King of Malkier', 'Aan\'allein'
//         ],
//         'abilities': 'Swordmaster',
//         'image': 'https://static.wikia.nocookie.net/wot/images/3/37/Lan.jpg/revision/latest?cb=20131102154036'
//     },
//     'thom':{
//         'characterName' : 'Thomdril "Thom" Merrilin',
//         'birthPlace' : 'Andor',
//         'nationality': 'Andoran',
//         'description': ['White haired', 'Blue eyes', 'Heavy moustache', 'Wiry', '6\' 0"'],
//         'titles': 'Gleeman',
//         'abilities': 'Political Maneuvering',
//         'image': 'https://static.wikia.nocookie.net/wot/images/5/5f/Wot_card_teasers_3_thom_by_reddera-d3i4wpj.jpg/revision/latest?cb=20160605161414'
//     },
//     'elayne':{
//         'characterName' : 'Elayne Trakand',
//         'birthPlace' : 'Andor',
//         'nationality': 'Andoran',
//         'description': ['Reddish golden blonde', 'Blue eyes', '5\' 7"', 'Slender'],
//         'titles': ['Queen of Andor and Cairhien', 'Defender of the Realm', 'Protector of the People', 'High Seat of House Trakand'],
//         'abilities': 'Channeling',
//         'image': 'https://static.wikia.nocookie.net/wot/images/3/30/Wot_elayne_trakand_by_reddera-d4sxaz5.jpg/revision/latest?cb=20160606121940'
//     }
// }

app.use(cors())
app.use =(express.json())



MongoClient.connect(connectionString)
.then(client =>{
    console.log('Connected to DB')
    const db = client.db('wheel-of-time-cg')
    const infoCollection = db.collection('character-info')


    app.get('https://good-cyan-bat.cyclic.app//', (req,res)=>{
        res.sendFile(__dirname + '/index.html')
    })
    
    
    app.get('https://good-cyan-bat.cyclic.app//api/:charName' ,(req,res)=>{
       const charsName = req.params.charName.toLowerCase()
       infoCollection.find({name : charsName}).toArray()
       .then(result => {
        console.log(result)
        res.json(result)
       })
       .catch(err => console.error(err))
    })
})
.catch(err => console.error(err))
app.listen(process.env.PORT || PORT,function(){
    console.log(`Currently listening on ${PORT}`)
})
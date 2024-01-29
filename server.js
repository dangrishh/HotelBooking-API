// To connect with your mongoDB database 
/* 

mongoose.connect( 
'mongodb://localhost:27017/', 
{ 
	dbName: 'yourDB-name', 
	useNewUrlParser: true, 
	useUnifiedTopology: true, 
}, 
(err) => (err ? console.log(err) : 
	console.log('Connected to yourDB-name database')), 
);  */

const mongoose = require('mongoose'); 

mongoose.connect('mongodb+srv://admin:admin@crudnodejs.ydtzqky.mongodb.net/HotelBooking?retryWrites=true&w=majority')
.then(() => {
  console.log('MongoDB is Already Connected')

}).catch((error) => {
  console.log(error)
});

// Schema for hotel Booking 
const UserSchema = new mongoose.Schema({ 
name: { 
	type: String, 
}, 
email: { 
	type: String, 
	required: true, 
	unique: true, 
}, 
roomNo: { 
	type: String, 
	required: true, 
}, 
date: { 
	type: Date, 
	default: Date.now, 
}, 
}); 

const RoomBooked = mongoose.model('users', UserSchema); 
RoomBooked.createIndexes(); 

// For backend and express 
const express = require('express'); 
const cors = require('cors'); 

const app = express(); 
app.use(express.json()); 
app.use(cors()); 

app.get('/', (req, resp) => { 
resp.send('App is Working'); 
}); 

// Register data to book hotelroom 
app.post('/register', async (req, resp) => { 
try { 
	const user = new RoomBooked(req.body); 
	let result = await user.save(); 
	result = result.toObject(); 
	if (result) { 
	delete result.password; 
	resp.send(req.body); 
	console.log(result); 
	} else { 
	console.log('User already register'); 
	} 
} catch (e) { 
	resp.send('Something Went Wrong'); 
} 
}); 

// Getting roombooked details 
app.get('/get-room-data', async (req, resp) => { 
try { 
	const details = await RoomBooked.find({}); 
	resp.send(details); 
} catch (error) {  
	console.log(error); 
} 
}); 

// Server setup 

const port = 3100;
app.listen(port, () => {
    console.log(`Server started at port http://localhost:${port}`);
});


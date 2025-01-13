const express = require('express');
const { Text, Document } = require('./models'); 
const uploadRoutes = require('./routes/uploadRoutes'); 
const path = require('path');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const voterRoutes = require('./routes/voterRoutes'); 
const userRoutes = require('./routes/userRoutes');
const bcrypt = require('bcryptjs');  
const authController = require("./controller/authController");
const authRoutess=require("./routes/authRoutess")


const app = express();

app.use(cors({
  origin: 'http://localhost:3001',  
  methods: ['GET', 'POST', 'PUT'],
  credentials: true,  
}));

app.use(express.json()); 

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', uploadRoutes);
app.use('/api', authRoutes);
app.use('/api', userRoutes)
app.use('/api', voterRoutes);
// app.post("/api/forgot-password", authController.forgotPassword);
app.use('/api', authRoutess);

app.post('/users', async (req, res) => {
  try {
    const { 
      fName, 
      lName, 
      dateOfBirth, 
      gender, 
      email, 
      mobile, 
      altmobile, 
      languages, 
      village, 
      taluka, 
      district, 
      state, 
      pincode, 
      username, 
      password, 
      idPhotoPath, 
      kycDoc, 
      kycVideo 
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);  

    const user = await Text.create({
      fName,
      lName,
      dateOfBirth,
      gender,
      email,
      mobile,
      altmobile,
      languages: languages ? languages.split(',') : [],
      village,
      taluka,
      district,
      state,
      pincode,
      username,
      password: hashedPassword, // Store hashed password
    });

    const document = await Document.create({
      idPhotoPath,
      kycDoc,
      kycVideo,
      userId: user.id, 
    });

    res.status(201).json({ user, document });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Server is running on http://localhost:3000');
});
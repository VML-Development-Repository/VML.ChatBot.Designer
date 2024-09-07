const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const authRoutes = require('./routes/authRoutes');
const flowchartRoutes = require('./routes/flowchartRoutes');

dotenv.config();

const app = express();
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.static('../build/'));

app.use('/api/auth', authRoutes);
app.use('/api/flowcharts', flowchartRoutes);

const PORT = process.env.PORT || 3000;

// Function to check if admin user exists and create if not
const createAdminUser = async () => {
  try {
    const adminUser = await User.findOne({ username: 'admin' });
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash('12345', 10);
      const newAdmin = new User({
        username: 'admin',
        password: hashedPassword,
      });
      await newAdmin.save();
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.log('Error creating admin user:', error);
  }
};

// Call the function to create the admin user if necessary
createAdminUser();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

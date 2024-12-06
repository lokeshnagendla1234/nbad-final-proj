const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const users = [{
  username: "Lokesh",
  password: "Lokesh"
}]

async function registerUser(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({username, password: hashedPassword});

  } catch (err) {
    console.error('Error hashing password:', err);
    return res.status(500).json({ message: 'Error hashing password' });
  }
}

function loginUser(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const user = users.find(u => u.username === username);

  if(password === user.password){
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
    return res.status(200).json({ message: 'Login successful', token });
  }
  else{
    return res.status(400).json({ message: 'Invalid credentials' });
  }
}

module.exports = {
  registerUser,
  loginUser
};

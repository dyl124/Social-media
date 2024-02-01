const express = require('express');
const mongoose = require('mongoose');
const { Thought, User, Reaction } = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/////////////////////////////////////////THOUGHTS//////////////////////////////////



// Finds all documents
app.get('/all-thoughts', async (req, res) => {
  try {
    const result = await Thought.find({});
    res.status(200).json(result);
  } catch (err) {
    console.error('Error fetching all thoughts:', err.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Find thought by ID
app.get('/get-thought/:id', async (req, res) => {
  try {
    const result = await Thought.findById(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    console.error('Error fetching thought by ID:', err.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Creates a new document
app.post('/new-thought', async (req, res) => {
  try {
    const newThought = new Thought({ thoughtText: req.body.thoughtText, username: req.body.username });
    const savedThought = await newThought.save();
    res.status(200).json(savedThought);
  } catch (err) {
    console.error('Error creating new thought:', err.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Updates thought by ID
app.put('/update-thought/:id', async (req, res) => {
  try {
    const result = await Thought.findByIdAndUpdate(req.params.id, { thoughtText: req.body.thoughtText }, { new: true });
    res.status(200).json(result);
    console.log(`Updated thought: ${result}`);
  } catch (err) {
    console.error('Error updating thought:', err.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Deletes thought by ID
app.delete('/delete-thought/:id', async (req, res) => {
  try {
    const result = await Thought.findByIdAndDelete(req.params.id);
    res.status(200).json(result);
    console.log(`Deleted thought: ${result}`);    
  } catch (err) {
    console.error('Error deleting thought:', err.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
});


/////////////////////////////////////////////////////REACTIONS ///////////////////////////////////////////

app.post('/new-reaction', async (req, res) => {
  try {
    const newReaction = new Reaction({ reactionBody: req.body.reactionBody, username: req.body.username });
    const savedReaction = await newReaction.save();
    res.status(200).json(savedReaction);
    console.log(savedReaction);  // Corrected logging

  } catch (err) {
    console.error('Error creating new reaction:', err.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
});


// Finds all documents
app.get('/all-reactions', async (req, res) => {
  try {
    const result = await Reaction.find({});
    res.status(200).json(result);
  } catch (err) {
    console.error('Error fetching all reactions:', err.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Find reaction by ID
app.get('/reaction/:id', async (req, res) => {
  try {
    const result = await Reaction.findById(req.params.id);
    res.status(200).json(result);
    console.log(result)
  } catch (err) {
    console.error('Error fetching reaction by ID:', err.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Deletes reaction by ID
app.delete('/delete-reaction/:id', async (req, res) => {
  try {
    const result = await Reaction.findByIdAndDelete(req.params.id);
    res.status(200).json(result);
    console.log(`Deleted reaction: ${result}`);
  } catch (err) {
    console.error('Error deleting reaction:', err.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Updates reaction by ID
app.put('/update-reaction/:id', async (req, res) => {
  try {
    const result = await Reaction.findByIdAndUpdate(req.params.id, { username: req.body.username, reactionBody: req.body.reactionBody }, { new: true });
    res.status(200).json(result);
    console.log(`Updated reaction: ${result}`);
  } catch (err) {
    console.error('Error updating reaction:', err.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

//////////////////////////////////////USER//////////////////////////////////////////////////

app.post('/new-user', async (req, res) => {
  try {
    const newUser = new User({ username: req.body.username, email: req.body.email });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    console.error('Error creating new user:', err.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Deletes user by ID
app.delete('/delete-user/:id', async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(result);
    console.log(`Deleted user: ${result}`);
  } catch (err) {
    console.error('Error deleting user:', err.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Updates user by ID
app.put('/update-user/:id', async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(req.params.id, { username: req.body.username, email: req.body.email }, { new: true });
    res.status(200).json(result);
    console.log(`Updated user: ${result}`);
  } catch (err) {
    console.error('Error updating user:', err.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
});
mongoose
  .connect('mongodb+srv://admin:admin@cluster0.opfttz8.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully');

    // Start Express app after successful MongoDB connection
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

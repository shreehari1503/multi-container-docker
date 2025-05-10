const express=require('express')
const mongoose=require("mongoose")
const app=express();
app.use(express.json());
const list=require('./model/todo.js')
const connectWithRetry = () => {
  console.log('Attempting MongoDB connection...');
  mongoose.connect('mongodb://mymongo1:27017/todos')
    .then(() => console.log(' Connected to MongoDB'))
    .catch(err => {
      console.error(' MongoDB connection failed. Retrying in 5s...', err.message);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

app.get("/todos",async (req,res)=>{
 try{const l=await list.find();
res.json(l);}
 catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/todos', async (req, res) => {
  console.log("Received body:", req.body); // 👈 helps debug

  try {
    const newTodo = new list({
      title: req.body.title,
      completed: req.body.completed || false
    });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/todos/:id', async (req, res) => {
  try {
    const todo = await list.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.put('/todos/:id', async (req, res) => {
  try {
    const todo = await list.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
app.delete('/todos/:id', async (req, res) => {
  try {
    const todo = await list.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
PORT=3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
const express = require('express');
const { PrismaClient }  = require('@prisma/client');
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const port = 7000;

app.get("/", (req, res) => {
    res.send(`Server is running on port: ${port}`);
});

app.get('/api/todos', async (req, res) => {
    try {
        const allUsers = await prisma.todo.findMany();
        return res.json({
            success: true,
            data: allUsers
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error
        });
    }
});

app.post('/api/todos', async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTodo = await prisma.todo.create({
            data: {
                title,
                description
            }
        });
        return res.json({
            success: true,
            data: newTodo
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})


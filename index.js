const express = require('express'); 
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();
const {MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
app.use(cors());
app.use(express.json());

// MongoDb 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.4n6qqjh.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const bestDevelopersCollection = client.db('codersStackBox').collection('bestDevelopers');
        const recentProjectsCollection = client.db('codersStackBox').collection('recentProjects');
        const projectCategoriesCollection = client.db('codersStackBox').collection('projectCategories');
        const projectsCollection = client.db('codersStackBox').collection('projects');

        app.get('/bestDevelopers', async(req, res)=>{
            const query = {}
            const cursor = bestDevelopersCollection.find(query);
            const developers = await cursor.toArray();
            res.send(developers);
        });

        app.get('/bestDevelopers/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const developer = await bestDevelopersCollection.findOne(query);
            res.send(developer);
        });

        app.get('/recentProjects', async(req, res)=>{
            const query = {}
            const cursor = recentProjectsCollection.find(query);
            const projects = await cursor.toArray();
            res.send(projects);
        });

        app.get('/recentProjects/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const project = await recentProjectsCollection.findOne(query);
            res.send(project);
        })

        // All project categories get api
        app.get('/projectCategories', async(req, res)=> {
            const query = { };
            const projectCategories = await projectCategoriesCollection.find(query).toArray();
            res.send(projectCategories);
        })

        // All Projects get api
        app.get('/projects', async(req, res)=> {
            const query = { };
            const projects = await projectsCollection.find(query).toArray();
            res.send(projects);
        })

        // Category id based projects get api
        app.get('/projects/:id', async(req, res)=> {
            const id = req.params.id;
            const query = { categoryId: id };
            const categoryBasedProjects = await projectsCollection.find(query).toArray();
            res.send(categoryBasedProjects);
        })

        // single id based one project get api
        app.get('/project/:id', async(req, res)=> {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const singleIdBasedProject = await projectsCollection.findOne(query);
            res.send(singleIdBasedProject);
        })


    }
    finally{

    }
}

run().catch(error => console.log(error));

app.get('/', async(req, res)=>{
    res.send('CodersStackBox server is running');
})

app.listen(port, ()=> console.log(`CodersStackBox sever running on ${port}`));
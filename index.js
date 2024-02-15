const express = require('express');
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./database.db");
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express();
app.use(cors())
 

//middleware to allow all post requests to parse data in the request body
app.use(bodyParser.json());

app.post('/createProject', function (req, res) {
    const projects = req.body;
    let dataCreated= [];
    
    let numQueries = 0;
    let totalQueries = 0;

    for(let project of projects)
    {

        console.log("checking if data object has all the propertise of a parent project");

        if(project.id && project.name && project.image.link && project.url && project.groups)
        {
            let id = project.id;
            let name = project.name;
            let image = project.image.link;
            let groups = project.groups;
            let url = project.url;

            console.log("now uploading parent project into database");

            let query = db.prepare("INSERT INTO parent_projects (id, name,image,url) VALUES (?,?,?,?)");
            query.run(id,name,image,url,(err) => {
                totalQueries++;
                if (err) {
                    dataCreated.push({project:name,error:err.message});
                } else {
                    // keep track of the differrent projects created thus far
                    dataCreated.push({type:"project",[name]:"created"});
                    console.log("project: " + name + " uploaded");
                }
                
                if (totalQueries === numQueries) {
                    res.json(dataCreated);
                }
            });

            
            numQueries++;

            for(let group of groups)
            {
                console.log("request has groups key in it therefore checking if groups object has vaild values");
                if(group_id && group_name && group_url)
                {
                    let group_id = group.id;
                    let group_name = group.name;
                    let group_url = group.url;

                    console.log("now uploading group into database");
                    query = db.prepare("INSERT INTO groups (id, name,url,parent_name) VALUES (?,?,?,?)");
                    query.run(group_id,group_name,group_url,name,(err) => {
                        totalQueries++;
                        if (err) {
                            dataCreated.push({group:group_name,error:err.message});
                        } else {
                            // keep track of the differrent groups created thus far
                            dataCreated.push({type:"group",[group_name]:"created"});
                            console.log("group: " + group_name + " uploaded");
                        }

                        if (totalQueries === numQueries) {
                            res.json(dataCreated);
                        }
                    });
                }else
                {
                    console.log("invaild group_id/group_name/group_url/group_parent_project");
                    res.send('one of your group objects has an invaild group_id/group_name/group_url/group_parent_project');
                }
            }
        }else if(project.groups)
        {
            for(let group of project.groups)
            {
                console.log("checking if data object has all the propertise of a group");

                if(group.id && group.name && group.url && group.parent_project)
                {
                    let group_id = group.id;
                    let group_name = group.name;
                    let group_url = group.url;
                    let group_parent_project = group.parent_project;

                    console.log("now uploading group into the database");

                    query = db.prepare("INSERT INTO groups (id, name,url,parent_name) VALUES (?,?,?,?)");
                    query.run(group_id,group_name,group_url,group_parent_project,(err) => {
                        totalQueries++;
                        if (err) {
                            dataCreated.push({group:group_name,error:err.message});
                        } else {
                            // keep track of the differrent projects created thus far
                            dataCreated.push({type:"group",[group_name]:"created"});
                            console.log("group: " + group_name + " uploaded");

                        }

                        if (totalQueries === numQueries) {
                            res.json(dataCreated);
                        }
                    });
                }else
                {
                    console.log("invaild group_id/group_name/group_url/group_parent_project");
                    res.send('one of your objects has an invaild group_id/group_name/group_url/group_parent_project');
                }
                
                 numQueries++;
            }
        }else
        {
            console.log("Invaild json format please referre to documentation on how to format data");
            res.send('Invaild json format/data please referre to api documentation on how to format data');
        }
    }
  })

  app.get('/projects', function (req, res) {
    let group = req.query.group
    let query = db.prepare("SELECT groups.id,groups.name,groups.url,groups.parent_name,parent_projects.image\
    FROM groups\
    JOIN parent_projects\
    ON groups.parent_name = parent_projects.name\
    WHERE groups.name LIKE ?");
    query.all(`%${group}%`, (err, row) => {
        if (err) {
            console.error(err.message);
        } else {
            // Send the row as the response
            res.json(row);
        }
    })
  })

app.listen(3000 , 'localhost');

console.log('Now listening port 3000');
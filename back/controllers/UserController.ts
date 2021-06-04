import UserModel from '../models/UserModel';
import { MongoClient } from 'mongodb';
import mongoose, { Schema } from 'mongoose';

export class Task {
    name: string;
    description: string;
    opinion: Opinion;

    constructor(name: string, opinion: Opinion) {
        this.name = name;
        this.opinion = opinion;
        this.description = "This is tech that creates new blocks and replace them as new on html page";
    }
}

export enum Opinion {
    Recommended = "#9900ff",
    Alternative = "#39761d",
    Extra = "#9c9b9a",
}

export class Node {
    name: string;
    opinion: Opinion | undefined;
    childNodes: Node[] | undefined;
    tasks: Task[] | undefined;

    constructor(name: string, options?: any) {
        this.name = name;
        if (options) {
            this.opinion = options.opinion;
            this.childNodes = options.childNodes;
            this.tasks = options.tasks;
        }
    }
}

export default class UserController {
    userModel: UserModel;

    constructor() {
        this.userModel = new UserModel();
    }

    public testdb = (req: any, res: any): void => {

        const roadmapScheme = new Schema({
            name: { type: String },
            opinion: { type: Opinion },
            childNodes: { type: [Schema.Types.Mixed] },
            tasks: { type: [Schema.Types.Mixed] }
        });

        const Roadmap = mongoose.model("Roadmap", roadmapScheme);


        Roadmap.insertMany([
            {
                name: "Internet",
                childNodes: [
                    new Roadmap({})
                ],
            }
        ]).then(() => {
            console.log("Сохранен объект");
            mongoose.disconnect();  // отключение от базы данных
        })
            .catch((err: any) => {
                console.log(err);
                mongoose.disconnect();
            });


        /*         this.mongoClient.connect((err, client) => {
                    if (err) {
                        return console.log(err);
                    }
        
                    // взаимодействие с базой данных
                    const db = client.db("testdb");
                    const collection = db.collection("users");
        
                         collection.insertMany(roadmapData, (err, result) => {
                            if (err) {
                                return console.log(err);
                            }
            
                            console.log(result);
                            client.close();
                        }) 
        
                         collection.find({ name: "Keep learning" }).toArray((err, result) => {
                            console.log(result);
            
                            client.close();
            
                        }) 
        
                }); */
        res.send("hello");
    }
}
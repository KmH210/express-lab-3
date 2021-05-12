import express from "express"
import {assignments, displayAssignments} from "../models/assignment-database";

const routes = express.Router();

//Get /api/assignments
// Action:None
// Response

routes.get("/api/assignments", (req, res) =>{
    res.json(displayAssignments());
    //can also jsut do res.json(assignments);
    //that will work as well instead of creating
    //the function.
    res.status(200);
});

export default routes;
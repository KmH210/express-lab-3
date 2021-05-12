import express from "express";
import Assignment from "../models/assignment";
import { assignments, deleteAssignment, pushAssignment, readAssignmentById, updateAssignment}  from "../models/assignment-database";

const routes = express.Router();

routes.get("/", (req, res) => {
    res.render("homepage", { assignments})
});

routes.get("/add", (req, res) => {
    res.render("assignment-form");
});

routes.post("/add", (req, res) => {
    let assignment: Assignment = {
        name: req.body.name,
        score: parseInt(req.body.score),
        total: parseInt(req.body.total),
        completed: !!req.body.completed
    };
    pushAssignment(assignment);
    res.render("assignment-result", { assignment });
});

routes.get("/:id/delete", (req, res) => {
    const id= parseInt(req.params.id);
    const assignment = readAssignmentById(id)
    if(assignment){
        deleteAssignment(id);
        res.render("delete-confirmation", {name: assignment.name});
    }else {
        res.status(404).render("error/not-found");
    }

});

routes.get('/:id/edit', (req, res) => {
  const id: number = parseInt(req.params.id);
  const assignment = readAssignmentById(id);
  if(assignment) {
  res.render('edit-assignment', { assignment })
  } else {
    res.status(404).render('error/not-found')
  }
});
routes.post('/:id/edit-submit', (req, res) => {
  const assignment: Assignment = {
      id: parseInt(req.params.id),
      name: req.body.name,
      score: parseInt(req.body.score),
      total: parseInt(req.body.total),
      completed: !!req.body.completed,
  }
  if(updateAssignment(assignment)) {
    res.render('edit-confirmation', { assignment });
  } else {
      res.status(404).render('error/not-found')
  }
});


export default routes;
import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { createNotes } from "../actions/noteActions";
import Mscreen from "./Mscreen";
import ReactMarkdown from "react-markdown";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const noteCreate = useSelector((state) => state.noteCreate);
  const { loading, note, error } = noteCreate;
  console.log(note);
  const handleClick = (e) => {
    e.preventDefault();
    if (!title || !content || !category) {
      return swal({
        text: "Please fill all fields",
        icon: "warning",
      });
    }
    dispatch(createNotes(title, content, category));
    navigate("/mynotes");
    resetHandler();
  };
  const resetHandler = () => {
    setTitle("");
    setContent("");
    setCategory("");
  };
  return (
    <>
      <Mscreen title="Create a Note">
        <Card>
          <Card.Header>Create a new note</Card.Header>
          <Card.Body>
            <Form onSubmit={handleClick}>
              <Form.Group controlId="Title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="title"
                  value={title}
                  placeholder="Enter the title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="Content">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  type="content"
                  value={content}
                  placeholder="Enter the content"
                  onChange={(e) => setContent(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="Category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="category"
                  value={category}
                  placeholder="Enter the category"
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" variant="primary" className="mt-3">
                Create Note
              </Button>
              <Button
                variant="danger"
                onClick={resetHandler}
                className="mt-3 mx-2"
              >
                Reset fields
              </Button>
            </Form>
          </Card.Body>
          <Card.Footer className="text-muted">
            Creating on - {new Date().toLocaleDateString()}
          </Card.Footer>
        </Card>
      </Mscreen>
    </>
  );
};

export default CreateNote;

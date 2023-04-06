import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Mscreen from "./Mscreen";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import { updateNotes } from "../actions/noteActions";
const SingleNote = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { loading, error } = noteUpdate;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const resetHandler = () => {
    setTitle("");
    setContent("");
    setCategory("");
  };
  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(
        `/api/notes/${id}/`
      );
      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
    };
    fetching();
  }, [id, date]);
  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateNotes(id, title, content, category));
    if (!title || !content || !category) {
      return;
    }
    resetHandler();
    navigate("/mynotes");
  };
  return (
    <>
      <Mscreen title="Edit Note">
        <Card>
          <Card.Header>Edit Your note</Card.Header>
          <Card.Body>
            <Form onSubmit={updateHandler}>
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
                Update Note
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Mscreen>
    </>
  );
};

export default SingleNote;

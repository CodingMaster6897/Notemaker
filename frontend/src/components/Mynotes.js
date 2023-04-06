import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteNotes, listNotes } from "../actions/noteActions";
import swal from "sweetalert";
import Mscreen from "./Mscreen";
import ReactMarkdown from "react-markdown";

const Mynotes = () => {
  const dispatch = useDispatch();
  const noteList = useSelector((state) => state.noteList);
  const navigate = useNavigate();
  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;
  const noteDelete = useSelector((state) => state.noteDelete);
  const { success: successDelete } = noteDelete;
  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, notes, error } = noteList;
  const { userInfo } = userLogin;
  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      navigate("/");
    }
  }, [userInfo, successUpdate, successDelete,  successCreate]);
  return (
    <Mscreen title={`Welcome back ${userInfo.name}`}>
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create Note
        </Button>
      </Link>
      {notes?.reverse().map((note) => (
        <Accordion defaultActiveKey={["0"]}>
          <Accordion.Item eventkey="0">
            <Card style={{ margin: 10 }}>
              <Card.Header style={{ display: "flex" }}>
                <span
                  style={{
                    color: "black",
                    textDecoration: "none",
                    flex: 1,
                    cursor: "pointer",
                    alignSelf: "center",
                    fontSize: 18,
                  }}
                >
                  <Accordion.Button as={Card.Text} variant="link">
                    {note.title}
                  </Accordion.Button>
                </span>
                <div>
                  <Button href={`/note/${note._id}`}>Edit</Button>
                  <Button
                    variant="danger"
                    className="mx-2"
                    onClick={() => {
                      swal({
                        title: "Are you sure?",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                      }).then((willDelete) => {
                        if (willDelete) {
                          dispatch(deleteNotes(note._id));
                          swal("Note has been deleted!", {
                            icon: "success",
                          });
                        }
                      });
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Header>
              <Accordion.Collapse>
                <Card.Body>
                  <h4>
                    <Badge bg="success" text="light">
                      Category -{note.category}
                    </Badge>
                  </h4>

                  <blockquote className="blockquote mb-0">
                    <ReactMarkdown>{note.content}</ReactMarkdown>
                    <footer className="blockquote-footer">
                      Created on{" "}
                      <cite title="Source Title">
                        {note.createdAt.substring(0, 10)}
                      </cite>
                    </footer>
                  </blockquote>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion.Item>
        </Accordion>
      ))}
    </Mscreen>
  );
};

export default Mynotes;

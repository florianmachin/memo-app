import React, { useState } from "react";
import { BsFillTrashFill } from "react-icons/all";
import axios from "axios";
import { routes } from "../routes";
import * as CSS from "csstype";
import { TableCell, TableRow } from "@material-ui/core";
import "../styles/PostItItem.css";
import { PostItModel } from "../models/PostItModel";
import {Alert, Dialog, DialogContent, DialogContentText, DialogTitle, Snackbar} from "@mui/material";

export default function ({ id, title, date, index }: PostItModel) {
  const [isDone, setIsDone] = useState(
    localStorage.getItem("done-" + id) === "true"
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  return (
      <>
        <Snackbar open={isDelete} autoHideDuration={6000} onClose={() => setIsDelete(false)}>
          <Alert onClose={() => setIsDelete(false)} severity="success" >
            Supprimée avec succès
          </Alert>
        </Snackbar>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div style={styles.note}>
        <DialogTitle>{date}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{textOverflow: 'ellipsis'}}>
            {title}
          </DialogContentText>
        </DialogContent>
        </div>
      </Dialog>
    <TableRow
      key={id}
      style={isDone ? styles.done : styles.notdone}
      className={index % 2 ? "odd" : "even"}
    >
      <TableCell>
        <input
          type="checkbox"
          checked={isDone}
          onChange={(e) => {
            localStorage.setItem("done-" + id, `${e.target.checked}`);
            setIsDone(e.target.checked);
          }}
        />
      </TableCell>
      <TableCell onClick={() => setIsOpen(true)} style={{cursor: "pointer"}}>
        <span>{title}</span>
      </TableCell>
      <TableCell onClick={() => setIsOpen(true)} style={{cursor: "pointer"}}>
        <span>{date}</span>
      </TableCell>
      <TableCell >
        <div>
          <a
            href="#"
            onClick={() => {
              axios.delete(routes.url + routes.postit + "/" + id).then((r) => {
                console.log(r.data);
                setIsDelete(true)
              });
            }}
          >
            <BsFillTrashFill />
          </a>
        </div>
      </TableCell>
    </TableRow>
        </>
  );
}

const styles: {
  done: CSS.Properties;
  item: CSS.Properties;
  notdone: CSS.Properties;
  note: CSS.Properties;
} = {
  done: {
    opacity: "0.3",
    textDecoration: "line-through",
  },
  notdone: {},
  item: {
    width: "500px",
  },
  note: {
    backgroundColor: "yellow",
    width: "500px",
    minHeight: "500px"
  }
};

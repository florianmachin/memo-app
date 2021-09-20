import React, { useState } from "react";
import { BsFillTrashFill } from "react-icons/all";
import axios from "axios";
import { routes } from "../routes";
import * as CSS from "csstype";
import { TableCell, TableRow } from "@material-ui/core";
import "../styles/PostItItem.css";
import { PostItModel } from "../models/PostItModel";

export default function ({ id, title, date, index }: PostItModel) {
  const [isDone, setIsDone] = useState(
    localStorage.getItem("done-" + id) === "true"
  );

  return (
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
      <TableCell>
        <span>{title}</span>
      </TableCell>
      <TableCell>
        <span>{date}</span>
      </TableCell>
      <TableCell>
        <div>
          <a
            href="#"
            onClick={() => {
              axios.delete(routes.url + routes.postit + "/" + id).then((r) => {
                console.log(r.data);
              });
            }}
          >
            <BsFillTrashFill />
          </a>
        </div>
      </TableCell>
    </TableRow>
  );
}

const styles: {
  done: CSS.Properties;
  item: CSS.Properties;
  notdone: CSS.Properties;
} = {
  done: {
    opacity: "0.3",
    textDecoration: "line-through",
  },
  notdone: {},
  item: {
    width: "500px",
  },
};

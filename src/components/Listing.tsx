import React, { useEffect, useState } from "react";
import axios from "axios";
import { routes } from "../routes";
import PostItForm from "./PostItForm";
import CSS from "csstype";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Fab } from "@mui/material";
import PostItItem from "./PostItItem";
import SearchBar from "../utils/SearchBar";
import { PostItModel } from "../models/PostItModel";

export default function Listing() {
  const [input, setInput] = useState("");
  const [data, setData] = useState<PostItModel[]>([]);
  const [dataDefault, setDataDefault] = useState([]);
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState();

  const updateInput = async (input: any) => {
    const filtered = dataDefault.filter((row) => {
      // @ts-ignore
      return row.title.toLowerCase().includes(input.toLowerCase());
    });
    setInput(input);
    setData(filtered);
  };

  useEffect(() => {
    axios.get(routes.url + routes.postit).then((r) => {
      setData(r.data);
      setDataDefault(r.data);
      setTotal(r.data.length);
      console.log(r.data);
    });
  }, [data]);

  return (
    <div style={styles.content}>
      <div style={{ display: "flex", gap: "10px" }}>
        <h3>Total: {total}</h3>
        <Fab color="primary" onClick={() => setOpen(true)}>
          +
        </Fab>
        <SearchBar keyword={input} setKeyword={updateInput} />
      </div>
      <PostItForm open={open} setOpen={setOpen} />
      <TableContainer style={styles.table}>
        <Table>
          <colgroup>
            <col width={"5%"} />
            <col width={"35%"} />
            <col width={"15%"} />
          </colgroup>
          <TableHead>
            <TableRow style={{ backgroundColor: "#1565C0" }}>
              <TableCell style={{ color: "white" }}>Fait</TableCell>
              <TableCell style={{ color: "white" }}>Titre</TableCell>
              <TableCell style={{ color: "white" }}>Date</TableCell>
              <TableCell style={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="list">
            {data.map(({ id, title, date }, index) => (
              <PostItItem id={id} title={title} date={date} index={index} />
            ))}
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} style={{ textAlign: "center" }}>
                  Pas d'enregistrements correspondants.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

const styles: {
  table: CSS.Properties;
  content: CSS.Properties;
} = {
  table: {
    maxWidth: "800px",
    borderRadius: "10px",
  },
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
};

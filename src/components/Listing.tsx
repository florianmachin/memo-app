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
  const [input, setInput] = useState(""); // SearchBar
  const [data, setData] = useState<PostItModel[]>([]); // Données du tableau
  const [dataDefault, setDataDefault] = useState([]); //Utilisé afin de réinitialiser la SearchBar après une recherche
  const [open, setOpen] = useState(false); // Ouvrir la modal
  const [total, setTotal] = useState();
  const [fetchData, setFetchData] = useState(true);

  const triggerDataFetch = () => setFetchData((t) => !t); //Actualiser le tableau sans infinite loop

  const updateInput = async (input: any) => {
    const filtered = dataDefault.filter((row) => {
      // @ts-ignore
      return row.title.includes(input);
    });
    setInput(input);
    setData(filtered);
  };

  useEffect(() => {
    axios.get(routes.url + routes.posts).then((r) => {
      setData(r.data);
      setDataDefault(r.data);
      setTotal(r.data.length);
    });
  }, [fetchData]);
  return (
    <div style={styles.content}>
      <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
        <h3>Total: {total}</h3>
        <div style={{ display: "flex", gap: "10px" }}>
          <Fab color="primary" onClick={() => setOpen(true)}>
            +
          </Fab>
          <SearchBar keyword={input} setKeyword={updateInput} />
        </div>
      </div>
      <PostItForm
        open={open}
        setOpen={setOpen}
        triggerDataFetch={triggerDataFetch}
      />
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
            {data
              .map(({ id, title, date }, index) => (
                <PostItItem
                  id={id}
                  title={title}
                  date={date}
                  index={index}
                  triggerDataFetch={triggerDataFetch}
                />
              ))
              .sort((a) => a.props.date)}
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
    alignItems: "baseline",
    justifyContent: "space-around",
  },
};

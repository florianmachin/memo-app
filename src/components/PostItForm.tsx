import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import { routes } from "../routes";
import * as Yup from "yup";

const FormSchema = Yup.object().shape({
  title: Yup.string().max(60, "Trop grand!").required("Requis"),
});

type Props = {
  open: any;
  setOpen: any;
  triggerDataFetch: any;
};

export default function PostItForm({ open, setOpen, triggerDataFetch }: Props) {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <div>
      <Snackbar
        open={isSuccess}
        autoHideDuration={6000}
        onClose={() => setIsSuccess(false)}
      >
        <Alert onClose={() => setIsSuccess(false)} severity="success">
          Ajoutée avec succès !
        </Alert>
      </Snackbar>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Ajouter une note</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              title: "",
              date: new Date().toDateString(),
            }}
            validationSchema={FormSchema}
            onSubmit={(values) => {
              axios.post(routes.url + routes.posts, values).then((r) => {
                setIsSuccess(true);
                console.log(r.data);
                setOpen(false);
                triggerDataFetch();
              });
            }}
          >
            {({ errors, touched }) => (
              <Form className="form">
                <div className="input-group form-group d-flex flex-column">
                  <Field
                    name="title"
                    label="Nom"
                    className="form-control w-100 mt-2"
                  />
                  {errors.title && touched.title ? (
                    <div className="error">{errors.title}</div>
                  ) : null}
                </div>
                <DialogActions>
                  <Button type="submit">Submit</Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import { routes } from "../routes";
import * as Yup from "yup";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const FormSchema = Yup.object().shape({
  title: Yup.string().max(30, "Trop grand!").required("Requis"),
});

type Props = {
  open: any;
  setOpen: any;
};

export default function PostItForm({ open, setOpen }: Props) {
  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false);

  return (
    <div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ ...style }}>
          <Formik
            initialValues={{
              title: "",
              date: new Date().toJSON(),
              isDone: false,
            }}
            validationSchema={FormSchema}
            onSubmit={(values) => {
              setIsSuccessMessageVisible(false);
              axios.post(routes.url + routes.postit, values).then((r) => {
                setIsSuccessMessageVisible(true);
                setTimeout(() => {
                  setIsSuccessMessageVisible(false);
                }, 10000);
                console.log(r.data);
                setOpen(false);
              });
            }}
          >
            {({ errors, touched }) => (
              <Form className="form">
                <div
                  className={isSuccessMessageVisible ? "success" : "d-none"}
                  id="success-message"
                >
                  Envoyé avec succès
                </div>
                <div className="input-group form-group d-flex flex-column">
                  <span>Nom</span>
                  <Field name="title" className="form-control w-100" />
                  {errors.title && touched.title ? (
                    <div className="error">{errors.title}</div>
                  ) : null}
                </div>
                <button type="submit">Submit</button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}

import React from "react";
import { Container, Typography } from "@mui/material";
import { default as SaveContact } from "../components/contact/Save";
import { default as GetContact } from "../components/contact/Get";

const Contact = () => {
  return (
    <div className="Contacts">
      <Container>
        <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>Contacts</Typography>
        <SaveContact />
        <GetContact />
      </Container>
    </div>
  );
}

export default Contact;

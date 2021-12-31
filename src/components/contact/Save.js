import React, { useState } from 'react';
import { Alert, AlertTitle, Button, Card, CardActions, CardContent, Grid, TextField, Typography } from "@mui/material"
import { useSaveContact } from '../../queries/contact';
import { getHelperText, shouldShowErrorFor } from '../../utils/error';

const Add = () => {
  const saveContact = useSaveContact();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSave = (event) => {
    event.preventDefault();

    const contact = {
      firstName,
      lastName,
      email,
      phone,
    };

    saveContact.mutate(contact);
  };

  return (
    <div className="Save">
      <Card sx={{ mb: 1 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Save
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} md={3}>
              <TextField
                error={shouldShowErrorFor(saveContact, 'firstName')}
                helperText={getHelperText(saveContact, 'firstName')}
                type="text"
                label="First"
                defaultValue=""
                size="small"
                fullWidth
                margin="dense"
                onChange={(event) => setFirstName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                error={shouldShowErrorFor(saveContact, 'lastName')}
                helperText={getHelperText(saveContact, 'lastName')}
                type="text"
                label="Last"
                defaultValue=""
                size="small"
                fullWidth
                margin="dense"
                onChange={(event) => setLastName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                error={shouldShowErrorFor(saveContact, 'phone')}
                helperText={getHelperText(saveContact, 'phone')}
                type="text"
                label="Phone"
                defaultValue=""
                size="small"
                fullWidth
                margin="dense"
                onChange={(event) => setPhone(event.target.value)}
                inputProps={{ maxLength: 10 }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                error={shouldShowErrorFor(saveContact, 'email')}
                helperText={getHelperText(saveContact, 'email')}
                type="email"
                label="Email"
                defaultValue=""
                size="small"
                fullWidth
                margin="dense"
                onChange={(event) => setEmail(event.target.value)}
              />
            </Grid>
          </Grid>
          {saveContact.isError &&
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {saveContact.error.response.data.message}
            </Alert>
          }

          {saveContact.isSuccess &&
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              Contact saved successfully
            </Alert>
          }
        </CardContent>
        <CardActions>
          <Button size="small" variant="contained" disableElevation onClick={handleSave} disabled={saveContact.isLoading}>
            Save
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default Add;

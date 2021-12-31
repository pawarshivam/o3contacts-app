import { Button, Card, CardActions, CardContent, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useState } from "react";
import { useGetContact, useDeleteContact } from "../../queries/contact";

const Get = () => {
    const getContact = useGetContact();
    const deleteContact = useDeleteContact();

    const [selected, setSelected] = useState(null);

    const handleDelete = () => {
        deleteContact.mutate(selected);
    }

    return (
        <div className="Get">
            <Card sx={{ mb: 1 }}>
                <TableContainer>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell key={0} align="left">Action</TableCell>
                                <TableCell key={1} align="left">ID</TableCell>
                                <TableCell key={2} align="left">First</TableCell>
                                <TableCell key={3} align="left">Last</TableCell>
                                <TableCell key={4} align="left">Email</TableCell>
                                <TableCell key={5} align="left">Phone</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {getContact.data.data.contacts.map((contact) =>
                                <TableRow key={contact._id}>
                                    <TableCell key={0} padding="checkbox">
                                        <Checkbox
                                            checked={selected === contact._id}
                                            onClick={(event) => setSelected(event.target.checked ? contact._id : null)}
                                            color="primary"
                                        />
                                    </TableCell>
                                    <TableCell key={1} align="left">{contact._id}</TableCell>
                                    <TableCell key={2} align="left">{contact.firstName}</TableCell>
                                    <TableCell key={3} align="left">{contact.lastName}</TableCell>
                                    <TableCell key={4} align="left">{contact.email}</TableCell>
                                    <TableCell key={5} align="left">{contact.phone}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <CardContent>
                    {deleteContact.isError &&
                        <Typography variant="body2" color="error">
                            {deleteContact.error.response.data.message}
                        </Typography>
                    }
                </CardContent>
                <CardActions>
                    <Button size="small" color="error" disabled={selected === null || deleteContact.isLoading} onClick={handleDelete}>
                        Delete
                    </Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default Get;
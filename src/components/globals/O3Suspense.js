import { CircularProgress, Grid } from "@mui/material";

const O3Suspense = () => {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: window.innerHeight - 48 }}
        >
            <CircularProgress />
        </Grid>
    )
}

export default O3Suspense;
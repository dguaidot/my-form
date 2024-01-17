// Importa el componente de formulario
import { Grid, Typography } from '@mui/material';
import MyForm from './MyForm';

// Componente principal
const App = () => {
  return (
    <Grid container>
     <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>

      </Grid>
      <Typography
      variant='h4'
      >MI FORMULARIO</Typography>
      {/* Renderiza el formulario */}
      <MyForm />
    </Grid>
  );
};

export default App;

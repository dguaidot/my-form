// Importa el componente de formulario
import { Grid, Typography } from '@mui/material';
import MyForm from './MyForm';

// Componente principal
const App = () => {
  return (
    <Grid container spacing={2}style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
     <Grid item xs={12} sm={12} md={11} lg={11.5} xl={11.5}>

      <Typography
      variant='h3'
      >MI FORMULARIO</Typography>
      {/* Renderiza el formulario */}
      <MyForm />
      </Grid>
    </Grid>
  );
};

export default App;

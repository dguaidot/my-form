import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Grid, List,  Accordion, AccordionSummary, AccordionDetails, Typography, ListItemSecondaryAction, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';

const MyForm = () => {
  const { control, handleSubmit, formState, reset } = useForm();
  const { errors, isDirty } = formState;
  const [formDataList, setFormDataList] = useState([]);

  const onSubmit = (data) => {
    // Validar que el nombre no se repita
    const isNameDuplicate = formDataList.some(formData => formData.name === data.name);

    if (!isNameDuplicate) {
      // Validar formato de cédula o RIF
      const isCIRIFValid = /^[VE]\d{7,9}$/.test(data.ciRif);

      // Validar formato de correo electrónico
      const isEmailValid = /\S+@\S+\.\S+/.test(data.email);

      if (isCIRIFValid && isEmailValid) {
        const isDuplicate = formDataList.some(formData => formData.phone === data.phone || formData.website === data.website);

        if (!isDuplicate) {
          setFormDataList([...formDataList, data]);
          reset(); // Resetear los campos del formulario después de enviar
        } else {
          console.error('Error: Teléfono o sitio web duplicado');
        }
      } else {
        console.error('Error: Cédula/RIF o correo electrónico inválido');
      }
    } else {
      console.error('Error: Nombre duplicado');
    }
  };

  const handleEdit = (index) => {
    const formDataToEdit = formDataList[index];
    reset(formDataToEdit); // Establecer los valores del formulario para editar
    const updatedList = formDataList.filter((_, i) => i !== index);
    setFormDataList(updatedList);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: 'Este campo es obligatorio' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nombre"
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ''}
              />
            )}
          />
          <Controller
            name="username"
            control={control}
            defaultValue=""
            rules={{ required: 'Este campo es obligatorio' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nombre de usuario"
                error={!!errors.username}
                helperText={errors.username ? errors.username.message : ''}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: 'Este campo es obligatorio',
              pattern: { value: /\S+@\S+\.\S+/, message: 'Correo electrónico inválido' },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Correo electrónico"
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ''}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            rules={{ required: 'Este campo es obligatorio' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Teléfono"
                error={!!errors.phone}
                helperText={errors.phone ? errors.phone.message : ''}
              />
            )}
          />
          <Controller
            name="website"
            control={control}
            defaultValue=""
            rules={{
              required: 'Este campo es obligatorio',
              pattern: { value: /^((?!example\.com).)*$/, message: 'Sitio web inválido' },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Sitio web"
                error={!!errors.website}
                helperText={errors.website ? errors.website.message : ''}
              />
            )}
          />
          <Controller
            name="ciRif"
            control={control}
            defaultValue=""
            rules={{
              required: 'Este campo es obligatorio',
              pattern: { value: /^[VE]\d{7,9}$/, message: 'Formato de RIF inválido' },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="CI o RIF"
                error={!!errors.ciRif}
                helperText={errors.ciRif ? errors.ciRif.message : ''}
              />
            )}
          />

          <Button type="submit" variant="contained" color="primary" disabled={!isDirty || Object.keys(errors).length > 0}>
            Enviar
          </Button>
        </form>
      </Grid>
      <Grid item xs={6}>
        <List>
         <Typography 
         variant="h5"
         >Lista de Usuarios</Typography>
          {formDataList.map((formData, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{formData.username}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <strong>Correo:</strong> {formData.email}<br />
                  <strong>Teléfono:</strong> {formData.phone}<br />
                  <strong>Sitio web:</strong> {formData.website}<br />
                  <strong>CI/RIF:</strong> {formData.ciRif}<br />
                  {/* Agrega aquí el resto de la información que deseas mostrar */}
                  {/* ... */}
                </Typography>
              </AccordionDetails>
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(index)}>
                  <EditIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </Accordion>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default MyForm;

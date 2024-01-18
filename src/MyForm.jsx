import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Grid, List, Accordion, AccordionSummary, AccordionDetails, Typography, ListItemSecondaryAction, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';


const MyForm = () => {
   const { control, handleSubmit, formState, reset } = useForm();
   const { errors, isDirty } = formState;
   const [formDataList, setFormDataList] = useState([]);
   const [usuariosPredeterminados, setUsuariosPredeterminados] = useState([]);

   useEffect(() => {
      const loadDefaultUsers = async () => {
         try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const defaultUsers = await response.json();
            setUsuariosPredeterminados(defaultUsers);
         } catch (error) {
            console.error('Error al cargar usuarios predeterminados', error);
         }
      };

      loadDefaultUsers();
   }, []);

   const [editingIndex, setEditingIndex] = useState(null);

   const onSubmit = (data) => {
      const isNameDuplicate = formDataList.some(formData => formData.name === data.name);

      if (!isNameDuplicate) {
         const isEmailValid = /\S+@\S+\.\S+/.test(data.email);

         if (isEmailValid) {
            const isDuplicate = formDataList.some(formData => formData.phone === data.phone || formData.website === data.website);

            if (!isDuplicate) {
               const phoneNumber = data.countryCode ? `${data.countryCode} ${data.phone}` : data.phone;

               setFormDataList([...formDataList, { ...data, phone: phoneNumber }]);
               reset(); // Resetear los campos del formulario después de enviar
            } else {
               console.error('Error: Teléfono o sitio web duplicado');
            }
         } else {
            console.error('Error: Correo electrónico inválido');
         }
      } else {
         console.error('Error: Nombre duplicado');
      }
      setEditingIndex(null);
   };

   const handleEdit = (index) => {
      const formDataToEdit = formDataList[index];
      reset(formDataToEdit);
      setEditingIndex(index);
   };
   const renderButtonLabel = () => {
      return editingIndex !== null ? 'Editar' : 'Enviar';
   };
   const renderFormHeader = () => {
      return (
         <Typography variant="h5">
            {editingIndex !== null ? 'EDITAR USUARIO' : 'NUEVO USUARIO'}
         </Typography>
      );
   };

   const handleEditUsuarioPredeterminado = (index) => {
      const usuarioToEdit = usuariosPredeterminados[index];

      // Puedes realizar acciones de edición aquí, como abrir un diálogo de edición
      // o cargar los datos del usuario predeterminado en el formulario de edición.

      // Por ejemplo, si deseas cargar los datos en el formulario, podrías hacer algo como:
      reset(usuarioToEdit);

      // Elimina el usuario predeterminado de la lista actual
      const updatedList = usuariosPredeterminados.filter((_, i) => i !== index);

      // Agrega el usuario editado al principio de la lista
      setUsuariosPredeterminados([usuarioToEdit, ...updatedList]);
   };



   const handleDelete = (index) => {
      const updatedList = [...formDataList];
      updatedList.splice(index, 1);
      setFormDataList(updatedList);
   };
   const handleDeleteUsuarioPredeterminado = (index) => {
      const updatedList = [...usuariosPredeterminados];
      updatedList.splice(index, 1);
      setUsuariosPredeterminados(updatedList);
   };

   const renderUsuariosPrincipales = () => {
      return usuariosPredeterminados.map((usuario, index) => (
         <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
               <Typography>{usuario.username}</Typography>
            </AccordionSummary>
            <AccordionDetails>
               <Typography>
                  <strong>Nombre de usuario:</strong> {usuario.username}<br />
                  <strong>Nombre:</strong> {usuario.name}<br />
                  <strong>Correo:</strong> {usuario.email}<br />
                  <strong>Teléfono:</strong> {usuario.phone}<br />
                  <strong>Sitio web:</strong> {usuario.website}<br />
               </Typography>
            </AccordionDetails>
            <ListItemSecondaryAction>
               <IconButton edge="end" aria-label="edit" onClick={() => handleEditUsuarioPredeterminado(index)}>
                  <EditIcon />
               </IconButton>
               <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteUsuarioPredeterminado(index)}>
                  <DeleteIcon />
               </IconButton>
            </ListItemSecondaryAction>
         </Accordion>
      ));
   };

   const renderFormDataList = () => {
      return formDataList.map((formData, index) => (
         <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
               <Typography>{formData?.username}</Typography>
            </AccordionSummary>
            <AccordionDetails>
               <Typography>
                  <strong>Nombre de usuario:</strong> {formData?.username}<br />
                  <strong>Nombre:</strong> {formData?.name}<br />
                  <strong>Correo:</strong> {formData?.email}<br />
                  <strong>Teléfono:</strong> {formData?.phone}<br />
                  <strong>Sitio web:</strong> {formData?.website}<br />
               </Typography>
            </AccordionDetails>
            <ListItemSecondaryAction>
               <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(index)}>
                  <EditIcon />
               </IconButton>
               <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(index)}>
                  <DeleteIcon />
               </IconButton>
            </ListItemSecondaryAction>
         </Accordion>
      ));
   };

   return (

      <Grid container spacing={2} /* style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '120vh' }} */>
         <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            {renderFormHeader()}
            <form onSubmit={handleSubmit(onSubmit)}>
               <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ marginTop: '5px' }}>
                     <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Este campo es obligatorio' }}
                        render={({ field }) => (
                           <TextField
                              sx={{ m: 1, width: '100%' }}
                              margin="dense"
                              {...field}
                              label="Nombre"
                              error={!!errors.name}
                              helperText={errors.name ? errors.name.message : ''}
                           />
                        )}
                     />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ marginTop: '5px' }}>
                     <Controller
                        name="username"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Este campo es obligatorio' }}
                        render={({ field }) => (
                           <TextField
                              sx={{ m: 1, width: '100%' }}
                              margin="dense"
                              {...field}
                              label="Nombre de usuario"
                              error={!!errors.username}
                              helperText={errors.username ? errors.username.message : ''}
                           />
                        )}
                     />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ marginTop: '5px' }}>

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
                              sx={{ m: 1, width: '100%' }}
                              margin="dense"
                              {...field}
                              label="Correo electrónico"
                              error={!!errors.email}
                              helperText={errors.email ? errors.email.message : ''}
                           />
                        )}
                     />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ marginTop: '5px' }}>

                     <Controller
                        name="phone"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Este campo es obligatorio' }}
                        render={({ field }) => (
                           <TextField
                              sx={{ m: 1, width: '100%' }}
                              margin="dense"
                              {...field}
                              label="Teléfono"
                              error={!!errors.phone}
                              helperText={errors.phone ? errors.phone.message : ''}
                           />
                        )}
                     />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ marginTop: '5px' }}>

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
                              sx={{ m: 1, width: '100%' }}
                              margin="dense"
                              {...field}
                              label="Sitio web"
                              error={!!errors.website}
                              helperText={errors.website ? errors.website.message : ''}
                           />
                        )}
                     />
                  </Grid>
                  {/*  <Controller
                  name="ciRif"
                  control={control}
                  defaultValue=""
                  rules={{
                     required: 'Este campo es obligatorio',
                     pattern: { value: /^[VE]\d{7,9}$/, message: 'Formato de RIF inválido' },
                  }}
                  render={({ field }) => (
                     <TextField 
                     sx={{ m: 1, width: '100%' }} 
                     margin="dense"
                        {...field}
                        label="CI o RIF"
                        error={!!errors.ciRif}
                        helperText={errors.ciRif ? errors.ciRif.message : ''}
                     />
                  )}
               /> */}
               </Grid>
               <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Button
                     style={{ margin: '8px', width: '100%' }}
                     size="large"
                     type="submit"
                     variant="contained"
                     color="primary"
                     disabled={!isDirty || Object.keys(errors).length > 0}>
                     {renderButtonLabel()}
                  </Button>
               </Grid>
            </form>
         </Grid>
         <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <List>

               <Typography
                  variant="h5"
               >LISTA DE USUARIOS</Typography>
               {renderFormDataList()}
               {renderUsuariosPrincipales()}
               {formDataList.map((formData, index) => (
                  <Accordion key={index}>
                     <AccordionSummary expandIcon={<ExpandMoreIcon />}>

                        <Typography>{formData?.username}</Typography>
                        {/* Añadir '?' para verificar si formData está definido */}
                     </AccordionSummary>
                     <AccordionDetails>
                        <Grid container spacing={2}>
                           <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>

                              <Typography >
                                 {`Nombre: ${formData.name}`}
                              </Typography>
                           </Grid>
                           <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>

                              <Typography >
                                 {`Correo: ${formData.email}`}
                              </Typography>
                           </Grid>
                           <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                              <Typography >
                                 {`Telefono: ${formData.phone}`}
                              </Typography>
                           </Grid>
                           <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                              <Typography >
                                 {`Sitio web: ${formData.website}`}
                              </Typography>
                           </Grid>

                        </Grid>
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
      </Grid >

   );
};

export default MyForm;

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';

const MyForm = () => {
  const { control, handleSubmit, formState, reset } = useForm();
  const { errors, isDirty } = formState;
  const [formDataList, setFormDataList] = useState([]);

  const onSubmit = (data) => {
    const isDuplicate = formDataList.some(formData => formData.phone === data.phone || formData.website === data.website);

    if (!isDuplicate) {
      setFormDataList([...formDataList, data]);
      reset(); // Reset the form fields after submission
    } else {
      console.error('Error: Teléfono o sitio web duplicado');
    }
  };

  const handleEdit = (index) => {
    const formDataToEdit = formDataList[index];
    reset(formDataToEdit); // Set form values for editing
    const updatedList = formDataList.filter((_, i) => i !== index);
    setFormDataList(updatedList);
  };

  return (
    <div>
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

      <List>
        {formDataList.map((formData, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${formData.name} - ${formData.username} - ${formData.email} - ${formData.phone} - ${formData.website} - ${formData.ciRif}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(index)}>
                <EditIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default MyForm;

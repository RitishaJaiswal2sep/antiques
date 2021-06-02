import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField, Grid, Input, Select, MenuItem } from "@material-ui/core";

function FormInput({ name, label, required }) {
  const { control } = useFormContext();
  const isError = false;

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        render={({ field }) => (
          <TextField
            defaultValue=""
            {...field}
            label={label}
            fullWidth
            required
          />
        )}
        control={control}
        name={name}
      />
    </Grid>
  );
}

export default FormInput;

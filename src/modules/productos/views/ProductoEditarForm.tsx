import { LoadingComponent } from '@/src/shared/components/StatusComponents'
import * as ImageManipulator from "expo-image-manipulator"
import * as ImagePicker from 'expo-image-picker'
import { Stack } from 'expo-router'
import React, { useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Button, Checkbox, HelperText, List, Text, TextInput, useTheme } from 'react-native-paper'
import { useCategorias } from '../../categorias/hooks/useCategorias'
import { useProductoEditarForm } from '../hooks/useForms'

export const ProductoEditarForm = ({ id }: { id: number }) => {
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    cargandoProducto,
    enProceso,
    values,
    errors,
    touched,
    isSubmitting,
  } = useProductoEditarForm(id)

  const [pagina, setPagina] = useState(1)
  const [limite, setLimite] = useState(50)
  const { categorias, cargando: cargandoCat, error } = useCategorias(pagina, limite)

  const toggleSeleccion = (id: number) => {
    setFieldValue(
      'categorias',
      values.categorias.includes(id)
        ? values.categorias.filter((catId) => catId !== id)
        : [...values.categorias, id]
    )
  }

  const [imagePreviewUri, setImagePreviewUri] = useState<string | ''>('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [9, 14],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled && result.assets.length > 0) {
      const asset = result.assets[0];

      // optimizamos la imagen
      const optimizedUri = await optimizarImagen(asset.uri);

      const file = {
        uri: optimizedUri,
        type: asset.mimeType || "image/webp",
        name: asset.fileName || `upload_${Date.now()}.webp`,
        size: asset.fileSize || 0,
      };

      // Guardamos en formik
      setFieldValue("imagen", file);
      setImagePreviewUri(optimizedUri);

    }
  };

  const optimizarImagen = async (uri: string): Promise<string> => {
    const result = await ImageManipulator.manipulateAsync(
      uri,
      [
        {
          resize: {
            width: 800,
          },
        },
      ], // no transformaciones extra (recorte, resize, etc.)
      {
        compress: 0.7, // calidad
        format: ImageManipulator.SaveFormat.WEBP, // formato más liviano
      }
    );

    return result.uri;
  };

  const theme = useTheme()

  if (cargandoProducto || cargandoCat || categorias === undefined) {
    return (<LoadingComponent></LoadingComponent>)
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: `${values.nombre_producto || ''}`,
          headerTitleAlign: 'center'
        }}
      ></Stack.Screen>
      <View style={styles.container}>
        <TextInput
          label="Nombre"
          value={values.nombre_producto}
          onChangeText={handleChange('nombre_producto')}
          onBlur={handleBlur('nombre_producto')}
          mode="outlined"
          error={touched.nombre_producto && !!errors.nombre_producto}
        />
        <HelperText type="error" visible={!!errors.nombre_producto && touched.nombre_producto}>
          {errors.nombre_producto}
        </HelperText>

        <TextInput
          label="Descripción"
          value={values.descripcion}
          onChangeText={handleChange('descripcion')}
          onBlur={handleBlur('descripcion')}
          mode="outlined"
          multiline
          error={touched.descripcion && !!errors.descripcion}
        />
        <HelperText type="error" visible={!!errors.descripcion && touched.descripcion}>
          {errors.descripcion}
        </HelperText>

        <TextInput
          label="Precio unitario"
          value={String(values.precio_unitario)}
          onChangeText={handleChange('precio_unitario')}
          onBlur={handleBlur('precio_unitario')}
          mode="outlined"
          keyboardType="numeric"
          error={touched.precio_unitario && !!errors.precio_unitario}
        />
        <HelperText type="error" visible={!!errors.precio_unitario && touched.precio_unitario}>
          {errors.precio_unitario}
        </HelperText>

        <TextInput
          label="Precio mayorista"
          value={String(values.precio_mayorista)}
          onChangeText={handleChange('precio_mayorista')}
          onBlur={handleBlur('precio_mayorista')}
          mode="outlined"
          keyboardType="numeric"
          error={touched.precio_mayorista && !!errors.precio_mayorista}
        />
        <HelperText type="error" visible={!!errors.precio_mayorista && touched.precio_mayorista}>
          {errors.precio_mayorista}
        </HelperText>


        <List.Section title="Selecciona las categorías">
          {categorias.data.map((categoria) => (
            <List.Item
              key={categoria.id}
              title={categoria.nombre}
              left={() => (
                <Checkbox
                  status={values.categorias.includes(categoria.id) ? 'checked' : 'unchecked'}
                  onPress={() => toggleSeleccion(categoria.id)}
                />
              )}
              onPress={() => toggleSeleccion(categoria.id)}
            />
          ))}
        </List.Section>
        <HelperText type="error" visible={!!errors.categorias && touched.categorias}>
          {errors.categorias}
        </HelperText>


        <View >
          <Text style={{ marginBottom: 8, paddingVertical: 10 }}>Imagen del producto</Text>
          <TouchableOpacity onPress={pickImage} activeOpacity={0.7}>
            {values.imagen ? (
              <Image source={{ uri: imagePreviewUri }} style={styles.image} />
            ) : (
              <>
                {values.url_imagen == '' ? (
                  <View style={styles.placeholder}>
                    <Text style={styles.placeholderText}>
                      Haz click para subir una imagen
                    </Text>
                  </View>
                  
                ) : (
                  <Image source={{ uri: values.url_imagen }} style={styles.image} />
                )}
              </>
            )}
          </TouchableOpacity>

          <HelperText type="error" visible={!!errors.imagen && touched.imagen}>
            {errors.imagen}
          </HelperText>
        </View>


        <Button
          mode="contained"
          onPress={async () => {
            console.log('Presionado botón de submit')
            handleSubmit()
          }}
          //onPress={() => showAlert('Se ejecuto la alerta con exito', 'error')}
          loading={isSubmitting}
          disabled={isSubmitting}
          style={styles.button}
        >
          {isSubmitting ? 'Editando...' : 'Editar Producto'}
        </Button>
      </View >
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  button: {
    marginTop: 16,
  },
  placeholder: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#9ca3af", // gris neutro
    borderRadius: 12,
    aspectRatio: 9 / 14, // relación 9:14
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fafb",
  },
  placeholderText: {
    color: "#6b7280", // gris oscuro
    fontSize: 14,
    textAlign: "center",
  },
  image: {
    width: "100%",
    aspectRatio: 9 / 14,
    borderRadius: 12,
    resizeMode: "cover",
  },
})
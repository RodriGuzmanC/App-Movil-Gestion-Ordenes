import * as ImageManipulator from "expo-image-manipulator"
import * as ImagePicker from 'expo-image-picker'
import { ImagePickerResult } from 'expo-image-picker'
import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Button, HelperText, Text, TextInput, useTheme } from 'react-native-paper'
import { useProductoCrearForm } from '../hooks/useForms'

export const ProductoCrearForm = () => {
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    values,
    errors,
    touched,
    isSubmitting,
  } = useProductoCrearForm()

  const [image, setImage] = useState<ImagePickerResult | null>(null);
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

  return (
    <ScrollView>
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

        <View >
          <Text style={{ marginBottom: 8, paddingVertical: 10}}>Imagen del producto</Text>
          <TouchableOpacity onPress={pickImage} activeOpacity={0.7}>
            {values.imagen ? (
              <Image source={{ uri: imagePreviewUri }} style={styles.image} />
            ) : (
              <View style={styles.placeholder}>
                <Text style={styles.placeholderText}>
                  Haz click para subir una imagen
                </Text>
              </View>
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
          {isSubmitting ? 'Creando...' : 'Crear Producto'}
        </Button>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 2,
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

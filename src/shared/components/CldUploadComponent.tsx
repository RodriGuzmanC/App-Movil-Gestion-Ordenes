import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

interface Props {
  label?: string;
  onUpload: (uri: string) => void;
  imageUri?: string;
}

export const CldUploadComponent: React.FC<Props> = ({
  label = 'Subir imagen',
  onUpload,
  imageUri,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(imageUri || null);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setSelectedImage(uri);
      onUpload(uri); // Emitir a quien lo use
    }
  };

  return (
    <View style={styles.container}>
      {selectedImage ? (
        <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
      ) : (
        <Text style={styles.placeholderText}>No hay imagen seleccionada</Text>
      )}

      <Button
        mode="contained"
        icon="camera"
        onPress={handlePickImage}
        style={styles.button}
      >
        {selectedImage ? 'Reemplazar imagen' : label}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 16,
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: '#e0e0e0',
  },
  placeholderText: {
    fontSize: 16,
    color: '#888',
    marginBottom: 12,
  },
  button: {
    width: 200,
  },
});

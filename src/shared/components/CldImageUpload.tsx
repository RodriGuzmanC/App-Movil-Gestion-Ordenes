import { actualizarImagenProducto, subirImagenProducto } from '@/src/modules/productos/api/productoApi';
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerResult } from 'expo-image-picker';
import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';

interface ImageUploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onImageUploaded: (url: string) => void;
    mode?: 'subir' | 'reemplazar'; // Modo por defecto es "subir"
    currentImageUrl?: string; // Para mostrar la imagen actual si se reemplaza
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
    isOpen,
    onClose,
    onImageUploaded,
    mode = 'subir',
    currentImageUrl,
}) => {
    const [image, setImage] = useState<ImagePickerResult | null>(null);
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result);
            setImageUri(result.assets[0].uri);
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

    const handleImageUpload = async (): Promise<void> => {
        if (!image || image.assets == null) return;
        setUploading(true);
        setUploadError(null);
        const asset = image.assets[0];

        const optimizedUri = await optimizarImagen(asset.uri);
        console.log(optimizedUri)
        // Obtener info del archivo
        const file = {
            uri: optimizedUri, // optimizado
            type: asset.mimeType || "image/webp", // optimizado
            name: asset.fileName || `upload_${Date.now()}.jpg`,
            size: asset.fileSize || 0,
        };

        const formData = new FormData();
        formData.append("file", file as any);

        try {
            // 1. Subir nueva imagen
            await subirImagenProducto(formData)

            // 2. En modo "reemplazar", eliminar la imagen anterior
            if (mode === 'reemplazar' && currentImageUrl) {
                await actualizarImagenProducto(currentImageUrl, formData)

            }

            // 3. Notificar al padre y cerrar modal
            onClose();

        } catch (error) {
            setUploadError('Error al subir o eliminar la imagen');
            console.error('Error al subir o eliminar la imagen:', error);
        } finally {
            setUploading(false);
        }
    };


    if (!isOpen) return null;

    return (
        <>
            <Text variant="titleLarge" style={{ marginBottom: 16 }}>
                {mode === "reemplazar" ? "Reemplazar imagen" : "Subir nueva imagen"}
            </Text>

            {mode === "reemplazar" && currentImageUrl && (
                <View style={{ marginBottom: 16 }}>
                    <Image
                        source={{ uri: currentImageUrl }}
                        style={{ width: "100%", height: 150, borderRadius: 8 }}
                        resizeMode="cover"
                    />
                </View>
            )}

            <Button
                mode="outlined"
                onPress={pickImage}
                style={{ marginBottom: 16 }}
            >
                Seleccionar Imagen
            </Button>

            <View style={styles.container}>
                {image && <Image source={{ uri: imageUri ?? 'sad' }} style={styles.image} />}
            </View>

            {uploading ? (
                <View style={{ alignItems: "center", marginVertical: 10 }}>
                    <ActivityIndicator animating={true} />
                    <Text style={{ marginTop: 8 }}>Subiendo...</Text>
                </View>
            ) : (
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Button mode="contained" onPress={handleImageUpload}>
                        Subir Imagen
                    </Button>
                    <Button mode="outlined" onPress={onClose}>
                        Cancelar
                    </Button>
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 200,
        height: 200,
    },
});

export default ImageUploadModal;

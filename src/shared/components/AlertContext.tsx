import * as ClipboardAPI from 'expo-clipboard';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { Clipboard, View } from 'react-native';
import { IconButton, Snackbar, Text } from 'react-native-paper';
import { AlertService } from '../utils/AlertService';



type AlertType = 'success' | 'error' | 'info';

interface AlertContextType {
  showAlert: (message: string, type?: AlertType) => void;
}

export const AlertContext = createContext<AlertContextType | undefined>(undefined);

const alertColors: Record<AlertType, string> = {
  success: '#4CAF50',
  error: '#F44336',
  info: '#2196F3',
};

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<AlertType>('info');

  const showAlert = (msg: string, variant: AlertType = 'info') => {
    setMessage(msg);
    setType(variant);
    setVisible(true);
  };

  const hideAlert = () => setVisible(false);

  const copyToClipboard = async () => {
    try {
      await ClipboardAPI.setStringAsync(message);
    } catch (err) {
      Clipboard.setString(message);
    }
  };

  // Set the handler for the AlertService

  useEffect(() => {
    AlertService.setHandler(showAlert);
  }, [showAlert]);


  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}

      <Snackbar
        visible={visible}
        onDismiss={hideAlert}
        duration={6000}
        style={{ backgroundColor: alertColors[type] }}
        action={{
          label: 'Cerrar',
          onPress: hideAlert,
          labelStyle: { color: '#fff' },
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: 'white', flex: 1 }}>{message}</Text>
          <IconButton
            icon="content-copy"
            size={20}
            iconColor="white"
            onPress={copyToClipboard}
          />
        </View>
      </Snackbar>
    </AlertContext.Provider>
  );
};

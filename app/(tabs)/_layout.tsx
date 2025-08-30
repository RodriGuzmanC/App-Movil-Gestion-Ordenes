import { Tabs } from 'expo-router';
import { Icon } from 'react-native-paper';

export default function TabLayout() {
  return (
    <>
      <Tabs
      screenOptions={{
        headerShown: false, // Opcional: oculta el header superior
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon source="home" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="clientes"
        options={{
          title: 'Clientes',
          tabBarIcon: ({ color }) => (
            <Icon source="account-group" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="pedidos"
        options={{
          title: 'Pedidos',
          tabBarIcon: ({ color }) => (
            <Icon source="cart" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="productos"
        options={{
          title: 'Productos',
          tabBarIcon: ({ color }) => (
            <Icon source="cube-outline" size={26} color={color} />
          ),
          
        }}
        
      />
      <Tabs.Screen
        name="categorias"
        options={{
          title: 'Categorías',
          tabBarIcon: ({ color }) => (
            <Icon source="shape-outline" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="caracteristicas"
        options={{
          title: 'Características',
          tabBarIcon: ({ color }) => (
            <Icon source="tune" size={26} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="ventas"
        options={{
          title: 'Ventas',
          tabBarIcon: ({ color }) => (
            <Icon source="bag" size={26} color={color} />
          ),
        }}
      />
    </Tabs>
    </>
  );
}


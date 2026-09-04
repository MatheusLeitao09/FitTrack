import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Ícones nativos do ecossistema React Native / Expo

export default function Header({ title, subtitle, onSettingsPress }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>

        {/* Botão de engrenagem para redirecionar para a tela de perfil */}
        {onSettingsPress && (
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={onSettingsPress}
            activeOpacity={0.7}
          >
            <Feather name="settings" size={22} color="#CCFF00" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: '#121212',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#A1A1A1',
    marginTop: 4,
  },
  iconButton: {
    padding: 8,
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    marginLeft: 12,
  },
});
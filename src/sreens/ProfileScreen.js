import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Header from '../components/Header';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Header title="Perfil" subtitle="Gerencie suas informações" />

      <View style={styles.profileBox}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>A</Text>
        </View>

        <Text style={styles.userName}>Alex</Text>

        <Text style={styles.userEmail}>alex.fitness@example.com</Text>

        <TouchableOpacity style={styles.editBtn} onPress={() => Alert.alert('Editar', 'Modo de edição')}>
          <Text style={styles.editBtnText}>Editar Perfil</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuList}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>🎯 Metas Pessoais</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>🔔 Notificações</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>🔒 Privacidade</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={() => Alert.alert('Sair', 'Sessão encerrada')}>
        <Text style={styles.logoutText}>Sair da Conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  profileBox: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#CCFF00',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  userEmail: {
    color: '#888888',
    fontSize: 14,
    marginBottom: 12,
  },
  editBtn: {
    backgroundColor: '#1E1E1E',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333333',
  },
  editBtnText: {
    color: '#CCFF00',
    fontSize: 12,
    fontWeight: 'bold',
  },
  menuList: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  menuItem: {
    backgroundColor: '#1E1E1E',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  menuText: {
    color: '#FFFFFF',
    fontSize: 15,
  },
  logoutBtn: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF5252',
    alignItems: 'center',
  },
  logoutText: {
    color: '#FF5252',
    fontWeight: 'bold',
  },
});
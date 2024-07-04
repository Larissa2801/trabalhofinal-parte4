import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';  // Importando o ícone de FontAwesome

const { width } = Dimensions.get('window');

interface User {
  id: number;
  name: string;
  type: 'Docente' | 'Estudante' | 'Técnico Administrativo';
  institution: string;
  permissions: 'Administrador' | 'Coordenador de Pesquisa';
  email: string;
}

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<User>({ id: 0, name: '', type: 'Docente', institution: '', permissions: 'Administrador', email: '' });
  const [editing, setEditing] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);  // Estado para controlar o menu

  const createUser = (user: User) => {
    setUsers([...users, { ...user, id: Math.random() }]);
  };

  const updateUser = (user: User) => {
    setUsers(users.map(u => u.id === user.id ? user : u));
    setEditing(false);
    setForm({ id: 0, name: '', type: 'Docente', institution: '', permissions: 'Administrador', email: '' });
  };

  const deleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const editUser = (user: User) => {
    setForm(user);
    setEditing(true);
  };

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    if (editing) {
      updateUser(form);
    } else {
      createUser(form);
    }
    setForm({ id: 0, name: '', type: 'Docente', institution: '', permissions: 'Administrador', email: '' });
  };

  return (
    <View style={styles.container}>
      {/* Menu de três barras */}
      <TouchableOpacity style={styles.menuButton} onPress={() => setMenuOpen(!menuOpen)}>
        <Icon name="bars" size={30} color="#000" />
      </TouchableOpacity>
      
      {/* Conteúdo principal */}
      <View style={styles.content}>
        <Text>Nome</Text>
        <TextInput style={styles.input} value={form.name} onChangeText={(value) => handleChange('name', value)} />
        <Text>Tipo</Text>
        <Picker style={styles.input} selectedValue={form.type} onValueChange={(value) => handleChange('type', value)}>
          <Picker.Item label="Docente" value="Docente" />
          <Picker.Item label="Estudante" value="Estudante" />
          <Picker.Item label="Técnico Administrativo" value="Técnico Administrativo" />
        </Picker>
        <Text>Instituição</Text>
        <TextInput style={styles.input} value={form.institution} onChangeText={(value) => handleChange('institution', value)} />
        <Text>Permissões</Text>
        <Picker style={styles.input} selectedValue={form.permissions} onValueChange={(value) => handleChange('permissions', value)}>
          <Picker.Item label="Administrador" value="Administrador" />
          <Picker.Item label="Coordenador de Pesquisa" value="Coordenador de Pesquisa" />
        </Picker>
        <Text>Email</Text>
        <TextInput style={styles.input} value={form.email} onChangeText={(value) => handleChange('email', value)} />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>{editing ? "Atualizar usuário" : "Criar usuário"}</Text>
        </TouchableOpacity>

        {/* Lista de usuários */}
        {users.map(user => (
          <View key={user.id} style={styles.userContainer}>
            <Text>{user.name}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, styles.editButton]} onPress={() => editUser(user)}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => deleteUser(user.id)}>
                <Text style={styles.buttonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Menu lateral */}
      <View style={[styles.menu, { marginLeft: menuOpen ? 0 : -width / 2 }]}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Excluir</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Atualizar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  menuButton: {
    padding: 10,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  userContainer: {
    marginTop: 20,
  },
  editButton: {
    backgroundColor: '#FFC107',
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#DC3545',
  },
  menu: {
    backgroundColor: '#FFF',
    position: 'absolute',
    top: 0,
    left: 0,
    width: width / 2,
    height: '100%',
    zIndex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRightWidth: 1,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  menuItem: {
    marginBottom: 10,
  },
  menuText: {
    fontSize: 18,
  },
});

export default App;

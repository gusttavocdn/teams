import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { groupCreate } from '@storage/group/groupCreate';
import { Container, Content, Icon } from './styles';
import { AppError } from '@utils/AppError';
import { Alert } from 'react-native';

export function NewGroup() {
  const [group, setGroup] = useState('');

  const { navigate } = useNavigation();

  const handleNew = async () => {
    try {
      if (group.trim().length === 0)
        return Alert.alert('Novo Grupo', 'Informe o nome da turma');

      await groupCreate(group);
      navigate('players', { group: group });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo Grupo', error.message);
      } else {
        Alert.alert('Novo Grupo', 'Não foi possivel criar um novo grupo');
        console.log(error);
      }
    }
  };

  return (
    <Container>
      <Header showBackButton></Header>
      <Content>
        <Icon />
        <Highlight
          title='Nova turma'
          subtitle='Crie a turma para adicionar as pessoas'
        />

        <Input placeholder='Nome da turma' onChangeText={setGroup} />

        <Button
          title='criar'
          style={{
            marginTop: 24,
          }}
          onPress={handleNew}
        />
      </Content>
    </Container>
  );
}

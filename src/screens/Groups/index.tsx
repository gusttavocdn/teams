import { Button } from '@components/Button';
import { GroupCard } from '@components/GroupCard';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { ListEmpty } from '@components/ListEmpty';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { groupsGetAll } from '@storage/group/groupsGetAll';
import { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import { Container } from './styles';

export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);

  const { navigate } = useNavigation();

  const handleCreateGroup = () => {
    navigate('new');
  };

  const fetchGroups = async () => {
    try {
      const groups = await groupsGetAll();
      setGroups(groups);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenGroup = (group: string) => {
    navigate('players', { group });
  };

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );

  return (
    <Container>
      <Header />

      <Highlight title='Turmas' subtitle='Crie e gerencie seus grupos' />

      <FlatList
        style={{ width: '100%' }}
        data={groups}
        keyExtractor={(item, i) => `${item}-${i}`}
        renderItem={({ item }) => (
          <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message='Que tal cadastrar a primeira turma' />
        )}
      />

      <Button title='Criar nova turma' onPress={handleCreateGroup} />
    </Container>
  );
}

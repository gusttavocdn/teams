import { Button } from '@components/Button';
import { ButtonIcon } from '@components/ButtonIcon';
import { Filter } from '@components/Filter';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { ListEmpty } from '@components/ListEmpty';
import { PlayerCard } from '@components/PlayerCard';
import { useRoute } from '@react-navigation/native';
import { playerAddByGroup } from '@storage/players/playerAddByGroup';
import { playerRemoveByGroup } from '@storage/players/playerRemoveByGroup';
import { playersGetByGroupAndTeam } from '@storage/players/playersGetByGroupAndTeam';
import { PlayerStorageDTO } from '@storage/players/PlayerStorageDTO';
import { AppError } from '@utils/AppError';
import { useEffect, useRef, useState } from 'react';
import { Alert, FlatList, TextInput } from 'react-native';
import { Container, Form, HeaderList, NumberOfPlayers } from './styles';

type RouteParams = {
  group: string;
};

export function Players() {
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [player, setPlayer] = useState('');

  const { params } = useRoute() as { params: RouteParams };

  const newPlayerNameInputRef = useRef<TextInput>();

  const handleAddPlayer = async () => {
    if (player.trim().length === 0)
      return Alert.alert('Nova pessoa', 'Infome o nome da pessoa');

    const newPlayer = {
      name: player,
      team: team,
    };

    try {
      await playerAddByGroup(newPlayer, params.group);

      newPlayerNameInputRef.current?.blur();

      setPlayer('');
      fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Nova pessoa', error.message);
      } else {
        Alert.alert('Nova pessoa', 'Não foi possivel adicionar a pessoa');
        console.log(error);
      }
    }
  };

  const handleRemovePlayer = async (player: string) => {
    try {
      await playerRemoveByGroup(player, params.group);
      fetchPlayersByTeam();
    } catch (error) {
      console.log(error);
      Alert.alert('Pessoas', 'Não foi possivel remover a pessoa');
    }
  };

  const fetchPlayersByTeam = async () => {
    try {
      const playersByTeam = await playersGetByGroupAndTeam(params.group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      console.log(error);
      Alert.alert('Pessoas', 'Não foi possivel carregar as pessoas');
    }
  };

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title={params.group}
        subtitle='Adicione a galera e separe os times'
      />

      <Form>
        <Input
          inputRef={newPlayerNameInputRef as React.RefObject<TextInput>}
          placeholder='Nome da pessoa'
          autoCorrect={false}
          onChangeText={setPlayer}
          value={player}
          onSubmitEditing={handleAddPlayer}
          returnKeyType='done'
        />

        <ButtonIcon icon='add' onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={(item, i) => `${item}-${i}`}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item, i) => `${item.name}-${i}`}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            onRemove={() => handleRemovePlayer(item.name)}
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message='Não há pessoas neste time' />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />

      <Button title='Remover Turma' type='SECONDARY' />
    </Container>
  );
}

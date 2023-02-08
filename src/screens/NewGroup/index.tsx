import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { Container, Content, Icon } from './styles';

export function NewGroup() {
  return (
    <Container>
      <Header showBackButton></Header>
      <Content>
        <Icon />
        <Highlight
          title='Nova turma'
          subtitle='Crie a turma para adicionar as pessoas'
        />

        <Input placeholder='Nome da turma' />

        <Button
          title='criar'
          style={{
            marginTop: 24,
          }}
        />
      </Content>
    </Container>
  );
}

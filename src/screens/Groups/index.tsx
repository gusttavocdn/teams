import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Container } from './styles';

export function Groups() {
  return (
    <Container>
      <Header />

      <Highlight title='Grupos' subtitle='Crie e gerencie seus grupos' />
    </Container>
  );
}

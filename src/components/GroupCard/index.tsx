import { Container, Icon, Title } from './styles';
import { TouchableOpacityProps } from 'react-native';

type Props = {
  title: string;
} & TouchableOpacityProps;

export function GroupCard({ title, ...rest }: Props) {
  return (
    <Container {...rest}>
      <Icon />
      <Title>{title}</Title>
    </Container>
  );
}

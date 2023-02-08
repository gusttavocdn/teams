import { TouchableOpacityProps } from 'react-native';
import { Container, Title, ButtonTypesStyleProps } from './styles';

type Props = {
  title: string;
  type?: ButtonTypesStyleProps;
} & TouchableOpacityProps;

export function Button({ title, type = 'PRIMARY', ...rest }: Props) {
  return (
    <Container type={type} {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}

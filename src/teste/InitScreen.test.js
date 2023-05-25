import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import InitScreen from './InitScreen';

describe('InitScreen', () => {
  it('deve exibir o texto "Bora fazer o shape?"', () => {
    const { getByText } = render(<InitScreen />);
    const texto = getByText('Bora fazer o\nshape?');
    expect(texto).toBeTruthy();
  });

  it('deve exibir o modal ao pressionar o botão "Cadastre-se"', () => {
    const { getByText, getByTestId } = render(<InitScreen />);
    const botaoCadastreSe = getByText('Cadastre-se');
    fireEvent.press(botaoCadastreSe);
    const modal = getByTestId('modal');
    expect(modal).toBeTruthy();
  });

  it('deve navegar para a tela de cadastro de cliente ao pressionar o botão "Cliente" no modal', () => {
    const { getByText, getByTestId } = render(<InitScreen />);
    const botaoCadastreSe = getByText('Cadastre-se');
    fireEvent.press(botaoCadastreSe);
    const botaoCliente = getByText('Cliente');
    fireEvent.press(botaoCliente);
    // Verifique se a navegação ocorreu corretamente
    // Exemplo: expect(navegacao).toEqual('cadastro');
  });

  it('deve navegar para a tela de cadastro de personal ao pressionar o botão "Personal" no modal', () => {
    const { getByText, getByTestId } = render(<InitScreen />);
    const botaoCadastreSe = getByText('Cadastre-se');
    fireEvent.press(botaoCadastreSe);
    const botaoPersonal = getByText('Personal');
    fireEvent.press(botaoPersonal);
    // Verifique se a navegação ocorreu corretamente
    // Exemplo: expect(navegacao).toEqual('cadastro');
  });

  it('deve navegar para a tela de autenticação ao pressionar o botão "Login"', () => {
    const { getByText } = render(<InitScreen />);
    const botaoLogin = getByText('Login');
    fireEvent.press(botaoLogin);
    // Verifique se a navegação ocorreu corretamente
    // Exemplo: expect(navegacao).toEqual('auth');
  });
});

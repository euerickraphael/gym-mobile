import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import { PrefilScreen } from './PrefilScreen';

jest.mock('axios');

describe('PrefilScreen', () => {
  it('deve exibir o nome de usuário corretamente', async () => {
    const mockedData = [
      {
        name: 'John Doe',
      },
    ];

    axios.get.mockResolvedValueOnce({ data: mockedData });

    const routeParams = {
      params: {
        email: 'test@example.com',
      },
    };

    const { getByText } = render(<PrefilScreen route={routeParams} />);

    await waitFor(() => {
      const userNameText = getByText('Seja bem-vindo, John Doe');
      expect(userNameText).toBeTruthy();
    });
  });
});

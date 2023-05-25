import axios from "axios";
import { useToast, useNavigation } from "@react-navigation/native";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { CadastroScreen } from "./CadastroScreen";

jest.mock("axios"); // Mock do módulo axios

describe("CadastroScreen", () => {
  test("Criação de usuário com sucesso", async () => {
    const mockedGoBack = jest.fn(); // Mock da função goBack
    const mockedToastShow = jest.fn(); // Mock da função show do toast

    useNavigation.mockReturnValue({
      goBack: mockedGoBack,
    });

    useToast.mockReturnValue({
      show: mockedToastShow,
    });

    const mockedResponse = {
      data: [],
    };

    axios.get.mockResolvedValue(mockedResponse);
    axios.post.mockResolvedValue({});

    const { getByPlaceholderText, getByText } = render(<CadastroScreen />);

    const nomeInput = getByPlaceholderText("Nome");
    const cpfInput = getByPlaceholderText("CPF");
    const telefoneInput = getByPlaceholderText("Telefone");
    const emailInput = getByPlaceholderText("Email");
    const senhaInput = getByPlaceholderText("Senha");
    const confirmSenhaInput = getByPlaceholderText("Confirme a senha");
    const cadastrarButton = getByText("Cadastre-se");

    fireEvent.changeText(nomeInput, "Usuário Teste");
    fireEvent.changeText(cpfInput, "12345678901");
    fireEvent.changeText(telefoneInput, "987654321");
    fireEvent.changeText(emailInput, "usuario@teste.com");
    fireEvent.changeText(senhaInput, "senha123");
    fireEvent.changeText(confirmSenhaInput, "senha123");
    fireEvent.press(cadastrarButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://192.168.1.111:3000/users",
        {
          name: "Usuário Teste",
          cpf: "12345678901",
          fone: "987654321",
          email: "usuario@teste.com",
          password: "senha123",
          type: "cliente",
        }
      );
      expect(mockedToastShow).toHaveBeenCalledWith({
        placement: "top",
        title: "Usuário criado com sucesso",
      });
      expect(mockedGoBack).toHaveBeenCalled();
    });
  });

  test("Exibe mensagem de email já cadastrado", async () => {
    const mockedToastShow = jest.fn();

    useToast.mockReturnValue({
      show: mockedToastShow,
    });

    const mockedResponse = {
      data: [{ email: "usuario@teste.com" }],
    };

    axios.get.mockResolvedValue(mockedResponse);

    const { getByPlaceholderText, getByText } = render(<CadastroScreen />);

    const emailInput = getByPlaceholderText("Email");
    const cadastrarButton = getByText("Cadastre-se");

    fireEvent.changeText(emailInput, "usuario@teste.com");
    fireEvent.press(cadastrarButton);

    await waitFor(() => {
      expect(mockedToastShow).toHaveBeenCalledWith({
        placement: "top",
        title: "Já existe um usuário com este email",
      });
    });
  });
});

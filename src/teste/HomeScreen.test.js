import { useNavigation } from "@react-navigation/native";
import { render, waitFor } from "@testing-library/react-native";
import { HomeScreen } from "./HomeScreen";

jest.mock("@react-navigation/native");

describe("HomeScreen", () => {
  test("Renderização dos treinos", async () => {
    const mockedNavigate = jest.fn();

    useNavigation.mockReturnValue({
      navigate: mockedNavigate,
    });

    const { getByText } = render(<HomeScreen route={{ params: { email: "test@example.com" } }} />);

    const treinosAText = getByText("A");
    const treinosBText = getByText("B");
    const treinosCText = getByText("C");

    expect(treinosAText).toBeDefined();
    expect(treinosBText).toBeDefined();
    expect(treinosCText).toBeDefined();
  });

  test("Navegação para a tela de perfil", async () => {
    const mockedNavigate = jest.fn();

    useNavigation.mockReturnValue({
      navigate: mockedNavigate,
    });

    const { getByText } = render(<HomeScreen route={{ params: { email: "test@example.com" } }} />);

    const verPerfilText = getByText("VER PERFIL >");
    fireEvent.press(verPerfilText);

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith("perfil", { email: "test@example.com" });
    });
  });
});

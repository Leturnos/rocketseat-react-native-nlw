# Nearby - NLW Pocket 🚀

![License](https://img.shields.io/badge/license-MIT-green)
![React Native](https://img.shields.io/badge/React_Native-v0.74-blue)
![Expo](https://img.shields.io/badge/Expo-v51-black)
![TypeScript](https://img.shields.io/badge/TypeScript-v5.3-blue)

> Projeto desenvolvido durante a reprise do evento **NLW Pocket (Edição 18)** da [Rocketseat](https://www.rocketseat.com.br/).

## 💻 Sobre o Projeto

O Nearby é um aplicativo mobile que permite aos usuários encontrar estabelecimentos parceiros (fictícios) próximos (Utilizamos um lugar fixo, mas deixei os códigos de localização real prontos) e desbloquear cupons de desconto através da leitura de QR Codes.

O objetivo do projeto foi explorar boas práticas de desenvolvimento e funcionalidades nativas do celular, como Mapas, Geolocalização e Câmera, utilizando React Native com Expo.
## 🚧 Problemas Conhecidos (Known Issues)

Como este é um projeto de estudo desenvolvido em curto prazo, alguns comportamentos visuais ficaram pendentes para revisão:

1. Interação no Mapa: O componente Callout pode apresentar inconsistência ao toque em alguns dispositivos por conta da sobreposição de camadas absolutas na tela principal.
2. StatusBar na Câmera: Ao abrir o modal de leitura de QR Code, a StatusBar pode não ocultar totalmente em algumas versões do Android.

---

## ⚙️ Funcionalidades

- [x] **Mapa Interativo:** Visualização de estabelecimentos próximos baseada na localização.
- [x] **Filtro por Categorias:** Alimentação, Compras, Hospedagem, etc.
- [x] **Detalhes do Local:** Informações sobre o estabelecimento, capa e descrição.
- [x] **Resgate de Cupons:** Leitura de QR Code via câmera do dispositivo para validar descontos.

## 🎨 Layout

| Tela de boas vindas | Tela Inicial (Mapa) | Busca por categoria | Cupom liberado após ler QR Code |
|:-------------------:|:-------------------:|:-------------------:|:------------------------------------------:|
| ![Welcome](https://github.com/user-attachments/assets/a890afe7-9a68-43e3-b4a2-1e82b40aeca9) | ![Home](https://github.com/user-attachments/assets/3995d6f3-118e-4050-997c-7f992572b333) | ![Category](https://github.com/user-attachments/assets/81610e45-b658-443c-bae4-199c1a0365ba) | ![Details](https://github.com/user-attachments/assets/0b334717-997e-41a3-a230-6e89c37cf55f)

## 🛠 Tecnologias Utilizadas

### Mobile (React Native + Expo)
- **[Expo Router](https://docs.expo.dev/router/introduction/):** Gerenciamento de rotas e navegação.
- **[React Native Maps](https://github.com/react-native-maps/react-native-maps):** Integração com mapas (Google Maps/Apple Maps).
- **[Expo Camera](https://docs.expo.dev/versions/latest/sdk/camera/):** Acesso à câmera para leitura de QR Codes.
- **[Axios](https://axios-http.com/):** Consumo da API.
- **TypeScript:** Tipagem estática.

### Backend (Node.js)
Código disponibilizado pelo professor
- **Node.js** com Express.
- **Prisma ORM:** Gerenciamento do banco de dados (SQLite).
- **Zod:** Validação de dados.

---

## 🚀 Como Executar o Projeto

Este projeto é dividido em duas partes:
1. **API (Backend):** Responsável por fornecer os dados dos locais e cupons.
2. **Mobile (Frontend):** O aplicativo que fizemos em si.

### Pré-requisitos
Antes de começar, você precisa ter instalado em sua máquina:
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/)
- [Expo Go](https://expo.dev/client) (no seu celular)

### 🎲 1. Rodando o Backend (API)

```bash
# Clone este repositório
$ git clone https://github.com/Leturnos/rocketseat-react-native-nlw.git

# Acesse a pasta da API
$ cd api

# Instale as dependências
$ npm install

# Inicie o servidor (iniciará na porta 3333)
$ npm start

# Deixe o servidor rodando enquanto estiver testando o aplicativo
```

### 📱 2. Rodando o Mobile

*⚠️ Importante: Atualize mobile/src/services/api.ts com o IP local da sua máquina: http://192.168.x.x:3333.
Altere os "x" de acordo com o endereço que aparecerá no terminal quando rodar o comando npx expo start a seguir*

```bash
# Em outro terminal, acesse a pasta mobile
$ cd mobile

# Instale as dependências
$ npm install

# Inicie o projeto com Expo
$ npx expo start

# Agora, basta ler o QR Code exibido no terminal com o aplicativo Expo Go no seu celular (Android ou iOS).
```

*Quando entrar nos detalhes de algum estabelecimento, será impresso no terminal o "id". Caso queira testar a liberação do cupom,
basta utilizar esse id como texto em qualquer gerador de QR Code gratuito na internet.*

### 📝 Licença

Este projeto está sob a licença MIT.

Feito por Leandro durante o reprise do NLW da Rocketseat.

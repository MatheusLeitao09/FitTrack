# 🏋️ FitTrack — Gerenciamento de Treinos Mobile

O **FitTrack** é um aplicativo mobile funcional desenvolvido para acompanhamento de rotinas de exercícios físicos e gestão de treinos. O projeto faz parte da atividade prática de Desenvolvimento Mobile com Persistência Local, integrando o design de interface (mimetizado do Figma) à lógica de armazenamento local.

---

## 👥 Integrantes do Projeto

**Matheus Leitão** 
**Gustavo Alves**
---

## 🛠️ Descrição Técnica e Arquitetura

O aplicativo foi construído com a plataforma **Expo** e a biblioteca **React Native**, estruturado de forma modular e simplificada para garantir performance e facilidade de manutenção.

### **Componentes e Tecnologias Principais**
- **React Native / Expo:** Estrutura base da aplicação e interface.
- **AsyncStorage (`@react-native-async-storage/async-storage`):** Persistência de dados local no dispositivo para salvar, ler e deletar itens JSON.
- **JavaScript (ES6+):** Lógica do sistema e gerenciamento de estado via Hooks (`useState`, `useEffect`).

### **Estrutura de Pastas**
```text
FitTrack/
 ├── src/
 │    ├── components/
 │    │    ├── ExerciceCard.js   # Card de exibição do treino
 │    │    └── Header.js         # Cabeçalho da aplicação
 │    ├── services/
 │    │    └── storageService.js # Regras do AsyncStorage (CRUD)
 │    └── sreens/
 │         ├── AnalysesScreen.js # Tela de análises e métricas
 │         ├── FormSreen.js      # Formato para cadastrar treino
 │         ├── HomeScreen.js     # Tela principal e lista de treinos
 │         └── ProfileScreen.js  # Tela de perfil do usuário
 ├── App.js                      # Arquivo principal e navegação
 └── README.md                   # Documentação do projeto

 🔁 Operações CRUD e Persistência Local
Toda a camada de dados é gerenciada no arquivo storageService.js, utilizando as seguintes operações:

Create (Criação): Adiciona uma nova sessão de treino informando título, categoria e duração. O item recebe um ID único gerado por Date.now().

Read (Leitura): Recupera os dados armazenados em JSON no AsyncStorage durante o carregamento inicial da aplicação (useEffect).

Delete (Exclusão): Remove um treino específico filtrando pelo ID e atualizando o armazenamento local.

Persistência: O ciclo de vida do dado permanece intacto mesmo após fechar ou reiniciar totalmente o aplicativo.

🚀 Instruções de Execução
Pré-requisitos
Node.js instalado na máquina.

Aplicativo Expo Go instalado no celular (Android ou iOS) ou navegador web.

Passo a Passo
Clonar o repositório:

Bash
git clone [https://github.com/MatheusLeitao09/FitTrack.git](https://github.com/MatheusLeitao09/FitTrack.git)
cd FitTrack
Instalar as dependências do projeto:

Bash
npm install
Garantir as dependências do AsyncStorage e Web:

Bash
npx expo install @react-native-async-storage/async-storage react-native-web react-dom
Executar a aplicação:

Bash
npx expo start
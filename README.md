# Sono em 15 - Área de Membros Premium

Uma aplicação web moderna para um curso online sobre técnicas de sono, construída com React, TypeScript, Tailwind CSS e Supabase.

## 🚀 Funcionalidades

- ✅ Autenticação segura com Supabase Auth
- 📚 Sistema de módulos e lições progressivo
- 📊 Acompanhamento de progresso em tempo real
- 💾 Notas pessoais para cada lição
- ⭐ Sistema de favoritos
- 📱 Design responsivo e moderno
- 🌙 Modo escuro/claro
- ✅ Checklists interativos
- 🎵 Playlists de áudio para relaxamento

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Real-time)
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Styling**: Tailwind CSS com tema customizado

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Conta no Supabase (gratuita)
- Git (opcional)

## 🚀 Configuração e Instalação

### 1. Clone ou baixe o projeto

```bash
git clone <repository-url>
cd project
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o Supabase

#### 3.1. Crie um projeto no Supabase
1. Acesse [supabase.com](https://supabase.com)
2. Clique em "Start your project"
3. Crie uma nova organização (se necessário)
4. Crie um novo projeto
5. Aguarde a criação do banco de dados

#### 3.2. Configure as variáveis de ambiente
1. Copie o arquivo `.env` na raiz do projeto
2. No painel do Supabase, vá em **Settings > API**
3. Copie a **Project URL** e **anon/public key**
4. Edite o arquivo `.env` e substitua:

```env
VITE_SUPABASE_URL=https://seu-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima-aqui
```

#### 3.3. Configure o banco de dados
1. No painel do Supabase, vá em **SQL Editor**
2. Execute o arquivo `database/schema.sql` (copie e cole o conteúdo)
3. Execute o arquivo `database/seed.sql` (copie e cole o conteúdo)

#### 3.4. Configure a autenticação
1. No painel do Supabase, vá em **Authentication > Settings**
2. Em **Site URL**, adicione: `http://localhost:5173`
3. Em **Redirect URLs**, adicione: `http://localhost:5173/**`

### 4. Execute a aplicação

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## 👤 Criando Usuários de Teste

### Opção 1: Registro pela aplicação
1. Acesse a aplicação
2. Como não há tela de registro, você pode criar usuários diretamente no Supabase

### Opção 2: Criar usuário no Supabase
1. No painel do Supabase, vá em **Authentication > Users**
2. Clique em "Add user"
3. Preencha email e senha
4. O usuário será criado automaticamente na tabela `users` via trigger

### Credenciais de Demonstração
Para facilitar os testes, você pode criar um usuário com:
- **Email**: demo@sonorem15.com
- **Senha**: demo123

## 📁 Estrutura do Projeto

```
project/
├── src/
│   ├── components/          # Componentes React
│   ├── hooks/              # Hooks customizados
│   ├── lib/                # Configurações (Supabase)
│   ├── types/              # Tipos TypeScript
│   ├── data/               # Dados estáticos (será migrado)
│   └── index.css           # Estilos globais
├── database/               # Scripts SQL
│   ├── schema.sql          # Estrutura do banco
│   └── seed.sql            # Dados iniciais
├── .env                    # Variáveis de ambiente
└── package.json            # Dependências
```

## 🗄️ Estrutura do Banco de Dados

### Tabelas Principais

- **users**: Perfis dos usuários
- **modules**: Módulos do curso
- **lessons**: Lições de cada módulo
- **user_progress**: Progresso individual dos usuários

### Relacionamentos

- `lessons` → `modules` (many-to-one)
- `user_progress` → `users` (many-to-one)
- `user_progress` → `lessons` (many-to-one)

## 🔒 Segurança

- **Row Level Security (RLS)** habilitado em todas as tabelas
- Usuários só podem acessar seus próprios dados
- Módulos e lições são públicos (conteúdo do curso)
- Autenticação JWT via Supabase Auth

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. No Supabase, atualize as URLs permitidas:
   - **Site URL**: `https://seu-dominio.vercel.app`
   - **Redirect URLs**: `https://seu-dominio.vercel.app/**`

### Netlify

1. Conecte seu repositório ao Netlify
2. Configure as variáveis de ambiente
3. Atualize as URLs no Supabase

## 🔧 Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Gera build de produção
npm run preview  # Visualiza build de produção
npm run lint     # Executa linter
```

## 🐛 Solução de Problemas

### Erro de conexão com Supabase
- Verifique se as variáveis de ambiente estão corretas
- Confirme se o projeto Supabase está ativo
- Verifique se executou os scripts SQL

### Usuário não consegue fazer login
- Verifique se o usuário existe na tabela `auth.users`
- Confirme se o trigger criou o perfil na tabela `users`
- Verifique as políticas RLS

### Dados não carregam
- Verifique se executou o `seed.sql`
- Confirme se as políticas RLS estão corretas
- Verifique o console do navegador para erros

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique os logs do console do navegador
2. Verifique os logs do Supabase (Logs > API)
3. Consulte a documentação do Supabase

## 📄 Licença

© 2024 Sono em 15. Todos os direitos reservados.
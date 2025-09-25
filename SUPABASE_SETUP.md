# Configuração do Supabase - Instruções de Atualização

## 📋 O que foi adicionado ao aplicativo

Após os ajustes recentes no aplicativo, foram implementadas as seguintes funcionalidades:

### ✅ Funcionalidades Implementadas
- **Upload de Avatar**: Usuários podem fazer upload de fotos de perfil
- **Remoção de Avatar**: Possibilidade de remover a foto de perfil
- **Validação de Arquivos**: Verificação de tipo e tamanho dos arquivos
- **Preview de Imagem**: Visualização da imagem antes do upload
- **Integração com Supabase Storage**: Armazenamento seguro das imagens

## 🚀 Configurações Necessárias no Supabase

Para que o aplicativo funcione corretamente com as novas funcionalidades, você precisa executar as configurações de storage no Supabase.

### Passo 1: Acessar o Supabase
1. Acesse [supabase.com](https://supabase.com)
2. Faça login na sua conta
3. Selecione o projeto "Sono em 15"

### Passo 2: Executar Script de Storage
1. No painel do Supabase, vá em **SQL Editor**
2. Clique em "New Query"
3. Copie todo o conteúdo do arquivo `database/storage.sql`
4. Cole no editor SQL
5. Clique em "Run" para executar

### Passo 3: Configurar Políticas de Storage
1. Vá em **Storage** no painel do Supabase
2. Clique no bucket "avatars" que foi criado
3. Vá na aba **Policies**
4. Clique em "New Policy"
5. Selecione "For full customization" e adicione estas políticas:

**Política 1 - Upload:**
- Nome: `Users can upload avatars`
- Allowed operation: `INSERT`
- Target roles: `authenticated`
- USING expression: `bucket_id = 'avatars'`
- WITH CHECK expression: `bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]`

**Política 2 - Visualização:**
- Nome: `Anyone can view avatars`
- Allowed operation: `SELECT`
- Target roles: `public`
- USING expression: `bucket_id = 'avatars'`

**Política 3 - Atualização:**
- Nome: `Users can update own avatars`
- Allowed operation: `UPDATE`
- Target roles: `authenticated`
- USING expression: `bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]`

**Política 4 - Exclusão:**
- Nome: `Users can delete own avatars`
- Allowed operation: `DELETE`
- Target roles: `authenticated`
- USING expression: `bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]`

### Passo 4: Verificar Configuração
Após executar o script e configurar as políticas, verifique se:

1. **Bucket criado**: Vá em **Storage** → deve aparecer um bucket chamado "avatars"
2. **Políticas ativas**: Em **Storage** → **avatars** → **Policies**, devem aparecer as 4 políticas criadas

## 📁 Estrutura de Arquivos

Os avatares serão organizados da seguinte forma no storage:
```
avatars/
├── [user-id-1]/
│   └── [timestamp].jpg
├── [user-id-2]/
│   └── [timestamp].png
└── ...
```

## 🔒 Segurança

- **Tamanho máximo**: 5MB por arquivo
- **Formatos aceitos**: JPEG, PNG, WebP, GIF
- **Acesso**: Cada usuário só pode modificar seus próprios avatares
- **Visualização**: Todos os avatares são públicos (necessário para exibição)

## ⚠️ Importante

**EXECUTE O SCRIPT `storage.sql` ANTES DE TESTAR A FUNCIONALIDADE DE UPLOAD**

Sem essa configuração, os usuários receberão erros ao tentar fazer upload de avatares.

## 🧪 Como Testar

Após executar o script:
1. Faça login no aplicativo
2. Clique no perfil do usuário
3. Vá em "Configurações"
4. Teste o upload de uma imagem
5. Verifique se a imagem aparece no perfil

## 📞 Suporte

Se encontrar problemas:
1. Verifique se o script foi executado completamente
2. Confirme se o bucket "avatars" foi criado
3. Verifique as políticas de segurança
4. Consulte os logs do Supabase em **Logs** → **API**
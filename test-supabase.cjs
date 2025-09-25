// Teste completo de conectividade com Supabase
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://zvcxfminwipfjbcndkax.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2Y3hmbWlud2lwZmpiY25ka2F4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NTE1NDQsImV4cCI6MjA3NDIyNzU0NH0.sitXnabTmr91jOAQAQEPiceuBK3TSOnec2aGML1sfZk';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testSupabaseConnection() {
  console.log('🔍 Testando conexão com Supabase...');
  
  try {
    const { data, error } = await supabase.from('users').select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('❌ Erro na conexão:', error.message);
      return false;
    }
    
    console.log('✅ Conexão com Supabase estabelecida com sucesso!');
    return true;
    
  } catch (err) {
    console.error('❌ Erro inesperado:', err.message);
    return false;
  }
}

async function testAuth() {
  console.log('🔐 Testando sistema de autenticação...');
  
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('❌ Erro na autenticação:', error.message);
      return false;
    }
    
    console.log('✅ Sistema de autenticação funcionando');
    console.log('👤 Sessão atual:', session ? 'Usuário logado' : 'Nenhum usuário logado');
    return true;
    
  } catch (err) {
    console.error('❌ Erro no teste de auth:', err.message);
    return false;
  }
}

async function testTablesWithData() {
  console.log('📋 Testando estrutura e dados das tabelas...');
  
  const tables = [
    { name: 'users', description: 'Usuários' },
    { name: 'modules', description: 'Módulos do curso' },
    { name: 'lessons', description: 'Lições' },
    { name: 'user_progress', description: 'Progresso dos usuários' }
  ];
  
  let allTablesOk = true;
  
  for (const table of tables) {
    try {
      const { data, error, count } = await supabase
        .from(table.name)
        .select('*', { count: 'exact' })
        .limit(3);
      
      if (error) {
        console.error(`❌ Erro na tabela ${table.name}:`, error.message);
        allTablesOk = false;
      } else {
        console.log(`✅ Tabela ${table.name} (${table.description}): ${count || 0} registros`);
        if (data && data.length > 0) {
          console.log(`   📄 Exemplo de dados:`, Object.keys(data[0]).join(', '));
        }
      }
    } catch (err) {
      console.error(`❌ Erro inesperado na tabela ${table.name}:`, err.message);
      allTablesOk = false;
    }
  }
  
  return allTablesOk;
}

async function testRealTimeFeatures() {
  console.log('⚡ Testando recursos em tempo real...');
  
  try {
    // Teste básico de subscription
    const channel = supabase
      .channel('test-channel')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'user_progress' },
        (payload) => {
          console.log('📡 Mudança detectada:', payload);
        }
      );
    
    await channel.subscribe();
    console.log('✅ Sistema de tempo real configurado');
    
    // Desinscrever após teste
    await channel.unsubscribe();
    return true;
    
  } catch (err) {
    console.error('❌ Erro no teste de tempo real:', err.message);
    return false;
  }
}

async function runTests() {
  console.log('🚀 Iniciando testes completos do Supabase...\n');
  
  const connectionTest = await testSupabaseConnection();
  console.log('');
  
  const authTest = await testAuth();
  console.log('');
  
  const tablesTest = await testTablesWithData();
  console.log('');
  
  const realtimeTest = await testRealTimeFeatures();
  console.log('');
  
  if (connectionTest && authTest && tablesTest && realtimeTest) {
    console.log('🎉 Todos os testes passaram! Supabase está funcionando perfeitamente.');
    console.log('✨ O banco de dados está configurado e pronto para uso.');
  } else {
    console.log('⚠️  Alguns testes falharam. Verifique a configuração.');
  }
}

runTests().catch(console.error);
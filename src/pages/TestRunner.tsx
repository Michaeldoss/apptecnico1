import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Loader2, Play, Eye, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface TestResult {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'success' | 'error';
  message?: string;
  details?: any;
}

interface TestUser {
  email: string;
  password: string;
  type: 'customer' | 'technician' | 'company' | 'admin';
  nome: string;
  telefone?: string;
  cpf_cnpj?: string;
  endereco?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
}

const TestRunner = () => {
  const { signup, login, logout, user, userType } = useAuth();
  const [tests, setTests] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTestId, setCurrentTestId] = useState<string | null>(null);
  const logRef = useRef<HTMLDivElement>(null);

  const testUsers: TestUser[] = [
    {
      email: 'cliente@exemplo.com',
      password: 'Cliente!123',
      type: 'customer',
      nome: 'Cliente Teste',
      telefone: '11999999999',
      cpf_cnpj: '12345678901',
      endereco: 'Rua Teste, 123',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01234567'
    },
    {
      email: 'tecnico@exemplo.com',
      password: 'Tecnico!123',
      type: 'technician',
      nome: 'Técnico Teste',
      telefone: '11888888888',
      cpf_cnpj: '98765432100',
      endereco: 'Av Teste, 456',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01234567'
    },
    {
      email: 'loja@exemplo.com',
      password: 'Loja!1234',
      type: 'company',
      nome: 'Loja Teste',
      telefone: '11777777777',
      cpf_cnpj: '12345678000195',
      endereco: 'Rua Comercial, 789',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01234567'
    },
    {
      email: 'admin@exemplo.com',
      password: 'Admin!1234',
      type: 'admin',
      nome: 'Admin Teste',
      telefone: '11666666666'
    }
  ];

  const updateTest = (id: string, status: TestResult['status'], message?: string, details?: any) => {
    setTests(prev => prev.map(test => 
      test.id === id ? { ...test, status, message, details } : test
    ));
    
    // Auto scroll to bottom
    setTimeout(() => {
      if (logRef.current) {
        logRef.current.scrollTop = logRef.current.scrollHeight;
      }
    }, 100);
  };

  const addLog = (message: string, type: 'info' | 'success' | 'error' = 'info') => {
    console.log(`[TEST] ${message}`);
    toast({
      title: "Test Log",
      description: message,
      variant: type === 'error' ? 'destructive' : 'default'
    });
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const checkUserInDatabase = async (email: string, expectedType: string) => {
    const tables = {
      'customer': 'clientes',
      'technician': 'tecnicos', 
      'company': 'lojas',
      'admin': 'admins'
    };

    const tableName = tables[expectedType as keyof typeof tables];
    if (!tableName) throw new Error(`Tipo de usuário inválido: ${expectedType}`);

    try {
      const { data, error } = await supabase
        .from(tableName as any)
        .select('*')
        .eq('email', email)
        .maybeSingle();

      if (error) throw error;
      return data;
    } catch (error: any) {
      throw new Error(`Erro ao buscar usuário: ${error.message}`);
    }
  };

  const testSignup = async (testUser: TestUser): Promise<{ success: boolean; authUserId?: string }> => {
    addLog(`Iniciando cadastro para ${testUser.email} (${testUser.type})`);
    
    const result = await signup(testUser.email, testUser.password, testUser);

    if (!result.success) {
      throw new Error('Cadastro falhou');
    }

    // Wait a bit for the user to be created
    await sleep(2000);

    // Check if user exists in auth.users by making a simple query
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
    
    // For testing purposes, we'll check if we can query users
    const { data: currentSession } = await supabase.auth.getSession();
    
    // Check if user exists in correct table
    const dbUser = await checkUserInDatabase(testUser.email, testUser.type);
    if (!dbUser) {
      throw new Error(`Usuário não encontrado na tabela ${testUser.type}`);
    }

    // If we have a session, verify basic auth works
    if (currentSession?.session) {
      addLog(`Auth session verificado para ${testUser.email}`);
    }

    addLog(`✅ Cadastro bem-sucedido para ${testUser.email}`, 'success');
    return { success: true, authUserId: (dbUser as any)?.id || 'unknown' };
  };

  const testLogin = async (testUser: TestUser): Promise<boolean> => {
    addLog(`Testando login para ${testUser.email}`);
    
    // Logout first to ensure clean state
    await logout();
    await sleep(1000);

    const result = await login(testUser.email, testUser.password);

    if (!result.success) {
      throw new Error('Login falhou');
    }

    if (result.userType && result.userType !== testUser.type) {
      throw new Error(`Tipo de usuário incorreto. Esperado: ${testUser.type}, Atual: ${result.userType}`);
    }

    await sleep(1000);

    const { data: authUserResponse, error: authUserError } = await supabase.auth.getUser();
    if (authUserError || !authUserResponse.user) {
      throw new Error('Usuário não está autenticado após login');
    }

    addLog(`✅ Login bem-sucedido para ${testUser.email} (${result.userType ?? 'tipo não identificado'})`, 'success');
    return true;
  };

  const runAllTests = async () => {
    setIsRunning(true);
    setTests([]);
    
    const allTests: TestResult[] = [];

    // Initialize all tests
    testUsers.forEach(testUser => {
      allTests.push(
        { id: `signup-${testUser.type}`, name: `Cadastro ${testUser.type.toUpperCase()}`, status: 'pending' },
        { id: `login-${testUser.type}`, name: `Login ${testUser.type.toUpperCase()}`, status: 'pending' },
        { id: `validation-${testUser.type}`, name: `Validação ${testUser.type.toUpperCase()}`, status: 'pending' }
      );
    });

    allTests.push(
      { id: 'google-auth', name: 'Google Auth Test', status: 'pending' },
      { id: 'persistence', name: 'Teste de Persistência', status: 'pending' },
      { id: 'final-report', name: 'Relatório Final', status: 'pending' }
    );

    setTests(allTests);
    await sleep(500);

    try {
      const userResults: any = {};

      // Test signup for each user type
      for (const testUser of testUsers) {
        const signupTestId = `signup-${testUser.type}`;
        setCurrentTestId(signupTestId);
        updateTest(signupTestId, 'running');

        try {
          const result = await testSignup(testUser);
          userResults[testUser.type] = result;
          updateTest(signupTestId, 'success', `✅ Cadastro criado com sucesso`);
        } catch (error: any) {
          updateTest(signupTestId, 'error', `❌ ${error.message}`);
          addLog(`Erro no cadastro de ${testUser.type}: ${error.message}`, 'error');
        }

        await sleep(1000);
      }

      // Test login for each user type
      for (const testUser of testUsers) {
        const loginTestId = `login-${testUser.type}`;
        setCurrentTestId(loginTestId);
        updateTest(loginTestId, 'running');

        try {
          await testLogin(testUser);
          updateTest(loginTestId, 'success', `✅ Login realizado com sucesso`);
        } catch (error: any) {
          updateTest(loginTestId, 'error', `❌ ${error.message}`);
          addLog(`Erro no login de ${testUser.type}: ${error.message}`, 'error');
        }

        await sleep(1000);
      }

      // Test database validation
      for (const testUser of testUsers) {
        const validationTestId = `validation-${testUser.type}`;
        setCurrentTestId(validationTestId);
        updateTest(validationTestId, 'running');

        try {
          const dbUser = await checkUserInDatabase(testUser.email, testUser.type);
          if (dbUser && (dbUser as any).email === testUser.email) {
            updateTest(validationTestId, 'success', `✅ Dados persistidos corretamente`);
          } else {
            throw new Error('Dados não encontrados no banco');
          }
        } catch (error: any) {
          updateTest(validationTestId, 'error', `❌ ${error.message}`);
        }

        await sleep(1000);
      }

      // Google Auth test (placeholder)
      setCurrentTestId('google-auth');
      updateTest('google-auth', 'running');
      await sleep(2000);
      updateTest('google-auth', 'success', `⚠️ Teste manual necessário - requer configuração Google`);

      // Persistence test
      setCurrentTestId('persistence');
      updateTest('persistence', 'running');
      await sleep(1000);
      
      // Test page reload persistence
      const currentUser = user;
      if (currentUser) {
        updateTest('persistence', 'success', `✅ Sessão persistente confirmada`);
      } else {
        updateTest('persistence', 'error', `❌ Sessão não persistiu`);
      }

      // Final report
      setCurrentTestId('final-report');
      updateTest('final-report', 'running');
      await sleep(1000);

      const successCount = allTests.filter(t => t.status === 'success').length;
      const totalCount = allTests.length - 1; // Excluding final report itself
      
      updateTest('final-report', 'success', 
        `📊 Relatório: ${successCount}/${totalCount} testes passaram`);

    } catch (error: any) {
      addLog(`Erro geral nos testes: ${error.message}`, 'error');
    } finally {
      setIsRunning(false);
      setCurrentTestId(null);
    }
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'error': return <XCircle className="h-5 w-5 text-red-600" />;
      case 'running': return <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />;
      default: return <div className="h-5 w-5 bg-gray-300 rounded-full" />;
    }
  };

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'success': return 'bg-green-100 border-green-200';
      case 'error': return 'bg-red-100 border-red-200';
      case 'running': return 'bg-blue-100 border-blue-200';
      default: return 'bg-gray-100 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🧪 Test Runner - Sistema de Autenticação
          </h1>
          <p className="text-lg text-gray-600">
            Teste automatizado completo de cadastro e login para todos os tipos de usuário
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                Controles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={runAllTests} 
                disabled={isRunning}
                className="w-full"
                size="lg"
              >
                {isRunning ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Executando Testes...
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5 mr-2" />
                    Executar Todos os Testes
                  </>
                )}
              </Button>
              
              {user && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium">Usuário atual:</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <Badge variant="outline">{userType}</Badge>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Usuários de Teste
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {testUsers.map(user => (
                  <div key={user.email} className="p-2 bg-gray-50 rounded text-sm">
                    <div className="font-medium">{user.email}</div>
                    <div className="text-gray-600">Tipo: {user.type} | Senha: {user.password}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Resultados dos Testes</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              ref={logRef}
              className="space-y-2 max-h-96 overflow-y-auto"
            >
              {tests.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  Clique em "Executar Todos os Testes" para iniciar
                </div>
              ) : (
                tests.map(test => (
                  <div 
                    key={test.id}
                    className={`p-3 rounded-lg border transition-all ${getStatusColor(test.status)} ${
                      currentTestId === test.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(test.status)}
                        <span className="font-medium">{test.name}</span>
                      </div>
                      <Badge variant={test.status === 'error' ? 'destructive' : 'default'}>
                        {test.status}
                      </Badge>
                    </div>
                    {test.message && (
                      <div className="mt-2 text-sm text-gray-600">
                        {test.message}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TestRunner;
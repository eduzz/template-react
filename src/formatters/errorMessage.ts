export function errorMessageFormatter(err: any): string {
  if (typeof err === 'string') {
    return err;
  }

  const status: any = {
    '-1': 'Servidor não encontrado',
    400: 'Dados inválidos',
    401: 'Sem permissão de acesso',
    403: 'Sem permissão de acesso',
    422: 'Dados inválidos',
    411: 'Dados inválidos',
  };

  if (err.reponse && err.response.data && err.response.data && err.response.data.details) {
    return err.response.data.details;
  }

  switch ((err || {}).message) {
    case 'no-internet':
    case 'NETWORK_ERROR':
      return 'Sem conexão com a internet';
    case 'api-error':
      if (err.status == -1) {
        return 'Não conseguimos se comunicar com o servidor';
      }

      if (err.data && err.data.details) {
        return err.data.details;
      }

      return status[err.status] || 'Algo deu errado no servidor...';
    default:
      return 'Algo deu errado...';
  }
}
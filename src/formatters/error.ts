export default function errorFormatter(err: any): string {
  if (typeof err === 'string') {
    return err;
  }

  switch ((err || {}).message) {
    case 'no-internet':
    case 'NETWORK_ERROR':
      return 'Sem conexão com a internet';
    case 'api-error':
      if (err.status === 400) {
        // eslint-disable-next-line sonarjs/no-nested-template-literals
        return err.data?.message ?? 'Dados inválidos';
      }

      const status: any = {
        '-1': 'Não conseguimos se comunicar com o servidor',
        401: 'Sem permissão de acesso',
        403: 'Sem permissão de acesso',
        404: 'Não encontrado',
        422: 'Dados inválidos'
      };

      return status[err.status] || 'Algo deu errado...';
    default:
      return 'Algo deu errado...';
  }
}

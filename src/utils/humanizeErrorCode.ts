export default function humanizeErrorCode(code: string) {
  switch (code) {
    case 'auth/wrong-password':
      return 'E-mail ou senha incorretos!';
    case 'auth/user-not-found':
      return 'E-mail ou senha incorretos!';
    case 'Sign in action cancelled':
      return 'Login cancelado pelo usuário';
    case 'auth/email-already-in-use':
      return 'Esse e-mail ja está registrado!';
    case 'Ad is not ready.':
      return 'O anúncio não está pronto.';
    case '[auth/user-not-found] There is no user record corresponding to this identifier. The user may have been deleted.':
      return 'Não há registro de usuário correspondente a esse e-mail';
    case '[auth/invalid-email] The email address is badly formatted.':
      return 'Endereço de email inválido';
    case 'Frequency cap reached. <https://support.google.com/admob/answer/9905175#6>':
      return 'Você atingiu o límite diário de anúncios assistidos, tente novamente amanhã!';
    case 'Frequency cap reached.<https://support.google.com/admob/answer/9905175#6>':
      return 'Você atingiu o límite diário de anúncios assistidos, tente novamente amanhã!';
    default:
      return code;
  }
}

/* ===================================================
   auth.js — 로그인 / 회원가입 로직 (Supabase Auth)
   =================================================== */

const AuthPage = {

  /* ── 로그인 초기화 ── */
  initLogin(params = {}) {
    this._bindLoginForm();
    this._bindSocialButtons();
    this._bindGoSignup();
    this._bindForgotPassword();
  },

  _bindLoginForm() {
    const form = document.getElementById('login-form');
    if (!form) return;

    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);

    newForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email    = newForm.querySelector('#login-email').value.trim();
      const password = newForm.querySelector('#login-password').value;
      const submitBtn = newForm.querySelector('button[type="submit"]');

      if (!this._validateEmail(email)) {
        showToast('올바른 이메일 주소를 입력해주세요.', 'error');
        return;
      }
      if (password.length < 6) {
        showToast('비밀번호는 6자 이상 입력해주세요.', 'error');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = '로그인 중...';

      const { data, error } = await API.auth.login(email, password);

      submitBtn.disabled = false;
      submitBtn.textContent = '로그인';

      if (error) {
        const msg = this._parseAuthError(error);
        showToast(msg, 'error');
        return;
      }

      showToast('로그인 되었습니다.', 'success');
      Router.navigate('home');
    });
  },

  _bindSocialButtons() {
    document.querySelectorAll('.auth-social__btn').forEach((btn) => {
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);

      newBtn.addEventListener('click', async () => {
        const provider = newBtn.dataset.social;
        if (provider === 'google') {
          await API.auth.loginWithGoogle();
        } else if (provider === 'kakao') {
          await API.auth.loginWithKakao();
        } else if (provider === 'naver') {
          await API.auth.loginWithNaver();
        }
      });
    });
  },

  _bindForgotPassword() {
    const btn = document.querySelector('.auth-login__forgot');
    if (!btn) return;
    btn.addEventListener('click', async () => {
      const emailInput = document.getElementById('login-email');
      const email = emailInput ? emailInput.value.trim() : '';

      if (!email || !this._validateEmail(email)) {
        showToast('이메일을 먼저 입력해주세요.', 'error');
        return;
      }

      const { error } = await API.auth.resetPassword(email);
      if (error) {
        showToast('비밀번호 재설정 이메일 전송에 실패했습니다.', 'error');
      } else {
        showToast('비밀번호 재설정 이메일을 발송했습니다.', 'success');
      }
    });
  },

  _bindGoSignup() {
    const btn = document.getElementById('go-signup');
    if (!btn) return;

    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);

    newBtn.addEventListener('click', () => {
      Router.navigate('signup');
    });
  },

  /* ── 회원가입 초기화 ── */
  initSignup(params = {}) {
    this._bindSignupBack();
    this._bindSignupForm();
  },

  _bindSignupBack() {
    const btn = document.getElementById('signup-back');
    if (!btn) return;

    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);

    newBtn.addEventListener('click', () => {
      Router.navigate('login');
    });
  },

  _bindSignupForm() {
    const form = document.getElementById('signup-form');
    if (!form) return;

    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);

    newForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nickname  = newForm.querySelector('#signup-nickname').value.trim();
      const email     = newForm.querySelector('#signup-email').value.trim();
      const password  = newForm.querySelector('#signup-password').value;
      const confirm   = newForm.querySelector('#signup-password-confirm').value;
      const submitBtn = newForm.querySelector('button[type="submit"]');

      if (!nickname) {
        showToast('닉네임을 입력해주세요.', 'error');
        return;
      }
      if (!this._validateEmail(email)) {
        showToast('올바른 이메일 주소를 입력해주세요.', 'error');
        return;
      }
      if (password.length < 6) {
        showToast('비밀번호는 6자 이상 입력해주세요.', 'error');
        return;
      }
      if (password !== confirm) {
        showToast('비밀번호가 일치하지 않습니다.', 'error');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = '가입 중...';

      const { data, error } = await API.auth.signup(email, password, nickname);

      submitBtn.disabled = false;
      submitBtn.textContent = '회원가입';

      if (error) {
        const msg = this._parseAuthError(error);
        showToast(msg, 'error');
        return;
      }

      /* 이메일 인증이 필요한 경우 session이 null */
      if (!data?.session) {
        showToast('가입 확인 이메일을 발송했습니다. 이메일을 확인해주세요.', 'success', 4000);
        Router.navigate('login');
        return;
      }

      Storage.remove('quiz_answers');
      showToast('회원가입이 완료되었습니다!', 'success');
      Router.navigate('quiz-1');
    });
  },

  /* ── 유틸 ── */
  _validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  _parseAuthError(error) {
    const msg = error?.message || '';
    if (msg.includes('Invalid login credentials')) return '이메일 또는 비밀번호가 올바르지 않습니다.';
    if (msg.includes('Email not confirmed'))        return '이메일 인증이 필요합니다. 이메일을 확인해주세요.';
    if (msg.includes('User already registered'))   return '이미 가입된 이메일입니다.';
    if (msg.includes('Password should be'))        return '비밀번호는 6자 이상이어야 합니다.';
    if (msg.includes('rate limit'))                return '잠시 후 다시 시도해주세요.';
    return '오류가 발생했습니다. 다시 시도해주세요.';
  }
};

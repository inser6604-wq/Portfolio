/* ===================================================
   api.js — Supabase API 레이어
   =================================================== */

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* 공통 에러 래퍼 */
async function _call(fn) {
  try {
    return await fn();
  } catch (err) {
    console.error('[API Error]', err);
    return { data: null, error: { message: err.message || '오류가 발생했습니다.' } };
  }
}

/* 현재 로그인 유저 ID (자주 사용) */
async function _uid() {
  const { data: { session } } = await _supabase.auth.getSession();
  return session?.user?.id ?? null;
}

/* D-day 계산 헬퍼 */
function _calcDday(dateStr) {
  if (!dateStr) return null;
  const diff = Math.ceil((new Date(dateStr) - new Date()) / 86400000);
  if (diff < 0)  return '마감';
  if (diff === 0) return 'D-DAY';
  return `D - ${diff}`;
}

/* 세션 변경 감지 — 로그아웃 시 로그인 화면으로 */
_supabase.auth.onAuthStateChange((event) => {
  if (event === 'SIGNED_OUT') {
    if (typeof Router !== 'undefined') {
      Router.navigate('login', { noHistory: true });
    }
  }
});

/* DB row → JS 객체 변환 (project) */
function _adaptProject(row) {
  if (!row) return null;
  return {
    id:            row.id,
    title:         row.title,
    category:      row.category,
    status:        row.status,
    description:   row.description,
    deadline:      row.deadline,
    deadlineLabel: row.deadline ? _calcDday(row.deadline) : '상시모집',
    durationLabel: row.duration_label,
    members: {
      current: row.members_current,
      total:   row.members_total
    },
    teamSizeRange: `${row.members_current}~${row.members_total}명`,
    roles:         row.roles || [],
    techStack:     row.tech_stack || [],
    author: {
      name:    row.author?.name  || '익명',
      initial: (row.author?.name || '?')[0],
      avatar:  row.author?.avatar_url || null
    },
    applicants:  row.applicants_count,
    views:       row.views,
    isFeatured:  row.is_featured,
    isBookmarked: false
  };
}

/* DB row → JS 객체 변환 (post) */
function _adaptPost(row) {
  if (!row) return null;
  const catMap = { free: '자유게시판', contest: '공모전 정보', review: '프로젝트 후기' };
  return {
    id:        row.id,
    category:  catMap[row.category] || row.category,
    dbCategory: row.category,
    title:     row.title,
    content:   row.content,
    author: {
      name:    row.author?.name || '익명',
      initial: (row.author?.name || '?')[0],
      avatar:  row.author?.avatar_url || null
    },
    createdAt: row.created_at,
    views:     row.views,
    comments:  row.comments?.[0]?.count ?? 0,
    likes:     row.likes,
    isSaved:   false,
    isLiked:   false
  };
}

/* ── API 인터페이스 ── */

const API = {

  /* ─── 인증 ─── */
  auth: {
    async login(email, password) {
      return _call(() =>
        _supabase.auth.signInWithPassword({ email, password })
      );
    },

    async signup(email, password, name) {
      return _call(() =>
        _supabase.auth.signUp({
          email,
          password,
          options: { data: { name } }
        })
      );
    },

    async loginWithGoogle() {
      return _call(() =>
        _supabase.auth.signInWithOAuth({
          provider: 'google',
          options: { redirectTo: location.origin + location.pathname }
        })
      );
    },

    async loginWithKakao() {
      return _call(() =>
        _supabase.auth.signInWithOAuth({
          provider: 'kakao',
          options: { redirectTo: location.origin + location.pathname }
        })
      );
    },

    async loginWithNaver() {
      return _call(() =>
        _supabase.auth.signInWithOAuth({
          provider: 'azure',
          options: { redirectTo: location.origin + location.pathname }
        })
      );
    },

    async logout() {
      return _call(() => _supabase.auth.signOut());
    },

    async getSession() {
      const { data: { session } } = await _supabase.auth.getSession();
      return session;
    },

    async resetPassword(email) {
      return _call(() =>
        _supabase.auth.resetPasswordForEmail(email, {
          redirectTo: location.origin + location.pathname
        })
      );
    }
  },

  /* ─── 프로필 ─── */
  profile: {
    async get(userId) {
      return _call(async () => {
        const id = userId || await _uid();
        const { data, error } = await _supabase
          .from('profiles')
          .select('*')
          .eq('id', id)
          .single();
        return { data, error };
      });
    },

    async update(fields) {
      return _call(async () => {
        const id = await _uid();
        const { data, error } = await _supabase
          .from('profiles')
          .update(fields)
          .eq('id', id)
          .select()
          .single();
        return { data, error };
      });
    },

    async saveQuizResult({ personality_type, interests, selected_tools }) {
      return _call(async () => {
        const id = await _uid();
        if (!id) return { data: null, error: { message: '로그인이 필요합니다.' } };
        const { data, error } = await _supabase
          .from('profiles')
          .update({ personality_type, interests, selected_tools })
          .eq('id', id)
          .select()
          .single();
        return { data, error };
      });
    }
  },

  /* ─── 프로젝트 ─── */
  projects: {
    async getList(filters = {}) {
      return _call(async () => {
        let q = _supabase
          .from('projects')
          .select('*, author:profiles(name, avatar_url)')
          .order('created_at', { ascending: false });

        if (filters.category && filters.category !== '전체') {
          q = q.eq('category', filters.category);
        }
        if (filters.keyword) {
          q = q.ilike('title', `%${filters.keyword}%`);
        }
        if (filters.status) {
          q = q.eq('status', filters.status);
        }

        const { data, error } = await q;
        return { data: (data || []).map(_adaptProject), error };
      });
    },

    async getById(id) {
      return _call(async () => {
        const { data, error } = await _supabase
          .from('projects')
          .select('*, author:profiles(name, avatar_url)')
          .eq('id', id)
          .single();
        return { data: _adaptProject(data), error };
      });
    },

    async create(fields) {
      return _call(async () => {
        const id = await _uid();
        const { data, error } = await _supabase
          .from('projects')
          .insert({ ...fields, author_id: id })
          .select()
          .single();
        return { data, error };
      });
    },

    async apply(projectId, { motivation, portfolioUrl, selfIntro }) {
      return _call(async () => {
        const id = await _uid();
        const { data, error } = await _supabase
          .from('applications')
          .insert({
            project_id:    projectId,
            user_id:       id,
            motivation,
            portfolio_url: portfolioUrl || null,
            self_intro:    selfIntro
          })
          .select()
          .single();
        return { data, error };
      });
    },

    async getMyApplications() {
      return _call(async () => {
        const id = await _uid();
        const { data, error } = await _supabase
          .from('applications')
          .select('*, project:projects(*)')
          .eq('user_id', id)
          .order('created_at', { ascending: false });
        return { data, error };
      });
    }
  },

  /* ─── 북마크 ─── */
  bookmarks: {
    async toggle(projectId) {
      return _call(async () => {
        const id = await _uid();
        if (!id) return { data: null, error: { message: '로그인이 필요합니다.' } };

        const { data: existing } = await _supabase
          .from('bookmarks')
          .select('id')
          .eq('user_id', id)
          .eq('project_id', projectId)
          .maybeSingle();

        if (existing) {
          const { error } = await _supabase
            .from('bookmarks')
            .delete()
            .eq('user_id', id)
            .eq('project_id', projectId);
          return { data: { bookmarked: false }, error };
        } else {
          const { error } = await _supabase
            .from('bookmarks')
            .insert({ user_id: id, project_id: projectId });
          return { data: { bookmarked: true }, error };
        }
      });
    },

    async getByUser() {
      return _call(async () => {
        const id = await _uid();
        const { data, error } = await _supabase
          .from('bookmarks')
          .select('project_id')
          .eq('user_id', id);
        return { data: (data || []).map(b => b.project_id), error };
      });
    }
  },

  /* ─── 커뮤니티 ─── */
  community: {
    async getPosts(category = null) {
      return _call(async () => {
        let q = _supabase
          .from('posts')
          .select('*, author:profiles(name, avatar_url), comments(count)')
          .order('created_at', { ascending: false });
        if (category) q = q.eq('category', category);
        const { data, error } = await q;
        return { data: (data || []).map(_adaptPost), error };
      });
    },

    async getPost(id) {
      return _call(async () => {
        const { data, error } = await _supabase
          .from('posts')
          .select('*, author:profiles(name, avatar_url), comments(*, author:profiles(name, avatar_url))')
          .eq('id', id)
          .single();
        return { data: data ? _adaptPost(data) : null, error };
      });
    },

    async createPost({ category, title, content }) {
      return _call(async () => {
        const id = await _uid();
        const { data, error } = await _supabase
          .from('posts')
          .insert({ category, title, content, author_id: id })
          .select()
          .single();
        return { data, error };
      });
    },

    async updatePost(postId, { title, content }) {
      return _call(async () => {
        const { data, error } = await _supabase
          .from('posts')
          .update({ title, content })
          .eq('id', postId)
          .select()
          .single();
        return { data, error };
      });
    },

    async deletePost(postId) {
      return _call(() =>
        _supabase.from('posts').delete().eq('id', postId)
      );
    },

    async addComment(postId, content) {
      return _call(async () => {
        const id = await _uid();
        const { data, error } = await _supabase
          .from('comments')
          .insert({ post_id: postId, author_id: id, content })
          .select('*, author:profiles(name, avatar_url)')
          .single();
        return { data, error };
      });
    },

    async deleteComment(commentId) {
      return _call(() =>
        _supabase.from('comments').delete().eq('id', commentId)
      );
    },

    async toggleLike(postId) {
      return _call(async () => {
        const id = await _uid();
        if (!id) return { data: null, error: { message: '로그인이 필요합니다.' } };

        const { data: existing } = await _supabase
          .from('post_likes')
          .select('post_id')
          .eq('post_id', postId)
          .eq('user_id', id)
          .maybeSingle();

        if (existing) {
          await _supabase.from('post_likes').delete()
            .eq('post_id', postId).eq('user_id', id);
          await _supabase.from('posts').update({ likes: _supabase.rpc('decrement', { x: 1 }) })
            .eq('id', postId);
          return { data: { liked: false }, error: null };
        } else {
          await _supabase.from('post_likes').insert({ post_id: postId, user_id: id });
          await _supabase.from('posts').rpc !== undefined
            ? null
            : null;
          return { data: { liked: true }, error: null };
        }
      });
    },

    async toggleSave(postId) {
      return _call(async () => {
        const id = await _uid();
        if (!id) return { data: null, error: { message: '로그인이 필요합니다.' } };

        const { data: existing } = await _supabase
          .from('saved_posts')
          .select('post_id')
          .eq('post_id', postId)
          .eq('user_id', id)
          .maybeSingle();

        if (existing) {
          await _supabase.from('saved_posts').delete()
            .eq('post_id', postId).eq('user_id', id);
          return { data: { saved: false }, error: null };
        } else {
          await _supabase.from('saved_posts').insert({ post_id: postId, user_id: id });
          return { data: { saved: true }, error: null };
        }
      });
    },

    async getSavedPosts() {
      return _call(async () => {
        const id = await _uid();
        const { data, error } = await _supabase
          .from('saved_posts')
          .select('post:posts(*, author:profiles(name, avatar_url), comments(count))')
          .eq('user_id', id)
          .order('created_at', { ascending: false });
        const posts = (data || []).map(r => _adaptPost(r.post)).filter(Boolean);
        return { data: posts, error };
      });
    }
  },

  /* ─── 마이페이지 ─── */
  mypage: {
    async getMyProjects() {
      return _call(async () => {
        const id = await _uid();
        const { data, error } = await _supabase
          .from('applications')
          .select('*, project:projects(*, author:profiles(name, avatar_url))')
          .eq('user_id', id)
          .eq('status', 'accepted')
          .order('created_at', { ascending: false });
        return { data, error };
      });
    },

    async getMyApplications() {
      return _call(async () => {
        const id = await _uid();
        const { data, error } = await _supabase
          .from('applications')
          .select('*, project:projects(*)')
          .eq('user_id', id)
          .order('created_at', { ascending: false });
        return { data, error };
      });
    }
  },

  /* ─── 리뷰 ─── */
  reviews: {
    async getByUser(userId) {
      return _call(async () => {
        const id = userId || await _uid();
        const { data, error } = await _supabase
          .from('reviews')
          .select('*, author:profiles(name, avatar_url), project:projects(title)')
          .eq('target_id', id)
          .order('created_at', { ascending: false });
        return { data, error };
      });
    },

    async getWrittenByUser(userId) {
      return _call(async () => {
        const id = userId || await _uid();
        const { data, error } = await _supabase
          .from('reviews')
          .select('*, target:profiles(name, avatar_url), project:projects(title)')
          .eq('author_id', id)
          .order('created_at', { ascending: false });
        return { data, error };
      });
    },

    async create({ projectId, targetId, rating, content }) {
      return _call(async () => {
        const id = await _uid();
        const { data, error } = await _supabase
          .from('reviews')
          .insert({
            project_id: projectId,
            author_id:  id,
            target_id:  targetId,
            rating,
            content
          })
          .select()
          .single();
        return { data, error };
      });
    }
  },

  /* ─── 알림 ─── */
  notifications: {
    async getList() {
      return _call(async () => {
        const id = await _uid();
        const { data, error } = await _supabase
          .from('notifications')
          .select('*')
          .eq('user_id', id)
          .order('created_at', { ascending: false })
          .limit(50);
        return { data, error };
      });
    },

    async markRead(notificationId) {
      return _call(() =>
        _supabase.from('notifications')
          .update({ is_read: true })
          .eq('id', notificationId)
      );
    },

    async markAllRead() {
      return _call(async () => {
        const id = await _uid();
        return _supabase.from('notifications')
          .update({ is_read: true })
          .eq('user_id', id)
          .eq('is_read', false);
      });
    }
  },

  /* ─── Storage (이미지 업로드) ─── */
  storage: {
    async uploadAvatar(file) {
      return _call(async () => {
        const id = await _uid();
        if (!id) return { data: null, error: { message: '로그인이 필요합니다.' } };

        const ext  = file.name.split('.').pop();
        const path = `${id}/avatar.${ext}`;

        const { error: uploadError } = await _supabase.storage
          .from('avatars')
          .upload(path, file, { upsert: true });

        if (uploadError) return { data: null, error: uploadError };

        const { data: urlData } = _supabase.storage
          .from('avatars')
          .getPublicUrl(path);

        await API.profile.update({ avatar_url: urlData.publicUrl });
        return { data: urlData.publicUrl, error: null };
      });
    }
  }
};

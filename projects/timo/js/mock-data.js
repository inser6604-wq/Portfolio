/* ===================================================
   mock-data.js — 커뮤니티·프로필·리뷰 화면용 샘플 데이터
   =================================================== */

const MOCK_POSTS = [
  {
    id: 'post-001',
    category: '자유게시판',
    title: '해커톤 처음인데 어떻게 준비해야 하나요?',
    content: '다음 달에 첫 해커톤을 나가게 됐는데요. 준비 팁 공유해주실 분 계신가요?\n\n아직 어떤 기술 스택으로 갈지도 결정 못 했고, 팀원도 모집 중이에요. 조언 부탁드립니다!',
    author: { name: '이준혁', avatarColor: '#7fffd4', initial: '이' },
    createdAt: '2026-06-23T10:00:00Z',
    views: 234,
    comments: 18,
    likes: 12
  },
  {
    id: 'post-002',
    category: '공모전 정보',
    title: '2026 K-스타트업 앱 공모전 접수 시작!',
    content: '상금 1000만원 규모의 K-스타트업 공모전이 접수를 시작했습니다.\n\n모바일 앱 분야 지원 가능하며 팀 단위 참가입니다.',
    author: { name: '관리자', avatarColor: '#f8bbd9', initial: '관' },
    createdAt: '2026-06-22T09:00:00Z',
    views: 512,
    comments: 7,
    likes: 34
  },
  {
    id: 'post-003',
    category: '프로젝트 후기',
    title: '첫 공모전 수상 후기 공유합니다',
    content: 'TIMO에서 만난 팀원들과 함께 공모전 은상을 수상했어요!\n\n처음엔 걱정이 많았는데 좋은 팀원 덕분에 좋은 결과를 냈습니다.',
    author: { name: '김서연', avatarColor: '#c8e6c9', initial: '김' },
    createdAt: '2026-06-20T14:30:00Z',
    views: 891,
    comments: 42,
    likes: 78
  },
  {
    id: 'post-004',
    category: '자유게시판',
    title: 'React vs Vue, 어떤 스택이 더 좋을까요?',
    content: '사이드 프로젝트 시작하려는데 프론트엔드 스택 고민 중입니다.\n\n팀원들 의견이 갈려서요. 경험자분들 의견 부탁드립니다.',
    author: { name: '박민호', avatarColor: '#ffe0b2', initial: '박' },
    createdAt: '2026-06-19T16:00:00Z',
    views: 342,
    comments: 25,
    likes: 19
  }
];

const MOCK_COMMENTS = {
  'post-001': [
    { id: 'cmt-001', author: { name: '최다은', avatarColor: '#7fffd4', initial: '최' }, content: '저도 처음엔 막막했는데 일단 아이디에이션부터 시작하면 좋아요!', createdAt: '2026-06-23T11:00:00Z', likes: 5 },
    { id: 'cmt-002', author: { name: '정우성', avatarColor: '#b2ebf2', initial: '정' }, content: 'TIMO에서 팀원 구하면 정말 좋더라고요. 같은 방향성 가진 분들이 많아요.', createdAt: '2026-06-23T12:30:00Z', likes: 3 }
  ]
};

const MOCK_PROFILE = {
  id: 'user-001',
  name: '서효진',
  email: 'hyojin@example.com',
  avatarColor: '#7fffd4',
  initial: '서',
  bio: 'UI/UX 디자이너 + 프론트엔드 개발자\n사용자 경험을 중심으로 생각합니다.',
  skills: ['Figma', 'React', 'CSS', 'JavaScript'],
  personalityType: 'ENFP',
  myProjects: [
    { id: 'proj-001', title: 'AI 헬스케어 앱 개발', category: '해커톤', status: 'open' }
  ],
  myApplications: [
    { id: 'app-001', projectId: 'proj-002', projectTitle: '스마트시티 솔루션 공모전', status: '검토 중', appliedAt: '2026-06-20T10:00:00Z' }
  ],
  bookmarks: ['proj-003', 'proj-004']
};

const MOCK_REVIEWS = [
  {
    id: 'review-001',
    projectId: 'proj-001',
    projectTitle: 'AI 헬스케어 앱 개발',
    reviewer: { name: '김민준', avatarColor: '#7fffd4', initial: '김' },
    rating: 5,
    content: '함께 작업하기 정말 즐거웠어요. 꼼꼼하고 책임감이 강해서 프로젝트가 매끄럽게 진행됐습니다.',
    createdAt: '2026-06-15T10:00:00Z'
  },
  {
    id: 'review-002',
    projectId: 'proj-003',
    projectTitle: '소셜 커머스 플랫폼 MVP',
    reviewer: { name: '박지호', avatarColor: '#b2ebf2', initial: '박' },
    rating: 4,
    content: '디자인 감각이 뛰어나고 커뮤니케이션이 원활했어요. 다음에도 같이 작업하고 싶습니다.',
    createdAt: '2026-06-10T14:30:00Z'
  },
  {
    id: 'review-003',
    projectId: 'proj-002',
    projectTitle: '스마트시티 솔루션 공모전',
    reviewer: { name: '이수진', avatarColor: '#ffe0b2', initial: '이' },
    rating: 5,
    content: '창의적인 아이디어와 실행력이 인상적이었습니다. 팀에 좋은 에너지를 불어넣어 줬어요.',
    createdAt: '2026-06-05T09:00:00Z'
  }
];

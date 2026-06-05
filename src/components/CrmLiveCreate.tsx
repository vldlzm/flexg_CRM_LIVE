'use client';

import Link from 'next/link';
import { useState } from 'react';
import CustomerGroupCreate from './CustomerGroupCreate';

const BULLETS = [
  { text: '콘텐츠 팝업은 반복 노출을 줄이기 위해, 동일한 계정에는 캠페인별로 하루 한 번만 노출됩니다.', red: false },
  { text: '자동 > 오프사이트 캠페인은 고객의 피로도를 줄이기 위하여 동일한 계정에 대해 2일에 한 번만 발송됩니다.', red: false },
  { text: '상품명, 상품 이미지, 부연 설명을 변경하는 경우 다음 날 CRM 시스템에 반영됩니다.', red: false },
  { text: 'LMS는 관련 법령 및 개인정보 보호 정책에 따라 마케팅 정보 수신에 동의한 회원에게만 발송됩니다.', red: false },
  { text: '고객별 메시지 수 제한 및 발송 정책에 따라 실제 수신되는 메시지 수는 차이가 있을 수 있습니다.', red: true },
  { text: '브랜드메시지(친구톡)의 경우 야간광고 전송 제한으로 인하여  08:00 ~ 20:50(한국 시간)에 발송 가능합니다.', red: true },
];

const LabelCol = ({ children }: { children: React.ReactNode }) => (
  <div className="flex w-36 shrink-0 items-center gap-1.5 border-r border-gray-200 bg-gray-50 px-4 py-4">
    <span className="text-sm font-bold text-[#4DB87A]">✓</span>
    <span className="text-sm font-medium text-gray-700">{children}</span>
  </div>
);

const FormRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex border-b border-gray-200 last:border-0">
    <LabelCol>{label}</LabelCol>
    <div className="flex-1 px-5 py-4">{children}</div>
  </div>
);

const DarkBtn = ({ children, small, onClick }: { children: React.ReactNode; small?: boolean; onClick?: () => void }) => (
  <button onClick={onClick} className={`rounded-md bg-[#4b5563] font-semibold text-white hover:bg-[#374151] transition-colors ${small ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'}`}>
    {children}
  </button>
);

const InfoNote = ({ children, orange }: { children: React.ReactNode; orange?: boolean }) => (
  <p className={`flex items-start gap-1 text-xs ${orange ? 'text-[#f97316]' : 'text-gray-400'}`}>
    <span className="mt-0.5 inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border border-current text-[9px] font-bold">i</span>
    {children}
  </p>
);

const PillCheck = ({ label }: { label: string }) => (
  <div className="inline-flex items-center gap-2 rounded-full border border-[#4DB87A] bg-white px-4 py-1.5">
    <span className="inline-flex h-4 w-4 items-center justify-center rounded bg-[#4DB87A]">
      <svg viewBox="0 0 10 10" fill="none" className="h-2.5 w-2.5" stroke="white" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="2,5 4.2,7.5 8,3" />
      </svg>
    </span>
    <span className="text-sm text-gray-700">{label}</span>
  </div>
);

const RadioInput = ({ name, label, defaultChecked }: { name: string; label: string; defaultChecked?: boolean }) => (
  <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
    <input type="radio" name={name} defaultChecked={defaultChecked} className="accent-[#4DB87A] h-4 w-4" />
    {label}
  </label>
);

/* ── APP 푸시 폰 목업 ── */
const PhoneNotification = ({ pushTitle = '⏰ LIVE 시작!', pushBody = '오늘 라이브에서만 만나는 특별가! 놓치기 전에 지금 확인하세요.' }: { pushTitle?: string; pushBody?: string }) => (
  <div className="relative flex h-[420px] w-64 flex-col rounded-3xl border-2 border-gray-300 bg-gray-100 overflow-hidden shadow-md">
    {/* 상단 시간 */}
    <div className="flex justify-between px-5 pt-3 pb-2 text-xs text-gray-400">
      <span>9:41</span>
      <div className="flex gap-1">
        <span>▲</span><span>●</span>
      </div>
    </div>
    <div className="flex-1 flex flex-col gap-3 px-3">
      {/* 알림 (축소) */}
      <div className="rounded-xl bg-white p-3 shadow-sm">
        <div className="flex items-start gap-2">
          <div className="h-7 w-7 rounded shrink-0 bg-orange-500 flex items-center justify-center text-[10px] font-black text-white">F</div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 leading-tight">{pushTitle}</p>
            <p className="text-xs text-gray-500 leading-tight truncate">{pushBody.slice(0, 20)}...</p>
          </div>
          <span className="text-xs text-gray-400 shrink-0">›</span>
        </div>
      </div>
      {/* 알림 (확장) */}
      <div className="rounded-xl bg-white p-3 shadow-sm">
        <div className="flex items-start gap-2">
          <div className="h-7 w-7 rounded shrink-0 bg-orange-500 flex items-center justify-center text-[10px] font-black text-white">F</div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 leading-tight">{pushTitle}</p>
            <p className="text-xs text-gray-500 leading-snug mt-1">{pushBody}</p>
          </div>
          <span className="text-xs text-gray-400 shrink-0">∧</span>
        </div>
      </div>
    </div>
    {/* 하단 네비 */}
    <div className="flex justify-center gap-3 py-3">
      <div className="h-2 w-2 rounded-full bg-gray-400" />
      <div className="h-2 w-2 rounded-full bg-gray-400" />
    </div>
  </div>
);

const PushThumb = () => (
  <div className="h-12 w-12 shrink-0 rounded-lg overflow-hidden border border-gray-200 bg-[#fff3e0]">
    <svg viewBox="0 0 48 48" className="h-full w-full">
      <rect width="48" height="48" fill="#fff3e0"/>
      <rect x="8" y="20" width="32" height="22" rx="2" fill="#e65100"/>
      <rect x="8" y="20" width="32" height="7" rx="2" fill="#bf360c"/>
      <path d="M18 20 Q18 12 24 12 Q30 12 30 20" stroke="#6d2400" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <rect x="22" y="26" width="4" height="4" rx="1" fill="#ffcc02"/>
    </svg>
  </div>
);

const PhoneNotificationAOS = ({ pushTitle, pushBody, imageUrl }: { pushTitle: string; pushBody: string; imageUrl?: string }) => (
  <div className="relative flex h-[420px] w-64 flex-col rounded-3xl border-2 border-gray-300 bg-gray-100 overflow-hidden shadow-md">
    <div className="flex justify-between px-5 pt-3 pb-2 text-xs text-gray-400">
      <span>9:41</span>
      <div className="flex gap-1"><span>▲</span><span>●</span></div>
    </div>
    <div className="flex-1 flex flex-col gap-3 px-3">
      {/* 축소 알림 */}
      <div className="rounded-xl bg-white p-3 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded shrink-0 bg-orange-500 flex items-center justify-center text-[10px] font-black text-white">F</div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-gray-900 leading-tight truncate">{pushTitle}</p>
            <p className="text-xs text-gray-500 leading-tight truncate">{pushBody.slice(0, 20)}...</p>
          </div>
          {imageUrl ? <img src={imageUrl} alt="" className="h-12 w-12 shrink-0 rounded-lg object-cover" /> : <PushThumb />}
        </div>
      </div>
      {/* 확장 알림 */}
      <div className="rounded-xl bg-white p-3 shadow-sm">
        <div className="flex items-start gap-2">
          <div className="h-7 w-7 rounded shrink-0 bg-orange-500 flex items-center justify-center text-[10px] font-black text-white">F</div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-gray-900 leading-tight">{pushTitle}</p>
            <p className="text-xs text-gray-500 leading-snug mt-1 whitespace-pre-line">{pushBody}</p>
          </div>
          {imageUrl ? <img src={imageUrl} alt="" className="h-12 w-12 shrink-0 rounded-lg object-cover" /> : <PushThumb />}
        </div>
      </div>
    </div>
    <div className="flex justify-center gap-3 py-3">
      <div className="h-2 w-2 rounded-full bg-gray-400" />
      <div className="h-2 w-2 rounded-full bg-gray-400" />
    </div>
  </div>
);

const PhoneNotificationIOS = ({ pushTitle, pushBody }: { pushTitle: string; pushBody: string }) => (
  <div className="relative flex h-[420px] w-64 flex-col rounded-3xl border-2 border-gray-300 bg-gray-200 overflow-hidden shadow-md">
    <div className="flex justify-between px-5 pt-3 pb-1 text-xs text-gray-500">
      <span>7:34</span>
      <div className="flex gap-1"><span>▲</span><span>●</span></div>
    </div>
    {/* 알림 카드 */}
    <div className="mx-3 mt-2 rounded-2xl bg-white/90 shadow-sm p-3">
      <div className="flex items-start gap-2">
        <div className="h-8 w-8 rounded-xl shrink-0 bg-orange-500 flex items-center justify-center text-[11px] font-black text-white">F</div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-gray-900 leading-tight">{pushTitle}</p>
          <p className="text-xs text-gray-500 leading-snug mt-0.5 whitespace-pre-line">{pushBody}</p>
        </div>
      </div>
    </div>
    {/* 잠금화면 시계 */}
    <div className="flex flex-col items-center pt-6 pb-4">
      <p className="text-[52px] font-thin text-gray-700 leading-none tracking-tight">7:34</p>
      <div className="mt-2 h-0.5 w-8 rounded-full bg-gray-400" />
    </div>
    {/* 하단 버튼 */}
    <div className="flex-1 flex items-end justify-center gap-8 pb-4">
      <div className="h-9 w-9 rounded-full bg-gray-400/50" />
      <div className="h-9 w-9 rounded-full bg-gray-400/50" />
    </div>
  </div>
);

const PhoneApp = () => (
  <div className="relative flex h-72 w-44 flex-col rounded-3xl border-2 border-gray-300 bg-gray-100 overflow-hidden shadow-md">
    {/* 네비 바 */}
    <div className="flex items-center justify-between bg-white px-3 py-2 border-b border-gray-200">
      <div className="flex flex-col gap-0.5 w-4">
        <div className="h-[1.5px] bg-gray-600 rounded" />
        <div className="h-[1.5px] bg-gray-600 rounded" />
        <div className="h-[1.5px] bg-gray-600 rounded" />
      </div>
      <div className="flex gap-2">
        <div className="h-3.5 w-3.5 rounded-full border border-gray-400" />
        <div className="h-3.5 w-3.5 rounded border border-gray-400" />
      </div>
    </div>
    {/* 콘텐츠 */}
    <div className="flex-1 p-2 space-y-1.5">
      <div className="h-16 w-full rounded-lg bg-gray-300" />
      <div className="grid grid-cols-3 gap-1">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-4 rounded-full bg-gray-300" />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-1">
        <div className="h-14 rounded-lg bg-gray-300" />
        <div className="h-14 rounded-lg bg-gray-300" />
      </div>
    </div>
    {/* 쿠폰 토스트 */}
    <div className="absolute bottom-8 right-2 flex items-center gap-1 rounded-full bg-purple-500 px-2.5 py-1 shadow-lg">
      <div className="flex h-4 w-4 items-center justify-center rounded-full bg-white/20">
        <svg viewBox="0 0 8 8" className="h-2.5 w-2.5 fill-white">
          <path d="M4 0L5.5 3H8L6 5L7 8L4 6.5L1 8L2 5L0 3H2.5L4 0Z" />
        </svg>
      </div>
      <span className="text-[9px] font-bold text-white">할인코드 적용 중</span>
    </div>
    {/* 하단 */}
    <div className="flex justify-center gap-2 py-2">
      <div className="h-2 w-8 rounded-full bg-gray-400" />
      <div className="h-2 w-2 rounded-full bg-gray-300" />
    </div>
  </div>
);

/* ── LIVE 목록 데이터 ── */
interface LiveItem {
  no: number;
  title: string;
  url: string;
  productCount: number;
  fee: string;
  visitors: number;
  status: string;
  startAt: string;
  likes: number;
  memo: string;
}

const LIVE_LIST: LiveItem[] = [
  {
    no: 2,
    title: '테스트_삭제해도 무방',
    url: 'https://testflexg.tuk.link/MrWnGh5',
    productCount: 1,
    fee: '3%',
    visitors: 0,
    status: 'LIVE 대기중',
    startAt: '2026-07-01 10:54',
    likes: 0,
    memo: '',
  },
  {
    no: 1,
    title: '라이브_끄시려면건희한테말씀해주세요 (1)',
    url: 'https://testflexg.tuk.link/H9FndFC',
    productCount: 4,
    fee: '3%',
    visitors: 0,
    status: 'LIVE 대기중',
    startAt: '',
    likes: 0,
    memo: '',
  },
];

/* ── 오프사이트 아이콘 ── */
const OffsiteIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5 text-gray-500" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 5.5A2.5 2.5 0 015.5 3h9A2.5 2.5 0 0117 5.5v7A2.5 2.5 0 0114.5 15H11l-3.5 3V15H5.5A2.5 2.5 0 013 12.5v-7z" />
  </svg>
);

export default function CrmLiveCreate() {
  const [showLivePopup, setShowLivePopup] = useState(false);
  const [selectedLive, setSelectedLive] = useState<LiveItem | null>(null);
  const [targetType, setTargetType] = useState<'all' | 'specific'>('all');
  const [showGroupCreatePopup, setShowGroupCreatePopup] = useState(false);
  const [pushEditPreviewTab, setPushEditPreviewTab] = useState<'aos' | 'ios'>('aos');
  const [pushImageUrl, setPushImageUrl] = useState('');
  const [showLmsEditPopup, setShowLmsEditPopup] = useState(false);
  const [showPushEditPopup, setShowPushEditPopup] = useState(false);
  const [pushPreviewTab, setPushPreviewTab] = useState<'aos' | 'ios'>('aos');
  const [showBrandEditPopup, setShowBrandEditPopup] = useState(false);
  const [showUrlGenPopup, setShowUrlGenPopup] = useState(false);
  const [brandEditTab, setBrandEditTab] = useState<'wide-image' | 'wide-list'>('wide-image');
  const [wideImageContent, setWideImageContent] = useState('🔴 LIVE 시작! 인기 상품 특가 할인 중. 지금 바로 참여하고 혜택 챙겨가세요.\n📅 방송 시작 일시: #[LIVE 시작일시]');
  const [wideImageBtn1, setWideImageBtn1] = useState('LIVE 보기');
  const [wideImageBtn2, setWideImageBtn2] = useState('');
  const [wideListHeader, setWideListHeader] = useState('LIVE 시작!');
  const [wideListItems, setWideListItems] = useState([
    { text: '여름 신상 원피스', price: '19,500원' },
    { text: '크로스백 신상품',  price: '36,400원' },
    { text: 'UV 차단 선글라스', price: '16,800원' },
    { text: '니트 반팔 티셔츠', price: '21,000원' },
    { text: '',               price: '' },
  ]);
  const [wideListBtn1, setWideListBtn1] = useState('LIVE 보기');
  const [wideListBtn2, setWideListBtn2] = useState('');
  const [lmsTitle, setLmsTitle] = useState('(광고)[#{상점명}]');
  const [lmsContent, setLmsContent] = useState(
`안녕하세요!
#[LIVE 방송명] 라이브가
#[LIVE 시작일시]에 시작됩니다.

지금 바로 참여하고 다양한 혜택을 받아보세요!

※ 본 메시지는 발신 전용입니다.`
  );
  const [pushTitle, setPushTitle] = useState('⏰ LIVE 시작!');
  const [pushBody, setPushBody] = useState('오늘 라이브에서만 만나는 특별가! 놓치기 전에 지금 확인하세요.\n📅 방송 시작 일시: #[LIVE 시작일시]');

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url).catch(() => {});
  };

  const LMS_REPLACEMENTS = [
    { key: '#{상점명}', desc: '쇼핑몰명' },
    { key: '#{채널명}', desc: '쇼핑몰 채널명' },
    { key: '#{회원명}', desc: '주문자명' },
    { key: '#{쿠폰명}', desc: '쿠폰 이름' },
    { key: '#{할인코드}', desc: '할인 코드' },
    { key: '#{할인금액}', desc: '쿠폰/할인코드 할인금액' },
    { key: '#{만료일}', desc: '쿠폰/할인코드 만료일' },
    { key: '#{MAIN}', desc: '메인 페이지 URL' },
    { key: '#{RUNAPP}', desc: '앱 실행 URL' },
    { key: '#{BEST}', desc: 'BEST 상품 리스트 페이지 URL' },
    { key: '#{DETAIL}', desc: '상품 상세 페이지 URL' },
    { key: '#{COUPON}', desc: '쿠폰 목록 페이지 URL' },
    { key: '#{CUSTOM}', desc: '클릭 액션 URL' },
    { key: '#{수신거부번호}', desc: '수신거부번호' },
    { key: '#[LIVE 방송명]', desc: 'LIVE 방송 제목' },
    { key: '#[LIVE 시작일시]', desc: 'LIVE 방송 시작 일시' },
    { key: '#[LIVE 종료일시]', desc: 'LIVE 방송 종료 일시' },
    { key: '#[LIVE 진행상태]', desc: 'LIVE 방송 진행 상태' },
    { key: '#[LIVE 상품수]', desc: 'LIVE 방송 상품 수' },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white">

      {/* ── 상단 헤더 ── */}
      <div className="sticky top-0 z-20 flex items-center gap-3 bg-[#252830] px-6 py-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/10">
          <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 text-white" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="5" height="5" rx="1" />
            <rect x="9" y="2" width="5" height="5" rx="1" />
            <rect x="2" y="9" width="5" height="5" rx="1" />
            <rect x="9" y="9" width="5" height="5" rx="1" />
          </svg>
        </div>
        <h1 className="text-base font-bold text-white">캠페인 생성</h1>
      </div>

      {/* ── 메인 콘텐츠 ── */}
      <div className="flex-1 px-8 py-6">

        {/* 캠페인 설정 */}
        <h2 className="mb-3 text-xl font-bold text-gray-900">캠페인 설정</h2>
        <ul className="mb-6 space-y-1">
          {BULLETS.map((b, i) => (
            <li key={i} className={`text-sm ${b.red ? 'text-[#ef4444]' : 'text-gray-700'}`}>
              · {b.text}
            </li>
          ))}
        </ul>

        {/* 폼 */}
        <div className="mb-8 border border-gray-200">

          {/* 캠페인명 */}
          <FormRow label="캠페인명">
            <input
              type="text"
              defaultValue="LIVE 시작 알림 보내기_20260602_1"
              className="w-full max-w-lg rounded border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:border-[#4DB87A] focus:outline-none focus:ring-1 focus:ring-[#4DB87A]"
            />
          </FormRow>

          {/* 캠페인 내용 */}
          <FormRow label="캠페인 내용">
            <div className="flex flex-wrap items-center gap-2">
              <DarkBtn onClick={() => setShowLivePopup(true)}>LIVE 불러오기</DarkBtn>
              {selectedLive && (
                <div className="flex items-center gap-1.5 rounded-full border border-[#4DB87A] bg-[#f0faf5] pl-3 pr-1.5 py-1">
                  <span className="text-sm font-semibold text-[#1e6b3c]">{selectedLive.title}</span>
                  <button
                    onClick={() => setSelectedLive(null)}
                    className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-300 text-[10px] font-bold text-white hover:bg-gray-400 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </FormRow>

          {/* 대상자 */}
          <FormRow label="대상자">
            <div className="flex items-center gap-3 flex-wrap">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
                <input type="radio" name="target" checked={targetType === 'all'} onChange={() => setTargetType('all')} className="accent-[#4DB87A] h-4 w-4" />
                전체
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
                <input type="radio" name="target" checked={targetType === 'specific'} onChange={() => setTargetType('specific')} className="accent-[#4DB87A] h-4 w-4" />
                특정 고객
              </label>
              {targetType === 'all' && <DarkBtn>전체 회원 조회 &gt;</DarkBtn>}
              {targetType === 'specific' && (
                <DarkBtn onClick={() => setShowGroupCreatePopup(true)}>고객 그룹 생성</DarkBtn>
              )}
              <span className="text-sm font-semibold text-[#4DB87A]">0명</span>
            </div>
          </FormRow>

          {/* 캠페인 유형 */}
          <FormRow label="캠페인 유형">
            <div className="space-y-3">
              <p className="text-sm text-gray-700">오프사이트 캠페인</p>
              <div className="space-y-1.5">
                <div><PillCheck label="APP푸시  0명" /></div>
                <div><PillCheck label="브랜드메시지(친구톡)  0명" /></div>
                <div><PillCheck label="LMS  0명" /></div>
              </div>
              <InfoNote orange>고객 반응률과 도달 데이터를 분석하여 최적의 캠페인 유형으로 자동 적용됩니다.</InfoNote>
            </div>
          </FormRow>

          {/* 발송 일시 */}
          <FormRow label="발송 일시">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="발송 일시"
                className="rounded border border-gray-300 px-3 py-2 text-sm text-gray-400 focus:border-[#4DB87A] focus:outline-none focus:ring-1 focus:ring-[#4DB87A] w-44"
              />
              <DarkBtn>기간 초기화</DarkBtn>
            </div>
          </FormRow>

          {/* 랜딩 URL */}
          <FormRow label="랜딩 URL">
            <div className="flex items-center gap-2">
              <input
                type="text"
                defaultValue="/Home/Index"
                className="rounded border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:border-[#4DB87A] focus:outline-none focus:ring-1 focus:ring-[#4DB87A] w-72"
              />
              <DarkBtn onClick={() => setShowUrlGenPopup(true)}>불러오기</DarkBtn>
              <DarkBtn>초기화</DarkBtn>
            </div>
          </FormRow>

        </div>

        {/* APP 푸시 예시 */}
        <div className="rounded-xl bg-[#f0f0f0] p-8">
          <div className="flex items-start gap-8">
            {/* 좌측 설명 */}
            <div className="flex-1 space-y-4 pt-2">
              <div>
                <h3 className="mb-1 text-base font-bold text-gray-900">APP푸시 예시</h3>
                <p className="text-sm text-gray-600">APP푸시를 통하여 라이브 시작을 알리고 상품 구매를 유도합니다.</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#111827] px-3 py-1 text-xs font-bold text-white">비용</span>
                <span className="text-sm text-gray-700">무료</span>
                <div className="rounded-lg bg-[#22c55e] px-3 py-2">
                  <p className="text-xs font-bold text-white">APP푸시를 이용하면 0 c를 절약할 수 있어요!</p>
                </div>
              </div>
            </div>

            {/* 폰 목업 + AOS/iOS + 수정 버튼 */}
            <div className="shrink-0 flex flex-col items-center gap-3">
              {pushPreviewTab === 'aos'
                ? <PhoneNotificationAOS pushTitle={pushTitle} pushBody={pushBody} />
                : <PhoneNotificationIOS pushTitle={pushTitle} pushBody={pushBody} />
              }
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setPushPreviewTab('aos')}
                  className={`rounded-full border px-5 py-1.5 text-sm font-semibold transition-colors ${pushPreviewTab === 'aos' ? 'border-[#4DB87A] text-[#4DB87A]' : 'border-gray-300 text-gray-500 hover:border-gray-400'}`}
                >
                  AOS 예시
                </button>
                <button
                  onClick={() => setPushPreviewTab('ios')}
                  className={`text-sm font-semibold transition-colors ${pushPreviewTab === 'ios' ? 'text-[#4DB87A]' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  iOS 예시
                </button>
              </div>
              <button
                onClick={() => setShowPushEditPopup(true)}
                className="w-full rounded-lg bg-[#111827] py-2.5 text-sm font-bold text-white hover:bg-black transition-colors"
              >
                메시지 수정하기
              </button>
            </div>
          </div>
        </div>

        {/* 브랜드메시지(친구톡) 예시 */}
        <div className="mt-6 rounded-xl bg-[#f0f0f0] p-8">
          <div className="flex items-start gap-8">
            {/* 좌측 설명 */}
            <div className="flex-1 space-y-4 pt-1">
              <div>
                <h3 className="mb-1 text-base font-bold text-gray-900">브랜드메시지(친구톡) 예시</h3>
                <p className="text-sm text-gray-600">친구톡 발송을 통해 라이브 시작을 알리고 고객의 구매를 유도합니다.</p>
              </div>
              {/* 조건 */}
              <div className="flex items-start gap-3">
                <span className="inline-flex shrink-0 items-center rounded-full bg-[#111827] px-3 py-1.5 text-xs font-bold text-white">조건</span>
                <p className="text-sm leading-relaxed text-gray-700">
                  라이브에 연결된 상품이 2개 이상일 경우 <span className="font-semibold">와이드 리스트형</span>으로, 그 외에는 <span className="font-semibold">와이드 이미지</span>로 메시지가 자동 발송됩니다.
                </p>
              </div>
              {/* 랜딩 URL */}
              <div className="flex items-center gap-3">
                <span className="inline-flex shrink-0 items-center rounded-full bg-[#111827] px-3 py-1.5 text-xs font-bold text-white">랜딩 URL</span>
                <p className="text-sm text-gray-700">LIVE 페이지로 이동</p>
              </div>
              {/* 비용 */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-[#111827] px-3 py-1.5 text-xs font-bold text-white">비용</span>
                <span className="text-sm text-gray-700">
                  건당 비용 28c &nbsp;/&nbsp; 현재 보유 캐시{' '}
                  <span className="font-bold text-[#f97316]">9,969,148c</span>
                </span>
                <button className="rounded border border-gray-400 px-3 py-1 text-xs text-gray-600 hover:bg-gray-100 transition-colors">
                  캐시 충전하기 &gt;
                </button>
              </div>
            </div>

            {/* 중앙: 카카오톡 목업 2개 */}
            <div className="shrink-0 flex flex-col items-center gap-3">
              <div className="flex items-start gap-3">
                {/* 와이드 이미지 목업 */}
                <div className="flex flex-col items-center gap-1.5">
                  <span className="rounded-full border border-gray-400 px-3 py-0.5 text-[11px] font-semibold text-gray-600">와이드 이미지</span>
                <div className="w-48 overflow-hidden rounded-3xl border-2 border-gray-300 bg-[#c5d9ed] shadow-md">
                  <div className="flex items-center justify-between bg-[#c5d9ed] px-3 py-2 border-b border-[#b0c8e0]">
                    <span className="text-sm font-bold text-gray-700">‹</span>
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] font-bold text-gray-800">채널명 ✓</span>
                      <span className="text-[8px] text-gray-500">1577-0000</span>
                    </div>
                    <div className="flex gap-1.5 text-xs text-gray-600"><span>Q</span><span>≡</span></div>
                  </div>
                  <div className="px-2 py-2.5">
                    <div className="flex items-start gap-1.5">
                      <div className="h-6 w-6 shrink-0 rounded-full bg-yellow-300 flex items-center justify-center text-[9px] font-bold border border-yellow-400">K</div>
                      <div className="flex-1">
                        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
                          <p className="px-2.5 pt-1.5 text-[8px] text-gray-400">(광고) 채널명</p>
                          {/* LIVE 시작 일러스트 배너 */}
                          <div className="mx-2 my-1 h-24 rounded-lg overflow-hidden relative">
                            {/* 배경 그라디언트 */}
                            <div className="absolute inset-0 bg-gradient-to-br from-rose-400 via-fuchsia-400 to-orange-300" />
                            {/* 배경 장식 원 */}
                            <div className="absolute -top-4 -right-4 h-14 w-14 rounded-full bg-white/20" />
                            <div className="absolute -bottom-3 -left-3 h-10 w-10 rounded-full bg-white/15" />
                            <div className="absolute top-1 left-1 h-4 w-4 rounded-full bg-yellow-200/40" />
                            {/* 콘텐츠 */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
                              {/* 상단 이모지 장식 */}
                              <div className="flex gap-1.5 text-base">
                                <span>✨</span>
                                <span>📹</span>
                                <span>✨</span>
                              </div>
                              {/* LIVE 뱃지 */}
                              <div className="flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-0.5 shadow-sm">
                                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                                <span className="text-[10px] font-black tracking-widest text-red-500">LIVE</span>
                              </div>
                              {/* 시작 텍스트 */}
                              <p className="text-sm font-black text-white drop-shadow-md">시작!</p>
                              {/* 하단 장식 */}
                              <div className="flex gap-1 text-[10px]">
                                <span>⭐</span><span>🎉</span><span>⭐</span>
                              </div>
                            </div>
                          </div>
                          <div className="px-2.5 pb-1.5">
                            <p className="text-[9px] leading-snug text-gray-700 whitespace-pre-line">
                              {'🔴 LIVE 시작! 인기 상품 특가 할인 중. 지금 바로 참여하고 혜택 챙겨가세요.\n📅 방송 시작 일시: #[LIVE 시작일시]'}
                            </p>
                          </div>
                          <div className="border-t border-gray-100 py-1.5 text-center bg-gray-200">
                            <span className="text-[10px] font-semibold text-gray-600">LIVE 보기</span>
                          </div>
                          <div className="border-t border-gray-100 px-2.5 py-1">
                            <p className="text-[7px] text-gray-400">수신거부 | 홈 &gt; 채널 차단</p>
                          </div>
                        </div>
                        <p className="mt-0.5 text-[7px] text-gray-400">오전 9:00</p>
                      </div>
                    </div>
                  </div>
                </div>
                </div>{/* 와이드 이미지 wrapper 닫기 */}

                {/* 와이드 리스트 목업 */}
                <div className="flex flex-col items-center gap-1.5">
                  <span className="rounded-full border border-gray-400 px-3 py-0.5 text-[11px] font-semibold text-gray-600">와이드 리스트</span>
                <div className="w-48 overflow-hidden rounded-3xl border-2 border-gray-300 bg-[#c5d9ed] shadow-md">
                  <div className="flex items-center justify-between bg-[#c5d9ed] px-3 py-2 border-b border-[#b0c8e0]">
                    <span className="text-sm font-bold text-gray-700">‹</span>
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] font-bold text-gray-800">채널명 ✓</span>
                      <span className="text-[8px] text-gray-500">1577-0000</span>
                    </div>
                    <div className="flex gap-1.5 text-xs text-gray-600"><span>Q</span><span>≡</span></div>
                  </div>
                  <div className="px-2 py-2.5">
                    <div className="flex items-start gap-1.5">
                      <div className="h-6 w-6 shrink-0 rounded-full bg-yellow-300 flex items-center justify-center text-[9px] font-bold border border-yellow-400">K</div>
                      <div className="flex-1">
                        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
                          <p className="px-2.5 pt-1.5 text-[8px] text-gray-400">(광고) 채널명</p>
                          {/* 타이틀 */}
                          <p className="text-center text-[10px] font-bold text-gray-800 py-1">LIVE 시작!</p>
                          {/* 상품 이미지 배너 */}
                          <div className="mx-2 my-1 h-20 rounded-lg overflow-hidden relative">
                            {/* 배경 */}
                            <div className="absolute inset-0 bg-[#f5efe8]" />
                            {/* 인형 피규어 SVG */}
                            <svg viewBox="0 0 160 80" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                              {/* 피규어 1 - 크림 곰 */}
                              <ellipse cx="28" cy="62" rx="11" ry="14" fill="#f5deb3"/>
                              <circle cx="28" cy="42" r="10" fill="#f5deb3"/>
                              <ellipse cx="23" cy="38" rx="4" ry="5" fill="#c8a882"/>
                              <ellipse cx="33" cy="38" rx="4" ry="5" fill="#c8a882"/>
                              <circle cx="25" cy="43" r="1.5" fill="#5a3825"/>
                              <circle cx="31" cy="43" r="1.5" fill="#5a3825"/>
                              <ellipse cx="28" cy="47" rx="3" ry="2" fill="#c8a882"/>
                              {/* 피규어 2 - 갈색 곰 */}
                              <ellipse cx="55" cy="62" rx="11" ry="14" fill="#a0522d"/>
                              <circle cx="55" cy="42" r="10" fill="#a0522d"/>
                              <ellipse cx="50" cy="38" rx="4" ry="5" fill="#8b4513"/>
                              <ellipse cx="60" cy="38" rx="4" ry="5" fill="#8b4513"/>
                              <circle cx="52" cy="43" r="1.5" fill="#3a1a0a"/>
                              <circle cx="58" cy="43" r="1.5" fill="#3a1a0a"/>
                              <ellipse cx="55" cy="47" rx="3" ry="2" fill="#cd853f"/>
                              {/* 피규어 3 - 흰 고양이 */}
                              <ellipse cx="82" cy="62" rx="11" ry="14" fill="#fff5e6"/>
                              <circle cx="82" cy="42" r="10" fill="#fff5e6"/>
                              <polygon points="76,34 79,40 73,40" fill="#fff5e6" stroke="#e0c9a6" strokeWidth="0.5"/>
                              <polygon points="88,34 91,40 85,40" fill="#fff5e6" stroke="#e0c9a6" strokeWidth="0.5"/>
                              <circle cx="79" cy="44" r="1.5" fill="#5a3825"/>
                              <circle cx="85" cy="44" r="1.5" fill="#5a3825"/>
                              <ellipse cx="82" cy="47" rx="2.5" ry="1.5" fill="#f4a4b0"/>
                              {/* 피규어 4 - 오렌지 호랑이 */}
                              <ellipse cx="109" cy="62" rx="11" ry="14" fill="#e8892a"/>
                              <circle cx="109" cy="42" r="10" fill="#e8892a"/>
                              <ellipse cx="104" cy="38" rx="4" ry="5" fill="#c8681a"/>
                              <ellipse cx="114" cy="38" rx="4" ry="5" fill="#c8681a"/>
                              <circle cx="106" cy="43" r="1.5" fill="#3a1a0a"/>
                              <circle cx="112" cy="43" r="1.5" fill="#3a1a0a"/>
                              <ellipse cx="109" cy="47" rx="3" ry="2" fill="#f5c5a3"/>
                              <line x1="103" y1="46" x2="98" y2="45" stroke="#a05010" strokeWidth="0.8"/>
                              <line x1="103" y1="48" x2="98" y2="48" stroke="#a05010" strokeWidth="0.8"/>
                              <line x1="115" y1="46" x2="120" y2="45" stroke="#a05010" strokeWidth="0.8"/>
                              <line x1="115" y1="48" x2="120" y2="48" stroke="#a05010" strokeWidth="0.8"/>
                              {/* 피규어 5 - 회색 곰 */}
                              <ellipse cx="136" cy="62" rx="11" ry="14" fill="#b0b0b0"/>
                              <circle cx="136" cy="42" r="10" fill="#b0b0b0"/>
                              <ellipse cx="131" cy="38" rx="4" ry="5" fill="#909090"/>
                              <ellipse cx="141" cy="38" rx="4" ry="5" fill="#909090"/>
                              <circle cx="133" cy="43" r="1.5" fill="#3a3a3a"/>
                              <circle cx="139" cy="43" r="1.5" fill="#3a3a3a"/>
                              <ellipse cx="136" cy="47" rx="3" ry="2" fill="#d0d0d0"/>
                            </svg>
                            {/* 하단 텍스트 오버레이 */}
                            <div className="absolute bottom-0 left-0 right-0 bg-black/55 px-2 py-1">
                              <p className="text-[8px] font-bold text-white leading-tight">반짝반짝 라이브 방송</p>
                            </div>
                          </div>
                          {/* 상품 리스트 */}
                          {[
                            {
                              name: '여름 신상 원피스', regular: '39,000원', sale: '19,500원',
                              img: (
                                <svg viewBox="0 0 36 36" className="h-full w-full">
                                  <rect width="36" height="36" fill="#fff0f3"/>
                                  <path d="M18 5 C15 5 13 7 12 9 L8 10 L10 15 L13 14 L13 31 L23 31 L23 14 L26 15 L28 10 L24 9 C23 7 21 5 18 5Z" fill="#f87171"/>
                                  <path d="M14 8 Q18 11 22 8" stroke="#fca5a5" strokeWidth="1" fill="none"/>
                                  <ellipse cx="18" cy="6" rx="2.5" ry="1.5" fill="#fca5a5"/>
                                </svg>
                              ),
                            },
                            {
                              name: '크로스백 신상품', regular: '52,000원', sale: '36,400원',
                              img: (
                                <svg viewBox="0 0 36 36" className="h-full w-full">
                                  <rect width="36" height="36" fill="#fffbeb"/>
                                  <rect x="7" y="13" width="22" height="16" rx="2" fill="#d97706"/>
                                  <rect x="7" y="13" width="22" height="5" rx="2" fill="#b45309"/>
                                  <path d="M13 13 Q13 8 18 8 Q23 8 23 13" stroke="#92400e" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                                  <rect x="16" y="18" width="4" height="3" rx="1" fill="#fbbf24"/>
                                  <line x1="29" y1="20" x2="34" y2="14" stroke="#92400e" strokeWidth="1"/>
                                </svg>
                              ),
                            },
                            {
                              name: 'UV 차단 선글라스', regular: '28,000원', sale: '16,800원',
                              img: (
                                <svg viewBox="0 0 36 36" className="h-full w-full">
                                  <rect width="36" height="36" fill="#eff6ff"/>
                                  <circle cx="12" cy="18" r="7" fill="#1e3a5f" stroke="#0f172a" strokeWidth="0.8"/>
                                  <circle cx="24" cy="18" r="7" fill="#1e3a5f" stroke="#0f172a" strokeWidth="0.8"/>
                                  <line x1="19" y1="18" x2="17" y2="18" stroke="#334155" strokeWidth="1.5"/>
                                  <line x1="5" y1="16" x2="5" y2="20" stroke="#0f172a" strokeWidth="1.2" strokeLinecap="round"/>
                                  <line x1="31" y1="16" x2="31" y2="20" stroke="#0f172a" strokeWidth="1.2" strokeLinecap="round"/>
                                  <path d="M12 13 Q12 11 14 11" stroke="#60a5fa" strokeWidth="0.8" fill="none" opacity="0.6"/>
                                  <path d="M24 13 Q24 11 26 11" stroke="#60a5fa" strokeWidth="0.8" fill="none" opacity="0.6"/>
                                </svg>
                              ),
                            },
                            {
                              name: '니트 반팔 티셔츠', regular: '35,000원', sale: '21,000원',
                              img: (
                                <svg viewBox="0 0 36 36" className="h-full w-full">
                                  <rect width="36" height="36" fill="#f0fdf4"/>
                                  <path d="M11 10 L7 14 L11 16 L11 30 L25 30 L25 16 L29 14 L25 10 Q22 8 18 8 Q14 8 11 10Z" fill="#4ade80"/>
                                  <path d="M14 10 Q18 13 22 10" stroke="#22c55e" strokeWidth="1" fill="none"/>
                                  <path d="M7 14 L11 16" stroke="#16a34a" strokeWidth="0.5"/>
                                  <path d="M25 16 L29 14" stroke="#16a34a" strokeWidth="0.5"/>
                                  <path d="M13 19 Q18 21 23 19" stroke="#86efac" strokeWidth="0.8" fill="none"/>
                                </svg>
                              ),
                            },
                          ].map((item, i) => (
                            <div key={i} className="flex items-center gap-1.5 border-t border-gray-100 px-2 py-1.5">
                              <div className="h-9 w-9 shrink-0 rounded overflow-hidden shadow-sm border border-gray-100">
                                {item.img}
                              </div>
                              <div className="min-w-0">
                                <p className="text-[9px] font-semibold text-gray-800 leading-tight">{item.name}</p>
                                <p className="text-[7px] leading-tight">
                                  <span className="font-bold text-red-500">{item.sale}</span>
                                </p>
                              </div>
                            </div>
                          ))}
                          {/* 버튼 */}
                          <div className="border-t border-gray-100 py-1.5 text-center bg-gray-200">
                            <span className="text-[10px] font-semibold text-gray-600">LIVE 보기</span>
                          </div>
                          <div className="border-t border-gray-100 px-2.5 py-1">
                            <p className="text-[7px] text-gray-400">수신거부 | 홈 &gt; 채널 차단</p>
                          </div>
                        </div>
                        <p className="mt-0.5 text-[7px] text-gray-400">오전 9:00</p>
                      </div>
                    </div>
                  </div>
                </div>
                </div>{/* 와이드 리스트 wrapper 닫기 */}
              </div>

              <button
                onClick={() => setShowBrandEditPopup(true)}
                className="mt-1 w-full rounded-lg bg-[#111827] py-2.5 text-sm font-bold text-white hover:bg-black transition-colors"
              >
                메시지 수정하기
              </button>
            </div>

          </div>
        </div>

        {/* LMS 예시 */}
        <div className="mt-6 rounded-xl bg-[#f0f0f0] p-8">
          <div className="flex items-start gap-8">
            {/* 좌측 설명 */}
            <div className="flex-1 space-y-4 pt-1">
              <div>
                <h3 className="mb-1 text-base font-bold text-gray-900">LMS 예시</h3>
                <p className="text-sm text-gray-600">LMS를 통하여 라이브 시작을 알리고 상품 구매를 유도합니다.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="inline-flex shrink-0 items-center rounded-full bg-[#111827] px-3 py-1.5 text-xs font-bold text-white">
                  시점 및 조건
                </span>
                <p className="text-sm leading-relaxed text-gray-700">
                  알림톡 발송이 실패한 경우에 한하여, 이후 진행되는 캠페인부터 자동으로 발송
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-[#111827] px-3 py-1.5 text-xs font-bold text-white">
                  비용
                </span>
                <span className="text-sm text-gray-700">
                  건당 비용 39c &nbsp;/&nbsp; 현재 보유 캐시{' '}
                  <span className="font-bold text-[#f97316]">9,969,148c</span>
                </span>
                <button className="rounded border border-gray-400 px-3 py-1 text-xs text-gray-600 hover:bg-gray-100 transition-colors">
                  캐시 충전하기 &gt;
                </button>
              </div>
            </div>

            {/* 우측 LMS 메시지 카드 */}
            <div className="w-72 shrink-0">
              <div className="rounded-xl bg-[#9ca3af] p-3">
                <div className="rounded-lg bg-white p-4 space-y-2">
                  <p className="text-xs font-semibold text-gray-800">(광고) (광고)[#[상점명]]</p>
                  <p className="text-xs leading-relaxed text-gray-800 whitespace-pre-line">{`안녕하세요!\n#[LIVE 방송명] 라이브가\n#[LIVE 시작일시]에 시작됩니다.\n\n지금 바로 참여하고 다양한 혜택을 받아보세요!\n\n※ 본 메시지는 발신 전용입니다.`}</p>
                  <div className="pt-1 text-xs text-gray-600">
                    <p>[무료수신거부]</p>
                    <p>010-1234-5678</p>
                  </div>
                </div>
                <div className="mt-1 flex justify-end pr-1">
                  <span className="text-[11px] text-gray-200">LMS 오후 1:56</span>
                </div>
              </div>
              <button
                onClick={() => setShowLmsEditPopup(true)}
                className="mt-2 w-full rounded-lg bg-[#111827] py-2.5 text-sm font-bold text-white hover:bg-black transition-colors"
              >
                메시지 수정하기
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* ── 하단 고정 ── */}
      <div className="sticky bottom-0 z-10 border-t border-gray-200">
        {/* 오프사이트 정보 */}
        <div className="flex items-center justify-center gap-2 bg-white px-8 py-3">
          <OffsiteIcon />
          <span className="text-sm text-gray-600">
            오프사이트 : 예약 발송 수 약{' '}
            <span className="font-bold text-[#4DB87A]">0건</span>
            {' '}|{' '}예상 지출 캐시 약{' '}
            <span className="font-bold text-[#4DB87A]">0c</span>
          </span>
        </div>
        {/* 액션 버튼 */}
        <div className="flex items-center justify-center gap-3 bg-[#e8e8e8] px-8 py-4">
          <button className="rounded-lg bg-[#4b5563] px-10 py-2.5 text-sm font-bold text-white hover:bg-[#374151] transition-colors">
            취소
          </button>
          <button className="rounded-lg bg-[#4b5563] px-10 py-2.5 text-sm font-bold text-white hover:bg-[#374151] transition-colors">
            테스트 발행
          </button>
          <button className="rounded-lg bg-[#4b5563] px-10 py-2.5 text-sm font-bold text-white hover:bg-[#374151] transition-colors">
            캠페인 발행
          </button>
        </div>
      </div>

      {/* ── URL 생성 팝업 ── */}
      {showUrlGenPopup && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40" onClick={() => setShowUrlGenPopup(false)}>
          <div className="w-[95vw] max-w-[520px] overflow-hidden rounded-xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* 헤더 */}
            <div className="flex items-center gap-3 bg-[#252830] px-6 py-4">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/10">
                <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 text-white" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="14" height="9" rx="1.5" />
                  <path d="M5.5 13.5h5M8 12v1.5" />
                </svg>
              </div>
              <h2 className="text-base font-bold text-white">URL 생성</h2>
            </div>
            {/* 본문 */}
            <div className="p-6">
              <p className="mb-5 text-sm text-[#4DB87A]">
                · URL 생성은 쇼핑몰의 페이지 URL을 간편하게 불러올 수 있는 기능입니다.
              </p>
              <div className="rounded-lg bg-gray-50 px-6 py-5 space-y-4">
                <div className="flex items-center gap-4">
                  <span className="w-20 shrink-0 text-sm text-gray-600">생성 유형</span>
                  <select className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:border-[#4DB87A] focus:outline-none">
                    <option>진행중인 라이브 방송</option>
                  </select>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-20 shrink-0 text-sm text-gray-600">유입 채널</span>
                  <select className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:border-[#4DB87A] focus:outline-none">
                    <option>사용 안함</option>
                  </select>
                </div>
              </div>
            </div>
            {/* 푸터 */}
            <div className="flex items-center justify-center gap-3 border-t border-gray-200 bg-[#ebebeb] px-6 py-4">
              <button onClick={() => setShowUrlGenPopup(false)} className="rounded-lg bg-[#4b5563] px-10 py-2.5 text-sm font-bold text-white hover:bg-[#374151] transition-colors">취소</button>
              <button onClick={() => setShowUrlGenPopup(false)} className="rounded-lg bg-[#3a3f45] px-10 py-2.5 text-sm font-bold text-white hover:bg-[#2d3138] transition-colors">적용</button>
            </div>
          </div>
        </div>
      )}

      {/* ── 브랜드메시지 수정 팝업 ── */}
      {showBrandEditPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowBrandEditPopup(false)}>
          <div className="relative flex h-[90vh] w-[95vw] max-w-[1100px] flex-col overflow-hidden rounded-xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* 헤더 */}
            <div className="flex items-center gap-3 bg-[#252830] px-6 py-4 shrink-0">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/10">
                <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 text-white" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="5" height="5" rx="1" /><rect x="9" y="2" width="5" height="5" rx="1" /><rect x="2" y="9" width="5" height="5" rx="1" /><rect x="9" y="9" width="5" height="5" rx="1" />
                </svg>
              </div>
              <h2 className="text-base font-bold text-white">브랜드메시지 수정</h2>
            </div>
            {/* 탭 */}
            <div className="flex border-b border-gray-200 bg-white shrink-0">
              {(['wide-image', 'wide-list'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setBrandEditTab(tab)}
                  className={`px-6 py-3 text-sm font-semibold transition-colors ${brandEditTab === tab ? 'border-b-2 border-[#4DB87A] text-[#4DB87A]' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  {tab === 'wide-image' ? '와이드 이미지' : '와이드 리스트'}
                </button>
              ))}
            </div>
            {/* 본문 */}
            <div className="flex flex-1 overflow-hidden">
              {/* 좌측: 미리보기 */}
              <div className="w-64 shrink-0 border-r border-gray-200 bg-gray-50 flex items-start justify-center p-5 overflow-y-auto">
                <div className="w-48 overflow-hidden rounded-3xl border-2 border-gray-300 bg-[#c5d9ed] shadow-md">
                  <div className="flex items-center justify-between bg-[#c5d9ed] px-3 py-2 border-b border-[#b0c8e0]">
                    <span className="text-sm font-bold text-gray-700">‹</span>
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] font-bold text-gray-800">채널명 ✓</span>
                      <span className="text-[8px] text-gray-500">1577-0000</span>
                    </div>
                    <div className="flex gap-1.5 text-xs text-gray-600"><span>Q</span><span>≡</span></div>
                  </div>
                  <div className="px-2 py-2.5">
                    <div className="flex items-start gap-1.5">
                      <div className="h-6 w-6 shrink-0 rounded-full bg-yellow-300 flex items-center justify-center text-[9px] font-bold border border-yellow-400">K</div>
                      <div className="flex-1">
                        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
                          <p className="px-2.5 pt-1.5 text-[8px] text-gray-400">(광고) 채널명</p>
                          {brandEditTab === 'wide-image' ? (
                            <>
                              <div className="mx-2 my-1 h-20 rounded-lg overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-rose-400 via-fuchsia-400 to-orange-300" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
                                  <div className="flex gap-1 text-sm"><span>✨</span><span>📹</span><span>✨</span></div>
                                  <div className="flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5">
                                    <span className="h-1.5 w-1.5 rounded-full bg-red-500" /><span className="text-[9px] font-black tracking-widest text-red-500">LIVE</span>
                                  </div>
                                  <p className="text-xs font-black text-white drop-shadow-md">시작!</p>
                                </div>
                              </div>
                              <div className="px-2.5 pb-1.5"><p className="text-[9px] leading-snug text-gray-700 whitespace-pre-line">{wideImageContent}</p></div>
                              <div className="flex border-t border-gray-100">
                                {wideImageBtn1 && <div className="flex-1 py-1.5 text-center border-r border-gray-100"><span className="text-[10px] font-semibold text-gray-600">{wideImageBtn1}</span></div>}
                                {wideImageBtn2 && <div className="flex-1 py-1.5 text-center"><span className="text-[10px] font-semibold text-gray-600">{wideImageBtn2}</span></div>}
                              </div>
                            </>
                          ) : (
                            <>
                              <p className="text-center text-[10px] font-bold text-gray-800 py-1">{wideListHeader}</p>
                              <div className="mx-2 my-1 h-16 rounded-lg bg-gradient-to-br from-rose-400 via-fuchsia-400 to-orange-300 overflow-hidden relative">
                                <div className="absolute inset-0 flex items-center justify-center"><span className="text-xs font-black text-white drop-shadow-md">LIVE 시작!</span></div>
                              </div>
                              {wideListItems[0].text && (
                                <p className="px-2.5 pb-1 text-[8px] leading-snug text-gray-700">{wideListItems[0].text}</p>
                              )}
                              {wideListItems.slice(1).map((item, i) => (
                                <div key={i+1} className="flex items-center gap-1.5 border-t border-gray-100 px-2 py-1">
                                  <div className="h-7 w-7 shrink-0 rounded bg-gray-200" />
                                  <div className="min-w-0">
                                    <p className="text-[8px] font-semibold text-gray-800 leading-tight">{item.text}</p>
                                  </div>
                                </div>
                              ))}
                              <div className="flex border-t border-gray-100 bg-gray-200">
                                {wideListBtn1 && <div className={`flex-1 py-1.5 text-center ${wideListBtn2 ? 'border-r border-gray-300' : ''}`}><span className="text-[10px] font-semibold text-gray-600">{wideListBtn1}</span></div>}
                                {wideListBtn2 && <div className="flex-1 py-1.5 text-center"><span className="text-[10px] font-semibold text-gray-600">{wideListBtn2}</span></div>}
                                {!wideListBtn1 && !wideListBtn2 && <div className="flex-1 py-1.5 text-center"><span className="text-[10px] font-semibold text-gray-600">LIVE 보기</span></div>}
                              </div>
                            </>
                          )}
                          <div className="border-t border-gray-100 px-2.5 py-1"><p className="text-[7px] text-gray-400">수신거부 | 홈 &gt; 채널 차단</p></div>
                        </div>
                        <p className="mt-0.5 text-[7px] text-gray-400">오전 9:00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 우측: 에디터 */}
              <div className="flex-1 overflow-y-auto overflow-x-auto p-5">
                {brandEditTab === 'wide-image' ? (
                  <div className="border border-gray-200">
                    {/* 이미지 */}
                    <div className="flex border-b border-gray-200">
                      <div className="flex w-32 shrink-0 items-start gap-1.5 border-r border-gray-200 bg-gray-50 px-4 py-3">
                        <span className="text-sm font-bold text-[#4DB87A]">✓</span><span className="text-sm font-medium text-gray-700">이미지</span>
                      </div>
                      <div className="flex-1 px-4 py-3">
                        <div className="flex h-24 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-xs text-gray-400 cursor-pointer hover:bg-gray-100 transition-colors">
                          + 이미지 업로드 (권장 800×600 / jpg,png / 5MB)
                        </div>
                        <p className="mt-1 text-xs text-gray-400">가로:세로 비율 2:1 이상 ~ 1:1 이하</p>
                      </div>
                    </div>
                    {/* 내용 */}
                    <div className="flex border-b border-gray-200">
                      <div className="flex w-32 shrink-0 items-center gap-1.5 border-r border-gray-200 bg-gray-50 px-4 py-3">
                        <span className="text-sm font-bold text-[#4DB87A]">✓</span><span className="text-sm font-medium text-gray-700">내용</span>
                      </div>
                      <div className="flex-1 px-4 py-3">
                        <div className="relative">
                          <textarea value={wideImageContent} onChange={(e) => e.target.value.length <= 76 && setWideImageContent(e.target.value)} rows={4} className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-[#4DB87A] focus:outline-none resize-none" />
                          <span className="absolute right-3 bottom-3 text-xs"><span className="font-semibold text-[#4DB87A]">{wideImageContent.length}</span><span className="text-gray-400">/76</span></span>
                        </div>
                        <p className="mt-1 text-xs text-gray-400">텍스트 76자 제한 / 줄바꿈 최대 5회</p>
                      </div>
                    </div>
                    {/* 버튼 */}
                    <div className="flex">
                      <div className="flex w-32 shrink-0 items-start gap-1.5 border-r border-gray-200 bg-gray-50 px-4 py-3">
                        <span className="text-sm font-bold text-[#4DB87A]">✓</span><span className="text-sm font-medium text-gray-700">버튼</span>
                      </div>
                      <div className="flex-1 px-4 py-3 space-y-3">
                        <div className="space-y-1.5">
                          <div className="relative">
                            <input type="text" value={wideImageBtn1} onChange={(e) => e.target.value.length <= 8 && setWideImageBtn1(e.target.value)} placeholder="버튼 1" className="w-full rounded border border-gray-300 px-3 py-2 pr-12 text-sm focus:border-[#4DB87A] focus:outline-none" />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs"><span className="font-semibold text-[#4DB87A]">{wideImageBtn1.length}</span><span className="text-gray-400">/8</span></span>
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="text" placeholder="/Home/Index" className="flex-1 rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-[#4DB87A] focus:outline-none focus:ring-1 focus:ring-[#4DB87A]" />
                            <button onClick={() => setShowUrlGenPopup(true)} className="rounded-md bg-[#4b5563] px-3 py-2 text-sm font-semibold text-white hover:bg-[#374151] transition-colors whitespace-nowrap">불러오기</button>
                            <button className="rounded-md bg-[#4b5563] px-3 py-2 text-sm font-semibold text-white hover:bg-[#374151] transition-colors whitespace-nowrap">초기화</button>
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <div className="relative">
                            <input type="text" value={wideImageBtn2} onChange={(e) => e.target.value.length <= 8 && setWideImageBtn2(e.target.value)} placeholder="버튼 2 (선택)" className="w-full rounded border border-gray-300 px-3 py-2 pr-12 text-sm focus:border-[#4DB87A] focus:outline-none" />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs"><span className="font-semibold text-[#4DB87A]">{wideImageBtn2.length}</span><span className="text-gray-400">/8</span></span>
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="text" placeholder="/Home/Index" className="flex-1 rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-[#4DB87A] focus:outline-none focus:ring-1 focus:ring-[#4DB87A]" />
                            <button onClick={() => setShowUrlGenPopup(true)} className="rounded-md bg-[#4b5563] px-3 py-2 text-sm font-semibold text-white hover:bg-[#374151] transition-colors whitespace-nowrap">불러오기</button>
                            <button className="rounded-md bg-[#4b5563] px-3 py-2 text-sm font-semibold text-white hover:bg-[#374151] transition-colors whitespace-nowrap">초기화</button>
                          </div>
                        </div>
                        <p className="text-xs text-gray-400">버튼명 8자 제한 / 최대 2개 (가로 배열)</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="border border-gray-200">
                    {/* 헤더 */}
                    <div className="flex border-b border-gray-200">
                      <div className="flex w-32 shrink-0 items-center gap-1.5 border-r border-gray-200 bg-gray-50 px-4 py-3">
                        <span className="text-sm font-bold text-[#4DB87A]">✓</span><span className="text-sm font-medium text-gray-700">헤더</span>
                      </div>
                      <div className="flex-1 px-4 py-3">
                        <div className="relative">
                          <input type="text" value={wideListHeader} onChange={(e) => e.target.value.length <= 20 && setWideListHeader(e.target.value)} className="w-full rounded border border-gray-300 px-3 py-2 pr-14 text-sm focus:border-[#4DB87A] focus:outline-none" />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs"><span className="font-semibold text-[#4DB87A]">{wideListHeader.length}</span><span className="text-gray-400">/20</span></span>
                        </div>
                        <p className="mt-1 text-xs text-gray-400">20자 제한 / 줄바꿈 불가</p>
                      </div>
                    </div>
                    {/* 리스트 1 */}
                    <div className="flex border-b border-gray-200">
                      <div className="flex w-32 shrink-0 items-start gap-1.5 border-r border-gray-200 bg-gray-50 px-4 py-3">
                        <span className="text-sm font-bold text-[#4DB87A]">✓</span><span className="text-sm font-medium text-gray-700">리스트 1</span>
                      </div>
                      <div className="flex-1 px-4 py-3 space-y-2">
                        <div className="flex h-16 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-xs text-gray-400 cursor-pointer hover:bg-gray-100">
                          + 이미지 (2:1 고정 / 800×400 / jpg,png / 5MB)
                        </div>
                        <div className="relative">
                          <input type="text" value={wideListItems[0].text} onChange={(e) => { if (e.target.value.length <= 25) { const n=[...wideListItems]; n[0]={...n[0],text:e.target.value}; setWideListItems(n); }}} placeholder="문구" className="w-full rounded border border-gray-300 px-3 py-2 pr-12 text-sm focus:border-[#4DB87A] focus:outline-none" />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs"><span className="font-semibold text-[#4DB87A]">{wideListItems[0].text.length}</span><span className="text-gray-400">/25</span></span>
                        </div>
                        <p className="text-xs text-gray-400">줄바꿈 최대 1회</p>
                        <div className="flex items-center gap-2">
                          <input type="text" placeholder="/Home/Index" className="flex-1 rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-[#4DB87A] focus:outline-none focus:ring-1 focus:ring-[#4DB87A]" />
                          <button onClick={() => setShowUrlGenPopup(true)} className="rounded-md bg-[#4b5563] px-3 py-2 text-sm font-semibold text-white hover:bg-[#374151] transition-colors whitespace-nowrap">불러오기</button>
                          <button className="rounded-md bg-[#4b5563] px-3 py-2 text-sm font-semibold text-white hover:bg-[#374151] transition-colors whitespace-nowrap">초기화</button>
                        </div>
                      </div>
                    </div>
                    {/* 리스트 2~5 */}
                    {wideListItems.slice(1).map((item, i) => (
                      <div key={i+1} className="flex border-b border-gray-200 last:border-0">
                        <div className="flex w-32 shrink-0 items-start gap-1.5 border-r border-gray-200 bg-gray-50 px-4 py-3">
                          <span className={`text-sm font-bold ${i+2 <= 3 ? 'text-[#4DB87A]' : 'text-gray-400'}`}>✓</span>
                          <div>
                            <span className="text-sm font-medium text-gray-700">리스트 {i+2}</span>
                            {i+2 >= 4 && <span className="ml-1 text-xs text-gray-400">(선택)</span>}
                          </div>
                        </div>
                        <div className="flex-1 px-4 py-3 space-y-2">
                          <div className="flex h-12 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-xs text-gray-400 cursor-pointer hover:bg-gray-100">
                            + 이미지 (1:1 고정 / 800×800 / jpg,png / 5MB)
                          </div>
                          <div className="relative">
                            <input type="text" value={item.text} onChange={(e) => { if (e.target.value.length <= 30) { const n=[...wideListItems]; n[i+1]={...n[i+1],text:e.target.value}; setWideListItems(n); }}} placeholder="상품명 및 문구" className="w-full rounded border border-gray-300 px-3 py-2 pr-12 text-sm focus:border-[#4DB87A] focus:outline-none" />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs"><span className="font-semibold text-[#4DB87A]">{item.text.length}</span><span className="text-gray-400">/30</span></span>
                          </div>
                          <p className="text-xs text-gray-400">줄바꿈 최대 1회</p>
                          <div className="flex items-center gap-2">
                            <input type="text" placeholder="/Home/Index" className="flex-1 rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-[#4DB87A] focus:outline-none focus:ring-1 focus:ring-[#4DB87A]" />
                            <button onClick={() => setShowUrlGenPopup(true)} className="rounded-md bg-[#4b5563] px-3 py-2 text-sm font-semibold text-white hover:bg-[#374151] transition-colors whitespace-nowrap">불러오기</button>
                            <button className="rounded-md bg-[#4b5563] px-3 py-2 text-sm font-semibold text-white hover:bg-[#374151] transition-colors whitespace-nowrap">초기화</button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {/* 버튼 */}
                    <div className="flex border-t border-gray-200">
                      <div className="flex w-32 shrink-0 items-start gap-1.5 border-r border-gray-200 bg-gray-50 px-4 py-3">
                        <span className="text-sm font-bold text-[#4DB87A]">✓</span><span className="text-sm font-medium text-gray-700">버튼</span>
                      </div>
                      <div className="flex-1 px-4 py-3 space-y-3">
                        <div className="space-y-1.5">
                          <div className="relative">
                            <input type="text" value={wideListBtn1} onChange={(e) => e.target.value.length <= 8 && setWideListBtn1(e.target.value)} placeholder="버튼 1" className="w-full rounded border border-gray-300 px-3 py-2 pr-12 text-sm focus:border-[#4DB87A] focus:outline-none" />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs"><span className="font-semibold text-[#4DB87A]">{wideListBtn1.length}</span><span className="text-gray-400">/8</span></span>
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="text" placeholder="/Home/Index" className="flex-1 rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-[#4DB87A] focus:outline-none focus:ring-1 focus:ring-[#4DB87A]" />
                            <button onClick={() => setShowUrlGenPopup(true)} className="rounded-md bg-[#4b5563] px-3 py-2 text-sm font-semibold text-white hover:bg-[#374151] transition-colors whitespace-nowrap">불러오기</button>
                            <button className="rounded-md bg-[#4b5563] px-3 py-2 text-sm font-semibold text-white hover:bg-[#374151] transition-colors whitespace-nowrap">초기화</button>
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <div className="relative">
                            <input type="text" value={wideListBtn2} onChange={(e) => e.target.value.length <= 8 && setWideListBtn2(e.target.value)} placeholder="버튼 2 (선택)" className="w-full rounded border border-gray-300 px-3 py-2 pr-12 text-sm focus:border-[#4DB87A] focus:outline-none" />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs"><span className="font-semibold text-[#4DB87A]">{wideListBtn2.length}</span><span className="text-gray-400">/8</span></span>
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="text" placeholder="/Home/Index" className="flex-1 rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-[#4DB87A] focus:outline-none focus:ring-1 focus:ring-[#4DB87A]" />
                            <button onClick={() => setShowUrlGenPopup(true)} className="rounded-md bg-[#4b5563] px-3 py-2 text-sm font-semibold text-white hover:bg-[#374151] transition-colors whitespace-nowrap">불러오기</button>
                            <button className="rounded-md bg-[#4b5563] px-3 py-2 text-sm font-semibold text-white hover:bg-[#374151] transition-colors whitespace-nowrap">초기화</button>
                          </div>
                        </div>
                        <p className="text-xs text-gray-400">버튼명 8자 제한 / 최대 2개 (가로 배열)</p>
                      </div>
                    </div>
                  </div>
                )}
                {/* 치환 */}
                <div className="mt-3 border border-gray-200">
                  <div className="flex">
                    <div className="flex w-32 shrink-0 items-start gap-1.5 border-r border-gray-200 bg-gray-50 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700 mt-0.5">치환</span>
                    </div>
                    <div className="flex-1 px-4 py-3">
                      <div className="space-y-1">
                        {LMS_REPLACEMENTS.map((r) => (
                          <p key={r.key} className="text-sm text-gray-700">
                            <span className="text-gray-800">{r.key}</span>{' '}
                            <span className="text-gray-600">{r.desc}</span>
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-3 flex items-center gap-1 text-xs text-gray-500">
                  <span className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border border-gray-400 text-[9px] font-bold">i</span>
                  모바일 해상도에 따라 다소 차이가 있을 수 있습니다.
                </p>
              </div>
            </div>
            {/* 푸터 */}
            <div className="flex items-center justify-center gap-3 border-t border-gray-200 bg-[#ebebeb] px-6 py-4 shrink-0">
              <button onClick={() => setShowBrandEditPopup(false)} className="rounded-lg bg-[#4b5563] px-10 py-2.5 text-sm font-bold text-white hover:bg-[#374151] transition-colors">취소</button>
              <button onClick={() => setShowBrandEditPopup(false)} className="rounded-lg bg-[#4b5563] px-10 py-2.5 text-sm font-bold text-white hover:bg-[#374151] transition-colors">수정</button>
            </div>
          </div>
        </div>
      )}

      {/* ── LMS 메시지 수정 팝업 ── */}
      {showLmsEditPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowLmsEditPopup(false)}>
          <div className="relative flex h-[90vh] w-[95vw] max-w-[1000px] flex-col overflow-hidden rounded-xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* 헤더 */}
            <div className="flex items-center gap-3 bg-[#252830] px-6 py-4 shrink-0">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/10">
                <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 text-white" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="5" height="5" rx="1" /><rect x="9" y="2" width="5" height="5" rx="1" /><rect x="2" y="9" width="5" height="5" rx="1" /><rect x="9" y="9" width="5" height="5" rx="1" />
                </svg>
              </div>
              <h2 className="text-base font-bold text-white">LMS 메시지 수정</h2>
            </div>
            {/* 본문 */}
            <div className="flex flex-1 overflow-hidden">
              {/* 좌측: LMS 미리보기 */}
              <div className="w-72 shrink-0 border-r border-gray-200 bg-gray-50 p-5 overflow-y-auto">
                <div className="rounded-xl bg-[#9ca3af] p-3">
                  <div className="rounded-lg bg-white p-3 space-y-1.5">
                    <p className="text-[11px] font-semibold text-gray-800">{'(광고) (광고)[#{상점명}]'}</p>
                    <p className="text-[11px] leading-relaxed text-gray-800 whitespace-pre-line">{lmsContent}</p>
                  </div>
                  <div className="mt-1 flex justify-end pr-1">
                    <span className="text-[10px] text-gray-200">LMS 오후 1:56</span>
                  </div>
                </div>
              </div>
              {/* 우측: 폼 */}
              <div className="flex-1 overflow-y-auto overflow-x-auto">
                <div className="border border-gray-200 m-5">
                  {/* 발신번호 */}
                  <div className="flex border-b border-gray-200">
                    <div className="flex w-36 shrink-0 items-center gap-1.5 border-r border-gray-200 bg-gray-50 px-4 py-3">
                      <span className="text-sm font-bold text-[#4DB87A]">✓</span>
                      <span className="text-sm font-medium text-gray-700">발신번호</span>
                    </div>
                    <div className="flex-1 px-4 py-3 text-sm text-gray-700">01025137030</div>
                  </div>
                  {/* 제목 */}
                  <div className="flex border-b border-gray-200">
                    <div className="flex w-36 shrink-0 items-center gap-1.5 border-r border-gray-200 bg-gray-50 px-4 py-3">
                      <span className="text-sm font-bold text-[#4DB87A]">✓</span>
                      <span className="text-sm font-medium text-gray-700">제목</span>
                    </div>
                    <div className="flex-1 px-4 py-3">
                      <div className="relative">
                        <input
                          type="text"
                          value={lmsTitle}
                          onChange={(e) => e.target.value.length <= 40 && setLmsTitle(e.target.value)}
                          className="w-full rounded border border-gray-300 px-3 py-2 pr-16 text-sm focus:border-[#4DB87A] focus:outline-none focus:ring-1 focus:ring-[#4DB87A]"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs">
                          <span className="text-[#4DB87A] font-semibold">{lmsTitle.length}</span>
                          <span className="text-gray-400">/40</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* 메시지 내용 */}
                  <div className="flex border-b border-gray-200">
                    <div className="flex w-36 shrink-0 items-center gap-1.5 border-r border-gray-200 bg-gray-50 px-4 py-3">
                      <span className="text-sm font-bold text-[#4DB87A]">✓</span>
                      <span className="text-sm font-medium text-gray-700">메시지 내용</span>
                    </div>
                    <div className="flex-1 px-4 py-3">
                      <div className="relative">
                        <textarea
                          value={lmsContent}
                          onChange={(e) => e.target.value.length <= 2000 && setLmsContent(e.target.value)}
                          rows={8}
                          className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-[#4DB87A] focus:outline-none focus:ring-1 focus:ring-[#4DB87A] resize-none"
                        />
                        <span className="absolute right-3 bottom-3 text-xs">
                          <span className="text-[#4DB87A] font-semibold">{lmsContent.length}</span>
                          <span className="text-gray-400">/2000</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* 무료수신거부 번호 */}
                  <div className="flex border-b border-gray-200">
                    <div className="flex w-36 shrink-0 items-center gap-1.5 border-r border-gray-200 bg-gray-50 px-4 py-3">
                      <span className="text-sm font-bold text-[#4DB87A]">✓</span>
                      <span className="text-sm font-medium text-gray-700">무료수신거부 번호</span>
                    </div>
                    <div className="flex-1 px-4 py-3 text-sm text-gray-700">010-1234-5678</div>
                  </div>
                  {/* 치환 */}
                  <div className="flex">
                    <div className="flex w-36 shrink-0 items-start gap-1.5 border-r border-gray-200 bg-gray-50 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700 mt-0.5">치환</span>
                    </div>
                    <div className="flex-1 px-4 py-3">
                      <div className="space-y-1">
                        {LMS_REPLACEMENTS.map((r) => (
                          <p key={r.key} className="text-sm text-gray-700">
                            <span className="text-gray-800">{r.key}</span>{' '}
                            <span className="text-gray-600">{r.desc}</span>
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {/* 하단 노트 */}
                <p className="mx-5 mb-5 flex items-center gap-1 text-xs text-gray-500">
                  <span className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border border-gray-400 text-[9px] font-bold">i</span>
                  모바일 해상도에 따라 다소 차이가 있을 수 있습니다.
                </p>
              </div>
            </div>
            {/* 푸터 */}
            <div className="flex items-center justify-center gap-3 border-t border-gray-200 bg-[#ebebeb] px-6 py-4 shrink-0">
              <button onClick={() => setShowLmsEditPopup(false)} className="rounded-lg bg-[#4b5563] px-10 py-2.5 text-sm font-bold text-white hover:bg-[#374151] transition-colors">취소</button>
              <button onClick={() => setShowLmsEditPopup(false)} className="rounded-lg bg-[#4b5563] px-10 py-2.5 text-sm font-bold text-white hover:bg-[#374151] transition-colors">수정</button>
            </div>
          </div>
        </div>
      )}

      {/* ── APP 푸시 메시지 수정 팝업 ── */}
      {showPushEditPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowPushEditPopup(false)}>
          <div className="relative flex h-auto w-[95vw] max-w-[860px] flex-col overflow-hidden rounded-xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* 헤더 */}
            <div className="flex items-center gap-3 bg-[#252830] px-6 py-4">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/10">
                <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 text-white" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="5" height="5" rx="1" /><rect x="9" y="2" width="5" height="5" rx="1" /><rect x="2" y="9" width="5" height="5" rx="1" /><rect x="9" y="9" width="5" height="5" rx="1" />
                </svg>
              </div>
              <h2 className="text-base font-bold text-white">APP푸시 메시지 수정</h2>
            </div>
            {/* 본문 */}
            <div className="flex overflow-hidden">
              {/* 좌측: 폰 미리보기 */}
              <div className="w-72 shrink-0 border-r border-gray-200 bg-gray-50 flex flex-col items-center justify-start gap-3 p-5 overflow-y-auto">
                {pushEditPreviewTab === 'aos'
                  ? <PhoneNotificationAOS pushTitle={pushTitle} pushBody={pushBody} imageUrl={pushImageUrl || undefined} />
                  : <PhoneNotificationIOS pushTitle={pushTitle} pushBody={pushBody} />
                }
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setPushEditPreviewTab('aos')}
                    className={`rounded-full border px-5 py-1.5 text-sm font-semibold transition-colors ${pushEditPreviewTab === 'aos' ? 'border-[#4DB87A] text-[#4DB87A]' : 'border-gray-300 text-gray-500 hover:border-gray-400'}`}
                  >
                    AOS 예시
                  </button>
                  <button
                    onClick={() => setPushEditPreviewTab('ios')}
                    className={`text-sm font-semibold transition-colors ${pushEditPreviewTab === 'ios' ? 'text-[#4DB87A]' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    iOS 예시
                  </button>
                </div>
              </div>
              {/* 우측: 폼 */}
              <div className="flex-1 p-5 space-y-0">
                <div className="border border-gray-200">
                  {/* 제목 */}
                  <div className="flex border-b border-gray-200">
                    <div className="flex w-24 shrink-0 items-center gap-1.5 border-r border-gray-200 bg-gray-50 px-4 py-4">
                      <span className="text-sm font-bold text-[#4DB87A]">✓</span>
                      <span className="text-sm font-medium text-gray-700">제목</span>
                    </div>
                    <div className="flex-1 px-4 py-4">
                      <div className="relative">
                        <input
                          type="text"
                          value={pushTitle}
                          onChange={(e) => e.target.value.length <= 65 && setPushTitle(e.target.value)}
                          className="w-full rounded border border-gray-300 px-3 py-2 pr-16 text-sm focus:border-[#4DB87A] focus:outline-none focus:ring-1 focus:ring-[#4DB87A]"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs">
                          <span className="text-[#4DB87A] font-semibold">{pushTitle.length}</span>
                          <span className="text-gray-400">/65</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* 본문 */}
                  <div className="flex">
                    <div className="flex w-24 shrink-0 items-center gap-1.5 border-r border-gray-200 bg-gray-50 px-4 py-4">
                      <span className="text-sm font-bold text-[#4DB87A]">✓</span>
                      <span className="text-sm font-medium text-gray-700">본문</span>
                    </div>
                    <div className="flex-1 px-4 py-4">
                      <div className="relative">
                        <textarea
                          value={pushBody}
                          onChange={(e) => e.target.value.length <= 110 && setPushBody(e.target.value)}
                          rows={4}
                          className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-[#4DB87A] focus:outline-none focus:ring-1 focus:ring-[#4DB87A] resize-none"
                        />
                        <span className="absolute right-3 bottom-3 text-xs">
                          <span className="text-[#4DB87A] font-semibold">{pushBody.length}</span>
                          <span className="text-gray-400">/110</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* 랜딩 URL */}
                  <div className="flex border-t border-gray-200">
                    <div className="flex w-24 shrink-0 items-center gap-1.5 border-r border-gray-200 bg-gray-50 px-4 py-4">
                      <span className="text-sm font-bold text-[#4DB87A]">✓</span>
                      <span className="text-sm font-medium text-gray-700">랜딩 URL</span>
                    </div>
                    <div className="flex-1 px-4 py-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="/Home/Index"
                          className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm focus:border-[#4DB87A] focus:outline-none focus:ring-1 focus:ring-[#4DB87A]"
                        />
                        <button onClick={() => setShowUrlGenPopup(true)} className="rounded-md bg-[#4b5563] px-4 py-2 text-sm font-semibold text-white hover:bg-[#374151] transition-colors whitespace-nowrap">불러오기</button>
                        <button className="rounded-md bg-[#4b5563] px-4 py-2 text-sm font-semibold text-white hover:bg-[#374151] transition-colors whitespace-nowrap">초기화</button>
                      </div>
                    </div>
                  </div>
                  {/* 이미지 */}
                  <div className="flex border-t border-gray-200">
                    <div className="flex w-24 shrink-0 items-center gap-1.5 border-r border-gray-200 bg-gray-50 px-4 py-3">
                      <span className="text-sm font-bold text-[#4DB87A]">✓</span>
                      <span className="text-sm font-medium text-gray-700">이미지</span>
                    </div>
                    <div className="flex-1 px-4 py-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <label className="cursor-pointer rounded border border-gray-300 bg-white px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap">
                          파일 선택
                          <input
                            type="file"
                            accept=".jpg,.jpeg,.gif,.png,.bmp"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) setPushImageUrl(URL.createObjectURL(file));
                            }}
                          />
                        </label>
                        <p className="flex items-center gap-1 text-xs text-gray-500">
                          <span className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border border-gray-400 text-[9px] font-bold">i</span>
                          10M 이하의 JPG, GIF, PNG, BMP 파일만 가능하며 892*303 크기를 권장합니다.
                        </p>
                      </div>
                      <p className="mt-1.5 text-xs text-gray-400">이미지는 안드로이드만 표시됩니다. (iOS 미적용)</p>
                    </div>
                  </div>
                  {/* 치환 */}
                  <div className="flex border-t border-gray-200">
                    <div className="flex w-24 shrink-0 items-start gap-1.5 border-r border-gray-200 bg-gray-50 px-4 py-3">
                      <span className="text-sm font-medium text-gray-700 mt-0.5">치환</span>
                    </div>
                    <div className="flex-1 px-4 py-3">
                      <div className="space-y-1">
                        {LMS_REPLACEMENTS.map((r) => (
                          <p key={r.key} className="text-sm text-gray-700">
                            <span className="text-gray-800">{r.key}</span>{' '}
                            <span className="text-gray-600">{r.desc}</span>
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-3 flex items-center gap-1 text-xs text-gray-500">
                  <span className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border border-gray-400 text-[9px] font-bold">i</span>
                  모바일 해상도에 따라 다소 차이가 있을 수 있습니다.
                </p>
              </div>
            </div>
            {/* 푸터 */}
            <div className="flex items-center justify-center gap-3 border-t border-gray-200 bg-[#ebebeb] px-6 py-4">
              <button onClick={() => setShowPushEditPopup(false)} className="rounded-lg bg-[#4b5563] px-10 py-2.5 text-sm font-bold text-white hover:bg-[#374151] transition-colors">취소</button>
              <button onClick={() => setShowPushEditPopup(false)} className="rounded-lg bg-[#4b5563] px-10 py-2.5 text-sm font-bold text-white hover:bg-[#374151] transition-colors">수정</button>
            </div>
          </div>
        </div>
      )}

      {/* ── 고객 그룹 생성 팝업 ── */}
      {showGroupCreatePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowGroupCreatePopup(false)}>
          <div className="relative w-[95vw] max-w-[900px] max-h-[90vh] overflow-auto rounded-xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <CustomerGroupCreate onClose={() => setShowGroupCreatePopup(false)} />
          </div>
        </div>
      )}

      {/* ── LIVE 불러오기 팝업 ── */}
      {showLivePopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setShowLivePopup(false)}
        >
          <div
            className="relative w-[95vw] max-w-[1100px] max-h-[80vh] overflow-auto rounded-xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 팝업 헤더 */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h3 className="text-base font-bold text-gray-900">LIVE 목록</h3>
              <button
                onClick={() => setShowLivePopup(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* 테이블 */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 w-12">No</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">LIVE 방송명</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 whitespace-nowrap">LIVE 상품 수</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 whitespace-nowrap">LIVE 수수료</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 whitespace-nowrap">총 접속자 수</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 whitespace-nowrap">LIVE 진행 상태</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 whitespace-nowrap">LIVE 방송 시작일시</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 whitespace-nowrap">좋아요 수</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">메모</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">선택</th>
                  </tr>
                </thead>
                <tbody>
                  {LIVE_LIST.map((item) => {
                    const isSelected = selectedLive?.no === item.no;
                    return (
                      <tr
                        key={item.no}
                        className={`border-b border-gray-100 last:border-0 transition-colors ${isSelected ? 'bg-[#f0faf5]' : 'hover:bg-gray-50'}`}
                      >
                        <td className="px-4 py-4 text-center text-sm text-gray-600">{item.no}</td>
                        <td className="px-4 py-4">
                          <p className="text-sm font-semibold text-gray-900 mb-0.5">{item.title}</p>
                          <p className="text-xs text-gray-400 mb-1.5">{item.url}</p>
                          <button
                            onClick={() => handleCopy(item.url)}
                            className="rounded border border-gray-300 px-2.5 py-1 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                          >
                            LIVE 링크 복사
                          </button>
                        </td>
                        <td className="px-4 py-4 text-center text-sm text-gray-700">{item.productCount}</td>
                        <td className="px-4 py-4 text-center text-sm font-semibold text-[#4DB87A]">{item.fee}</td>
                        <td className="px-4 py-4 text-center text-sm text-gray-700">{item.visitors}</td>
                        <td className="px-4 py-4 text-center text-sm font-semibold text-[#4DB87A]">{item.status}</td>
                        <td className="px-4 py-4 text-center text-sm text-gray-700">{item.startAt || '-'}</td>
                        <td className="px-4 py-4 text-center text-sm text-gray-700">{item.likes}</td>
                        <td className="px-4 py-4 text-center text-sm text-gray-400">{item.memo || '-'}</td>
                        <td className="px-4 py-4 text-center">
                          {isSelected ? (
                            <button
                              onClick={() => setSelectedLive(null)}
                              className="rounded-lg border border-red-300 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-100 transition-colors whitespace-nowrap"
                            >
                              선택 해제
                            </button>
                          ) : (
                            <button
                              onClick={() => { setSelectedLive(item); setShowLivePopup(false); }}
                              className="rounded-lg bg-[#1e6b3c] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#165530] transition-colors"
                            >
                              선택
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* 팝업 하단 */}
            <div className="flex justify-end gap-2 border-t border-gray-200 px-6 py-4">
              <button
                onClick={() => setShowLivePopup(false)}
                className="rounded-lg border border-gray-300 px-6 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useState } from 'react';

const BULLETS = [
  { text: '콘텐츠 팝업은 반복 노출을 줄이기 위해, 동일한 계정에는 캠페인별로 하루 한 번만 노출됩니다.', red: false },
  { text: '자동 > 오프사이트 캠페인은 고객의 피로도를 줄이기 위하여 동일한 계정에 대해 2일에 한 번만 발송됩니다.', red: false },
  { text: '상품명, 상품 이미지, 부연 설명을 변경하는 경우 다음 날 CRM 시스템에 반영됩니다.', red: false },
  { text: 'LMS는 관련 법령 및 개인정보 보호 정책에 따라 마케팅 정보 수신에 동의한 회원에게만 발송됩니다.', red: false },
  { text: '고객별 메시지 수 제한 및 발송 정책에 따라 실제 수신되는 메시지 수는 차이가 있을 수 있습니다.', red: true },
  { text: '광고성 메시지의 발송 가능 시간은 08:00 ~ 20:50(한국 시간) 입니다.', red: true },
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
const PhoneNotification = () => (
  <div className="relative flex h-72 w-44 flex-col rounded-3xl border-2 border-gray-300 bg-gray-100 overflow-hidden shadow-md">
    {/* 상단 시간 */}
    <div className="flex justify-between px-4 pt-2 pb-1 text-[9px] text-gray-400">
      <span>9:41</span>
      <div className="flex gap-1">
        <span>▲</span><span>●</span>
      </div>
    </div>
    <div className="flex-1 flex flex-col gap-2 px-2">
      {/* 알림 (축소) */}
      <div className="rounded-xl bg-white p-2 shadow-sm">
        <div className="flex items-start gap-1.5">
          <div className="h-5 w-5 rounded shrink-0 bg-orange-500 flex items-center justify-center text-[7px] font-black text-white">F</div>
          <div className="min-w-0">
            <p className="text-[9px] font-semibold text-gray-900 leading-tight">쉿! secret 할인코드 🎁</p>
            <p className="text-[8px] text-gray-500 leading-tight truncate">#[회원명]님을 위한 혜택 🎪 #[할인금액]할인 🔑 #[할인...</p>
          </div>
          <span className="text-[8px] text-gray-400 shrink-0">›</span>
        </div>
      </div>
      {/* 알림 (확장) */}
      <div className="rounded-xl bg-white p-2 shadow-sm">
        <div className="flex items-start gap-1.5 mb-2">
          <div className="h-5 w-5 rounded shrink-0 bg-orange-500 flex items-center justify-center text-[7px] font-black text-white">F</div>
          <div className="min-w-0">
            <p className="text-[9px] font-semibold text-gray-900 leading-tight">쉿! secret 할인코드 🎁</p>
            <p className="text-[8px] text-gray-500 leading-tight">
              #[회원명]님을 위한 혜택 🎪 #[할인금액]할인 🔑 #[할인코드]*결제 시 자동 적용
            </p>
          </div>
          <span className="text-[8px] text-gray-400 shrink-0">∧</span>
        </div>
        <button className="w-full rounded-lg bg-black py-1.5 text-[9px] font-bold text-white">#[할인코드]</button>
      </div>
    </div>
    {/* 하단 네비 */}
    <div className="flex justify-center gap-3 py-2">
      <div className="h-2 w-2 rounded-full bg-gray-400" />
      <div className="h-2 w-2 rounded-full bg-gray-400" />
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
    status: '라이브 대기중',
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
    status: '라이브 대기중',
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

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url).catch(() => {});
  };

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
              defaultValue="라이브 시작 알림 보내기_20260602_1"
              className="w-full max-w-lg rounded border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:border-[#4DB87A] focus:outline-none focus:ring-1 focus:ring-[#4DB87A]"
            />
          </FormRow>

          {/* 캠페인 내용 */}
          <FormRow label="캠페인 내용">
            <div className="flex items-center gap-3">
              <DarkBtn onClick={() => setShowLivePopup(true)}>LIVE 불러오기</DarkBtn>
              {selectedLive && (
                <span className="text-sm text-gray-700">
                  <span className="font-semibold text-[#4DB87A]">{selectedLive.title}</span> 선택됨
                </span>
              )}
            </div>
          </FormRow>

          {/* 대상자 */}
          <FormRow label="대상자">
            <div className="flex items-center gap-3">
              <RadioInput name="target" label="전체" defaultChecked />
              <RadioInput name="target" label="특정 고객" />
              <DarkBtn>전체 회원 조회 &gt;</DarkBtn>
              <span className="text-sm font-semibold text-[#4DB87A]">0명</span>
            </div>
          </FormRow>

          {/* 캠페인 유형 */}
          <FormRow label="캠페인 유형">
            <div className="space-y-3">
              <p className="text-sm text-gray-700">오프사이트 캠페인</p>
              <div className="space-y-1.5">
                <div><PillCheck label="APP푸시  0명" /></div>
                <div><PillCheck label="알림톡  0명" /></div>
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

          {/* 클릭 액션 */}
          <FormRow label="클릭 액션">
            <div className="flex items-center gap-2">
              <input
                type="text"
                defaultValue="/Home/Index"
                className="rounded border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:border-[#4DB87A] focus:outline-none focus:ring-1 focus:ring-[#4DB87A] w-72"
              />
              <DarkBtn>불러오기</DarkBtn>
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
                <p className="text-sm text-gray-600">APP푸시를 통하여 할인코드를 전달하고 상품 구매를 유도합니다.</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#111827] px-3 py-1 text-xs font-bold text-white">비용</span>
                <span className="text-sm text-gray-700">무료</span>
                <div className="rounded-lg bg-[#22c55e] px-3 py-2">
                  <p className="text-xs font-bold text-white">APP푸시를 이용하면 0 c를 절약할 수 있어요!</p>
                </div>
              </div>
            </div>

            {/* 우측 폰 목업 2개 */}
            <div className="flex shrink-0 items-center gap-4">
              <PhoneNotification />
              <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <PhoneApp />
            </div>
          </div>

          {/* AOS / iOS 탭 */}
          <div className="mt-4 flex items-center justify-center gap-3">
            <button className="rounded-full border border-[#4DB87A] px-5 py-1.5 text-sm font-semibold text-[#4DB87A]">
              AOS 예시
            </button>
            <button className="text-sm text-gray-600 hover:text-gray-900">iOS 예시</button>
          </div>
        </div>

        {/* LMS 예시 */}
        <div className="mt-6 rounded-xl bg-[#f0f0f0] p-8">
          <div className="flex items-start gap-8">
            {/* 좌측 설명 */}
            <div className="flex-1 space-y-4 pt-1">
              <div>
                <h3 className="mb-1 text-base font-bold text-gray-900">LMS 예시</h3>
                <p className="text-sm text-gray-600">LMS를 통하여 할인코드를 전달하고 상품 구매를 유도합니다.</p>
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
            <div className="w-56 shrink-0">
              <div className="rounded-xl bg-[#9ca3af] p-3">
                <div className="rounded-lg bg-white p-3 space-y-1.5">
                  <p className="text-[11px] font-semibold text-gray-800">(광고) (광고)[#[상점명]]</p>
                  <p className="text-[11px] font-medium text-[#22c55e] underline cursor-pointer">
                    #[채널명] 비밀 할인코드 소멸 안내
                  </p>
                  <p className="text-[11px] leading-relaxed text-gray-800">
                    #[회원명]님께 지급된 비밀 할인코드의 사용기한이 얼마 남지 않았습니다.
                  </p>
                  <div className="space-y-0.5 text-[11px] text-gray-800">
                    <p>▷ 할인코드: #[할인코드]</p>
                    <p>▷ 할인내용: #[할인금액]</p>
                    <p>▷ 만료일: #[만료일]</p>
                  </div>
                  <div className="text-[11px] text-gray-800">
                    <p>▶ 할인코드 사용하기</p>
                    <p>#[CUSTOM]</p>
                  </div>
                  <div className="space-y-0.5 text-[10px] leading-tight text-gray-500">
                    <p>* 만료일이 지나면 자동 소멸되어 사용이 불가능합니다.</p>
                    <p>* 코드 지급에 동의한 회원에게 발송되는 안내 메시지입니다.</p>
                    <p>* 할인코드는 주문/결제 페이지에서 자동으로 적용됩니다.</p>
                  </div>
                  <div className="pt-1 text-[11px] text-gray-600">
                    <p>[무료수신거부]</p>
                    <p>010-1234-5678</p>
                  </div>
                </div>
                <div className="mt-1 flex justify-end pr-1">
                  <span className="text-[10px] text-gray-200">LMS 오후 1:56</span>
                </div>
              </div>
              <button className="mt-2 w-full rounded-lg bg-[#111827] py-2.5 text-sm font-bold text-white hover:bg-black transition-colors">
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

      {/* ── LIVE 불러오기 팝업 ── */}
      {showLivePopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setShowLivePopup(false)}
        >
          <div
            className="relative w-[960px] max-h-[80vh] overflow-auto rounded-xl bg-white shadow-2xl"
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
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">라이브 방송명</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 whitespace-nowrap">라이브 상품 수</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 whitespace-nowrap">라이브 수수료</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 whitespace-nowrap">총 접속자 수</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 whitespace-nowrap">라이브 진행 상태</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 whitespace-nowrap">라이브 방송 시작일시</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 whitespace-nowrap">좋아요 수</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">메모</th>
                  </tr>
                </thead>
                <tbody>
                  {LIVE_LIST.map((item) => (
                    <tr
                      key={item.no}
                      className="border-b border-gray-100 last:border-0 cursor-pointer hover:bg-[#f0faf5] transition-colors"
                      onClick={() => { setSelectedLive(item); setShowLivePopup(false); }}
                    >
                      <td className="px-4 py-4 text-center text-sm text-gray-600">{item.no}</td>
                      <td className="px-4 py-4">
                        <p className="text-sm font-semibold text-gray-900 mb-0.5">{item.title}</p>
                        <p className="text-xs text-gray-400 mb-1.5">{item.url}</p>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleCopy(item.url); }}
                          className="rounded border border-gray-300 px-2.5 py-1 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                          라이브 링크 복사
                        </button>
                      </td>
                      <td className="px-4 py-4 text-center text-sm text-gray-700">{item.productCount}</td>
                      <td className="px-4 py-4 text-center text-sm font-semibold text-[#4DB87A]">{item.fee}</td>
                      <td className="px-4 py-4 text-center text-sm text-gray-700">{item.visitors}</td>
                      <td className="px-4 py-4 text-center text-sm font-semibold text-[#4DB87A]">{item.status}</td>
                      <td className="px-4 py-4 text-center text-sm text-gray-700">{item.startAt || '-'}</td>
                      <td className="px-4 py-4 text-center text-sm text-gray-700">{item.likes}</td>
                      <td className="px-4 py-4 text-center text-sm text-gray-400">{item.memo || '-'}</td>
                    </tr>
                  ))}
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
